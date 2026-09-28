import React, { useState } from 'react';
import { sendContactMessage } from './firebase';

export default function ContactMessageForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || name.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Por favor, informe seu nome (mínimo 2 caracteres).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Por favor, insira um e-mail válido para retorno.');
      return;
    }

    if (!message.trim() || message.trim().length < 3) {
      setStatus('error');
      setErrorMessage('Por favor, escreva uma mensagem (mínimo 3 caracteres).');
      return;
    }

    try {
      setStatus('submitting');
      setErrorMessage('');
      await sendContactMessage({ name, email, message });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Notificação toast global se existir
      const toast = document.getElementById('toastNotice');
      if (toast) {
        toast.textContent = 'Mensagem enviada com sucesso! Responderei em breve.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setStatus('error');
      setErrorMessage('Ocorreu um erro ao enviar. Tente novamente ou use o e-mail direto.');
    }
  };

  return (
    <div className="contact-form-wrapper">
      <div className="contact-form-divider">
        <span>ou envie um recado rápido</span>
      </div>

      <form onSubmit={handleSubmit} className="contact-firebase-form" noValidate>
        <div className="contact-form-row">
          <div className="contact-field-group">
            <label htmlFor="contactName" className="contact-field-label">Seu Nome</label>
            <input
              id="contactName"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Ana Silva / Tech Recruiter"
              maxLength={100}
              required
              className="contact-field-input"
              disabled={status === 'submitting'}
            />
          </div>

          <div className="contact-field-group">
            <label htmlFor="contactEmail" className="contact-field-label">Seu E-mail</label>
            <input
              id="contactEmail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seuemail@empresa.com"
              maxLength={150}
              required
              className="contact-field-input"
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="contact-field-group">
          <label htmlFor="contactMessage" className="contact-field-label">Mensagem</label>
          <textarea
            id="contactMessage"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Olá Jonas, gostaria de conversar sobre uma oportunidade / projeto..."
            rows={3}
            maxLength={1000}
            required
            className="contact-field-input contact-field-textarea"
            disabled={status === 'submitting'}
          />
        </div>

        {status === 'error' && errorMessage && (
          <div className="contact-form-alert error" role="alert">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="contact-form-alert success" role="status">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Mensagem salva no banco! Obrigado pelo contato.</span>
          </div>
        )}

        <button
          type="submit"
          className="contact-submit-btn"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <span className="contact-btn-spinner" aria-hidden="true" />
              <span>Enviando para o Firebase...</span>
            </>
          ) : (
            <>
              <span>Enviar Mensagem</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
