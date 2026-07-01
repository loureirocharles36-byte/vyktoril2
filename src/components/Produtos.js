import React, { useState } from 'react';
const produtos = [
  {id:1,nome:'Fone Gamer RGB',img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',custo:8,preco:45,desc:'Fone com microfone, LED RGB e som surround.'},
  {id:2,nome:'SSD 128GB',img:'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',custo:35,preco:89,desc:'Armazenamento rápido para PC ou notebook.'},
  {id:3,nome:'Memória RAM 8GB',img:'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400',custo:40,preco:99,desc:'DDR4 2666MHz para máxima performance.'},
  {id:4,nome:'Cabo USB-C 2m',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',custo:2,preco:15,desc:'Carregamento rápido e transferência de dados.'},
  {id:5,nome:'Suporte Celular',img:'https://images.unsplash.com/photo-1609252924198-fd3aa96bd406?w=400',custo:3,preco:20,desc:'Suporte ajustável para mesa ou monitor.'},
  {id:6,nome:'Mouse Gamer',img:'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',custo:12,preco:55,desc:'Mouse com DPI ajustável e LED RGB.'},
];
const s = {
  section:{padding:'96px 24px',maxWidth:1100,margin:'0 auto',borderTop:'1px solid #1a1a35'},
  eyebrow:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:'#4DAAFF',letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:12},
  title:{fontSize:'clamp(28px,4vw,42px)',fontWeight:700,letterSpacing:'-0.02em',marginBottom:16,color:'#E0E8FF'},
  sub:{color:'#445588',fontSize:16,maxWidth:500,marginBottom:56,lineHeight:1.7},
  grid:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16},
  card:{background:'#0D0D1A',border:'1px solid #1a1a35',borderRadius:14,overflow:'hidden',display:'flex',flexDirection:'column'},
  imgWrap:{width:'100%',height:180,background:'#111',overflow:'hidden'},
  img:{width:'100%',height:'100%',objectFit:'cover'},
  body:{padding:'20px 24px',display:'flex',flexDirection:'column',gap:8,flex:1},
  nome:{fontSize:15,fontWeight:600,color:'#D0D8FF'},
  desc:{fontSize:13,color:'#445588',lineHeight:1.6,flex:1},
  preco:{fontSize:20,fontWeight:700,color:'#4DAAFF',marginTop:8},
  lucro:{fontSize:12,color:'#00D4B4'},
  btn:{background:'linear-gradient(135deg,#6B21FF,#A87FFF)',color:'#fff',padding:'10px',borderRadius:8,fontSize:13,fontWeight:600,textAlign:'center',textDecoration:'none',display:'block',marginTop:8},
  calc:{background:'#0D0D1A',border:'1px solid #1a1a35',borderRadius:16,padding:32,marginTop:48},
  calcTitle:{fontSize:20,fontWeight:700,color:'#E0E8FF',marginBottom:24},
  row:{display:'flex',gap:16,flexWrap:'wrap',marginBottom:16},
  label:{fontSize:13,color:'#445588',marginBottom:6},
  input:{background:'#06060F',border:'1px solid #1a1a35',borderRadius:8,padding:'10px 14px',color:'#E0E8FF',fontSize:14,width:'100%'},
  resultado:{background:'rgba(0,212,180,0.08)',border:'1px solid rgba(0,212,180,0.3)',borderRadius:10,padding:20,marginTop:16},
  resultNum:{fontSize:28,fontWeight:700,color:'#00D4B4'},
  resultLabel:{fontSize:13,color:'#445588'},
};
export default function Produtos() {
  const [custo,setCusto] = useState('');
  const [venda,setVenda] = useState('');
  const [qtd,setQtd] = useState('1');
  const lucroUnit = venda && custo ? (parseFloat(venda)-parseFloat(custo)).toFixed(2) : 0;
  const lucroTotal = lucroUnit * parseInt(qtd||1);
  const margem = venda && custo ? ((lucroUnit/parseFloat(venda))*100).toFixed(1) : 0;
  return (
    <section id="produtos" style={s.section}>
      <div style={s.eyebrow}>// loja</div>
      <h2 style={s.title}>Produtos</h2>
      <p style={s.sub}>Hardware e acessórios selecionados com os melhores preços.</p>
      <div style={s.grid}>{produtos.map(p=>(
        <div key={p.id} style={s.card}>
          <div style={s.imgWrap}><img src={p.img} alt={p.nome} style={s.img}/></div>
          <div style={s.body}>
            <div style={s.nome}>{p.nome}</div>
            <div style={s.desc}>{p.desc}</div>
            <div style={s.preco}>R$ {p.preco},00</div>
            <div style={s.lucro}>💰 Lucro: R$ {p.preco - p.custo},00</div>
            <a href={'mailto:vyktoril93@gmail.com?subject=Quero comprar: '+p.nome} style={s.btn}>Comprar agora</a>
          </div>
        </div>
      ))}</div>
      <div style={s.calc}>
        <div style={s.calcTitle}>🧮 Calculadora de Lucro</div>
        <div style={s.row}>
          <div style={{flex:1}}><div style={s.label}>Preço de custo (R$)</div><input style={s.input} type="number" placeholder="Ex: 8.00" value={custo} onChange={e=>setCusto(e.target.value)}/></div>
          <div style={{flex:1}}><div style={s.label}>Preço de venda (R$)</div><input style={s.input} type="number" placeholder="Ex: 45.00" value={venda} onChange={e=>setVenda(e.target.value)}/></div>
          <div style={{flex:1}}><div style={s.label}>Quantidade vendida</div><input style={s.input} type="number" placeholder="Ex: 10" value={qtd} onChange={e=>setQtd(e.target.value)}/></div>
        </div>
        {venda && custo && (
          <div style={s.resultado}>
            <div style={s.resultLabel}>Lucro por unidade</div>
            <div style={s.resultNum}>R$ {lucroUnit}</div>
            <div style={{marginTop:12,display:'flex',gap:32,flexWrap:'wrap'}}>
              <div><div style={s.resultLabel}>Lucro total ({qtd} unid.)</div><div style={{...s.resultNum,fontSize:20}}>R$ {lucroTotal.toFixed(2)}</div></div>
              <div><div style={s.resultLabel}>Margem de lucro</div><div style={{...s.resultNum,fontSize:20,color:'#A87FFF'}}>{margem}%</div></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
