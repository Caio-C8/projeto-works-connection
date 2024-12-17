// PUBLICAR_VAGAS.HTML
let btn_publicar = document.getElementById('btn-publicar')

if (btn_publicar) {
    document.addEventListener('DOMContentLoaded', function () {
        const editor = new FroalaEditor('#editor');

        btn_publicar.addEventListener('click', function (event) {
            event.preventDefault();

            const nomeEmpresa = document.getElementById('nome-empresa').value;
            const ocupacao = document.getElementById('ocupacao').value;
            const localTrabalho = document.getElementById('local-trabalho').value;
            const modoTrabalho = document.getElementById('modo-trabalho').value;
            const salario = document.getElementById('salario').value;
            const descricao = editor.html.get();
            const dataPublicacao = moment().format('YYYY-MM-DD HH:mm:ss');

            if (!nomeEmpresa || !ocupacao || !localTrabalho || !modoTrabalho || !salario || !descricao) {
                alert("Preencha todos os campos!")
                return;
            } else {
                fetch("http://localhost/projeto/php/publicar_vagas.php", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome_empresa: nomeEmpresa,
                        ocupacao: ocupacao,
                        local_trabalho: localTrabalho,
                        modo_trabalho: modoTrabalho,
                        salario: salario,
                        descricao: descricao,
                        data_publicacao: dataPublicacao
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        alert("Vaga publicada com sucesso!");
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });

                document.getElementById('nome-empresa').value = "";
                document.getElementById('ocupacao').value = "";
                document.getElementById('local-trabalho').value = "";
                document.getElementById('modo-trabalho').value = "";
                document.getElementById('salario').value = "";
                editor.html.set("");
            }

        });
    });
}
// PUBLICAR_VAGAS.HTML

// CADASTRO_CANDIDATO.HTML E CADASTRO_EMPRESAS.HTML
let form_cadastro_candidato = document.getElementById('form-cadastro-candidato');
let form_cadastro_empresa = document.getElementById('form-cadastro-empresa');

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
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.success) {
                formElement.reset();
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Erro ao tentar cadastrar.");
        });
}

let btn_cadastrar_candidato = document.getElementById('btn-cadastrar-candidato');
if (btn_cadastrar_candidato) {
    btn_cadastrar_candidato.addEventListener('click', function (event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById('form-cadastro-candidato'));
        const camposObrigatorios = ['nome', 'sobrenome', 'cpf', 'celular', 'email', 'senha', 'sexo', 'pais', 'estado'];
        enviarFormulario("http://localhost/projeto/php/cadastro_candidato.php", formData, document.getElementById('form-cadastro-candidato'), camposObrigatorios);
    });
}

let btn_cadastrar_empresa = document.getElementById('btn-cadastrar-empresa');
if (btn_cadastrar_empresa) {
    btn_cadastrar_empresa.addEventListener('click', function (event) {
        event.preventDefault();
        const formData = new FormData(document.getElementById('form-cadastro-empresa'));
        const camposObrigatorios = ['razao', 'nome', 'cnpj', 'celular', 'email', 'senha', 'pais', 'estado', 'cidade', 'rua', 'numero'];
        enviarFormulario("http://localhost/projeto/php/cadastro_empresa.php", formData, document.getElementById('form-cadastro-empresa'), camposObrigatorios);
    });
}
// CADASTRO_CANDIDATO.HTML E CADASTRO_EMPRESAS.HTML

// LOGIN.HTML
let btn_login = document.getElementById('btn-login');

if (btn_login) {
    btn_login.addEventListener('click', function (event) {
        event.preventDefault();

        const email = document.getElementById('email-login').value.trim();
        const senha = document.getElementById('senha-login').value.trim();

        if (!email || !senha) {
            alert("Preencha todos os campos.");
            return;
        }

        const formData = new FormData(document.getElementById('form-login'));

        fetch("http://localhost/projeto/php/login.php", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Login realizado com sucesso.");
                    window.location.href = 'perfil.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Erro ao tentar processar a resposta como JSON:', error);
                alert("Erro ao tentar realizar o login.");
            });
    });
}
// LOGIN.HTML

// PERFIL.HTML
let btn_sair_conta = document.getElementById('btn-sair-conta');

if (btn_sair_conta) {
    btn_sair_conta.addEventListener('click', () => {
        fetch('http://localhost/projeto/php/logout.php')
            .then(() => {
                alert("Logout realizado com sucesso")
                window.location.href = 'home.html';
            })
            .catch(error => console.error('Erro ao fazer logout:', error));
    });
}

function verificarLoginParaPerfil() {
    fetch('http://localhost/projeto/php/check_login.php')
        .then(response => response.json())
        .then(data => {
            const currentUrl = window.location.href;

            if (data.logged_in) {
                if (!currentUrl.includes('perfil.html')) {
                    window.location.href = 'perfil.html';
                }
            } else {
                if (!currentUrl.includes('login.html')) {
                    window.location.href = 'login.html';
                }
            }
        })
        .catch(error => {
            console.error('Erro ao verificar login:', error);
            alert("Erro ao verificar login.");
        });
}

let link_perfil = document.getElementById('link-perfil');

if (link_perfil) {
    link_perfil.addEventListener('click', function (event) {
        event.preventDefault();
        verificarLoginParaPerfil();
    });
}

