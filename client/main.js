const usuariosValidos = [
  { matricula: '123', senha: '123', tipo: 'usuario' },
  { matricula: '321', senha: '321', tipo: 'gerente' }
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
        
        localStorage.setItem('tipoUsuario', usuarioValido.tipo);
  
        if (usuarioValido.tipo === 'gerente') {
          window.location.href = '/public/home-gerente.html';
        } else {
          window.location.href = '/public/home.html';
        }
  
      } else {
        erroDiv.style.display = 'block';
      }
    });
  });