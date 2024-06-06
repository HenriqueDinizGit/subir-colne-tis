# Use a imagem base do Node.js
FROM node:alpine

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /server

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package.json .
COPY package-lock.json .

# Instale as dependências do Node.js
RUN npm install

# ENV DATABASE_URL="mysql://root:hsd161203@localhost/muscleuup?schema=public"

# Copie o restante dos arquivos do seu projeto para o diretório de trabalho
COPY . .

RUN npx prisma migrate dev --name update database
RUN npx prisma generate

# Exponha a porta em que o servidor Node.js está ouvindo (geralmente a porta 3000)
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["npm", "start"]
