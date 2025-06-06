# Desafio Técnico
para a vaga de dev junior

> [link para os detalhes técnicos do desafio](https://github.com/GrupoRivesa/recrutamento-dev-junior-2025)

Já de antemão, gostaria de agradecer a oportunidade de participar desse desafio técnico.

---

## Detalhes do Projeto
O projeto foi feito com [adonis js](https://docs.adonisjs.com/guides/preface/introduction) na versão 6 e com banco de dados [mysql](https://www.mysql.com)


## Instalação
Para a utilização do projeto deve-se ter instalado na máquina o **Node.js versão 20 ou superior** e o **mysql** 

Ao fazer o download do repositório, abra o terminal na pasta do projeto e utilize o comando `npm install` para instalar todas as dependências do projeto.

Certifique-se de que no arquivo `.env` tenha o **DB_PASSWORD** e **DB_DATABASE** do banco de dados mysql da máquina, o resto das configurações de banco de dados está como default.


## Utilização
Para iniciar o servidor use o comando `node ace serve` no terminal na pasta do projeto. Ao fazer isso, um servidor será inicializado no endereço **http://localhost:3333**

## API Endpoints
Para a utilização da API deve-se ter o token `Bearer 1234567890abcdef` no header `Authorization` assim como pedido no desafio. Sem esse token nem uma rota será acessível.

- `POST   /api/vehicles/create`  criar um novo veículo.
- `GET    /api/vehicles/all`     listar todos os veículos.
- `GET    /api/vehicles/:id`     buscar um veículo por ID.
- `PUT    /api/vehicles/:id`     atualizar os dados de um veículo.
- `DELETE /api/vehicles/:id`     deletar um veículo.

Para criar um veículo novo na rota `POST   /api/vehicles/create` os campos **vin**, **placa**, **modelo**,**data_fabricacao** e **documento_proprietario** são obrigatorios. todos os campos passam por uma validação com regras reais, então devem ser preencidos de forma correta, exemplo:
```json
{
	"vin":"1HGCM82633A004352", //outro exemplo 9BWZZZ377VT004251
	"placa":"BRA1A23", //outro exemplo XYZ4B67
	"modelo":"caminhão",
	"data_fabricacao":"2010-06-18",
	"documento_proprietario":"73216189005" //ou cnpj 45723174000110
}
```
Para atualizar os dados de um veículo, os campos **toChange** e **value** devem ser preenchidos, **toChange** para o que deve ser trocado e **value** com o novo dado.
```json
{
	"toChange":"modelo",
	"value":"caminhão"
}
```
Os campos para mudança no **toChange** são:
    'placa',
    'modelo',
    'data_entrega',
    'data_fabricacao',
    'data_venda',
    'pais_operacao',
    'concessionaria_venda',
    'data_ultimo_reparo',
    'documento_proprietario',
    
---

Para qualquer esclarecimento sobre o projeto, é só me chamar no meu [linkedIn](https://www.linkedin.com/in/jonatan-de-oliveira-4452bb209/)
