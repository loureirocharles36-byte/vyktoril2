import React from 'react';
const items = [
  {icon:'💻',title:'Desenvolvimento de Software',desc:'Sistemas e aplicações web e mobile desenvolvidos sob medida para o seu negócio.'},
  {icon:'🌐',title:'Sites & Landing Pages',desc:'Sites profissionais para sua empresa se destacar online e atrair clientes.'},
  {icon:'⚙️',title:'Automações & Integrações',desc:'Automatize processos e integre sistemas para escalar seu negócio.'},
  {icon:'🔧',title:'Consultoria Técnica',desc:'Orientação especializada para escolher as melhores soluções de hardware e software.'},
];
const s = {
  section:{padding:'96px 24px',maxWidth:1100,margin:'0 auto',borderTop:'1px solid #1a1a35'},
  eyebrow:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:'#4DAAFF',letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:12},
  title:{fontSize:'clamp(28px,4vw,42px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16,color:'#E0E8FF'},
  sub:{color:'#445588',fontSize:16,maxWidth:500,marginBottom:56,lineHeight:1.7},
  grid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20},
  card:{background:'#0D0D1A',border:'1px solid #1a1a35',borderRadius:16,padding:32},
  icon:{width:44,height:44,borderRadius:10,background:'linear-gradient(135deg,rgba(77,170,255,0.12),rgba(107,33,255,0.12))',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20,fontSize:20},
  cardTitle:{fontSize:17,fontWeight:600,color:'#D0D8FF',marginBottom:10},
  cardDesc:{fontSize:14,color:'#445588',lineHeight:1.7},
};
export default function Servicos() {
  return (
    <section id="servicos" style={s.section}>
      <div style={s.eyebrow}>// o que fazemos</div>
      <h2 style={s.title}>Serviços</h2>
      <p style={s.sub}>Soluções digitais e hardware para empresas que levam tecnologia a sério.</p>
      <div style={s.grid}>{items.map(i=>(
        <div key={i.title} style={s.card}>
          <div style={s.icon}>{i.icon}</div>
          <div style={s.cardTitle}>{i.title}</div>
          <div style={s.cardDesc}>{i.desc}</div>
        </div>
      ))}</div>
    </section>
  );
}
