import React, { useState } from 'react';

const categorias = {
  'Processadores': [
    { name: 'AMD Ryzen 5 5500', desc: '6 núcleos | 12 threads | Turbo 4.2 GHz | AM4', preco: 'R$ 420', tag: 'Entrada' },
    { name: 'AMD Ryzen 5 5600', desc: '6 núcleos | 12 threads | Turbo 4.4 GHz | AM4', preco: 'R$ 580', tag: 'Mais Vendido' },
    { name: 'AMD Ryzen 7 5700X', desc: '8 núcleos | 16 threads | Turbo 4.6 GHz | AM4', preco: 'R$ 750', tag: 'Custo-Benefício' },
    { name: 'AMD Ryzen 5 7600', desc: '6 núcleos | 12 threads | Turbo 5.1 GHz | AM5', preco: 'R$ 1.189', tag: 'AM5' },
    { name: 'AMD Ryzen 7 7700', desc: '8 núcleos | 16 threads | Turbo 5.3 GHz | AM5', preco: 'R$ 1.899', tag: 'AM5' },
    { name: 'AMD Ryzen 7 9800X3D', desc: '8 núcleos | 16 threads | Turbo 5.2 GHz | V-Cache', preco: 'R$ 2.800', tag: 'Gamer' },
    { name: 'AMD Ryzen 9 9950X3D', desc: '16 núcleos | 32 threads | Turbo 5.7 GHz | V-Cache', preco: 'R$ 4.500', tag: 'Top' },
  ],
  'Placas de Vídeo': [
    { name: 'RX 6600 8GB', desc: '8GB GDDR6 | 1080p Ultra | AMD RDNA 2', preco: 'R$ 1.200', tag: 'Entrada' },
    { name: 'RTX 4060 8GB', desc: '8GB GDDR6 | 1080p/1440p | DLSS 3', preco: 'R$ 1.800', tag: 'Mais Vendida' },
    { name: 'RX 7700 XT 12GB', desc: '12GB GDDR6 | 1440p Ultra | AMD RDNA 3', preco: 'R$ 2.200', tag: 'Custo-Benefício' },
    { name: 'RTX 4070 12GB', desc: '12GB GDDR6X | 1440p/4K | DLSS 3', preco: 'R$ 3.200', tag: 'Gamer' },
    { name: 'RTX 4080 Super 16GB', desc: '16GB GDDR6X | 4K Ultra | DLSS 3.5', preco: 'R$ 6.500', tag: 'Top' },
  ],
  'Memória RAM': [
    { name: 'DDR4 8GB 3200MHz', desc: 'Kit 1x8GB | CL16 | Uso básico', preco: 'R$ 120', tag: 'Entrada' },
    { name: 'DDR4 16GB 3200MHz', desc: 'Kit 2x8GB | CL16 | Uso geral', preco: 'R$ 220', tag: 'Mais Vendida' },
    { name: 'DDR4 32GB 3600MHz', desc: 'Kit 2x16GB | CL18 | Gamer/Creator', preco: 'R$ 380', tag: 'Gamer' },
    { name: 'DDR5 16GB 5600MHz', desc: 'Kit 2x8GB | CL36 | Plataforma AM5', preco: 'R$ 350', tag: 'AM5' },
    { name: 'DDR5 32GB 6000MHz', desc: 'Kit 2x16GB | CL30 | Alto desempenho', preco: 'R$ 650', tag: 'Top' },
  ],
  'Fontes': [
    { name: 'Fonte 550W 80+ Bronze', desc: 'Cooler Master | Semi-modular | Silenciosa', preco: 'R$ 280', tag: 'Entrada' },
    { name: 'Fonte 650W 80+ Bronze', desc: 'Corsair CV650 | Ideal para RTX 4060', preco: 'R$ 350', tag: 'Mais Vendida' },
    { name: 'Fonte 750W 80+ Gold', desc: 'Corsair RM750 | Modular | Alta eficiência', preco: 'R$ 550', tag: 'Custo-Benefício' },
    { name: 'Fonte 850W 80+ Gold', desc: 'EVGA SuperNOVA | Full modular | RTX 4070+', preco: 'R$ 750', tag: 'Gamer' },
    { name: 'Fonte 1000W 80+ Platinum', desc: 'Seasonic Prime | Full modular | RTX 4080+', preco: 'R$ 1.100', tag: 'Top' },
  ],
};

const tagColors = {
  'Entrada': '#445588',
  'Mais Vendido': '#16a34a',
  'Mais Vendida': '#16a34a',
  'Custo-Benefício': '#0369a1',
  'AM5': '#7c3aed',
  'Gamer': '#dc2626',
  'Top': '#b45309',
};

