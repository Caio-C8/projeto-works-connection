# Projeto Work's Connection

## Visão geral

Este é um site feito para uma empresa, chamada Dimensional Consultoria, que lida com contratações de candidatos. O que a emrpesa faz é: recomenda vagas para diversos candidatos através de grupos do WhatsApp, Facebook e página do Instagram e o candidato entra em contato com a Dimensional Consultoria, a qual entra em contato com a empresa que disponibilizou a vaga falando do candidato. Então a ideia foi fazer um site onde é possível fazer com que candidatos encontrem vagas e se cadidatem para elas e fazer com que empresas consigam disponibilizar suas vagas.

## Tecnologias Utilizadas

### Front-end

- **HTML5** – Estrutura semântica do conteúdo.
- **CSS3** – Estilização personalizada.
- **JavaScript (Vannila JS)** - Conteúdos dinâmicos e envio de requisições fetch para o back-end.

### Back-end

- **PHP 7.4** - Linguagem usada para processar dados.
- **MySQL 5.7** - Banco de dados relacional.
- **Apache HTTP Server** - Responsável por servir os arquivos do projeto.

### Ambiente de desenvolvimento

- **Docker** - Criação de ambiente personalizado para rodar o projeto localmente.

## Observações

- **Parcialmente funcional** - O projeto não ficou totalmente funcional, sem uma divisão de usuários, com qualquer um conseguindo adicionar vagas, sem cadastro para as vagas e sem pesquisa de vagas, isso devido à falta de conhecimento.
- **Pouca resposividade** - O layout do projeto não foi focado atender diversos dispositivos devido ao curto tempo de desenvolvimento.

## Instruções de execução

1. **Abra o terminal na raiz do projeto**
2. **Se estiver no Windows, clique duas vezes no arquivo 'rebuild.bat' ou execute:**
  ```bash
  ./rebuild.bat
  ```
2. **Se estiver no Linux ou MacOS, execute:**
  ```bash
  ./rebuild.sh
  ```
  **Se o script não for executável, execute antes:**
  ```bash
  chmod +x rebuild.sh
  ```

### Pré-requsitos

- [Docker](https://www.docker.com/products/docker-desktop) instalado.
