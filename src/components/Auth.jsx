import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

const injectStyles = () => {
  if (document.getElementById('vyk-auth-styles')) return;
  const el = document.createElement('style');
  el.id = 'vyk-auth-styles';
  el.textContent = `
    .vyk-auth-wrap { min-height: 100vh; background: #09090F; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .vyk-auth-card { background: #0E0E1C; border: 1px solid #1C1C36; border-radius: 20px; padding: 44px 40px; width: 100%; max-width: 400px; }
    .vyk-auth-brand { font-family: 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 700; background: linear-gradient(135deg,#4DAAFF,#A87FFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-align: center; margin-bottom: 6px; }
    .vyk-auth-sub { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #5A6A99; text-align: center; margin-bottom: 32px; letter-spacing: .08em; }
    .vyk-auth-tabs { display: flex; gap: 8px; margin-bottom: 28px; }
    .vyk-auth-tab { flex: 1; padding: 10px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', system-ui, sans-serif; background: transparent; color: #5A6A99; border: 1px solid #1C1C36; transition: all .2s; }
    .vyk-auth-tab.active { background: linear-gradient(135deg,#6B21FF,#A87FFF); color: #fff; border-color: transparent; }
    .vyk-auth-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .vyk-auth-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #5A6A99; letter-spacing: .1em; text-transform: uppercase; }
    .vyk-auth-input { background: rgba(255,255,255,.03); border: 1px solid #1C1C36; border-radius: 10px; padding: 12px 16px; font-family: 'Inter', system-ui, sans-serif; font-size: 14px; color: #E4ECFF; outline: none; transition: border-color .2s; width: 100%; }
    .vyk-auth-input:focus { border-color: #4DAAFF; }
    .vyk-auth-input::placeholder { color: #333355; }
    .vyk-auth-btn { width: 100%; padding: 13px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; font-family: 'Inter', system-ui, sans-serif; transition: opacity .2s, transform .15s; margin-top: 6px; }
    .vyk-auth-btn:hover { opacity: .88; transform: translateY(-1px); }
    .vyk-auth-btn-purple { background: linear-gradient(135deg,#6B21FF,#A87FFF); color: #fff; }
    .vyk-auth-btn-google { background: #fff; color: #333; display: flex; align-items: center; justify-content: center; gap: 10px; }
    .vyk-auth-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
    .vyk-auth-divider-line { flex: 1; height: 1px; background: #1C1C36; }
    .vyk-auth-divider-text { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #445588; }
    .vyk-auth-error { background: rgba(255,80,80,.08); border: 1px solid rgba(255,80,80,.2); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #FF7070; margin-bottom: 14px; text-align: center; }
  `;
  document.head.appendChild(el);
};

export default function Auth({ onLogin }) {
  injectStyles();
  const [aba, setAba] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const traduzErro = (code) => {
    const erros = {
      'auth/user-not-found': 'Usuário não encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/email-already-in-use': 'E-mail já cadastrado.',
      'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
      'auth/invalid-email': 'E-mail inválido.',
      'auth/popup-closed-by-user': 'Login cancelado.',
    };
    return erros[code] || 'Erro ao autenticar. Tente novamente.';
  };

  const handleEmail = async () => {
    setErro('');
    setLoading(true);
    try {
      let result;
      if (aba === 'login') {
        result = await signInWithEmailAndPassword(auth, email, senha);
      } else {
        result = await createUserWithEmailAndPassword(auth, email, senha);
      }
      onLogin(result.user);
    } catch (e) {
      setErro(traduzErro(e.code));
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setErro('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (e) {
      setErro(traduzErro(e.code));
    }
    setLoading(false);
  };

  return (
    <div className="vyk-auth-wrap">
      <div className="vyk-auth-card">
        <div className="vyk-auth-brand">vyktoril</div>
        <div className="vyk-auth-sub">// acesse sua conta</div>

        <div className="vyk-auth-tabs">
          <button className={`vyk-auth-tab${aba === 'login' ? ' active' : ''}`} onClick={() => setAba('login')}>
            Entrar
          </button>
          <button className={`vyk-auth-tab${aba === 'registro' ? ' active' : ''}`} onClick={() => setAba('registro')}>
            Criar conta
          </button>
        </div>

        {erro && <div className="vyk-auth-error">{erro}</div>}

        <div className="vyk-auth-field">
          <label className="vyk-auth-label">E-mail</label>
          <input className="vyk-auth-input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="vyk-auth-field">
          <label className="vyk-auth-label">Senha</label>
          <input className="vyk-auth-input" type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEmail()} />
        </div>

        <button className="vyk-auth-btn vyk-auth-btn-purple" onClick={handleEmail} disabled={loading}>
          {loading ? 'Aguarde...' : aba === 'login' ? 'Entrar →' : 'Criar conta →'}
        </button>

        <div className="vyk-auth-divider">
          <div className="vyk-auth-divider-line" />
          <span className="vyk-auth-divider-text">ou</span>
          <div className="vyk-auth-divider-line" />
        </div>

        <button className="vyk-auth-btn vyk-auth-btn-google" onClick={handleGoogle} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/></svg>
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
