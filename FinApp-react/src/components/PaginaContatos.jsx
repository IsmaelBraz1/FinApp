import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/PaginaInicio.css';
import '../styles/PaginaContatos.css'; 
import { useNavigate } from 'react-router-dom';

function PaginaContatos() {

  const navigate = useNavigate();
  // Função que direciona para a página de cadastro ao clicar no botão CADASTRE-SE
  function ir_Para_Cadastro() {
    console.log("Fui ativado");
    navigate('/cadastro');
  }

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

  
  const desenvolvedores = [
    {
      id: 1,
      nome: 'Átila Oliveira',
      email: 'atilaoliveira464@gmail.com',
      github: 'https://github.com/atila8119'
    },
    {
      id: 2,
      nome: 'Antonio Lucas',
      email: 'antoniolucasfreire17@gmail.com',
      github: 'https://github.com/AntLucass'
    },
    {
      id: 3,
      nome: 'Assis Paiva',
      email: 'assispaivaneto@gmail.com',
      github: 'https://github.com/assispneto'
    },
    {
      id: 4,
      nome: 'Ismael Braz',
      email: 'brazismael1@gmail.com',
      github: 'https://github.com/ismaelbraz1'
    },
    {
      id: 5,
      nome: 'Micaias',
      email: 'Micaias@finapp.dev',
      github: 'https://github.com/Micaias-dev'
    }
  ];
  
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
            <h1 className="titulo">Contato dos Desenvolvedores do FinApp</h1>

            {/* AQUI ADICIONAMOS A LISTA DE CONTATOS */}
            <div className="contatos-container">
              {desenvolvedores.map((dev) => (
                <div key={dev.id} className="contato-card">
                  <h3>{dev.nome}</h3>
                  <p><strong>Email:</strong> {dev.email}</p>
                  {/* target="_blank" abre o link em uma nova aba */}
                  <a href={dev.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>

      <footer className="rodape">
        <p className="rodape-texto">Copyright &copy; 2025 FinApp - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default PaginaContatos;