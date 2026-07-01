import React, { useState } from 'react';
const s = {
  section:{padding:'96px 24px',maxWidth:1100,margin:'0 auto',borderTop:'1px solid #1a1a35'},
  wrap:{background:'#0D0D1A',border:'1px solid #1a1a35',borderRadius:20,padding:'56px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:40,flexWrap:'wrap'},
  title:{fontSize:'clamp(24px,3vw,36px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:8,color:'#E0E8FF'},
  sub:{color:'#445588',fontSize:15,lineHeight:1.7},
  tags:{display:'flex',gap:10,flexWrap:'wrap',marginTop:16},
  tag:{background:'rgba(77,170,255,0.08)',border:'1px solid #1a1a35',borderRadius:8,padding:'6px 14px',fontSize:13,color:'#4DAAFF'},
  right:{display:'flex',flexDirection:'column',gap:14,minWidth:240},
  item:{display:'flex',alignItems:'center',gap:12,background:'rgba(255,255,255,0.02)',border:'1px solid #1a1a35',borderRadius:10,padding:'14px 18px'},
  itemIcon:{width:34,height:34,borderRadius:8,background:'linear-gradient(135deg,rgba(77,170,255,0.12),rgba(107,33,255,0.12))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16},
  itemText:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:'#7788CC'},
  btn:{background:'linear-gradient(135deg,#6B21FF,#A87FFF)',color:'#fff',padding:'14px 24px',borderRadius:10,fontSize:15,fontWeight:600,textAlign:'center',display:'block',textDecoration:'none'},
  btnInsta:{background:'linear-gradient(135deg,#E1306C,#F77737)',color:'#fff',padding:'14px 24px',borderRadius:10,fontSize:15,fontWeight:600,textAlign:'center',display:'block',textDecoration:'none'},
  btnPix:{background:'linear-gradient(135deg,#00B4A0,#00D4B4)',color:'#fff',padding:'14px 24px',borderRadius:10,fontSize:15,fontWeight:600,textAlign:'center',display:'block',cursor:'pointer',border:'none',width:'100%'},
  pix:{background:'#0D0D1A',border:'1px solid #1a1a35',borderRadius:20,padding:'40px',maxWidth:600,margin:'40px auto 0'},
  pixTitle:{fontSize:22,fontWeight:700,color:'#E0E8FF',marginBottom:24,textAlign:'center'},
  step:{display:'flex',gap:16,alignItems:'flex-start',marginBottom:20},
  stepNum:{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#6B21FF,#A87FFF)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'#fff',flexShrink:0},
  stepText:{color:'#C8D0F0',fontSize:15,lineHeight:1.6},
  pixKey:{background:'rgba(0,180,160,0.08)',border:'1px solid rgba(0,180,160,0.3)',borderRadius:10,padding:'16px 20px',fontFamily:"'JetBrains Mono',monospace",fontSize:14,color:'#00D4B4',textAlign:'center',margin:'8px 0'},
  footer:{borderTop:'1px solid #1a1a35',padding:'32px 24px',textAlign:'center'},
  footerBrand:{fontSize:18,fontWeight:700,background:'linear-gradient(135deg,#4DAAFF,#A87FFF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8},
  footerCopy:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:'#445588'},
};
export default function Contato() {
  const [showPix, setShowPix] = useState(false);
  return (
    <>
      <section id="contato" style={s.section}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:'#4DAAFF',letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:12}}>// fale conosco</div>
        <div style={s.wrap}>
          <div>
            <h2 style={s.title}>Pronto para começar?</h2>
            <p style={s.sub}>Entre em contato e vamos conversar sobre como a Vyktoril pode ajudar sua empresa.</p>
            <div style={s.tags}>
              <span style={s.tag}>📍 Rio de Janeiro / Niterói</span>
              <span style={s.tag}>🌐 100% Online</span>
              <span style={s.tag}>🚚 Entrega para todo Brasil</span>
            </div>
          </div>
          <div style={s.right}>
            <div style={s.item}><div style={s.itemIcon}>✉️</div><div style={s.itemText}>vyktoril93@gmail.com</div></div>
            <a href="mailto:vyktoril93@gmail.com" style={s.btn}>Enviar e-mail</a>
            <a href="https://instagram.com/vyktorial" target="_blank" rel="noreferrer" style={s.btnInsta}>📸 Instagram @vyktorial</a>
            <button style={s.btnPix} onClick={()=>setShowPix(!showPix)}>💰 Como comprar via PIX</button>
          </div>
        </div>
        {showPix && (
          <div style={s.pix}>
            <div style={s.pixTitle}>💰 Como comprar</div>
            <div style={s.step}>
              <div style={s.stepNum}>1</div>
              <div style={s.stepText}>Escolha o produto que deseja e anote o valor.</div>
            </div>
            <div style={s.step}>
              <div style={s.stepNum}>2</div>
              <div style={s.stepText}>Faça um PIX com o valor exato para a chave abaixo:</div>
            </div>
            <div style={s.pixKey}>vyktoril93@gmail.com</div>
            <div style={s.step}>
              <div style={s.stepNum}>3</div>
              <div style={s.stepText}>Envie o comprovante para o nosso email com seu nome e endereço completo.</div>
            </div>
            <div style={s.step}>
              <div style={s.stepNum}>4</div>
              <div style={s.stepText}>Confirmaremos o pagamento e enviaremos seu pedido em até 2 dias úteis!</div>
            </div>
            <a href="mailto:vyktoril93@gmail.com?subject=Comprovante de Pagamento Vyktoril" style={{...s.btn,marginTop:8,textAlign:'center'}}>📧 Enviar comprovante</a>
          </div>
        )}
      </section>
      <footer style={s.footer}>
        <div style={s.footerBrand}>vyktoril</div>
        <div style={s.footerCopy}>© 2026 Vyktoril · code · products · solutions</div>
      </footer>
    </>
  );
}
