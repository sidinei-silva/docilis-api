# Fase 1: Dependências de desenvolvimento e hot reload
FROM node:20 AS development

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências do projeto usando Yarn
RUN yarn install

# Copie o código do aplicativo para o contêiner
COPY . .

# Exponha a porta que o aplicativo NestJS usará
EXPOSE 3333

# Comando de desenvolvimento com hot reload
CMD ["yarn", "start:dev"]

# Fase 2: Build para produção
FROM node:20 AS production

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e yarn.lock
COPY package.json yarn.lock ./

# Instale apenas as dependências de produção
RUN yarn install --production

# Copie o código do aplicativo para o contêiner
COPY . .

# Compile o código TypeScript
RUN yarn build

# Exponha a porta que o aplicativo NestJS usará
EXPOSE 3333

# Comando para rodar o aplicativo em produção
CMD ["yarn", "start:prod"]