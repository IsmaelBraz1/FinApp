import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/PaginaInicio.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function PaginaInicio() {
  
  const navigate = useNavigate();



  // Função que direciona para a página de cadastro ao clicar no botão CADASTRE-SE
  function ir_Para_Cadastro() {
    console.log("Fui ativado");
    navigate('/cadastro');
  }

  // Função que direciona para a página de Login ao clicar no botão COMECE AGORA
  function ir_Para_Login(){
    console.log("Fui clicado");
    navigate('/login');
  }

 
//Função para botão Hamburguer- função que clica em um botão para aparecer o menu
  function toggleMenu() {
    let opcoes = document.getElementsByClassName('cabecalho-menu')[0];
    let cabecalho = document.getElementsByClassName('cabecalho')[0];
    
  if (opcoes.style.visibility === "hidden" || opcoes.style.visibility === "") {
    opcoes.style.visibility = "visible";
    opcoes.style.opacity = 1;
    cabecalho.style.height = "auto";
  } else {
    opcoes.style.visibility = "hidden";
    opcoes.style.opacity = 0;
    cabecalho.style.height = "8%";
  }
    

  }
  
  return (
   <div className='body'>
            <header className="cabecalho"> 
              <div className='image-cab'>
                <img className="cabecalho-imagem" src="/img/logo_name_finapp_azu.svg" alt="logo do FinApp"/>
                <button className="menu-hamburguer" onClick={toggleMenu}>☰</button>
              </div>  
                <nav className="cabecalho-menu">
                    <a className="cabecalho-menu-opcoes" href="/">Home</a>
                    <a className="cabecalho-menu-opcoes" href="/servicos">Serviços</a>
                    <a className="cabecalho-menu-opcoes" href="/sobre_nos">Sobre Nós</a>
                    <a className="cabecalho-menu-opcoes" href="/contatos">Contatos</a>

                    <button className="cabecalho-menu-butao" onClick={ir_Para_Cadastro}>Cadastre-se</button>
                </nav>
            </header>


            <div className="conteudo">
                <section className="conteudo-principal">
                    <div className="conteudo-principal-escr">
                        <h1 className="titulo">Controle suas finanças com o FinApp!!</h1>
                        <h2 className="subtitulo">Tenha o controle das suas finanças pessoais com o nosso 
                            <strong className='destaque-name'> Web Aplicativo</strong> de gerenciamento de <strong className='destaque-name'>Finanças</strong>.</h2>
                        <button className="botao-login" onClick={ir_Para_Login}>Comece Agora</button>
                    </div>
                    <img className="conteudo-principal-img" src="/img/painel na tela do note.png" alt='tela do note'/>
                    
                </section>

                <section className="conteudo-sec">
                    <h3 className="conteudo-sec-text"> Venha  fazer parte do nosso Web Aplicativo e tenha a facilidade de entender e controlar seu dinheiro!</h3>
                </section>

            </div>


            <footer className="rodape">

                <p className="rodape-texto">Copyright &copy;2025 FinApp - Todos os direitos reservados</p>

            </footer>
    </div>
    
  );
}

export default PaginaInicio;