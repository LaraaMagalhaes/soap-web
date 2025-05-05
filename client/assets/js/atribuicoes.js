
document.getElementById('btn-adicionar').addEventListener('click', () => {
    document.getElementById('titulo-tarefa').textContent = 'Serviços';

    document.getElementById('nome').removeAttribute('readonly');
    document.getElementById('nome').value = '';
    document.getElementById('hora').removeAttribute('readonly');
    document.getElementById('hora').value = '';
    document.getElementById('bloco').removeAttribute('readonly');
    document.getElementById('bloco').value = '';
    document.getElementById('descricao').value = '';

    const botao = document.getElementById('btn-remover');
    botao.textContent = 'Delegar Atribuição';
    botao.classList.remove('btn-danger');
    botao.classList.add('btn-success');
  });

  document.querySelectorAll('.schedule-card').forEach(card => {
    card.addEventListener('click', () => {
      document.getElementById('titulo-tarefa').textContent = 'Limpeza Banheiros';

      document.getElementById('nome').value = card.dataset.nome;
      document.getElementById('hora').value = card.dataset.hora;
      document.getElementById('bloco').value = card.dataset.bloco;
      document.getElementById('descricao').value = card.dataset.desc;

      document.getElementById('nome').setAttribute('readonly', true);
      document.getElementById('hora').setAttribute('readonly', true);
      document.getElementById('bloco').setAttribute('readonly', true);

      const botao = document.getElementById('btn-remover');
      botao.textContent = 'Remover Atribuição';
      botao.classList.remove('btn-success');
      botao.classList.add('btn-danger');
    });
  });
