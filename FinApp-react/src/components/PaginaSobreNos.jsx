import React from "react";
import { Link } from "react-router-dom";
import "../styles/PaginaSobre_Nos.css";
import { useNavigate } from "react-router-dom";

function PaginaSobreNos() {
  const navigate = useNavigate();
  // Função que direciona para a página de cadastro ao clicar no botão CADASTRE-SE
  function ir_Para_Cadastro() {
    console.log("Fui ativado");
    navigate("/cadastro");
  }

  //Função para botão Hamburguer- função que clica em um botão para aparecer o menu
  function toggleMenu() {
    let opcoes = document.getElementsByClassName("cabecalho-menu")[0];
    let cabecalho = document.getElementsByClassName("cabecalho")[0];

    if (
      opcoes.style.visibility === "hidden" ||
      opcoes.style.visibility === ""
    ) {
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
    <div className="body">
      <header className="cabecalho">
        <div className="image-cab">
          <img
            className="cabecalho-imagem"
            src="/img/logo_name_finapp_azu.svg"
            alt="logo do FinApp"
          />
          <button className="menu-hamburguer" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <nav className="cabecalho-menu">
          <a className="cabecalho-menu-opcoes" href="/">
            Home
          </a>
          <a className="cabecalho-menu-opcoes" href="/servicos">
            Serviços
          </a>
          <a className="cabecalho-menu-opcoes" href="/sobre_nos">
            Sobre Nós
          </a>
          <a className="cabecalho-menu-opcoes" href="/contatos">
            Contatos
          </a>

          <button className="cabecalho-menu-butao" onClick={ir_Para_Cadastro}>
            Cadastre-se
          </button>
        </nav>
      </header>

      <div className="conteudo">
        <section className="conteudo-principal">
          <div className="conteudo-principal-escr">
            <h1 className="titulo">Sobre Nós</h1>
            <p className="conteúdo-texto">
              O FinApp nasceu com um propósito claro: ajudar pessoas a retomarem
              o controle das suas finanças de forma simples, intuitiva e eficaz.
              Desenvolvido por uma equipe de estudantes da Universidade Federal
              do Ceará (UFC) comprometida com inovação e impacto social. O
              FinApp é o projeto final da disciplina de Tecnologias Web 1 e é
              mais do que uma ferramenta — é um aliado na sua jornada rumo à
              estabilidade e realização financeira.
            </p>

            <p className="conteúdo-texto">
              Nosso sistema permite que você registre e acompanhe suas receitas
              e despesas, classificando cada movimentação por tipo para
              facilitar a organização. Além disso, oferecemos uma seção de metas
              financeiras, para que você possa planejar o futuro com objetivos
              claros, sejam eles uma viagem, uma reserva de emergência ou a
              compra de um bem importante.
            </p>

            <p className="conteúdo-texto">
              Com nossos gráficos interativos, você visualiza sua situação
              financeira de forma clara e prática, tornando mais fácil entender
              para onde seu dinheiro está indo e como melhorar sua gestão
              pessoal.
            </p>

            <p className="conteúdo-texto">
              Sabemos que falar de dinheiro pode ser complicado — por isso,
              nossa missão é tornar esse processo mais acessível, descomplicado
              e, principalmente, útil para sua vida.
            </p>

            <p id="frase-destaque">FinApp: controle hoje, conquiste amanhã.</p>
          </div>
        </section>
      </div>

      <footer className="rodape">
        <p className="rodape-texto">
          Copyright &copy;2025 FinApp - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}

export default PaginaSobreNos;
