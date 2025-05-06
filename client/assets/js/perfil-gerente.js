const usuarios = [
  {
    nome: "Anna Lara Magalhães Monteiro Vieira",
    matricula: "2223889-2",
    funcao: "Secretária",
    email: "annalarammv123@gmail.com",
    senha: "********************"
  },
  {
    nome: "Maria Antonia de Freitas",
    matricula: "2245387-2",
    funcao: "Faxineira",
    email: "mariafreitas@gmail.com",
    senha: "********"
  },
  {
    nome: "José da Silva Sales",
    matricula: "7572787-2",
    funcao: "Faxineiro",
    email: "josesales@gmail.com",
    senha: "********"
  },
  {
    nome: "Francisco de Assis Nunes",
    matricula: "7527277-2",
    funcao: "Zelador",
    email: "franciscanunes@gmail.com",
    senha: "********"
  },
  {
    nome: "Julia Maria Torres",
    matricula: "892542-2",
    funcao: "Secretária",
    email: "juliatorres@gmail.com",
    senha: "********"
  },
  {
    nome: "Adalberto Santos",
    matricula: "225693-2",
    funcao: "Gerente",
    email: "adalberto.santos@gmail.com",
    senha: "********"
  }
];

window.addEventListener('DOMContentLoaded', () => {
  preencherPainel(usuarios[0]);
  renderizarListaUsuarios("");
});

// Navegação
document.getElementById('voltar-home')?.addEventListener('click', () => {
  window.location.href = 'home-gerente.html';
});

// Modal de cadastro
document.getElementById('abrir-modal').addEventListener('click', () => {
  document.getElementById('modal-usuario').style.display = 'flex';
});
document.getElementById('fechar-modal-usuario').addEventListener('click', () => {
  document.getElementById('modal-usuario').style.display = 'none';
});

// Submissão do formulário de cadastro
document.getElementById('form-usuario').addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome-usuario').value.trim();
  const funcao = document.getElementById('ocupacao-usuario').value;
  const email = document.getElementById('email-usuario').value.trim();
  const matricula = document.getElementById('matricula-usuario').value.trim();
  const senha = document.getElementById('senha-usuario').value;
  const fotoInput = document.getElementById('foto-usuario');

  let imagemURL = "../assets/images/padrao.png";
  if (fotoInput.files?.[0]) {
    imagemURL = URL.createObjectURL(fotoInput.files[0]);
  }

  usuarios.push({ nome, funcao, email, matricula, senha, imagem: imagemURL });

  renderizarListaUsuarios();
  document.getElementById('modal-usuario').style.display = 'none';
  e.target.reset();
});

// Lista de usuários e busca
function renderizarListaUsuarios(filtro = "") {
  const lista = document.getElementById('lista-usuarios');
  lista.innerHTML = "";

  const termo = filtro.toLowerCase();
  const filtrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(termo) || u.matricula.includes(termo)
  );

  filtrados.forEach(usuario => {
    const item = document.createElement("div");
    item.className = "d-flex justify-content-between align-items-center bg-light px-2 py-1 rounded";
    item.style.cursor = "pointer";
    item.innerHTML = `<span>${usuario.nome}</span><small>${usuario.matricula}</small>`;
    item.onclick = () => preencherPainel(usuario);
    lista.appendChild(item);
  });
}

document.getElementById('busca-usuario').addEventListener("input", (e) => {
  renderizarListaUsuarios(e.target.value);
});

// Preenche o painel esquerdo e ajusta botões
function preencherPainel(usuario) {
  document.getElementById('nome').textContent = usuario.nome;
  document.getElementById('matricula').textContent = usuario.matricula;
  document.getElementById('funcao').textContent = usuario.funcao;
  document.getElementById('email').textContent = usuario.email;
  document.getElementById('senha').textContent = usuario.senha;

  const btnSenha = document.getElementById('btn-solicitar-senha');
  if (usuario.funcao.toLowerCase() === 'gerente') {
    btnSenha.style.display = 'block';
  } else {
    btnSenha.style.display = 'none';
  }
}

// Botão solicitar senha
document.getElementById('btn-solicitar-senha')?.addEventListener('click', () => {
  const email = document.getElementById('email').textContent;
  const msg = document.getElementById('mensagem-email');
  msg.textContent = `Um e-mail com sua senha foi enviado para ${email}`;
  msg.style.display = 'block';
});
