function verificarLoginParaPerfil() {
  fetch("http://localhost:8080/php/check_login.php", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      const currentUrl = window.location.href;

      if (data.logged_in) {
        if (!currentUrl.includes("perfil.html")) {
          window.location.href = "perfil.html";
        }
      } else {
        if (!currentUrl.includes("login.html")) {
          window.location.href = "login.html";
        }
      }
    })
    .catch((error) => {
      console.error("Erro ao verificar login:", error);
      alert("Erro ao verificar login.");
    });
}

let link_perfil = document.getElementById("link-perfil");

if (link_perfil) {
  link_perfil.addEventListener("click", function (event) {
    event.preventDefault();
    verificarLoginParaPerfil();
  });
}
