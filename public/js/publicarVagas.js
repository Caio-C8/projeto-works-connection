let btn_publicar = document.getElementById("btn-publicar");

if (btn_publicar) {
  document.addEventListener("DOMContentLoaded", function () {
    const editor = new FroalaEditor("#editor");

    btn_publicar.addEventListener("click", function (event) {
      event.preventDefault();

      const nomeEmpresa = document.getElementById("nome-empresa").value;
      const ocupacao = document.getElementById("ocupacao").value;
      const localTrabalho = document.getElementById("local-trabalho").value;
      const modoTrabalho = document.getElementById("modo-trabalho").value;
      const salario = document.getElementById("salario").value;
      const descricao = editor.html.get();
      const dataPublicacao = moment().format("YYYY-MM-DD HH:mm:ss");

      if (
        !nomeEmpresa ||
        !ocupacao ||
        !localTrabalho ||
        !modoTrabalho ||
        !salario ||
        !descricao
      ) {
        alert("Preencha todos os campos!");
        return;
      } else {
        fetch("http://localhost:8080/php/publicar_vagas.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome_empresa: nomeEmpresa,
            ocupacao: ocupacao,
            local_trabalho: localTrabalho,
            modo_trabalho: modoTrabalho,
            salario: salario,
            descricao: descricao,
            data_publicacao: dataPublicacao,
          }),
        })
          .then((response) => response.text())
          .then((data) => {
            alert("Vaga publicada com sucesso!");
          })
          .catch((error) => {
            console.error("Erro:", error);
          });

        document.getElementById("nome-empresa").value = "";
        document.getElementById("ocupacao").value = "";
        document.getElementById("local-trabalho").value = "";
        document.getElementById("modo-trabalho").value = "";
        document.getElementById("salario").value = "";
        editor.html.set("");
      }
    });
  });
}
