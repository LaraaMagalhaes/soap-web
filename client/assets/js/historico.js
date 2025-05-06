const registros = [
    {
      data: "25/04/2025", // NOVO
      nome: "Maria Antônia de Freitas",
      horario: "08:30",
      bloco: "Bloco A",
      tarefa: "Limpeza Banheiros",
      descricao: "Descrição da Maria Antônia de Freitas"
    },
    {
      data: "25/04/2025", // NOVO
      nome: "José da Silva Sales",
      horario: "08:30",
      bloco: "Bloco B",
      tarefa: "Reposição de Materiais",
      descricao: "Descrição do José da Silva Sales."
    },
    {
      data: "28/04/2025", // NOVO
      nome: "Francisco de Assis Nunes",
      horario: "08:30",
      bloco: "Bloco C",
      tarefa: "Limpeza de Janelas",
      descricao: "Descrição de Francisco de Assis Nunes."
    },
    {
      data: "28/04/2025", // NOVO
      nome: "Julia Maria Torres",
      horario: "08:30",
      bloco: "Bloco D",
      tarefa: "Verificação de Estoque",
      descricao: "Descrição da Julia Maria Torres."
    },
    {
      data: "29/04/2025", // NOVO
      nome: "Adalberto Santos Magalhães",
      horario: "15:30",
      bloco: "Bloco A",
      tarefa: "Limpeza Banheiros",
      descricao: "Descrição do Adalberto Santos Magalhães."
    },
    {
      data: "29/04/2025", // NOVO
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

  // ============ Elementos DOM principais ======================
  const colunaHistorico = document.getElementById("coluna-historico"); // NOVO
  const painelVisualizacao = document.getElementById("visualizacao-tarefa");
  const painelAdicionar = document.getElementById("formulario-adicionar");

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

  // ================== ESTADO ==================================
  let indiceAtual = 0;
  let dataAtual = ""; // NOVO – data do card selecionado

  // Agrupa registros por data ----------------------------------
  const registrosPorData = registros.reduce((acc, r) => {
    acc[r.data] = acc[r.data] || [];
    acc[r.data].push(r);
    return acc;
  }, {});

  // ============ RENDER das seções de datas =====================
  function renderHistorico() {
    colunaHistorico.innerHTML = "";

    // Ordena as datas (desc) para exibir mais recente primeiro
    const datasOrdenadas = Object.keys(registrosPorData).sort(
      (a, b) => new Date(b.split("/").reverse().join("-")) - new Date(a.split("/").reverse().join("-"))
    );

    datasOrdenadas.forEach((data) => {
      const sec = document.createElement("div");
      sec.className = "date-section card";

      // Cabeçalho da data
      const header = document.createElement("div");
      header.className = "date-header";
      header.textContent = data;
      sec.appendChild(header);

      // Lista de agendamentos desse dia
      const lista = document.createElement("div");
      lista.className = "p-2"; // Mesmo padding do original

      registrosPorData[data].forEach((pessoa, index) => {
        const card = document.createElement("div");
        card.className =
          "schedule-card d-flex justify-content-between align-items-center";
        card.dataset.index = index; // índice dentro do dia
        card.dataset.data = data; // NOVO – guarda qual dia

        card.innerHTML = `
          <div class="fw-bold text-primary">${pessoa.horario}</div>
          <div class="text-center flex-fill px-2">${pessoa.nome}</div>
          <div class="text-end text-muted">${pessoa.bloco}</div>
        `;

        // Ao clicar no card, carrega no painel direito
        card.addEventListener("click", () => {
          preencherFormulario(data, index);
          painelVisualizacao.classList.remove("d-none");
          painelAdicionar.classList.add("d-none");
        });

        lista.appendChild(card);
      });

      sec.appendChild(lista);

      // Botão "Adicionar" específico desse dia -----------------
      const divBtn = document.createElement("div");
      divBtn.className = "text-center p-2";
      const btnAdd = document.createElement("button");
      btnAdd.className = "btn btn-outline-primary";
      btnAdd.textContent = "Adicionar";
      btnAdd.dataset.data = data; // NOVO – data deste grupo
      btnAdd.addEventListener("click", () => {
        dataAtual = data; // garante em qual dia vamos inserir
        painelVisualizacao.classList.add("d-none");
        painelAdicionar.classList.remove("d-none");
        document.getElementById("titulo-servico-adicionar").textContent =
          "Serviço";
      });
      divBtn.appendChild(btnAdd);
      sec.appendChild(divBtn);

      // Junta a seção na coluna esquerda
      colunaHistorico.appendChild(sec);
    });
  }

  // ============ Preenche painel direito =======================
  function preencherFormulario(data, index) {
    const pessoa = registrosPorData[data][index];
    dataAtual = data; // NOVO
    indiceAtual = index;

    inputNome.value = pessoa.nome;
    inputHorario.value = pessoa.horario;
    inputBloco.value = pessoa.bloco;
    textareaDescricao.value = pessoa.descricao;
    tituloTarefa.textContent = pessoa.tarefa;
  }

  // ============ BOTÕES de remover =============================
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
    registrosPorData[dataAtual].splice(indiceAtual, 1);
    if (registrosPorData[dataAtual].length === 0) delete registrosPorData[dataAtual]; // quando fica vazio remove o dia
    renderHistorico();
    confirmacaoRemocao.classList.add("d-none");
    painelVisualizacao.classList.add("d-none"); // esconde se nada selecionado
  };

  // ============ Popula selects no formulário ==================
  function popularSelects() {
    selectServico.innerHTML = Object.keys(servicos)
      .map((s) => `<option value="${s}">${s}</option>`) // NOVO (map mais limpo)
      .join("");
    selectResponsavel.innerHTML = responsaveis
      .map((r) => `<option value="${r}">${r}</option>`) // NOVO
      .join("");
    selectBloco.innerHTML = blocos
      .map((b) => `<option value="${b}">${b}</option>`) // NOVO
      .join("");
  }

  selectServico.addEventListener("change", () => {
    textareaNovaDescricao.value = servicos[selectServico.value] || "";
    document.getElementById("titulo-servico-adicionar").textContent = selectServico.value;
  });

  // ============ SUBMIT do formulário ==========================
  formAdicionar.addEventListener("submit", (e) => {
    e.preventDefault();

    const novo = {
      data: dataAtual, // NOVO
      nome: selectResponsavel.value,
      horario: inputHorarioNovo.value,
      bloco: selectBloco.value,
      tarefa: selectServico.value,
      descricao: textareaNovaDescricao.value
    };

    registrosPorData[dataAtual] = registrosPorData[dataAtual] || [];
    registrosPorData[dataAtual].push(novo);

    // -------------- submit do formulário ----------------
renderHistorico();
preencherFormulario(dataAtual, registrosPorData[dataAtual].length - 1);
painelAdicionar.classList.add("d-none");
painelVisualizacao.classList.remove("d-none");
}); // <-- fim do formAdicionar.submit


// ============ Inicialização ================================
popularSelects();
renderHistorico();

/* NOVO bloco: garante que o painel direito não fique vazio  */
(() => {
  const primeiraData = Object.keys(registrosPorData)[0];   // pega a 1ª data existente
  if (!primeiraData) return;                               // nada a mostrar
  preencherFormulario(primeiraData, 0);                    // 1º item desse dia
  painelVisualizacao.classList.remove("d-none");           // exibe painel
  painelAdicionar.classList.add("d-none");                 // esconde formulário
})();
