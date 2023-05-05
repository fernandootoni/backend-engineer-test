# Back-end Engineer Test

## Olá!

Para iniciar o projeto utilize o comando "npm install" na raiz do projeto para instalar as dependências. Após a instalação utilize o comando "npm run dev"

Conecte se ao MySQL usando o XAMPP ao clicar na action "Start"

Crie um banco de dados chamado "backendtest" com uma tabela chamada "cashflow" com os seguintes atributos

![image](https://user-images.githubusercontent.com/102544229/236215532-15dff39e-3ba6-4107-a94c-d04580564e31.png)

![image](https://user-images.githubusercontent.com/102544229/236215617-dc8b0f0a-48de-4e85-9384-caf322c3181c.png)

# Rotas

## Você deve passar o "id" do usuário pelo "headers" da requisição para acessar corretamente todas as rotas

![image](https://user-images.githubusercontent.com/102544229/236219825-40f12f07-c609-4ffd-8678-5f27ce831c9d.png)

## "/cashflow" - GET 
Retorna todas as informações referente ao mês, semana e dia atual, junto com o saldo final de cada

## "/cashflow/account" - GET
Retorna todas as informações do usuário independente da data e o saldo final

## "/cashflow/create" - POST
Cria uma nova interação do usuario, espera por esses parâmetros 

![image](https://user-images.githubusercontent.com/102544229/236216852-502ac2d7-1cb3-4ee0-95a5-29027b7302d1.png)

## "/cashflow/bymonth" - POST
Envia o mês e ano e retorna todas as informações de acordo com essas informações, espera por esses parametros
O ano deve ser um Numero enquanto mês uma String

![image](https://user-images.githubusercontent.com/102544229/236217405-43903256-e4dc-449f-b2a6-5d013ee014e4.png)

## "/cashflow/:id" - POST
Atualiza o cashflow de acordo com o "id" informado no params, o cashflow precisa ter o mesmo id de usuario que o id passado no header para poder ser atualizado
Recebe esses parametros no body

![image](https://user-images.githubusercontent.com/102544229/236354789-4e6af403-ebd1-47c0-8b4c-640fc81b8851.png)

## "/cashflow/:id" - DELETE
Deleta o cashflow de acordo com o id informado no params, o userId do cashflow precisa ter o mesmo id do headers


