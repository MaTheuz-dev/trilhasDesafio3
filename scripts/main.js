document.querySelector("form.informacoes").addEventListener("submit", function (e) {
  e.preventDefault();

  const campos = {
    nome: document.getElementById("nome"),
    cpf: document.getElementById("cpf"),
    telefone: document.getElementById("telefone"),
    email: document.getElementById("email"),
    cep: document.getElementById("cep"),
    rua: document.getElementById("rua"),
    numero: document.getElementById("numero"),
    cidade: document.getElementById("cidade"),
    estado: document.getElementById("estado"),
    userId: document.getElementById("userId"),
    senha: document.getElementById("senha"),
  };

  let valido = true;

  // Nome precisa ter nome e sobrenome
  if (!/^\S+\s+\S+/.test(campos.nome.value)) {
    mostrarErro(campos.nome, "Digite nome e sobrenome.");
    valido = false;
  } else removerErro(campos.nome);

  // CPF
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(campos.cpf.value)) {
    mostrarErro(campos.cpf, "Digite um CPF válido (000.000.000-00).");
    valido = false;
  } else removerErro(campos.cpf);

  // Telefone
  if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(campos.telefone.value)) {
    mostrarErro(campos.telefone, "Telefone deve ter o formato (00) 00000-0000.");
    valido = false;
  } else removerErro(campos.telefone);

  // Email
  if (!/\S+@\S+\.\S+/.test(campos.email.value)) {
    mostrarErro(campos.email, "Digite um e-mail válido.");
    valido = false;
  } else removerErro(campos.email);

  // CEP
  if (!/^\d{5}-\d{3}$/.test(campos.cep.value)) {
    mostrarErro(campos.cep, "CEP deve ter o formato 00000-000.");
    valido = false;
  } else removerErro(campos.cep);

  // Número da casa: somente número
  if (!/^\d+$/.test(campos.numero.value)) {
    mostrarErro(campos.numero, "Digite apenas números.");
    valido = false;
  } else removerErro(campos.numero);

  // Cidade: só letras maiúsculas
  const cidadeInput = document.getElementById("cidade");
  cidadeInput.addEventListener("input", () => {
  const cidade = cidadeInput.value.trim();
  const erro = cidadeInput.nextElementSibling;

  // Regex para letras maiúsculas (inclusive acentuadas) e espaços
  const apenasMaiusculasComAcento = /^[A-ZÁÉÍÓÚÃÕÂÊÎÔÛÇ\s]+$/;

  if (!apenasMaiusculasComAcento.test(cidade)) {
    erro.textContent = "Use apenas letras maiúsculas (com acentos) e espaços.";
    cidadeInput.classList.add("erro-input");
  } else {
    erro.textContent = "";
    cidadeInput.classList.remove("erro-input");
  }
});

  // Rua: só letras maiúsculas
  if (!/^[A-Z\s]+$/.test(campos.rua.value)) {
    mostrarErro(campos.rua, "Use apenas letras maiúsculas.");
    valido = false;
  } else removerErro(campos.rua);
  
  // ID do usuário: só números
  if (!/^\d+$/.test(campos.userId.value)) {
    mostrarErro(campos.userId, "Use apenas números.");
    valido = false;
  } else removerErro(campos.userId);

  // Senha: mínimo 6 caracteres
  if (campos.senha.value.length < 6) {
    mostrarErro(campos.senha, "Mínimo 6 caracteres.");
    valido = false;
  } else removerErro(campos.senha);

  // Termos
  if (!document.getElementById("termos").checked) {
    alert("Você deve aceitar os termos.");
    valido = false;
  }

  if (!valido) return;

  const dados = {
    nome: campos.nome.value,
    cpf: campos.cpf.value,
    telefone: campos.telefone.value,
    email: campos.email.value,
    cep: campos.cep.value,
    rua: campos.rua.value,
    numero: campos.numero.value,
    cidade: campos.cidade.value,
    estado: campos.estado.value,
    userId: campos.userId.value,
    senha: campos.senha.value,
    trilha: document.querySelector("input[name='trilha']:checked")?.value || "",
  };

  localStorage.setItem(`usuario_${dados.userId}`, JSON.stringify(dados));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "index.html";
});

function mostrarErro(input, msg) {
  const erro = input.nextElementSibling;
  erro.textContent = msg;
  erro.style.display = "block";
  input.classList.add("erro");
}

function removerErro(input) {
  const erro = input.nextElementSibling;
  erro.textContent = "";
  erro.style.display = "none";
  input.classList.remove("erro");
}

// CPF
cpf.addEventListener("input", () => {
  cpf.value = cpf.value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});

// Telefone
telefone.addEventListener("input", () => {
  telefone.value = telefone.value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
});

// CEP
cep.addEventListener("input", () => {
  cep.value = cep.value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2");
});

// Abrir modais
document.getElementById('abrirTermos').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('modalTermos').style.display = 'block';
});

document.getElementById('abrirPolitica').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('modalPolitica').style.display = 'block';
});

// Fechar modais
document.getElementById('fecharModalTermos').addEventListener('click', function() {
  document.getElementById('modalTermos').style.display = 'none';
});

document.getElementById('fecharModalPolitica').addEventListener('click', function() {
  document.getElementById('modalPolitica').style.display = 'none';
});

// Fechar se clicar fora do modal
window.addEventListener('click', function(e) {
  if (e.target === document.getElementById('modalTermos')) {
    document.getElementById('modalTermos').style.display = 'none';
  }
  if (e.target === document.getElementById('modalPolitica')) {
    document.getElementById('modalPolitica').style.display = 'none';
  }
});
