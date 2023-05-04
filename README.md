# Back-end Engineer Test

## Olá!

Para iniciar o projeto utilize o comando "npm install" na raiz do projeto para instalar as dependencias
Após instalar as dependencias utilize o comando "npm run dev"

Conecte se ao MySQL usando o XAMPP ao clicar na action "Start"

Crie um banco de dados chamado "backendtest" com uma tabela chamada "cashflow" com os seguintes atributos

![image](https://user-images.githubusercontent.com/102544229/236215532-15dff39e-3ba6-4107-a94c-d04580564e31.png)

![image](https://user-images.githubusercontent.com/102544229/236215617-dc8b0f0a-48de-4e85-9384-caf322c3181c.png)

# Rotas

## "/cashflow" - GET 
Retorna todas as informações referente ao mes e dia atual

## "/cashflow/account" - GET
Retorna todas as informações do usuario independente da data e o saldo final

## "/cashflow/create" - POST
Cria uma nova interação do usuario, espera por esses parametros 

![image](https://user-images.githubusercontent.com/102544229/236216852-502ac2d7-1cb3-4ee0-95a5-29027b7302d1.png)

## "/cashflow/bymonth" - POST
Envia o mes e ano e retorna todas as informações de acordo com esses dois parametros, espera por esses parametros
O ano deve ser um Numero enquanto mes uma String

![image](https://user-images.githubusercontent.com/102544229/236217405-43903256-e4dc-449f-b2a6-5d013ee014e4.png)


