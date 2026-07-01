import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const tagMeta = {
  'Entrada':         { color: '#4DAAFF', bg: 'rgba(77,170,255,0.08)',  border: 'rgba(77,170,255,0.25)' },
  'Mais Vendido':    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)' },
  'Mais Vendida':    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)' },
  'Custo-Benefício': { color: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.25)' },
  'AM5':             { color: '#A87FFF', bg: 'rgba(168,127,255,0.08)', border: 'rgba(168,127,255,0.25)' },
  'Gamer':           { color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.25)' },
  'Top':             { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.25)' },
};

const icons = {
  'Processadores':   '🔵',
  'Placas de Vídeo': '🎮',
  'Memória RAM':     '💾',
  'Fontes':          '🔌',
  'Outros':          '📦',
};

const injectStyles = () => {
  if (document.getElementById('vyk-produtos-styles')) return;
  const el = document.createElement('style');
  el.id = 'vyk-produtos-styles';
  el.textContent = `
    .vyk-p-section { padding: 100px 24px 80px; max-width: 1120px; margin: 0 auto; border-top: 1px solid #1C1C36; }
    .vyk-p-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #4DAAFF; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 12px; }
    .vyk-p-title { font-family: 'Inter', system-ui, sans-serif; font-size: clamp(28px,4vw,42px); font-weight: 700; letter-spacing: -0.03em; color: #E4ECFF; margin: 0 0 12px; line-height: 1.15; }
    .vyk-p-sub { color: #5A6A99; font-size: 15px; max-width: 480px; margin: 0 0 36px; line-height: 1.75; }
    .vyk-p-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
    .vyk-p-tab { padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Inter', system-ui, sans-serif; background: #0E0E1C; color: #5A6A99; border: 1px solid #1C1C36; transition: all .2s; }
    .vyk-p-tab:hover { border-color: #2E2E55; color: #E4ECFF; }
    .vyk-p-tab.active { background: linear-gradient(135deg,#6B21FF,#A87FFF); color: #fff; border-color: transparent; }
    .vyk-p-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 16px; }
    @media (max-width: 560px) { .vyk-p-grid { grid-template-columns: 1fr; } }
    .vyk-p-card { background: #0E0E1C; border: 1px solid #1C1C36; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: border-color .2s, transform .2s; }
    .vyk-p-card:hover { border-color: #2E2E55; transform: translateY(-2px); }
    .vyk-p-img { width: 100%; height: 180px; object-fit: cover; background: #0a0a15; display: block; }
    .vyk-p-img-placeholder { width: 100%; height: 180px; background: #0a0a15; display: flex; align-items: center; justify-content: center; font-size: 48px; }
    .vyk-p-body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .vyk-p-card-header { display: flex; justify-content: space-between; align-items: center; }
    .vyk-p-icon { font-size: 20px; }
    .vyk-p-tag { font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 20px; font-family: 'JetBrains Mono', monospace; letter-spacing: .04em; }
    .vyk-p-name { font-family: 'Inter', system-ui, sans-serif; font-size: 15px; font-weight: 700; color: #D0D8FF; line-height: 1.3; }
    .vyk-p-desc { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #445588; line-height: 1.65; }
    .vyk-p-price { font-family: 'Inter', system-ui, sans-serif; font-size: 22px; font-weight: 700; background: linear-gradient(135deg,#4DAAFF,#A87FFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-top: 2px; }
    .vyk-p-btn { background: linear-gradient(135deg,#6B21FF,#A87FFF); color: #fff; padding: 11px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; text-align: center; cursor: pointer; border: none; margin-top: auto; font-family: 'Inter', system-ui, sans-serif; transition: opacity .2s, transform .15s; width: 100%; }
    .vyk-p-btn:hover { opacity: .88; transform: translateY(-1px); }
    .vyk-p-empty { grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #445588; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
    .vyk-p-loading { text-align: center; padding: 60px 20px; color: #445588; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
  `;
  document.head.appendChild(el);
};

export default function Produtos() {
  injectStyles();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aba, setAba] = useState('Todos');

  useEffect(() => {
    const q = query(collection(db, 'produtos'), orderBy('criadoEm', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setProdutos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const categorias = ['Todos', ...new Set(produtos.map(p => p.categoria).filter(Boolean))];
  const filtrados = aba === 'Todos' ? produtos : produtos.filter(p => p.categoria === aba);

  const solicitar = (nome) => {
    window.location.href = `mailto:vyktoril93@gmail.com?subject=Interesse: ${nome}`;
  };

  if (loading) {
    return (
      <section id="produtos" className="vyk-p-section">
        <div className="vyk-p-loading">// carregando produtos...</div>
      </section>
    );
  }

  return (
    <section id="produtos" className="vyk-p-section">
      <div className="vyk-p-eyebrow">// loja</div>
      <h2 className="vyk-p-title">Peças de Computador</h2>
      <p className="vyk-p-sub">Hardware selecionado para quem não abre mão de performance.</p>

      <div className="vyk-p-tabs">
        {categorias.map(cat => (
          <button key={cat} className={`vyk-p-tab${aba === cat ? ' active' : ''}`} onClick={() => setAba(cat)}>
            {icons[cat] || '📦'} {cat}
          </button>
        ))}
      </div>

      <div className="vyk-p-grid">
        {filtrados.length === 0 ? (
          <div className="vyk-p-empty">// nenhum produto nesta categoria ainda</div>
        ) : (
          filtrados.map(p => {
            const meta = tagMeta[p.tag] || tagMeta['Entrada'];
            return (
              <div key={p.id} className="vyk-p-card">
                {p.imagemUrl
                  ? <img src={p.imagemUrl} alt={p.name} className="vyk-p-img" />
                  : <div className="vyk-p-img-placeholder">{icons[p.categoria] || '📦'}</div>
                }
                <div className="vyk-p-body">
                  <div className="vyk-p-card-header">
                    <span className="vyk-p-icon">{icons[p.categoria] || '📦'}</span>
                    {p.tag && (
                      <span className="vyk-p-tag" style={{ color: meta.color, background: meta.bg, border: `1px solid ${meta.border}` }}>
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="vyk-p-name">{p.name}</div>
                  <div className="vyk-p-desc">{p.desc}</div>
                  <div className="vyk-p-price">{p.preco}</div>
                  <button className="vyk-p-btn" onClick={() => solicitar(p.name)}>
                    Solicitar orçamento →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
