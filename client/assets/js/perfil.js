// Simulando dados recebidos do backend
const usuarioLogado = {
    nome: "Maria Antonia de Freitas",
    matricula: "2245387-2",
    funcao: "Faxineira",
    email: "MariaAntonia123@gmail.com",
    senha: "********************"
  };
  
  // Preenchendo os campos da tela com os dados do usuário
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nome').textContent = usuarioLogado.nome;
    document.getElementById('matricula').textContent = usuarioLogado.matricula;
    document.getElementById('funcao').textContent = usuarioLogado.funcao;
    document.getElementById('email').textContent = usuarioLogado.email;
    document.getElementById('senha').textContent = usuarioLogado.senha;
  });
  
  // Evento para voltar à home
  const voltarBtn = document.getElementById('voltar-home');
  if (voltarBtn) {
    voltarBtn.addEventListener('click', () => {
      window.location.href = '/home.html';
    });
  }
  
  // Evento do botão de solicitar senha
const botaoSolicitarSenha = document.querySelector('button.btn-outline-secondary');
const mensagemEmail = document.getElementById('mensagem-email');

botaoSolicitarSenha.addEventListener('click', () => {
  if (mensagemEmail) {
    mensagemEmail.textContent = `Um e-mail de redefinição foi enviado para ${usuarioLogado.email}`;
    mensagemEmail.style.display = 'block';
  }
});

  