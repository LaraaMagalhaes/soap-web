let produtos = JSON.parse(localStorage.getItem('produtos')) || [
    { nome: "Rodo", imagem: "../assets/images/rodo.jpg", unidades: 15, categoria: "Utensílios de Limpeza" },
    { nome: "Desinfetante", imagem: "../assets/images/desinfetante.png", unidades: 15, categoria: "Produtos Químicos" },
    { nome: "Álcool", imagem: "../assets/images/alcool.png", unidades: 15, categoria: "Produtos Químicos" },
    { nome: "Vassoura", imagem: "../assets/images/vassoura.png", unidades: 15, categoria: "Utensílios de Limpeza" },
    { nome: "Baldes", imagem: "../assets/images/balde.png", unidades: 10, categoria: "Utensílios de Limpeza" },
    { nome: "Panos", imagem: "../assets/images/pano.jpg", unidades: 20, categoria: "Materiais de Limpeza" },
    { nome: "Limpa Vidros", imagem: "../assets/images/limpa-vidros.png", unidades: 5, categoria: "Produtos Químicos" },
    { nome: "Sacos de Lixo", imagem: "../assets/images/saco-de-lixo.jpeg", unidades: 30, categoria: "Descartáveis" }
];


// 🧠 atualiza quantidades com localStorage (se houver)
produtos = produtos.map(p => {
    const local = localStorage.getItem(`quantidade-${p.nome}`);
    return { ...p, unidades: local !== null ? Number(local) : p.unidades };
});

const campoPesquisa = document.getElementById('pesquisa');
const filtroCategoria = document.getElementById('filtro-categoria');
const container = document.getElementById('produtos-container');

function renderizarProdutos(lista) {
    container.innerHTML = '';

    lista.forEach(prod => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';
        col.innerHTML = `
            <div class="border p-3 rounded bg-light d-flex flex-column align-items-center">
                <img src="${prod.imagem}" alt="${prod.nome}" class="img-fluid mb-2" style="height: 80px; object-fit: contain;">
                <div class="fw-bold text-center">${prod.nome}</div>
                
                <div class="d-flex align-items-center gap-2 mt-2">
                <input type="number" class="form-control form-control-sm input-estoque text-center" 
                    value="${prod.unidades}" data-produto="${prod.nome}" min="0" style="width: 60px;">
                <span>und</span>
                </div>

                <div class="badge bg-secondary mt-2">${prod.categoria}</div>
            </div>
            `;

        container.appendChild(col);
    });
}

function preencherCategorias() {
    const categoriasUnicas = [...new Set(produtos.map(p => p.categoria))];

    categoriasUnicas.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filtroCategoria.appendChild(option);
    });
}

function aplicarFiltros() {
    const termo = campoPesquisa.value.toLowerCase();
    const categoriaSelecionada = filtroCategoria.value;

    const filtrados = produtos.filter(p => {
        const nomeCondiz = p.nome.toLowerCase().includes(termo);
        const categoriaCondiz = categoriaSelecionada === '' || p.categoria === categoriaSelecionada;
        return nomeCondiz && categoriaCondiz;
    });

    renderizarProdutos(filtrados);
}

campoPesquisa.addEventListener('input', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);

// Voltar
document.getElementById('botao-voltar').addEventListener('click', () => {
    window.location.href = 'home-gerente.html';
});

// Inicialização
preencherCategorias();
renderizarProdutos(produtos);
ativarEdicaoQuantidade();

function ativarEdicaoQuantidade() {
    const inputs = document.querySelectorAll('.input-estoque');

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            const nome = input.getAttribute('data-produto');
            const novaQtd = parseInt(input.value);

            if (isNaN(novaQtd) || novaQtd < 0) {
                alert('Quantidade inválida.');
                return;
            }

            // Atualiza no array principal
            produtos = produtos.map(p => {
                if (p.nome === nome) {
                    p.unidades = novaQtd;
                }
                return p;
            });

            // Atualiza quantidade individual
            localStorage.setItem(`quantidade-${nome}`, novaQtd);

            // Atualiza a lista completa
            localStorage.setItem('produtos', JSON.stringify(produtos));
        });
    });
}



const btnRegistro = document.getElementById('btn-registro-produto');
const modal = document.getElementById('modal-produto');
const fecharModal = document.getElementById('fechar-modal');
const formProduto = document.getElementById('form-produto');

btnRegistro.addEventListener('click', () => {
    modal.style.display = 'flex';
    atualizarSelectCategoria();
});

fecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

function atualizarSelectCategoria() {
    const select = document.getElementById('input-categoria');
    select.innerHTML = '<option value="">Selecione uma categoria</option>';
    const categoriasUnicas = [...new Set(produtos.map(p => p.categoria))];
    categoriasUnicas.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

formProduto.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('input-nome').value.trim();
    const categoria = document.getElementById('input-categoria').value;
    const unidades = parseInt(document.getElementById('input-unidades').value);
    const imagemInput = document.getElementById('input-imagem');

    if (!nome || !categoria || !unidades || unidades <= 0) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    let imagemURL = "../assets/images/padrao.png"; // caso o usuário não envie imagem

    if (imagemInput.files && imagemInput.files[0]) {
        imagemURL = URL.createObjectURL(imagemInput.files[0]);
    }

    produtos.push({
        nome,
        imagem: imagemURL,
        unidades,
        categoria
    });

    // Atualiza localStorage com a nova lista
    localStorage.setItem('produtos', JSON.stringify(produtos));


    modal.style.display = 'none';
    formProduto.reset();
    renderizarProdutos(produtos);
});

