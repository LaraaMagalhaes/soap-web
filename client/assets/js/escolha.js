const selecionados = new Set();

// Produtos simulados vindos do "banco"
const produtos = [
  { nome: "Rodo", imagem: "https://i.imgur.com/6z2FEhA.png", unidades: 15 },
  { nome: "Desinfetante", imagem: "https://i.imgur.com/NKmU3LU.png", unidades: 15 },
  { nome: "Álcool", imagem: "https://i.imgur.com/vwVCLW9.png", unidades: 15 },
  { nome: "Vassoura", imagem: "https://i.imgur.com/fOxdXQU.png", unidades: 15 },
  { nome: "Baldes", imagem: "https://i.imgur.com/6z2FEhA.png", unidades: 10 },
  { nome: "Panos", imagem: "https://i.imgur.com/fOxdXQU.png", unidades: 20 },
  { nome: "Limpa Vidros", imagem: "https://i.imgur.com/vwVCLW9.png", unidades: 5 },
  { nome: "Sacos de Lixo", imagem: "https://i.imgur.com/NKmU3LU.png", unidades: 30 }
];

// Renderiza os produtos na tela
function renderizarProdutos(lista) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = '';

  lista.forEach(produto => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3';

    col.innerHTML = `
      <div class="product-card" data-produto="${produto.nome}">
        <img src="${produto.imagem}" class="product-img" alt="${produto.nome}">
        <div class="d-flex justify-content-center align-items-center gap-2">
          <div class="product-name m-0">${produto.nome}</div>
          <div class="product-qty m-0">${produto.unidades}und</div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  ativarSelecao();
}

// Permite selecionar/deselecionar os produtos
function ativarSelecao() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const produto = card.getAttribute('data-produto');
      card.classList.toggle('selected');

      if (selecionados.has(produto)) {
        selecionados.delete(produto);
      } else {
        selecionados.add(produto);
      }
    });
  });
}

// Enviar produtos selecionados (modo simulado)
function enviarProdutos() {
  const mensagemEnvio = document.getElementById('mensagem-envio');
  if (!mensagemEnvio) return;

  if (selecionados.size === 0) {
    mensagemEnvio.textContent = 'Nenhum produto selecionado.';
    mensagemEnvio.className = 'text-center mt-3 fw-bold text-danger';
    mensagemEnvio.style.display = 'block';
    return;
  }

  const payload = {
    usuario: 'usuario.exemplo', // futuro: substituir por dado do login
    produtos: Array.from(selecionados)
  };

  console.log("Simulando envio:", payload);

  // Simulação de sucesso
  mensagemEnvio.textContent = 'Solicitação simulada com sucesso!';
  mensagemEnvio.className = 'text-center mt-3 fw-bold text-success';
  mensagemEnvio.style.display = 'block';

  // ❗ Desmarca todos os produtos
  document.querySelectorAll('.product-card.selected').forEach(card => {
    card.classList.remove('selected');
  });

  // ❗ Limpa o conjunto
  selecionados.clear();
}


// Navega para a tela de perfil (futuro)
function irPerfil() {
  console.log('Indo para tela de perfil...');
}

// Inicialização da página
renderizarProdutos(produtos);

// Eventos dos botões
const botaoVoltar = document.getElementById('botao-voltar');
if (botaoVoltar) {
  botaoVoltar.addEventListener('click', () => {
    window.location.href = '/home.html';
  });
}

const botaoEnviar = document.getElementById('botao-enviar');
if (botaoEnviar) {
  botaoEnviar.addEventListener('click', enviarProdutos);
}
