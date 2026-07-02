import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_zkmc1um';
const TEMPLATE_ID = 'template_o6u769m';
const PUBLIC_KEY = 'bOZiDMGdzrZIKWMIc';

const injectStyles = () => {
  if (document.getElementById('vyktoril-styles')) return;
  const el = document.createElement('style');
  el.id = 'vyktoril-styles';
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    .vyk-section { padding: 100px 24px 80px; max-width: 1120px; margin: 0 auto; border-top: 1px solid #1C1C36; }
    .vyk-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #4DAAFF; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 14px; }
    .vyk-card { background: #0E0E1C; border: 1px solid #1C1C36; border-radius: 20px; padding: 56px 52px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    @media (max-width: 768px) { .vyk-card { grid-template-columns: 1fr; padding: 36px 24px; gap: 32px; } }
    .vyk-title { font-family: 'Inter', system-ui, sans-serif; font-size: clamp(26px,3.2vw,38px); font-weight: 700; letter-spacing: -0.03em; color: #E4ECFF; margin: 0 0 10px; line-height: 1.18; }
    .vyk-subtitle { color: #5A6A99; font-size: 15px; line-height: 1.75; margin: 0 0 20px; }
    .vyk-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .vyk-tag { background: rgba(77,170,255,0.07); border: 1px solid #1C1C36; border-radius: 8px; padding: 5px 12px; font-size: 12px; color: #4DAAFF; font-family: 'JetBrains Mono', monospace; }
    .vyk-actions { display: flex; flex-direction: column; gap: 12px; }
    .vyk-info-item { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.025); border: 1px solid #1C1C36; border-radius: 10px; padding: 13px 16px; transition: border-color .2s; }
    .vyk-info-item:hover { border-color: #2E2E55; }
    .vyk-info-icon { width: 34px; height: 34px; flex-shrink: 0; border-radius: 8px; background: linear-gradient(135deg,rgba(77,170,255,.12),rgba(124,77,255,.12)); display: flex; align-items: center; justify-content: center; font-size: 15px; }
    .vyk-info-text { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #5A6A99; }
    .vyk-btn { display: block; text-align: center; text-decoration: none; padding: 14px 20px; border-radius: 10px; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; border: none; width: 100%; transition: opacity .2s, transform .15s; }
    .vyk-btn:hover { opacity: .88; transform: translateY(-1px); }
    .vyk-btn-purple { background: linear-gradient(135deg,#6B21FF,#A87FFF); color: #fff; }
    .vyk-btn-insta { background: linear-gradient(135deg,#E1306C,#F77737); color: #fff; }
    .vyk-btn-teal { background: linear-gradient(135deg,#00B4A0,#00D4B4); color: #fff; }
    .vyk-btn-outline { background: transparent; border: 1px solid #1C1C36; color: #5A6A99; }
    .vyk-btn-outline:hover { border-color: #4DAAFF; color: #4DAAFF; }
    .vyk-panel { background: #0E0E1C; border: 1px solid #1C1C36; border-radius: 20px; padding: 44px 48px; max-width: 640px; margin: 28px auto 0; animation: vyk-fade-in .25s ease; }
    @media (max-width: 640px) { .vyk-panel { padding: 28px 20px; } }
    @keyframes vyk-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .vyk-panel-title { font-family: 'Inter', system-ui, sans-serif; font-size: 20px; font-weight: 700; color: #E4ECFF; margin: 0 0 28px; text-align: center; }
    .vyk-steps { display: flex; flex-direction: column; gap: 18px; margin-bottom: 8px; }
    .vyk-step { display: flex; gap: 14px; align-items: flex-start; }
    .vyk-step-num { width: 30px; height: 30px; flex-shrink: 0; border-radius: 50%; background: linear-gradient(135deg,#6B21FF,#A87FFF); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }
    .vyk-step-text { color: #C0C8E8; font-size: 14px; line-height: 1.65; padding-top: 4px; }
    .vyk-pix-key { background: rgba(0,196,173,.07); border: 1px solid rgba(0,196,173,.25); border-radius: 10px; padding: 14px 18px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #00D4B4; text-align: center; margin: 6px 0 20px; letter-spacing: .03em; }
    .vyk-form { display: flex; flex-direction: column; gap: 16px; }
    .vyk-field { display: flex; flex-direction: column; gap: 6px; }
    .vyk-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #5A6A99; letter-spacing: .1em; text-transform: uppercase; }
    .vyk-input, .vyk-textarea { background: rgba(255,255,255,.03); border: 1px solid #1C1C36; border-radius: 10px; padding: 12px 16px; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; color: #E4ECFF; outline: none; transition: border-color .2s, box-shadow .2s; width: 100%; }
    .vyk-input::placeholder, .vyk-textarea::placeholder { color: #333355; }
    .vyk-input:focus, .vyk-textarea:focus { border-color: #4DAAFF; box-shadow: 0 0 0 3px rgba(77,170,255,.1); }
    .vyk-textarea { resize: vertical; min-height: 110px; }
    .vyk-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    @media (max-width: 520px) { .vyk-form-row { grid-template-columns: 1fr; } }
    .vyk-field-error { font-size: 12px; color: #FF6B6B; margin-top: 2px; }
    .vyk-status { text-align: center; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 500; }
    .vyk-status-ok { background: rgba(0,196,173,.1); color: #00C4AD; border: 1px solid rgba(0,196,173,.25); }
    .vyk-status-err { background: rgba(255,80,80,.08); color: #FF7070; border: 1px solid rgba(255,80,80,.2); }
    .vyk-footer { border-top: 1px solid #1C1C36; padding: 36px 24px; text-align: center; }
    .vyk-footer-brand { font-family: 'Inter', system-ui, sans-serif; font-size: 18px; font-weight: 700; background: linear-gradient(135deg,#4DAAFF,#A87FFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 6px; }
    .vyk-footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #333355; letter-spacing: .05em; }
  `;
  document.head.appendChild(el);
};

function PixPanel() {
  return (
    <div className="vyk-panel">
      <p className="vyk-panel-title">💰 Como comprar via PIX</p>
      <div className="vyk-steps">
        {[
          'Escolha o produto desejado e anote o valor.',
          'Faça o PIX com o valor exato para a chave abaixo:',
          'Envie o comprovante para nosso e-mail com seu nome e endereço completo.',
          'Confirmamos o pagamento e enviamos em até 2 dias úteis!',
        ].map((text, i) => (
          <div className="vyk-step" key={i}>
            <div className="vyk-step-num">{i + 1}</div>
            <div className="vyk-step-text">{text}</div>
          </div>
        ))}
      </div>
      <div className="vyk-pix-key">vyktoril93@gmail.com</div>
      <a href="mailto:vyktoril93@gmail.com?subject=Comprovante de Pagamento Vyktoril" className="vyk-btn vyk-btn-teal">
        📧 Enviar comprovante
      </a>
    </div>
  );
}

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = 'Nome é obrigatório.';
    if (!fields.email.trim()) e.email = 'E-mail é obrigatório.';
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'E-mail inválido.';
    if (!fields.message.trim()) e.message = 'Mensagem é obrigatória.';
    return e;
  };

  const handleChange = (e) => {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: fields.name,
        from_email: fields.email,
        title: fields.subject || 'Contato via site',
        message: fields.message,
      }, PUBLIC_KEY);
      setStatus('ok');
      setFields({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('err');
    }
    setSending(false);
  };

  if (status === 'ok') {
    return (
      <div className="vyk-panel">
        <p className="vyk-panel-title">✉️ Formulário de Contato</p>
        <div className="vyk-status vyk-status-ok">✅ Mensagem enviada! Retornamos em breve.</div>
        <button className="vyk-btn vyk-btn-outline" style={{ marginTop: 16 }} onClick={() => setStatus(null)}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <div className="vyk-panel">
      <p className="vyk-panel-title">✉️ Formulário de Contato</p>
      <div className="vyk-form">
        <div className="vyk-form-row">
          <div className="vyk-field">
            <label className="vyk-label">Nome *</label>
            <input className="vyk-input" name="name" value={fields.name} onChange={handleChange} placeholder="Seu nome" />
            {errors.name && <span className="vyk-field-error">{errors.name}</span>}
          </div>
          <div className="vyk-field">
            <label className="vyk-label">E-mail *</label>
            <input className="vyk-input" name="email" type="email" value={fields.email} onChange={handleChange} placeholder="seu@email.com" />
            {errors.email && <span className="vyk-field-error">{errors.email}</span>}
          </div>
        </div>
        <div className="vyk-field">
          <label className="vyk-label">Assunto</label>
          <input className="vyk-input" name="subject" value={fields.subject} onChange={handleChange} placeholder="Ex: Orçamento, Parceria…" />
        </div>
        <div className="vyk-field">
          <label className="vyk-label">Mensagem *</label>
          <textarea className="vyk-textarea" name="message" value={fields.message} onChange={handleChange} placeholder="Conte como podemos ajudar…" />
          {errors.message && <span className="vyk-field-error">{errors.message}</span>}
        </div>
        {status === 'err' && <div className="vyk-status vyk-status-err">⚠️ Erro ao enviar. Tente novamente.</div>}
        <button className="vyk-btn vyk-btn-purple" onClick={handleSubmit} disabled={sending}>
          {sending ? 'Enviando…' : 'Enviar mensagem →'}
        </button>
      </div>
    </div>
  );
}

export default function Contato() {
  injectStyles();
  const [panel, setPanel] = useState(null);
  const toggle = (id) => setPanel(p => (p === id ? null : id));

  return (
    <>
      <section id="contato" className="vyk-section">
        <div className="vyk-eyebrow">// fale conosco</div>
        <div className="vyk-card">
          <div>
            <h2 className="vyk-title">Pronto para começar?</h2>
            <p className="vyk-subtitle">Entre em contato e vamos conversar sobre como a Vyktoril pode transformar sua operação.</p>
            <div className="vyk-tags">
              <span className="vyk-tag">📍 Rio de Janeiro / Niterói</span>
              <span className="vyk-tag">🌐 100% Online</span>
              <span className="vyk-tag">🚚 Todo o Brasil</span>
            </div>
          </div>
          <div className="vyk-actions">
            <div className="vyk-info-item">
              <div className="vyk-info-icon">✉️</div>
              <span className="vyk-info-text">vyktoril93@gmail.com</span>
            </div>
            <button className={`vyk-btn ${panel === 'form' ? 'vyk-btn-outline' : 'vyk-btn-purple'}`} onClick={() => toggle('form')}>
              {panel === 'form' ? '✕ Fechar formulário' : '✉️ Enviar mensagem'}
            </button>
            <a href="https://instagram.com/vyktorial" target="_blank" rel="noreferrer" className="vyk-btn vyk-btn-insta">
              📸 Instagram @vyktorial
            </a>
            <button className={`vyk-btn ${panel === 'pix' ? 'vyk-btn-outline' : 'vyk-btn-teal'}`} onClick={() => toggle('pix')}>
              {panel === 'pix' ? '✕ Fechar PIX' : '💰 Como comprar via PIX'}
            </button>
          </div>
        </div>
        {panel === 'form' && <ContactForm />}
        {panel === 'pix' && <PixPanel />}
      </section>
      <footer className="vyk-footer">
        <div className="vyk-footer-brand">vyktoril</div>
        <div className="vyk-footer-copy">© 2026 Vyktoril · code · products · solutions</div>
      </footer>
    </>
  );
}
