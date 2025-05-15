let produtos_categoria = JSON.parse(localStorage.getItem('produtos')) || [
    { categoria: "Utensílios de Limpeza" },
    { categoria: "Materiais de Limpeza" },
    { categoria: "Produtos Químicos" },
    { categoria: "Descartáveis" },
    { categoria: "Outros" },
];

let produtos = []

async function carregarProdutos() {
    try{
        const res = await fetch('http://localhost:3000/api/produtos/listarProdutos')
        const dados = await res.json();
        console.log(dados);
        produtos = dados.map( p => ({
            _id: p._id,
            nome: p.nome.toUpperCase(),
            imagem: `../assets/images/${p.imagem || 'noimage.png'}`,
            unidades: p.unidades,
            categoria: p.categoria
        }));

        console.log("pós map");
        console.log(produtos);

        preencherCategorias();
        renderizarProdutos(produtos);
        ativarEdicaoQuantidade();
    } catch (error){
        console.log('Erro ao carregar produtos: ', error);
    }
}

carregarProdutos();


// 🧠 atualiza quantidades com localStorage (se houver)
// produtos = produtos.map(p => {
//     const local = localStorage.getItem(`quantidade-${p.nome}`);
//     return { ...p, unidades: local !== null ? Number(local) : p.unidades };
// });

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
                    value="${Number.isFinite(prod.unidades) ? prod.unidades : 0}" data-id="${prod._id}" data-produto="${prod.nome}" min="0" style="width: 60px;">
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
        input.addEventListener('change', async () => {
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

            const produtoEncontrado = produtos.find(p => p.nome === nome);

            if( produtoEncontrado ) {
                try{
                    const id = input.getAttribute('data-id');
                    await fetch(`http://localhost:3000/api/produtos/atualizarProduto/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ unidades: novaQtd })
                    });

                    alert('Estoque atualizado com sucesso!');
                    carregarProdutos();

                } catch (error) {
                    console.error('Erro ao atualizar estoque:', error);
                    alert('Erro na requisição. Tente novamente.');
                }
            }
            // // Atualiza quantidade individual
            // localStorage.setItem(`quantidade-${nome}`, novaQtd);
            // // Atualiza a lista completa
            // localStorage.setItem('produtos', JSON.stringify(produtos));
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
    const categoriasUnicas = [...new Set(produtos_categoria.map(p => p.categoria))];
    categoriasUnicas.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);
    });
}

formProduto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('input-nome').value.trim();
    const categoria = document.getElementById('input-categoria').value;
    const unidades = parseInt(document.getElementById('input-unidades').value);
    const imagemInput = document.getElementById('input-imagem');

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('categoria', categoria);
    formData.append('unidades', unidades);

    if (!nome || !categoria || !unidades || unidades <= 0) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    let imagemURL = "../assets/images/noimage.png"; // caso o usuário não envie imagem

    if (imagemInput.files && imagemInput.files[0]) {
        formData.append('imagem', imagemInput.files[0]);
        // imagemURL = URL.createObjectURL(imagemInput.files[0]);
    }

    try{
        const res = await fetch('http://localhost:3000/api/produtos/criarProduto', {
            method: 'POST',
            body: formData
        });

        console.log(res);
        if(!res.ok) {
            const erro = await res.json();
            alert(`Erro ao criar produto: ${erro.message}`);
            return;
        }

        alert('Produto cadastrado com sucesso!');
        modal.style.display = 'none';
        formProduto.reset();
        carregarProdutos(); // Atualiza a lista de produtos

    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        alert('Erro na requisição. Tente novamente.');
    }
});