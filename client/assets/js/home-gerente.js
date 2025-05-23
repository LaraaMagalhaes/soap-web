document.addEventListener('DOMContentLoaded', () => {

  const registros = [
    {
      nome: "Maria Antônia de Freitas",
      horario: "08:30",
      bloco: "Bloco A",
      tarefa: "Limpeza Banheiros",
      descricao: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem..."
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
      bloco: "Bloco E",
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

  let indiceAtual = 0;

  const scheduleCards = document.querySelectorAll('.schedule-card');
  const inputNome = document.querySelector('input[readonly]');
  const inputHorario = document.querySelectorAll('input[readonly]')[1];
  const inputBloco = document.querySelectorAll('input[readonly]')[2];
  const textareaDescricao = document.querySelector('textarea');
  const botaoEnviar = document.querySelector('button.btn-primary');
  const tituloTarefa = document.getElementById('titulo-tarefa');
  const mensagemStatus = document.getElementById('mensagem-status');

  // Preenche os campos com os dados iniciais
  preencherFormulario(0);

  // Atualiza o formulário ao clicar em um card
  scheduleCards.forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-id'));
      preencherFormulario(index);
    });
  });

  // Atualiza a descrição e exibe mensagem na tela
  botaoEnviar.addEventListener('click', (event) => {
    event.preventDefault();

    const novaDescricao = textareaDescricao.value.trim();
    const descricaoAtual = registros[indiceAtual].descricao.trim();

    if (novaDescricao !== descricaoAtual) {
      registros[indiceAtual].descricao = novaDescricao;
      mensagemStatus.textContent = '✅ Descrição atualizada com sucesso!';
      mensagemStatus.classList.remove('text-danger');
      mensagemStatus.classList.add('text-success');
    } else {
      mensagemStatus.textContent = '⚠️ Nenhuma alteração detectada.';
      mensagemStatus.classList.remove('text-success');
      mensagemStatus.classList.add('text-danger');
    }
  });

  // Atualiza os campos do formulário com os dados do array
  function preencherFormulario(index) {
    const pessoa = registros[index];
    indiceAtual = index;

    inputNome.value = pessoa.nome;
    inputHorario.value = pessoa.horario;
    inputBloco.value = pessoa.bloco;
    textareaDescricao.value = pessoa.descricao;
    tituloTarefa.textContent = pessoa.tarefa;

    mensagemStatus.textContent = ''; // limpa a mensagem ao trocar de pessoa
  }

  //redirecionamento para escolha.html ao clicar no botão de reposição
  const botaoReposicao = document.getElementById('botao-reposicao');

  botaoReposicao.addEventListener('click', () => {
    window.location.href = 'escolha-gerente.html';
  });

  const botaoPerfil = document.getElementById('botao-perfil');

  botaoPerfil.addEventListener('click', () => {
    window.location.href = 'perfil-gerente.html';
  });
 
  document.getElementById('link-estoque')
    .addEventListener('click', () => window.location.href = 'controle-estoque.html');

  document.getElementById('link-historico')
    .addEventListener('click', () => window.location.href = 'historico.html');

  document.getElementById('link-tarefas')
    .addEventListener('click', () => window.location.href = 'delegacao_tarefas.html');

});