const s = {
  section: { padding: '96px 24px', maxWidth: 1100, margin: '0 auto', borderTop: '1px solid #1a1a35' },
  eyebrow: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#4DAAFF', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16, color: '#E0E8FF' },
  sub: { color: '#445588', fontSize: 16, maxWidth: 500, marginBottom: 32, lineHeight: 1.7 },
  tabs: { display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 },
  card: { background: '#0D0D1A', border: '1px solid #1a1a35', borderRadius: 14, padding: '24px', display: 'flex', flexDirection: 'column', gap: 10 },
  name: { fontSize: 15, fontWeight: 700, color: '#D0D8FF' },
  desc: { fontSize: 11, color: '#445588', lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace" },
  preco: { fontSize: 22, fontWeight: 700, background: 'linear-gradient(135deg,#4DAAFF,#A87FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: 4 },
  btn: { background: 'linear-gradient(135deg,#6B21FF,#A87FFF)', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: 'center', cursor: 'pointer', border: 'none', marginTop: 4 },
};

export default function Produtos() {
  const [aba, setAba] = useState('Processadores');
  const icons = { 'Processadores': '🔵', 'Placas de Vídeo': '🎮', 'Memória RAM': '💾', 'Fontes': '🔌' };

  return (
    <section id="produtos" style={s.section}>
      <div style={s.eyebrow}>// loja</div>
      <h2 style={s.title}>Peças de Computador</h2>
      <p style={s.sub}>Hardware selecionado para quem não abre mão de performance.</p>

      <div style={s.tabs}>
        {Object.keys(categorias).map(cat => (
          <button key={cat} onClick={() => setAba(cat)} style={{
            padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
            background: aba === cat ? 'linear-gradient(135deg,#6B21FF,#A87FFF)' : '#0D0D1A',
            color: aba === cat ? '#fff' : '#445588',
            border: aba === cat ? 'none' : '1px solid #1a1a35',
          }}>
            {icons[cat]} {cat}
          </button>
        ))}
      </div>

      <div style={s.grid}>
        {categorias[aba].map(p => (
          <div key={p.name} style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24 }}>{icons[aba]}</div>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: (tagColors[p.tag] || '#445588') + '22', color: tagColors[p.tag] || '#445588', border: `1px solid ${tagColors[p.tag] || '#445588'}44` }}>{p.tag}</span>
            </div>
            <div style={s.name}>{p.name}</div>
            <div style={s.desc}>{p.desc}</div>
            <div style={s.preco}>{p.preco}</div>
            <button style={s.btn} onClick={() => window.location.href = 'mailto:vyktoril93@gmail.com?subject=Interesse: ' + p.name}>
              Solicitar orçamento
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
EOF npm start
cat > src/components/Produtos.jsx << 'EOF'
import React, { useState } from 'react';

const categorias = {
  'Processadores': [
    { name: 'AMD Ryzen 5 5500', desc: '6 núcleos | 12 threads | Turbo 4.2 GHz | AM4', preco: 'R$ 420', tag: 'Entrada' },
    { name: 'AMD Ryzen 5 5600', desc: '6 núcleos | 12 threads | Turbo 4.4 GHz | AM4', preco: 'R$ 580', tag: 'Mais Vendido' },
    { name: 'AMD Ryzen 7 5700X', desc: '8 núcleos | 16 threads | Turbo 4.6 GHz | AM4', preco: 'R$ 750', tag: 'Custo-Benefício' },
    { name: 'AMD Ryzen 5 7600', desc: '6 núcleos | 12 threads | Turbo 5.1 GHz | AM5', preco: 'R$ 1.189', tag: 'AM5' },
    { name: 'AMD Ryzen 7 7700', desc: '8 núcleos | 16 threads | Turbo 5.3 GHz | AM5', preco: 'R$ 1.899', tag: 'AM5' },
    { name: 'AMD Ryzen 7 9800X3D', desc: '8 núcleos | 16 threads | Turbo 5.2 GHz | V-Cache', preco: 'R$ 2.800', tag: 'Gamer' },
    { name: 'AMD Ryzen 9 9950X3D', desc: '16 núcleos | 32 threads | Turbo 5.7 GHz | V-Cache', preco: 'R$ 4.500', tag: 'Top' },
  ],
  'Placas de Vídeo': [
    { name: 'RX 6600 8GB', desc: '8GB GDDR6 | 1080p Ultra | AMD RDNA 2', preco: 'R$ 1.200', tag: 'Entrada' },
    { name: 'RTX 4060 8GB', desc: '8GB GDDR6 | 1080p/1440p | DLSS 3', preco: 'R$ 1.800', tag: 'Mais Vendida' },
    { name: 'RX 7700 XT 12GB', desc: '12GB GDDR6 | 1440p Ultra | AMD RDNA 3', preco: 'R$ 2.200', tag: 'Custo-Benefício' },
    { name: 'RTX 4070 12GB', desc: '12GB GDDR6X | 1440p/4K | DLSS 3', preco: 'R$ 3.200', tag: 'Gamer' },
    { name: 'RTX 4080 Super 16GB', desc: '16GB GDDR6X | 4K Ultra | DLSS 3.5', preco: 'R$ 6.500', tag: 'Top' },
  ],
  'Memória RAM': [
    { name: 'DDR4 8GB 3200MHz', desc: 'Kit 1x8GB | CL16 | Uso básico', preco: 'R$ 120', tag: 'Entrada' },
    { name: 'DDR4 16GB 3200MHz', desc: 'Kit 2x8GB | CL16 | Uso geral', preco: 'R$ 220', tag: 'Mais Vendida' },
    { name: 'DDR4 32GB 3600MHz', desc: 'Kit 2x16GB | CL18 | Gamer/Creator', preco: 'R$ 380', tag: 'Gamer' },
    { name: 'DDR5 16GB 5600MHz', desc: 'Kit 2x8GB | CL36 | Plataforma AM5', preco: 'R$ 350', tag: 'AM5' },
    { name: 'DDR5 32GB 6000MHz', desc: 'Kit 2x16GB | CL30 | Alto desempenho', preco: 'R$ 650', tag: 'Top' },
  ],
  'Fontes': [
    { name: 'Fonte 550W 80+ Bronze', desc: 'Cooler Master | Semi-modular | Silenciosa', preco: 'R$ 280', tag: 'Entrada' },
    { name: 'Fonte 650W 80+ Bronze', desc: 'Corsair CV650 | Ideal para RTX 4060', preco: 'R$ 350', tag: 'Mais Vendida' },
    { name: 'Fonte 750W 80+ Gold', desc: 'Corsair RM750 | Modular | Alta eficiência', preco: 'R$ 550', tag: 'Custo-Benefício' },
    { name: 'Fonte 850W 80+ Gold', desc: 'EVGA SuperNOVA | Full modular | RTX 4070+', preco: 'R$ 750', tag: 'Gamer' },
    { name: 'Fonte 1000W 80+ Platinum', desc: 'Seasonic Prime | Full modular | RTX 4080+', preco: 'R$ 1.100', tag: 'Top' },
  ],
};

const tagColors = {
  'Entrada': '#445588',
  'Mais Vendido': '#16a34a',
  'Mais Vendida': '#16a34a',
  'Custo-Benefício': '#0369a1',
  'AM5': '#7c3aed',
  'Gamer': '#dc2626',
  'Top': '#b45309',
};

const s = {
  section: { padding: '96px 24px', maxWidth: 1100, margin: '0 auto', borderTop: '1px solid #1a1a35' },
  eyebrow: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#4DAAFF', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 },
  title: { fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16, color: '#E0E8FF' },
  sub: { color: '#445588', fontSize: 16, maxWidth: 500, marginBottom: 32, lineHeight: 1.7 },
  tabs: { display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 },
  card: { background: '#0D0D1A', border: '1px solid #1a1a35', borderRadius: 14, padding: '24px', display: 'flex', flexDirection: 'column', gap: 10 },
  name: { fontSize: 15, fontWeight: 700, color: '#D0D8FF' },
  desc: { fontSize: 11, color: '#445588', lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace" },
  preco: { fontSize: 22, fontWeight: 700, background: 'linear-gradient(135deg,#4DAAFF,#A87FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: 4 },
  btn: { background: 'linear-gradient(135deg,#6B21FF,#A87FFF)', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: 'center', cursor: 'pointer', border: 'none', marginTop: 4 },
};

export default function Produtos() {
  const [aba, setAba] = useState('Processadores');
  const icons = { 'Processadores': '🔵', 'Placas de Vídeo': '🎮', 'Memória RAM': '💾', 'Fontes': '🔌' };

  return (
    <section id="produtos" style={s.section}>
      <div style={s.eyebrow}>// loja</div>
      <h2 style={s.title}>Peças de Computador</h2>
      <p style={s.sub}>Hardware selecionado para quem não abre mão de performance.</p>

      <div style={s.tabs}>
        {Object.keys(categorias).map(cat => (
          <button key={cat} onClick={() => setAba(cat)} style={{
            padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
            background: aba === cat ? 'linear-gradient(135deg,#6B21FF,#A87FFF)' : '#0D0D1A',
            color: aba === cat ? '#fff' : '#445588',
            border: aba === cat ? 'none' : '1px solid #1a1a35',
          }}>
            {icons[cat]} {cat}
          </button>
        ))}
      </div>

      <div style={s.grid}>
        {categorias[aba].map(p => (
          <div key={p.name} style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24 }}>{icons[aba]}</div>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: (tagColors[p.tag] || '#445588') + '22', color: tagColors[p.tag] || '#445588', border: `1px solid ${tagColors[p.tag] || '#445588'}44` }}>{p.tag}</span>
            </div>
            <div style={s.name}>{p.name}</div>
            <div style={s.desc}>{p.desc}</div>
            <div style={s.preco}>{p.preco}</div>
            <button style={s.btn} onClick={() => window.location.href = 'mailto:vyktoril93@gmail.com?subject=Interesse: ' + p.name}>
              Solicitar orçamento
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
