import React, { useState } from 'react';

export default function EmailCopyButton({ email = 'jonascontatotrabalho@gmail.com' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Falha ao copiar e-mail:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`nav-link copy-email-btn ${copied ? 'copied' : ''}`}
      title={copied ? "E-mail copiado!" : "Copiar e-mail"}
      aria-label="Copiar e-mail"
    >
      <svg className="copy-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {copied ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
    </button>
  );
}
