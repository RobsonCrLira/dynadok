# Dynadok

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuração do Ambiente

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd api-Dynadok
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente conforme o arquivo `.env.homolog` de exemplo.

## Executando o Projeto

### Subindo os Serviços com Docker Compose

Para iniciar os serviços do Redis e RabbitMQ, execute:

```bash
docker-compose up -d
```

### Executando a Aplicação

Para iniciar o servidor, execute:

```bash
npm run dev
```

A API estará disponível em [http://localhost:3000](http://localhost:3000).

### Iniciando o Consumidor de Mensagens

Para iniciar o consumidor de mensagens, execute:

```bash
ts-node src/infra/queue/startConsumer.ts
```

## Documentação da API

Acesse a documentação da API em [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Estrutura do Projeto

O projeto segue a seguinte estrutura:

```
api-Dynadok/
├── src/
│   ├── main/
│   ├── infra/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   ├── config/
│   ├── shared/
│   ├── factories/
│   ├── data/
│   ├── prisma/
│   ├── adapter/
│   ├── usecase/
│   ├── interfaces/
│   ├── errors/
│   ├── users/
│   ├── services/
│   ├── controllers/
│   ├── repositories/
│   ├── validations/
│   ├── queue/
│   └── cache/
├── prisma/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── README.md
└── .env.example
```
