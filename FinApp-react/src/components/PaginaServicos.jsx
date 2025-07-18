import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/PaginaInicio.css';
import { useNavigate } from 'react-router-dom';

function PaginaServicos() {

  const navigate = useNavigate();
  // Função que direciona para a página de cadastro ao clicar no botão CADASTRE-SE
  function ir_Para_Cadastro() {
    console.log("Fui ativado");
    navigate('/cadastro');
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
                        <h1 className="titulo">Nossos Serviços</h1>
                        <p>No FinApp, oferecemos tudo o que você precisa para ter o controle total da sua vida financeira, de forma simples, prática e organizada. Nossa plataforma foi pensada para ajudar você a entender melhor seus hábitos de consumo, planejar o futuro e alcançar suas metas com mais facilidade.

                        <h2> ✔️ Controle de Saldo, Receitas e Despesas</h2>
                            <p>Visualize de forma clara quanto você tem disponível, quanto já entrou e para onde está indo o seu dinheiro. Acompanhe em tempo real seu saldo, suas receitas e despesas, tudo organizado em um único lugar.</p>

                        <h2> 📊 Gráficos Interativos</h2>
                            <p>Entenda seus gastos com facilidade através de gráficos dinâmicos que mostram como você está utilizando seu dinheiro. Veja em quais categorias você mais gasta, identifique padrões e tome decisões mais conscientes.</p>

                        <h2> 🎯 Definição de Metas</h2>
                          <p>Quer economizar para uma viagem, trocar de carro ou simplesmente guardar mais dinheiro no mês? No FinApp, você pode criar metas financeiras personalizadas e acompanhar seu progresso até alcançá-las.</p>
                        
                        <h2>🧾 Registro de Transações</h2>
                          <p>Registre cada movimentação financeira com todos os detalhes: <br></br>
                            -Descrição (Ex: Almoço no restaurante) <br />
                            -Valor (Ex: R$ 35,00) <br />
                            -Data (Ex: 17/07/2025) <br />
                            -Tipo (Receita ou Despesa) <br />
                            -Categoria (Jantar, Viagem, Transporte, entre outros) <br />
                          </p>
                          
                          Com isso, você terá um histórico completo e organizado de tudo o que acontece com seu dinheiro.

                          No FinApp, você tem autonomia e clareza para fazer escolhas financeiras melhores. Simples, direto e eficiente — exatamente como sua gestão financeira deve ser.

                          💰 Comece agora mesmo a transformar sua vida financeira com o FinApp.</p>
                    </div>
                    
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

export default PaginaServicos;