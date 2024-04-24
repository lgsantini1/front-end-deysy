# Use a imagem base do Node.js (versão 20)
FROM node:20

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o arquivo package.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta 3000 (ou a porta que sua aplicação React usa)
EXPOSE 3000

# Comando para iniciar a aplicação React
CMD ["npm", "start"]
