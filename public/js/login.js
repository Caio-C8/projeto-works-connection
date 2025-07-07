let btn_login = document.getElementById("btn-login");

if (btn_login) {
  btn_login.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email-login").value.trim();
    const senha = document.getElementById("senha-login").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    const formData = new FormData(document.getElementById("form-login"));

    fetch("http://localhost:8080/php/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Login realizado com sucesso.");
          window.location.href = "perfil.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erro ao tentar processar a resposta como JSON:", error);
        alert("Erro ao tentar realizar o login.");
      });
  });
}
