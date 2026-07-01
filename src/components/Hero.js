import React from 'react';
import Logo from './Logo';
const s = {
  hero: { minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'120px 24px 80px',position:'relative' },
  bg: { position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 40%,rgba(77,170,255,0.07) 0%,transparent 55%),radial-gradient(ellipse at 70% 60%,rgba(107,33,255,0.1) 0%,transparent 55%)',pointerEvents:'none' },
  eyebrow: { fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:'#4DAAFF',letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:20 },
  title: { fontSize:'clamp(40px,8vw,80px)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.05,marginBottom:24 },
  grad: { background:'linear-gradient(135deg,#4DAAFF 0%,#A87FFF 50%,#6B21FF 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' },
  sub: { fontSize:18,color:'#445588',maxWidth:520,margin:'0 auto 40px',lineHeight:1.7 },
  btns: { display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center' },
  btn1: { background:'linear-gradient(135deg,#6B21FF,#A87FFF)',color:'#fff',padding:'14px 32px',borderRadius:10,fontSize:15,fontWeight:600,cursor:'pointer',border:'none' },
  btn2: { background:'transparent',color:'#C8D0F0',padding:'14px 32px',borderRadius:10,fontSize:15,border:'1px solid #1a1a35',cursor:'pointer' },
};
export default function Hero() {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  return (
    <div style={s.hero}>
      <div style={s.bg}/>
      <div style={{marginBottom:32,position:'relative',zIndex:1}}><Logo size={72}/></div>
      <div style={{...s.eyebrow,position:'relative',zIndex:1}}>// sua parceira tecnológica</div>
      <h1 style={{...s.title,position:'relative',zIndex:1}}>Do hardware<br/><span style={s.grad}>ao código.</span></h1>
      <p style={{...s.sub,position:'relative',zIndex:1}}>Peças de computador de alta performance e desenvolvimento de software sob medida. Soluções completas para empresas em toda a América.</p>
      <div style={{...s.btns,position:'relative',zIndex:1}}>
        <button style={s.btn1} onClick={()=>scroll('servicos')}>Ver serviços</button>
        <button style={s.btn2} onClick={()=>scroll('contato')}>Entrar em contato</button>
      </div>
    </div>
  );
}
