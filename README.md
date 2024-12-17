  Como usar o projeto

OBS: Antes de começar baixe o xampp.

1º passo: baixe o repositório com os arquivos do projeto e coloque no diretório: C:\xampp\htdocs\(pasta_onde_estarao_os_arquivos)

2º passo: abra o XAMPP Control Panel e inicie as opções Apache e MySQL clicando no botão "start" em frente as opções.

3º passo: no navegador em uma nova guia digite localhost, caso você tenha feito o passo 2 corretamente, uma página vai aparecer.

4º passo: na página do localhost clique em phpMyAdmin.

5º passo: para configurar o banco de dados clique em "Contas de Usuário" e depois "Adicionar conta de usuário"

6º passo: crie uma conta, coloque nome de usuário e senha e guarde eles para usar depois. Na opção "Nome do Host" selecione a opção "Local".

7º passo: na opção "Banco de dados", vá na caixa "Criar banco de dados" e crie um banco de dados com o nome "db_name".

8º passo: agora abra o VScode na pasta do projeto e vá no arquivo "db_connection.php" na pasta "php" e altere as linhas 3 para: $user = "(seu usuario)"; e a linha 4 para: $password = "(sua senha)";

9º passo: ainda na pasta do projeto va na pasta "sql", no arquivo "criar_tabela.sql" e copie todo o conteudo do arquivo.

10º passo: na página do phpMyAdmin selecione o banco de dados que você criou, o "db_name", selecione a opção "SQL" e coloque o código sql que você copiou do VScode e clique em "Executar".

11º passo: com o banco de dados feito, as tabelas criadas e com a conexão com o banco feita, coloque no navegador "localhost/(nome da pasta onde esta os arquivos do projeto)" para acessar o projeto. 

  Caso ocorra algum erro tente pesquisar no navegador por "localhost/(nome da pasta onde esta os arquivos do projeto)/home.html". Se algum outro erro ocorrer pode ser algum erro de conexão com o banco de dados para testar pesquise no navegador "http://localhost/(nome da pasta onde esta os arquivos do projeto)/php/teste.php" caso esteja funcionando uma mensagem de "Conexão bem-sucedida!" vai aparecer. Outro erro pode ser as tabelas do sql ou o nome do banco de dados, caso o nome esteja diferente vá no arquivo db_connection.php e altere a linha 5 para: $dbname = "nome do banco que voce colocou";. Para testar se os dados vão para o banco adicione novas vagas e crie novos usuários no projeto e veja o comportamento. Verifique também se o projeto está na pasta correta no diretório "C:\xampp\htdocs\(pasta_onde_estarao_os_arquivos)" e tenha certeza que as mudanças feitas no VScode foram feitas nessa pasta.
