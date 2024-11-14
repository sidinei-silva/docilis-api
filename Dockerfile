# Use uma imagem oficial do Node.js como base
FROM node:20
# Instale o Netcat (especificamente a implementação openbsd)
RUN apt-get update && apt-get install -y netcat-openbsd
# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app
# Copie o arquivo package.json e yarn.lock
COPY package.json yarn.lock ./
# Instale as dependências do projeto usando Yarn
RUN yarn install
# Copie o código do aplicativo para o contêiner
COPY . .
# Adicione o script de espera ao contêiner
COPY wait-for-postgres.sh ./
RUN chmod +x wait-for-postgres.sh
# Compile o TypeScript
RUN yarn build
# Adicione o script de espera antes de rodar as migrações
CMD ./wait-for-postgres.sh && yarn migration:show && yarn migration:run && yarn start:prod
# Exponha a porta que o aplicativo NestJS usará
EXPOSE 3333