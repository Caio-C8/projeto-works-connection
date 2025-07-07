let form_cadastro_candidato = document.getElementById(
  "form-cadastro-candidato"
);
let form_cadastro_empresa = document.getElementById("form-cadastro-empresa");

if (form_cadastro_candidato || form_cadastro_empresa) {
  $(document).ready(function () {
    $("#cpf").inputmask("999.999.999-99");
    $("#cnpj").inputmask("99.999.999/9999-99");
    $("#cel-candidato").inputmask("(99) 9 9999-9999");
    $("#cel-empresa").inputmask("(99) 9 9999-9999");
  });
}

function enviarFormulario(url, formData, formElement, camposObrigatorios) {
  for (let campo of camposObrigatorios) {
    if (!formData.get(campo)) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  }

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na resposta do servidor: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      if (data.success) {
        formElement.reset();
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao tentar cadastrar.");
    });
}

let btn_cadastrar_candidato = document.getElementById(
  "btn-cadastrar-candidato"
);
if (btn_cadastrar_candidato) {
  btn_cadastrar_candidato.addEventListener("click", function (event) {
    event.preventDefault();
    const formData = new FormData(
      document.getElementById("form-cadastro-candidato")
    );
    const camposObrigatorios = [
      "nome",
      "sobrenome",
      "cpf",
      "celular",
      "email",
      "senha",
      "sexo",
      "pais",
      "estado",
    ];
    enviarFormulario(
      "http://localhost:8080/php/cadastro_candidato.php",
      formData,
      document.getElementById("form-cadastro-candidato"),
      camposObrigatorios
    );
  });
}

let btn_cadastrar_empresa = document.getElementById("btn-cadastrar-empresa");
if (btn_cadastrar_empresa) {
  btn_cadastrar_empresa.addEventListener("click", function (event) {
    event.preventDefault();
    const formData = new FormData(
      document.getElementById("form-cadastro-empresa")
    );
    const camposObrigatorios = [
      "razao",
      "nome",
      "cnpj",
      "celular",
      "email",
      "senha",
      "pais",
      "estado",
      "cidade",
      "rua",
      "numero",
    ];
    enviarFormulario(
      "http://localhost:8080/php/cadastro_empresa.php",
      formData,
      document.getElementById("form-cadastro-empresa"),
      camposObrigatorios
    );
  });
}
