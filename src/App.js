import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicos from './components/Servicos';
import Produtos from './components/Produtos';
import Contato from './components/Contato';
import Admin from './components/Admin';

export default function App() {
  if (window.location.pathname === '/admin') return <Admin />;
  return (<><Navbar /><Hero /><Servicos /><Produtos /><Contato /></>);
}
