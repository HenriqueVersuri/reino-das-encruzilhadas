<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Reino das Encruzilhadas

Plataforma mística inspirada nas tradições ancestrais, com frontend React e backend Node.js/SQLite.

## Como rodar localmente

1. Instale as dependências do frontend:
   ```bash
   npm install
   ```
2. Instale e rode o backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Rode o frontend:
   ```bash
   cd ..
   npm run dev
   ```

O frontend estará em http://localhost:3000 e o backend em http://localhost:4000

## Deploy gratuito (Vercel)

1. Faça login em https://vercel.com/
2. Importe este repositório.
3. Vercel detecta o frontend (Vite) e o backend (Node.js) automaticamente.
4. O backend está na pasta `/backend` e será exposto como API serverless.

**Observação:** O SQLite funciona para testes e deploys simples. Para produção, use PostgreSQL ou outro banco externo.
