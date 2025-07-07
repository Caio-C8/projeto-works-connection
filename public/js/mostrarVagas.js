let div_vagas = document.getElementById("bloco-vagas");
let vagaSelecionada = null;

if (div_vagas) {
  document.addEventListener("DOMContentLoaded", function () {
    criaVagas();
  });
}

function criaVagas() {
  fetch("http://localhost:8080/php/listar_vagas.php")
    .then((response) => response.json())
    .then((data) => {
      const blocoVagas = document.getElementById("bloco-vagas");
      blocoVagas.innerHTML = "";

      if (!data || data.length === 0) {
        const mainVagas = document.getElementById("vagas");
        mainVagas.style.display = "block";
        mainVagas.innerHTML =
          "<h2 style='text-align:center; margin-top: 2rem;'>Não há vagas cadastradas.</h2>";
        return;
      }

      data.forEach((vaga) => {
        const vagaButton = document.createElement("button");
        vagaButton.classList.add("vaga");

        let tempo_publicacao = moment(vaga.data_publicacao).fromNow();
        tempo_publicacao =
          tempo_publicacao.charAt(0).toUpperCase() + tempo_publicacao.slice(1);

        let descricao_sem_formatacao = vaga.descricao
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<\/(p|div|h[1-6])>/gi, "\n")
          .replace(/<[^>]*>?/gm, "")
          .replace(/(\d)\.\s?(\d{3})/g, "$1.$2")
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)
          .map((line) => {
            if (/[.!?;:]$/.test(line)) {
              return line;
            } else {
              return line + ".";
            }
          })
          .join("\n")
          .replace(/\.([^\s\d])/g, ". $1");

        vagaButton.innerHTML = `
                    <div class="cabecalho">
                        <span>
                            <h1>${vaga.ocupacao}</h1>
                            <h3>${tempo_publicacao}</h3>
                        </span>
                        <h2>${vaga.nome_empresa}</h2>
                    </div>
                    <div class="requisitos">
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="currentColor"
                                class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            </svg>
                            ${vaga.local_trabalho}
                        </h3>
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" height="19" fill="currentColor"
                                class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                <path
                                    d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                            </svg>
                            ${vaga.salario}
                        </h3>
                        <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="currentColor" class="bi bi-building"
                                viewBox="0 0 16 16">
                                <path
                                    d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                                <path
                                    d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
                            </svg>
                            ${vaga.modo_trabalho}
                        </h3>
                    </div>
                    <div class="descricao-resumida">
                        ${descricao_sem_formatacao}
                    </div>
                `;

        vagaButton.addEventListener("click", function () {
          if (vagaSelecionada) {
            vagaSelecionada.classList.remove("selecionado");
          }

          vagaSelecionada = vagaButton;
          vagaSelecionada.classList.add("selecionado");

          exibirVagaDetalhada(vaga);
        });

        blocoVagas.appendChild(vagaButton);
      });
    })
    .catch((error) => console.error("Erro ao carregar vagas:", error));
}

function exibirVagaDetalhada(vaga) {
  const vaga_principal = document.getElementById("vaga-principal");
  vaga_principal.innerHTML = `
        <div class="fechar-vaga">
            <button id="fechar-vaga">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"/>
                </svg>
            </button>
            <h1>${vaga.ocupacao}</h1>
        </div>
        <div id="requisitos">
            <h3>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="currentColor" class="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                ${vaga.local_trabalho}
            </h3>
            <h3>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="currentColor"
                    class="bi bi-currency-dollar" viewBox="0 0 16 16">
                    <path
                        d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                </svg>
                ${vaga.salario}
            </h3>
            <h3>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="currentColor" class="bi bi-building"
                    viewBox="0 0 16 16">
                    <path
                        d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                    <path
                        d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
                </svg>
                ${vaga.modo_trabalho}
            </h3>
        </div>
        <div class="btn-candidatar">
            <button class="btn" id="btn-candidatar">CANDIDATAR</button>
        </div>
        <hr>
        <div id="descricao">
            ${vaga.descricao}
        </div>`;

  vaga_principal.classList.add("visivel");

  let fechar_vaga = document.getElementById("fechar-vaga");
  fechar_vaga.addEventListener("click", function () {
    vaga_principal.classList.remove("visivel");

    if (vagaSelecionada) {
      vagaSelecionada.classList.remove("selecionado");
      vagaSelecionada = null;
    }
  });
}
