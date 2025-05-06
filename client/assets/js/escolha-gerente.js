const selecionados = new Set();

// Produtos simulados vindos do "banco"
let produtos = JSON.parse(localStorage.getItem('produtos')) || [
  { nome: "Rodo", imagem: "../assets/images/rodo.jpg", unidades: 15 },
  { nome: "Desinfetante", imagem: "../assets/images/desinfetante.png", unidades: 15 },
  { nome: "Álcool", imagem: "../assets/images/alcool.png", unidades: 15 },
  { nome: "Vassoura", imagem: "../assets/images/vassoura.png", unidades: 15 },
  { nome: "Baldes", imagem: "../assets/images/balde.png", unidades: 10 },
  { nome: "Panos", imagem: "../assets/images/pano.jpg", unidades: 20 },
  { nome: "Limpa Vidros", imagem: "../assets/images/limpa-vidros.png", unidades: 5 },
  { nome: "Sacos de Lixo", imagem: "../assets/images/saco-de-lixo.jpeg", unidades: 30 }
];

// Renderiza os produtos na tela
function renderizarProdutos(lista) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = '';

  lista.forEach(produto => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-3';
    const quantidadeSalva = localStorage.getItem(`quantidade-${produto.nome}`) || produto.unidades;

    col.innerHTML = `
      <div class="product-card" data-produto="${produto.nome}">
        <img src="${produto.imagem}" class="product-img" alt="${produto.nome}">
        <div class="d-flex justify-content-center align-items-center gap-2">
          <div class="product-name m-0">${produto.nome}</div>
          <input type="number" class="product-qty-input" value="${quantidadeSalva}" data-produto="${produto.nome}" min="0">
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  ativarSelecao();
  ativarEdicaoQuantidade();
}

function ativarEdicaoQuantidade() {
  const inputs = document.querySelectorAll('.product-qty-input');
  
  inputs.forEach(input => {
    input.addEventListener('change', () => {
      const produto = input.getAttribute('data-produto');
      const novaQuantidade = input.value;

      // Salva no localStorage com uma chave única para cada produto
      localStorage.setItem(`quantidade-${produto}`, novaQuantidade);
    });
  });
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
    window.location.href = 'home-gerente.html';
  });
}

const botaoEnviar = document.getElementById('botao-enviar');
if (botaoEnviar) {
  botaoEnviar.addEventListener('click', enviarProdutos);
}
