const registros = [
  {
    nome: "Maria Antônia de Freitas",
    horario: "08:30",
    bloco: "Bloco A",
    tarefa: "Limpeza Banheiros",
    descricao: "Descrição da Maria Antônia de Freitas"
  },
  {
    nome: "José da Silva Sales",
    horario: "08:30",
    bloco: "Bloco B",
    tarefa: "Reposição de Materiais",
    descricao: "Descrição do José da Silva Sales."
  },
  {
    nome: "Francisco de Assis Nunes",
    horario: "08:30",
    bloco: "Bloco C",
    tarefa: "Limpeza de Janelas",
    descricao: "Descrição de Francisco de Assis Nunes."
  },
  {
    nome: "Julia Maria Torres",
    horario: "08:30",
    bloco: "Bloco D",
    tarefa: "Verificação de Estoque",
    descricao: "Descrição da Julia Maria Torres."
  },
  {
    nome: "Adalberto Santos Magalhães",
    horario: "15:30",
    bloco: "Bloco A",
    tarefa: "Limpeza Banheiros",
    descricao: "Descrição do Adalberto Santos Magalhães."
  },
  {
    nome: "José da Silva Sales",
    horario: "15:30",
    bloco: "Bloco B",
    tarefa: "Limpeza Corredores",
    descricao: "Descrição alternativa de José da Silva Sales."
  }
];

const servicos = {
  "Limpeza Banheiros": "Realizar limpeza completa dos banheiros.",
  "Reposição de Materiais": "Verificar e repor materiais de limpeza.",
  "Limpeza de Janelas": "Limpar todas as janelas do andar.",
  "Verificação de Estoque": "Checar níveis de estoque e registrar necessidades.",
  "Limpeza Corredores": "Varrição e lavagem de corredores."
};

const responsaveis = [
  "Maria Antônia de Freitas",
  "José da Silva Sales",
  "Francisco de Assis Nunes",
  "Julia Maria Torres",
  "Adalberto Santos Magalhães"
];

const blocos = ["Bloco A", "Bloco B", "Bloco C", "Bloco D", "Bloco E"];

// DOM Elements
const listaAgendamentos = document.getElementById("lista-agendamentos");
const painelVisualizacao = document.getElementById("visualizacao-tarefa");
const painelAdicionar = document.getElementById("formulario-adicionar");
const btnAdicionar = document.getElementById("btn-adicionar");

const inputNome = painelVisualizacao.querySelectorAll("input")[0];
const inputHorario = painelVisualizacao.querySelectorAll("input")[1];
const inputBloco = painelVisualizacao.querySelectorAll("input")[2];
const textareaDescricao = painelVisualizacao.querySelector("textarea");
const tituloTarefa = document.getElementById("titulo-tarefa");

const selectServico = document.getElementById("select-servico");
const selectResponsavel = document.getElementById("select-responsavel");
const selectBloco = document.getElementById("select-bloco");
const inputHorarioNovo = document.getElementById("input-horario");
const textareaNovaDescricao = document.getElementById("textarea-descricao");
const formAdicionar = document.getElementById("form-adicionar");

let indiceAtual = 0;

function renderizarLista() {
  listaAgendamentos.innerHTML = "";
  registros.forEach((pessoa, index) => {
    const card = document.createElement("div");
    card.className = "schedule-card d-flex justify-content-between align-items-center";
    card.dataset.id = index;
    card.innerHTML = `
      <div class="fw-bold text-primary">${pessoa.horario}</div>
      <div class="text-center flex-fill px-2">${pessoa.nome}</div>
      <div class="text-end text-muted">${pessoa.bloco}</div>
    `;
    card.addEventListener("click", () => {
      preencherFormulario(index);
      painelVisualizacao.classList.remove("d-none");
      painelAdicionar.classList.add("d-none");
    });
    listaAgendamentos.appendChild(card);
  });
}

function preencherFormulario(index) {
  const pessoa = registros[index];
  indiceAtual = index;
  inputNome.value = pessoa.nome;
  inputHorario.value = pessoa.horario;
  inputBloco.value = pessoa.bloco;
  textareaDescricao.value = pessoa.descricao;
  tituloTarefa.textContent = pessoa.tarefa;
}
const btnRemover = document.getElementById("botao-remover");
const confirmacaoRemocao = document.getElementById("confirmacao-remocao");
const btnConfirmarSim = document.getElementById("btn-confirmar-sim");
const btnConfirmarNao = document.getElementById("btn-confirmar-nao");

btnRemover.onclick = () => {
confirmacaoRemocao.classList.remove("d-none");
};

btnConfirmarNao.onclick = () => {
confirmacaoRemocao.classList.add("d-none");
};

btnConfirmarSim.onclick = () => {
registros.splice(indiceAtual, 1); // remove do array
renderizarLista();
preencherFormulario(0);
confirmacaoRemocao.classList.add("d-none");
};


function popularSelects() {
  Object.keys(servicos).forEach(servico => {
    selectServico.innerHTML += `<option value="${servico}">${servico}</option>`;
  });
  responsaveis.forEach(nome => {
    selectResponsavel.innerHTML += `<option value="${nome}">${nome}</option>`;
  });
  blocos.forEach(bloco => {
    selectBloco.innerHTML += `<option value="${bloco}">${bloco}</option>`;
  });
}

selectServico.addEventListener("change", () => {
  textareaNovaDescricao.value = servicos[selectServico.value] || "";
  document.getElementById("titulo-servico-adicionar").textContent = selectServico.value;

});

btnAdicionar.addEventListener("click", () => {
  painelVisualizacao.classList.add("d-none");
  painelAdicionar.classList.remove("d-none");
});

formAdicionar.addEventListener("submit", (e) => {
  e.preventDefault();

  const novo = {
    nome: selectResponsavel.value,
    horario: inputHorarioNovo.value,
    bloco: selectBloco.value,
    tarefa: selectServico.value,
    descricao: textareaNovaDescricao.value
  };

  registros.push(novo);
  renderizarLista();
  preencherFormulario(registros.length - 1);

  painelAdicionar.classList.add("d-none");
  painelVisualizacao.classList.remove("d-none");
});

popularSelects();
renderizarLista();
preencherFormulario(0);