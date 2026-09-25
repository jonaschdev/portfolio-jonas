import React from 'react';
import LogoLoop from './LogoLoop';
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiNextdotjs,
  SiFirebase,
  SiLinux
} from 'react-icons/si';
import { Sparkles, Code2, Terminal } from 'lucide-react';

// Apenas os ícones soltos e puros da stack de Jonas (sem nomes e sem fundo nos ícones)
const techLogos = [
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Inteligência Artificial (IA)" style={{ color: '#c084fc' }}>
        <Sparkles size={28} />
      </span>
    ),
    title: 'Inteligência Artificial (IA)'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="HTML5" style={{ color: '#E34F26' }}>
        <SiHtml5 size={28} />
      </span>
    ),
    title: 'HTML5'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="CSS3" style={{ color: '#38bdf8' }}>
        <Code2 size={28} />
      </span>
    ),
    title: 'CSS3'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="JavaScript" style={{ color: '#F7DF1E' }}>
        <SiJavascript size={27} />
      </span>
    ),
    title: 'JavaScript'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="TypeScript" style={{ color: '#3178C6' }}>
        <SiTypescript size={27} />
      </span>
    ),
    title: 'TypeScript'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Python" style={{ color: '#38bdf8' }}>
        <SiPython size={28} />
      </span>
    ),
    title: 'Python'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="React" style={{ color: '#61DAFB' }}>
        <SiReact size={28} />
      </span>
    ),
    title: 'React'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Tailwind CSS" style={{ color: '#06B6D4' }}>
        <SiTailwindcss size={28} />
      </span>
    ),
    title: 'Tailwind CSS'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Git" style={{ color: '#F05032' }}>
        <SiGit size={28} />
      </span>
    ),
    title: 'Git'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="GitHub" style={{ color: 'var(--texto-principal)' }}>
        <SiGithub size={28} />
      </span>
    ),
    title: 'GitHub'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Node.js" style={{ color: '#5FA04E' }}>
        <SiNodedotjs size={28} />
      </span>
    ),
    title: 'Node.js'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Next.js" style={{ color: 'var(--texto-principal)' }}>
        <SiNextdotjs size={28} />
      </span>
    ),
    title: 'Next.js'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Firebase" style={{ color: '#FFCA28' }}>
        <SiFirebase size={28} />
      </span>
    ),
    title: 'Firebase'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Terminal & CLI" style={{ color: '#38bdf8' }}>
        <Terminal size={28} />
      </span>
    ),
    title: 'Terminal'
  },
  {
    node: (
      <span className="tech-loop-standalone-icon" title="Linux" style={{ color: '#FCC624' }}>
        <SiLinux size={28} />
      </span>
    ),
    title: 'Linux'
  }
];

export default function TechLogoLoop() {
  return (
    <div className="loop-section-wrapper">
      <LogoLoop
        logos={techLogos}
        speed={48}
        direction="left"
        logoHeight={30}
        gap={46}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        ariaLabel="Linguagens e Tecnologias em Loop"
      />
    </div>
  );
}
