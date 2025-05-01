const selecionados = new Set();

// Simulação de produtos que virão do banco
const produtos = [
  {
    nome: "Rodo",
    imagem: "https://i.imgur.com/6z2FEhA.png",
    unidades: 15
  },
  {
    nome: "Desinfetante",
    imagem: "https://i.imgur.com/NKmU3LU.png",
    unidades: 15
  },
  {
    nome: "Álcool",
    imagem: "https://i.imgur.com/vwVCLW9.png",
    unidades: 15
  },
  {
    nome: "Vassoura",
    imagem: "https://i.imgur.com/fOxdXQU.png",
    unidades: 15
  },
  {
    nome: "Baldes",
    imagem: "https://i.imgur.com/6z2FEhA.png",
    unidades: 10
  },
  {
    nome: "Panos",
    imagem: "https://i.imgur.com/fOxdXQU.png",
    unidades: 20
  },
  {
    nome: "Limpa Vidros",
    imagem: "https://i.imgur.com/vwVCLW9.png",
    unidades: 5
  },
  {
    nome: "Sacos de Lixo",
    imagem: "https://i.imgur.com/NKmU3LU.png",
    unidades: 30
  }
];

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

// Permite selecionar/desselecionar os produtos
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

// Enviar produtos selecionados
function enviarProdutos() {
  if (selecionados.size > 0) {
    console.log("Produtos selecionados:", Array.from(selecionados));
    alert('Solicitação enviada com sucesso!');
  } else {
    alert('Nenhum produto selecionado.');
  }
}

// Botões do topo
function voltarHome() {
  window.location.href = '../home/home.html';
}

function irPerfil() {
  console.log('Indo para tela de perfil...');
}

// Inicializa
renderizarProdutos(produtos);
