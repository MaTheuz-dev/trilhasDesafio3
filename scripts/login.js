document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const loginId = document.getElementById("loginId").value.trim();
  const loginSenha = document.getElementById("loginSenha").value.trim();

  // Busca os dados salvos com a chave correta
  const dadosSalvos = JSON.parse(localStorage.getItem(`usuario_${loginId}`));

  if (dadosSalvos && loginSenha === dadosSalvos.senha) {
    // Salva o ID do usuário logado para usar no perfil
    localStorage.setItem("usuarioLogado", loginId);

    window.location.href = "perfil.html";
  } else {
    alert("ID ou senha incorretos.");
  }
});