let btn_excluir_conta = document.getElementById('btn-excluir-conta');

if (btn_excluir_conta) {
    btn_excluir_conta.addEventListener('click', function () {
        if (confirm("Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.")) {
            fetch('http://localhost/projeto/php/excluir_conta.php', {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.success) {
                        window.location.href = 'home.html';
                    }
                })
                .catch(error => {
                    console.error('Erro ao excluir a conta:', error);
                    alert("Erro ao tentar excluir a conta.");
                });
        }
    });
}

let nome_perfil = document.getElementById('nome-perfil');

if (nome_perfil) {
    document.addEventListener("DOMContentLoaded", () => {
        fetch('http://localhost/projeto/php/perfil.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    window.location.href = 'login.html';
                    return;
                }

                mostrarPerfil(data);
            })
            .catch(error => console.error('Erro ao carregar o perfil:', error));
    });
}

function mostrarPerfil(data) {
    const { email, tipo, dados } = data;
    let nome_perfil = document.getElementById('nome-perfil');
    let descricao_perfil = document.getElementById('descricao-perfil');
    let foto_perfil = document.getElementById('foto-perfil');

    if (tipo === 'candidato') {
        nome_perfil.innerHTML = `<h1>${dados.nome}</h1><h2>${dados.sobrenome}</h2>`;

        let iniciais = `${dados.nome.charAt(0)}${dados.sobrenome.charAt(0)}`;
        foto_perfil.textContent = iniciais.toUpperCase();
    } else {
        nome_perfil.innerHTML = `<h1>${dados.nome_fantasia}</h1><h2>${dados.razao_social}</h2>`;

        let iniciais = `${dados.nome_fantasia.charAt(0)}${dados.nome_fantasia.charAt(1)}`;
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

let btn_edit_perfil = document.getElementById('btn-edit-perfil');

if (btn_edit_perfil) {
    document.addEventListener('DOMContentLoaded', function () {
        const editor_perfil = new FroalaEditor('#editor-perfil');

        btn_edit_perfil.addEventListener('click', abrirModal);

        document.getElementById('btn-salvar').addEventListener('click', function () {
            const nova_descricao_perfil = editor_perfil.html.get();
            let descricao_perfil = document.getElementById('descricao-perfil');

            fetch("http://localhost/projeto/php/atualizar_descricao.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `descricao=${encodeURIComponent(nova_descricao_perfil)}`
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        descricao_perfil.innerHTML = `${nova_descricao_perfil}`;
                        alert(data.message);
                    } else {
                        alert("Erro ao atualizar a descrição.");
                    }
                })
                .catch(error => console.error('Erro ao atualizar a descrição:', error));
        })
    })
}

let btn_fechar = document.getElementById('btn-fechar');
if (btn_fechar) {
    btn_fechar.addEventListener('click', fecharModal);
}

window.onclick = function (event) {
    const fundo_modal = document.getElementById("modal-fundo");
    if (event.target === fundo_modal) {
        fecharModal();
    }
};
// PERFIL.HTML

// VAGAS.HTML
let div_vagas = document.getElementById('bloco-vagas');
let vagaSelecionada = null;

if (div_vagas) {
    document.addEventListener('DOMContentLoaded', function () {
        criaVagas();
    });
}

function criaVagas() {
    fetch("http://localhost/projeto/php/listar_vagas.php")
        .then(response => response.json())
        .then(data => {
            const blocoVagas = document.getElementById("bloco-vagas");
            blocoVagas.innerHTML = '';

            data.forEach(vaga => {
                const vagaButton = document.createElement("button");
                vagaButton.classList.add("vaga");

                let tempo_publicacao = moment(vaga.data_publicacao).fromNow();
                tempo_publicacao = tempo_publicacao.charAt(0).toUpperCase() + tempo_publicacao.slice(1);

                let descricao_sem_formatacao = vaga.descricao
                    .replace(/<br\s*\/?>/gi, "\n")
                    .replace(/<\/(p|div|h[1-6])>/gi, "\n")
                    .replace(/<[^>]*>?/gm, '')
                    .replace(/(\d)\.\s?(\d{3})/g, "$1.$2")
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.length > 0)
                    .map(line => {
                        if (/[.!?;:]$/.test(line)) {
                            return line;
                        } else {
                            return line + '.';
                        }
                    })
                    .join('\n')
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

                vagaButton.addEventListener('click', function () {
                    if (vagaSelecionada) {
                        vagaSelecionada.classList.remove('selecionado');
                    }

                    vagaSelecionada = vagaButton;
                    vagaSelecionada.classList.add('selecionado');

                    exibirVagaDetalhada(vaga);
                });

                blocoVagas.appendChild(vagaButton);
            });
        })
        .catch(error => console.error("Erro ao carregar vagas:", error));
}

function exibirVagaDetalhada(vaga) {
    const vaga_principal = document.getElementById('vaga-principal');
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

    vaga_principal.classList.add('visivel');

    let fechar_vaga = document.getElementById('fechar-vaga');
    fechar_vaga.addEventListener('click', function () {
        vaga_principal.classList.remove('visivel');

        if (vagaSelecionada) {
            vagaSelecionada.classList.remove('selecionado');
            vagaSelecionada = null;
        }
    });
}
// VAGAS.HTML