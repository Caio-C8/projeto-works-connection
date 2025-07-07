let btn_sair_conta = document.getElementById("btn-sair-conta");

if (btn_sair_conta) {
  btn_sair_conta.addEventListener("click", () => {
    fetch("http://localhost:8080/php/logout.php")
      .then(() => {
        alert("Logout realizado com sucesso");
        window.location.href = "/";
      })
      .catch((error) => console.error("Erro ao fazer logout:", error));
  });
}

let btn_excluir_conta = document.getElementById("btn-excluir-conta");

if (btn_excluir_conta) {
  btn_excluir_conta.addEventListener("click", function () {
    if (
      confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita."
      )
    ) {
      fetch("http://localhost:8080/php/excluir_conta.php", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          if (data.success) {
            window.location.href = "index.html";
          }
        })
        .catch((error) => {
          console.error("Erro ao excluir a conta:", error);
          alert("Erro ao tentar excluir a conta.");
        });
    }
  });
}

let nome_perfil = document.getElementById("nome-perfil");

if (nome_perfil) {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:8080/php/perfil.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          window.location.href = "login.html";
          return;
        }

        mostrarPerfil(data);
      })
      .catch((error) => console.error("Erro ao carregar o perfil:", error));
  });
}

function mostrarPerfil(data) {
  const { email, tipo, dados } = data;
  let nome_perfil = document.getElementById("nome-perfil");
  let descricao_perfil = document.getElementById("descricao-perfil");
  let foto_perfil = document.getElementById("foto-perfil");

  if (tipo === "candidato") {
    nome_perfil.innerHTML = `<h1>${dados.nome}</h1><h2>${dados.sobrenome}</h2>`;

    let iniciais = `${dados.nome.charAt(0)}${dados.sobrenome.charAt(0)}`;
    foto_perfil.textContent = iniciais.toUpperCase();
  } else {
    nome_perfil.innerHTML = `<h1>${dados.nome_fantasia}</h1><h2>${dados.razao_social}</h2>`;

    let iniciais = `${dados.nome_fantasia.charAt(
      0
    )}${dados.nome_fantasia.charAt(1)}`;
    foto_perfil.textContent = iniciais.toUpperCase();
  }

  if (dados.descricao && dados.descricao.trim() !== "") {
    // Exibe a descrição se existir
    descricao_perfil.innerHTML = `${dados.descricao}`;
  } else {
    descricao_perfil.innerHTML = `
            <div id="contato" class="perfil-contato">
                <h1>Contato</h1>
                <p>${dados.celular}</p>
                <p>${email}</p>
            </div>
            <div id="endereco" class="perfil-endereco">
                <h1>Endereço</h1>
                <p>${dados.pais}</p>
                <p>${dados.estado}</p>
                ${dados.cidade ? `<p>${dados.cidade}</p>` : ""}
                ${dados.rua ? `<p>${dados.rua}</p>` : ""}
                ${dados.numero ? `<p>${dados.numero}</p>` : ""}
            </div>`;
  }
}

function abrirModal() {
  const modal = document.getElementById("modal-perfil");
  const fundo_modal = document.getElementById("modal-fundo");

  modal.classList.add("show");
  fundo_modal.classList.add("show-fundo");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  const modal = document.getElementById("modal-perfil");
  const fundo_modal = document.getElementById("modal-fundo");

  modal.classList.remove("show");
  fundo_modal.classList.remove("show-fundo");
  document.body.style.overflow = "";
}

let btn_edit_perfil = document.getElementById("btn-edit-perfil");

if (btn_edit_perfil) {
  document.addEventListener("DOMContentLoaded", function () {
    const editor_perfil = new FroalaEditor("#editor-perfil");

    btn_edit_perfil.addEventListener("click", abrirModal);

    document
      .getElementById("btn-salvar")
      .addEventListener("click", function () {
        const nova_descricao_perfil = editor_perfil.html.get();
        let descricao_perfil = document.getElementById("descricao-perfil");

        fetch("http://localhost:8080/php/atualizar_descricao.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `descricao=${encodeURIComponent(nova_descricao_perfil)}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              descricao_perfil.innerHTML = `${nova_descricao_perfil}`;
              alert(data.message);
            } else {
              alert("Erro ao atualizar a descrição.");
            }
          })
          .catch((error) =>
            console.error("Erro ao atualizar a descrição:", error)
          );
      });
  });
}

let btn_fechar = document.getElementById("btn-fechar");
if (btn_fechar) {
  btn_fechar.addEventListener("click", fecharModal);
}

window.onclick = function (event) {
  const fundo_modal = document.getElementById("modal-fundo");
  if (event.target === fundo_modal) {
    fecharModal();
  }
};
