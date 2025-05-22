let usuarios = [];

window.addEventListener('DOMContentLoaded', () => {
  carregarPerfilGerente();
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

// Submissão do formulário de cadastro do funcionário
document.getElementById('form-usuario').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome-usuario').value.trim();
  const cargo = document.getElementById('ocupacao-usuario').value;
  const email = document.getElementById('email-usuario').value.trim();
  const matricula = document.getElementById('matricula-usuario').value.trim();
  const senha = document.getElementById('senha-usuario').value;
  const fotoInput = document.getElementById('foto-usuario');

  if (!nome || !cargo || !email || !matricula || !senha) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  if (usuarios.some(u => u.matricula === matricula)) {
    alert("Matrícula já cadastrada.");
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/funcionarios/criarFuncionario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        cargo,
        matricula,
        email,
        senha
      }),
      credentials: 'include'
    });

    if (!res.ok) {
      const erro = await res.json();
      console.error(erro);
      alert(`Erro ao criar funcionario: ${erro.message}`);
      return;
    }
    alert('Funcionário cadastrado com sucesso!');

  } catch (error) {
    console.error('Erro ao cadastrar funcionário:', error);
    alert('Erro ao cadastrar funcionário. Tente novamente.');
  }

  renderizarListaUsuarios();
  document.getElementById('modal-usuario').style.display = 'none';
  e.target.reset();
});


// Atualiza a lista de usuários
async function buscarFuncionarios() {

  try {
    const res = await fetch('http://localhost:3000/api/funcionarios/listarFuncionarios', {
      method: 'GET',
      credentials: 'include'
    });

    const funcionarios = await res.json();
    console.log(funcionarios);

    usuarios = funcionarios.map(funcionario => ({
      _id: funcionario._id,
      nome: funcionario.nome,
      matricula: funcionario.matricula,
      cargo: funcionario.cargo,
      email: funcionario.email,
      senha: funcionario.senha
    }));

    console.log("pós map");
    console.log(usuarios);
    renderizarListaUsuarios();

  }
  catch (error) {
    console.error('Erro ao buscar funcionários:', error);
  }
}

buscarFuncionarios();

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
  document.getElementById('funcao').textContent = usuario.cargo;
  document.getElementById('email').textContent = usuario.email;
  document.getElementById('senha').textContent = "*************";

  const btnSenha = document.getElementById('btn-solicitar-senha');
  if (usuario.cargo.toLowerCase() === 'gerente') {
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

async function carregarPerfilGerente() {

  try {
    const res = await fetch('http://localhost:3000/api/funcionarios/obterFuncionario', {
      method: 'GET',
      credentials: 'include'
    });

    
    if (!res.ok) {
      const erro = await res.json();
      console.error('Erro: ', erro);
      alert(`Erro ao carregar funcionario: `, erro.message);
      return
    }
    
    const dados = await res.json();
    const usuario = dados.map(funcionario => ({
      _id: funcionario._id,
      nome: funcionario.nome,
      matricula: funcionario.matricula,
      cargo: funcionario.cargo,
      email: funcionario.email
    }));
    preencherPainel(usuario)

  } catch (error) {
    console.error('Erro ao carregar perfil do gerente: ', error);
    alert("Você precisa estar logado para acessar essa página!")
    window.location.href = 'index.html'
  }
}
