window.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("usuarioLogado");
  if (!id) {
    window.location.href = "index.html";
    return;
  }

  const dados = localStorage.getItem(`usuario_${id}`);
  const usuario = JSON.parse(dados);

  const div = document.getElementById("dadosUsuario");
  div.innerHTML = `
    <p><strong>Nome:</strong> ${usuario.nome}</p>
    <p><strong>CPF:</strong> ${usuario.cpf}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Telefone:</strong> ${usuario.telefone}</p>
    <p><strong>Rua:</strong> ${usuario.rua}</p>
    <p><strong>Trilha:</strong> ${usuario.trilha}</p>
    <p><strong>Cidade:</strong> ${usuario.cidade}</p>
    <p><strong>Estado:</strong> ${usuario.estado}</p>
  `;
});

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}
