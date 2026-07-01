import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

const CATEGORIAS = ['Processadores', 'Placas de Vídeo', 'Memória RAM', 'Fontes', 'Outros'];
const TAGS = ['Entrada', 'Mais Vendido', 'Custo-Benefício', 'AM5', 'Gamer', 'Top'];
const SENHA = 'vyktoril2026'; // troque por uma senha sua

const vazio = { name: '', desc: '', preco: '', categoria: 'Processadores', tag: 'Entrada', imagemUrl: '' };

const injectStyles = () => {
  if (document.getElementById('vyk-admin-styles')) return;
  const el = document.createElement('style');
  el.id = 'vyk-admin-styles';
  el.textContent = `
    .adm-wrap { min-height: 100vh; background: #09090F; padding: 40px 24px; font-family: 'Inter', system-ui, sans-serif; }
    .adm-header { max-width: 1000px; margin: 0 auto 32px; display: flex; justify-content: space-between; align-items: center; }
    .adm-brand { font-size: 20px; font-weight: 700; background: linear-gradient(135deg,#4DAAFF,#A87FFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .adm-badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #22c55e; background: rgba(34,197,94,.1); border: 1px solid rgba(34,197,94,.25); padding: 4px 10px; border-radius: 20px; }
    .adm-body { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    @media (max-width: 768px) { .adm-body { grid-template-columns: 1fr; } }
    .adm-card { background: #0E0E1C; border: 1px solid #1C1C36; border-radius: 16px; padding: 28px; }
    .adm-card-title { font-size: 15px; font-weight: 700; color: #E4ECFF; margin: 0 0 20px; }
    .adm-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .adm-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #5A6A99; letter-spacing: .1em; text-transform: uppercase; }
    .adm-input, .adm-select, .adm-textarea {
      background: rgba(255,255,255,.03); border: 1px solid #1C1C36; border-radius: 8px;
      padding: 10px 14px; font-family: 'Inter', system-ui, sans-serif; font-size: 13px;
      color: #E4ECFF; outline: none; transition: border-color .2s; width: 100%;
    }
    .adm-input:focus, .adm-select:focus, .adm-textarea:focus { border-color: #4DAAFF; }
    .adm-input::placeholder, .adm-textarea::placeholder { color: #333355; }
    .adm-select option { background: #0E0E1C; }
    .adm-textarea { resize: vertical; min-height: 70px; }
    .adm-img-preview { width: 100%; height: 140px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; display: block; }
    .adm-img-placeholder { width: 100%; height: 140px; background: #0a0a15; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 36px; margin-bottom: 10px; border: 1px dashed #1C1C36; }
    .adm-upload { background: rgba(77,170,255,.07); border: 1px solid rgba(77,170,255,.2); border-radius: 8px; padding: 10px 14px; color: #4DAAFF; font-size: 13px; cursor: pointer; text-align: center; transition: background .2s; }
    .adm-upload:hover { background: rgba(77,170,255,.12); }
    .adm-upload input { display: none; }
    .adm-btn { width: 100%; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; font-family: 'Inter', system-ui, sans-serif; transition: opacity .2s, transform .15s; margin-top: 6px; }
    .adm-btn:hover { opacity: .88; transform: translateY(-1px); }
    .adm-btn-purple { background: linear-gradient(135deg,#6B21FF,#A87FFF); color: #fff; }
    .adm-btn-outline { background: transparent; border: 1px solid #1C1C36; color: #5A6A99; }
    .adm-btn-outline:hover { border-color: #2E2E55; color: #E4ECFF; }
    .adm-list { display: flex; flex-direction: column; gap: 10px; }
    .adm-item { background: rgba(255,255,255,.02); border: 1px solid #1C1C36; border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; transition: border-color .2s; }
    .adm-item:hover { border-color: #2E2E55; }
    .adm-item-img { width: 44px; height: 44px; border-radius: 6px; object-fit: cover; background: #0a0a15; flex-shrink: 0; }
    .adm-item-info { flex: 1; min-width: 0; }
    .adm-item-name { font-size: 13px; font-weight: 600; color: #D0D8FF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .adm-item-meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #445588; margin-top: 2px; }
    .adm-item-actions { display: flex; gap: 6px; flex-shrink: 0; }
    .adm-icon-btn { width: 30px; height: 30px; border-radius: 6px; border: 1px solid #1C1C36; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px; transition: all .2s; }
    .adm-icon-btn:hover { border-color: #2E2E55; background: rgba(255,255,255,.05); }
    .adm-icon-btn.del:hover { border-color: rgba(248,113,113,.4); background: rgba(248,113,113,.08); }
    .adm-status { text-align: center; padding: 10px; border-radius: 8px; font-size: 13px; font-weight: 500; margin-top: 10px; }
    .adm-status-ok  { background: rgba(34,197,94,.1); color: #22c55e; border: 1px solid rgba(34,197,94,.25); }
    .adm-status-err { background: rgba(248,113,113,.08); color: #f87171; border: 1px solid rgba(248,113,113,.2); }
    .adm-login { min-height: 100vh; background: #09090F; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .adm-login-card { background: #0E0E1C; border: 1px solid #1C1C36; border-radius: 16px; padding: 40px 36px; width: 100%; max-width: 360px; }
    .adm-login-title { font-size: 20px; font-weight: 700; color: #E4ECFF; margin: 0 0 6px; }
    .adm-login-sub { font-size: 13px; color: #5A6A99; margin: 0 0 28px; }
    .adm-empty { text-align: center; padding: 40px 20px; color: #445588; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
  `;
  document.head.appendChild(el);
};

