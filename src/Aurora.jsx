import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

import './Aurora.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLightMode;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  
  vec3 rampColor = (uv.x <= 0.5)
    ? mix(uColorStops[0], uColorStops[1], uv.x * 2.0)
    : mix(uColorStops[1], uColorStops[2], (uv.x - 0.5) * 2.0);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  if (uLightMode > 0.5) {
    vec3 lightAurora = mix(vec3(0.01, 0.52, 0.78), rampColor, 0.75);
    float lightAlpha = clamp(auroraAlpha * 0.45 * intensity, 0.0, 0.55);
    fragColor = vec4(lightAurora * lightAlpha, lightAlpha);
  } else {
    fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
  }
}
`;

export default function Aurora(props) {
  const { colorStops = ['#0284c7', '#38bdf8', '#6366f1'], amplitude = 1.0, blend = 0.6, speed = 0.5, lightMode = false } = props;
  const propsRef = useRef(props);
  propsRef.current = props;

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const isMobile = window.innerWidth < 768;
    let renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: isMobile ? 0.75 : Math.min(window.devicePixelRatio || 1, 1.25)
      });
    } catch {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: 1
      });
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    canvas.style.backgroundColor = 'transparent';
    ctn.appendChild(canvas);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStopsArray = (propsRef.current.colorStops ?? colorStops).map(hex => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    const initialW = Math.max(1, ctn.offsetWidth || window.innerWidth || 1000);
    const initialH = Math.max(1, ctn.offsetHeight || window.innerHeight || 600);
    renderer.setSize(initialW, initialH);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArray },
        uResolution: { value: [gl.drawingBufferWidth || initialW, gl.drawingBufferHeight || initialH] },
        uBlend: { value: blend },
        uLightMode: { value: lightMode ? 1 : 0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animateId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const renderNow = () => {
      renderer.render({ scene: mesh });
    };

    const resize = () => {
      if (!ctn) return;
      const w = Math.max(1, ctn.offsetWidth || window.innerWidth);
      const h = Math.max(1, ctn.offsetHeight || window.innerHeight);
      renderer.setSize(w, h);
      if (program) {
        program.uniforms.uResolution.value = [gl.drawingBufferWidth || w, gl.drawingBufferHeight || h];
      }
      renderNow();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(ctn);
    window.addEventListener('resize', resize);

    let cachedStops = null;
    let cachedColorArray = colorStopsArray;

    const update = (t) => {
      if (!isVisible || !isPageVisible) {
        animateId = 0;
        return;
      }
      animateId = requestAnimationFrame(update);
      const { time = t * 0.01, speed: curSpeed = 0.5, amplitude: curAmp, blend: curBlend, lightMode: curLight, colorStops: curStops } = propsRef.current;
      program.uniforms.uTime.value = time * curSpeed * 0.1;
      program.uniforms.uAmplitude.value = curAmp ?? amplitude;
      program.uniforms.uBlend.value = curBlend ?? blend;
      program.uniforms.uLightMode.value = (curLight ?? lightMode) ? 1 : 0;
      
      if (curStops && curStops !== cachedStops) {
        cachedStops = curStops;
        cachedColorArray = curStops.map((hex) => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });
        program.uniforms.uColorStops.value = cachedColorArray;
      }
      renderNow();
    };

    const startAnimation = () => {
      if (!animateId && isVisible && isPageVisible) {
        animateId = requestAnimationFrame(update);
      }
    };

    const stopAnimation = () => {
      if (animateId) {
        cancelAnimationFrame(animateId);
        animateId = 0;
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(ctn);

    // Render inicial e início do loop
    resize();
    startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (ctn && canvas.parentNode === ctn) {
        ctn.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude, blend, lightMode]);

  return <div ref={ctnDom} className="aurora-container" />;
}
