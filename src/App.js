import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicos from './components/Servicos';
import Produtos from './components/Produtos';
import Contato from './components/Contato';
import Admin from './components/Admin';
import Auth from './components/Auth';
import MinhaConta from './components/MinhaConta';

const auth = getAuth();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null;

  const path = window.location.pathname;

  if (path === '/admin') return <Admin />;
  if (path === '/login') return <Auth onLogin={(u) => { setUser(u); window.location.href = '/minha-conta'; }} />;
  if (path === '/minha-conta') {
    if (!user) { window.location.href = '/login'; return null; }
    return <MinhaConta user={user} onSair={() => { setUser(null); window.location.href = '/'; }} />;
  }

  return (
    <>
      <Navbar user={user} />
      <Hero />
      <Servicos />
      <Produtos user={user} />
      <Contato />
    </>
  );
}
