import React from 'react';
import Logo from './Logo';
const s = {
  nav: { position:'fixed',top:0,left:0,right:0,zIndex:100,background:'rgba(6,6,15,0.85)',backdropFilter:'blur(12px)',borderBottom:'1px solid #1a1a35',padding:'0 32px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between' },
  brand: { display:'flex',alignItems:'center',gap:12 },
  brandName: { fontSize:20,fontWeight:700,background:'linear-gradient(135deg,#4DAAFF,#A87FFF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' },
  links: { display:'flex',gap:32,listStyle:'none' },
  link: { color:'#445588',fontSize:14,fontWeight:500,cursor:'pointer' },
  cta: { background:'linear-gradient(135deg,#6B21FF,#A87FFF)',color:'#fff',padding:'8px 20px',borderRadius:8,fontSize:14,fontWeight:600,cursor:'pointer' },
};
export default function Navbar() {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  return (
    <nav style={s.nav}>
      <div style={s.brand}><Logo size={32}/><span style={s.brandName}>vyktoril</span></div>
      <ul style={s.links}>
        <li style={s.link} onClick={()=>scroll('servicos')}>Serviços</li>
        <li style={s.link} onClick={()=>scroll('produtos')}>Produtos</li>
        <li style={s.cta} onClick={()=>scroll('contato')}>Contato</li>
      </ul>
    </nav>
  );
}
