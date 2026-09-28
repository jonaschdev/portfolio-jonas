import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Mail } from 'lucide-react';
import './OpenToWorkButton.css';

export default function OpenToWorkButton() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="otw-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
    >
      <div className="otw-pill-morph">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isHovered ? (
            <motion.div
              key="label"
              className="otw-label-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <span className="otw-pulse-dot" />
              <span className="otw-text">Open to Work</span>
            </motion.div>
          ) : (
            <motion.div
              key="socials"
              className="otw-socials-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <a
                href="mailto:jonascontatotrabalho@gmail.com"
                className="otw-icon-btn otw-email"
                onClick={(e) => e.stopPropagation()}
                title="Enviar e-mail para Jonas"
                aria-label="Enviar E-mail"
              >
                <Mail size={14} strokeWidth={2.2} />
                <span>E-mail</span>
              </a>

              <a
                href="https://github.com/jonaschdev"
                target="_blank"
                rel="noopener noreferrer"
                className="otw-icon-btn otw-github"
                onClick={(e) => e.stopPropagation()}
                title="GitHub de Jonas"
                aria-label="GitHub"
              >
                <Github size={14} strokeWidth={2.2} />
                <span>GitHub</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
