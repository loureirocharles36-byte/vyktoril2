import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const auth = getAuth();

const injectStyles = () => {
  if (document.getElementById('vyk-conta-styles')) return;
  const el = document.createElement('style');
  el.id = 'vyk-conta-styles';
  el.textContent = `
    .vyk-conta-wrap { min-height: 100vh; background: #09090F; padding: 40px 24px; font-family: 'Inter', system-ui, sans-serif; }
    .vyk-conta-header { max-width: 800px; margin: 0 auto 32px; display: flex; justify-content: space-between; align-items: center; }
    .vyk-conta-brand { font-size: 20px; font-weight: 700; background: linear-gradient(135deg,#4DAAFF,#A87FFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .vyk-conta-user { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #5A6A99; }
    .vyk-conta-body { max-width: 800px; margin: 0 auto; }
    .vyk-conta-title { font-size: 24px; font-weight: 700; color: #E4ECFF; margin: 0 0 24px; }
    .vyk-conta-card { background: #0E0E1C; border: 1px solid #1C1C36; border-radius: 14px; padding: 20px 24px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    .vyk-conta-pedido-nome { font-size: 15px; font-weight: 600; color: #D0D8FF; }
    .vyk-conta-pedido-data { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #445588; margin-top: 4px; }
    .vyk-conta-pedido-status { font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
    .vyk-conta-status-pendente { background: rgba(251,191,36,.1); color: #fbbf24; border: 1px solid rgba(251,191,36,.25); }
    .vyk-conta-status-confirmado { background: rgba(34,197,94,.1); color: #22c55e; border: 1px solid rgba(34,197,94,.25); }
    .vyk-conta-empty { text-align: center; padding: 60px 20px; color: #445588; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
    .vyk-conta-btn-sair { background: transparent; border: 1px solid #1C1C36; border-radius: 8px; padding: 8px 16px; font-size: 13px; color: #5A6A99; cursor: pointer; font-family: 'Inter', system-ui, sans-serif; transition: all .2s; }
    .vyk-conta-btn-sair:hover { border-color: #f87171; color: #f87171; }
    .vyk-conta-btn-voltar { background: linear-gradient(135deg,#6B21FF,#A87FFF); color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', system-ui, sans-serif; margin-bottom: 24px; transition: opacity .2s; }
    .vyk-conta-btn-voltar:hover { opacity: .88; }
  `;
  document.head.appendChild(el);
};

export default function MinhaConta({ user, onSair }) {
  injectStyles();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'pedidos'),
      where('userId', '==', user.uid),
      orderBy('criadoEm', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setPedidos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const sair = async () => {
    await signOut(auth);
    onSair();
  };

  return (
    <div className="vyk-conta-wrap">
      <div className="vyk-conta-header">
        <div className="vyk-conta-brand">vyktoril</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="vyk-conta-user">{user.email}</div>
          <button className="vyk-conta-btn-sair" onClick={sair}>Sair</button>
        </div>
      </div>

      <div className="vyk-conta-body">
        <button className="vyk-conta-btn-voltar" onClick={() => window.location.href = '/'}>
          ← Voltar ao site
        </button>

        <h2 className="vyk-conta-title">Meus pedidos</h2>

        {loading ? (
          <div className="vyk-conta-empty">// carregando pedidos...</div>
        ) : pedidos.length === 0 ? (
          <div className="vyk-conta-empty">// nenhum pedido ainda. Explore nossos produtos!</div>
        ) : (
          pedidos.map(p => (
            <div key={p.id} className="vyk-conta-card">
              <div>
                <div className="vyk-conta-pedido-nome">{p.produto}</div>
                <div className="vyk-conta-pedido-data">
                  {p.criadoEm?.toDate?.()?.toLocaleDateString('pt-BR') || '—'}
                </div>
              </div>
              <span className={`vyk-conta-pedido-status ${p.status === 'confirmado' ? 'vyk-conta-status-confirmado' : 'vyk-conta-status-pendente'}`}>
                {p.status === 'confirmado' ? '✅ Confirmado' : '⏳ Pendente'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

