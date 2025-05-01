const usuariosValidos = [
    { matricula: '123', senha: '123' },
    { matricula: '789012', senha: 'senha456' }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const erroDiv = document.getElementById('erroLogin');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const matricula = document.getElementById('matricula').value;
      const senha = document.getElementById('senha').value;
  
      const usuarioValido = usuariosValidos.find(user => user.matricula === matricula && user.senha === senha);
  
      if (usuarioValido) {
        erroDiv.style.display = 'none';
        window.location.href = '/public/home.html';
      } else {
        erroDiv.style.display = 'block';
      }
    });
  });