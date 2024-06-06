# Use a imagem base do Node.js
FROM node:16

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /client

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package.json .
COPY package-lock.json .

# Instale as dependências do React
RUN npm install
RUN npm install bcrypt@latest --save

# Copie o restante dos arquivos do seu projeto React para o diretório de trabalho
COPY . .

# Exponha a porta em que o servidor React está ouvindo (geralmente a porta 3000)
EXPOSE 5173

# Comando para iniciar o servidor React
CMD ["npm", "run", "dev", "--", "--host"]