export default function Admin() {
  injectStyles();

  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaErro, setSenhaErro] = useState(false);

  const [form, setForm] = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [status, setStatus] = useState(null);

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'produtos'), orderBy('criadoEm', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setProdutos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const login = () => {
    if (senha === SENHA) { setAutenticado(true); setSenhaErro(false); }
    else setSenhaErro(true);
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(vazio); setEditId(null);
    setImgFile(null); setImgPreview('');
    setStatus(null);
  };

  const salvar = async () => {
    if (!form.name || !form.preco) { setStatus('err'); return; }
    setSalvando(true);
    try {
      let imagemUrl = form.imagemUrl;
      if (imgFile) {
        const storageRef = ref(storage, `produtos/${Date.now()}_${imgFile.name}`);
        await uploadBytes(storageRef, imgFile);
        imagemUrl = await getDownloadURL(storageRef);
      }
      const dados = { ...form, imagemUrl, criadoEm: serverTimestamp() };
      if (editId) {
        await updateDoc(doc(db, 'produtos', editId), dados);
      } else {
        await addDoc(collection(db, 'produtos'), dados);
      }
      setStatus('ok');
      resetForm();
    } catch (e) {
      console.error(e);
      setStatus('err');
    }
    setSalvando(false);
  };

  const editar = (p) => {
    setForm({ name: p.name, desc: p.desc, preco: p.preco, categoria: p.categoria, tag: p.tag, imagemUrl: p.imagemUrl || '' });
    setEditId(p.id);
    setImgPreview(p.imagemUrl || '');
    setImgFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const excluir = async (p) => {
    if (!window.confirm(`Excluir "${p.name}"?`)) return;
    await deleteDoc(doc(db, 'produtos', p.id));
    if (p.imagemUrl) {
      try { await deleteObject(ref(storage, p.imagemUrl)); } catch (_) {}
    }
  };

  if (!autenticado) {
    return (
      <div className="adm-login">
        <div className="adm-login-card">
          <div className="adm-login-title">vyktoril admin</div>
          <div className="adm-login-sub">Acesso restrito</div>
          <div className="adm-field">
            <label className="adm-label">Senha</label>
            <input
              className="adm-input" type="password" placeholder="••••••••"
              value={senha} onChange={e => setSenha(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
            />
            {senhaErro && <span style={{ color: '#f87171', fontSize: 12 }}>Senha incorreta</span>}
          </div>
          <button className="adm-btn adm-btn-purple" onClick={login}>Entrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-wrap">
      <div className="adm-header">
        <div className="adm-brand">vyktoril admin</div>
        <span className="adm-badge">● online</span>
      </div>

      <div className="adm-body">
        {/* Formulário */}
        <div className="adm-card">
          <div className="adm-card-title">{editId ? '✏️ Editar produto' : '➕ Novo produto'}</div>

          <div className="adm-field">
            <label className="adm-label">Nome *</label>
            <input className="adm-input" placeholder="Ex: AMD Ryzen 5 5600" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>

          <div className="adm-field">
            <label className="adm-label">Descrição</label>
            <textarea className="adm-textarea" placeholder="6 núcleos | 12 threads | Turbo 4.4 GHz" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="adm-field">
              <label className="adm-label">Preço *</label>
              <input className="adm-input" placeholder="R$ 580" value={form.preco} onChange={e => setForm(f => ({ ...f, preco: e.target.value }))} />
            </div>
            <div className="adm-field">
              <label className="adm-label">Tag</label>
              <select className="adm-select" value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}>
                {TAGS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="adm-field">
            <label className="adm-label">Categoria</label>
            <select className="adm-select" value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}>
              {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="adm-field">
            <label className="adm-label">Imagem</label>
            {(imgPreview || form.imagemUrl)
              ? <img src={imgPreview || form.imagemUrl} alt="preview" className="adm-img-preview" />
              : <div className="adm-img-placeholder">📷</div>
            }
            <label className="adm-upload">
              📁 {imgFile ? imgFile.name : 'Escolher foto'}
              <input type="file" accept="image/*" onChange={handleImg} />
            </label>
          </div>

          {status === 'ok'  && <div className="adm-status adm-status-ok">✅ Salvo com sucesso!</div>}
          {status === 'err' && <div className="adm-status adm-status-err">⚠️ Preencha nome e preço.</div>}

          <button className="adm-btn adm-btn-purple" onClick={salvar} disabled={salvando}>
            {salvando ? 'Salvando...' : editId ? 'Salvar alterações →' : 'Adicionar produto →'}
          </button>
          {editId && <button className="adm-btn adm-btn-outline" onClick={resetForm} style={{ marginTop: 8 }}>Cancelar edição</button>}
        </div>

        {/* Lista */}
        <div className="adm-card">
          <div className="adm-card-title">📦 Produtos ({produtos.length})</div>
          {produtos.length === 0 ? (
            <div className="adm-empty">// nenhum produto cadastrado ainda</div>
          ) : (
            <div className="adm-list">
              {produtos.map(p => (
                <div key={p.id} className="adm-item">
                  {p.imagemUrl
                    ? <img src={p.imagemUrl} alt={p.name} className="adm-item-img" />
                    : <div className="adm-item-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📦</div>
                  }
                  <div className="adm-item-info">
                    <div className="adm-item-name">{p.name}</div>
                    <div className="adm-item-meta">{p.categoria} · {p.preco}</div>
                  </div>
                  <div className="adm-item-actions">
                    <button className="adm-icon-btn" onClick={() => editar(p)} title="Editar">✏️</button>
                    <button className="adm-icon-btn del" onClick={() => excluir(p)} title="Excluir">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
