# 2404-api-node-express
Projeto Node.js utilizado para implementar filtros, paginação e erros em APIs REST utilizando gerenciador NoSQL MongoDB Atlas e frameworks EXPRESS e biblioteca Mongoose.

ESCOPO

    Node.JS
    - Criação de projeto com Node.JS versão 20

    Base MongoDB
    - Criação de collection no MongoDB Atlas
    - Configuração de variável de ambiente e uso de biblioteca dotenv

    Erros:
    - Implementada uma maior Resiliência nas APIs através de tratamento de erros que retornam o status HTTP correspondente.
    - Implementada validação avançada de rotas e erros de parâmetros.

    Validação com Mongoose:
    - Implementada validação padrão e personalizada em model.

    Buscas e Filtros:
    - Implementada busca básica.
    - Implementada regex em buscas e operadores do MongoDB.

    Paginação e Ordenação:
    - Implementada paginação genérica e reutilização nas rotas GET.
    - Implementada ordenação de resultados pelo campo desejado.
    - Implementado populate de um model referenciado por outro em buscas.

CONFIGURAÇÃO

    GitHub
    Clone o projeto no Visual Studio Code

    Base de dados não estruturada
        Deve-se criar uma base de dados no MongoDB Atlas
            Passo 1: Criar conta em https://www.mongodb.com/atlas
            Passo 2: Em New Project crie um projeto novo, ex: livraria-servless
            Passo 3: Em Create Database crie uma base, ex: livraria
            Passo 4: Escolha a opção M0 Free no AWS região us-east-1, botão Create
            Passo 5: Defina username and password e Create User
            Passo 6: Na seção Where would you like to connect from? escolha My Local Environment.
            Passo 7: Go to Database e depois Connect no cluster que acabamos de criar
            Passo 8: Escolha Driver e copie a connection string
            Passo 9: Utilize a string copiada no projeto Node.JS.

        Após a criação da base, é gerada uma connection string que deve ser preenchida no arquivo api-node-express-2/.env
        DB_CONNECTION_STRING=<mongodb>, onde <mongodb> se refere a connection string gerada ao se criar a base.

SERVIDOR

    Instalar as dependências descritas em package.json
    Subir o servidor: npm run dev

APIS

    Autor
        Inserção de novos autores
        POST - http://localhost:3000/autores
                {
                    "nome":"John Doe",
                    "nacionalidade":"American"
                }

        Consulta de autores cadastrados
        GET - http://localhost:3000/autores/

        Atualização de um autor
        PUT - http://localhost:3000/autores/<_id>?nome=<nome>>&nacionalidade=<nacionalidade>
            Onde,
            <_id> é identificada através da consulta de autores cadastrados
            <nome> novo valor de nome a ser atualizado
            <nacionalidade> novo valor de nacionalidade a ser atualizado

    Livro
        Inserção de novo livro    
        POST - 
                {
                "titulo": "O mar",
                "autor": "<_id>", // Onde <_id> deve ser substituído pelo identificador de um autor existente
                "editora": "Editora Oceânica",
                "numeroPaginas": 305
                }

        Consulta de livros cadastrados
        GET - http://localhost:3000/livros/        

        Atualização de um autor
        PUT - http://localhost:3000/livros/<_id>
            Onde, <_id> deve ser substituído pelo identificador de um livro existente

    Busca livro
        GET - http://localhost:3000/livros/busca?nomeAutor=<autor>&campoOrdenacao=titulo&ordem=1&pagina=1&limite=5
            Onde <autor> se refere a um autor criado anteriormente.
            campoOrdenacao se refere ao campo que se deseja ordenar os resultados, por exemplo titulo, o valor default é _id que ordena de forma ascendente da criação de livros
            ordem sendo 1 para ordenação ascendente e -1 para descendente, o valor default é -1
            limite se refere à quantidade de livros por página, o valor default é 4
            pagina se refere à qual página se está buscando, o valor default é 1 representando a primeira página
            minPagina se refere à quantidade de mínima de páginas de um livro a se considerar na busca
            maxPagina se refere à quantidade de máxima de páginas de um livro a se considerar na busca




