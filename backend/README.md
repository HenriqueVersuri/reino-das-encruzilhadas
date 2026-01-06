# Backend Node.js - Reino das Encruzilhadas

Este backend usa Express e SQLite para armazenar mensagens do oráculo.

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm run dev
   ```

O backend estará disponível em http://localhost:4000

## Rotas disponíveis
- `GET /messages` — Lista todas as mensagens
- `POST /messages` — Adiciona uma nova mensagem
- `DELETE /messages/:id` — Remove uma mensagem

O banco de dados é salvo em `database.sqlite` na pasta backend.

## Deploy gratuito
Sugestão: use Railway ou Vercel Serverless Functions para deploy gratuito.
