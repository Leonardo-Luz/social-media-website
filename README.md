Leonardo Luz <br/>
4º Semestre ADS <br/>

# Projeto Final de Desenvolvimento Web 2

## Descrição
> Foi desenvolvido um projeto com foco principal em um chat em grupo em tempo real e autenticação de usuários

## Tecnologias
1. Typescript
2. Dotenv

1. Cliente
    1. react
    2. react-router-dom
    3. react-hook-form
    4. zod
    5. react-icons
2. Servidor
    1. express
    2. nodemon
    3. ts-node
    4. sequelize
    5. uuid
    6. jsonwebtoken
    7. bcrypt
    8. ws

## Configuração

### Requisitos
1. Nodejs

### Clone o repositório
```
git clone https://github.com/leonardo-luz/social-media-website
cd social-media-website
```

### Baixe as depencias

#### Cliente
```
cd packages/client
npm i
```

#### Servidor
```
cd packages/server
npm i
```

### Váriaveis de Ambiente

#### Cliente
```
cd packages/client
touch .env
```
```
VITE_API_HOST            =      YOUR_API_HOST
VITE_API_PORT            =      YOUR_API_PORT
VITE_API_URL             =      http://YOUT_API_HOST:YOUR_API_PORT/api/v1

VITE_WS_PORT             =      YOUR_WS_PORT
VITE_WS_URL              =      ws://YOUR_WS_HOST:YOUR_WS_PORT
```

#### Servidor
```
cd packages/server
touch .env
```
```
API_HOST            =   YOUR_API_HOST
API_PORT            =   YOUR_API_PORT

WS_PORT             =   YOUR_WS_PORT

JWT_PASS            =   YOUR_JWT_PASSWORD
```

##### POSTGRES
```
POSTGRES_HOST       =   YOUR_POSTGRES_HOST
POSTGRES_PORT       =   YOUR_POSTGRES_PORT
POSTGRES_USER       =   YOUR_POSTGRES_USER
POSTGRES_PASSWORD   =   YOUR_POSTGRES_PASSWORD
POSTGRES_DB         =   YOUR_DATABASE
```

##### MYSQL
```
MYSQL_HOST       =  YOUR_MYSQL_HOST
MYSQL_PORT       =  YOUR_MYSQL_PORT
MYSQL_USER       =  YOUR_MYSQL_USER
MYSQL_PASSWORD   =  YOUR_MYSQL_PASSWORD
MYSQL_DB         =  YOUR_DATABASE
```

### Configure o banco de dados
```
CREATE DATABASE YOUR_DATABASE
```
> O banco é configurado automaticamente ao executar o servidor

## Execute

### Cliente
```
cd social-media-website
npm run client

OR

cd social-media-website/packages/client
npm run dev
```

### Server
```
cd social-media-website
npm run server

OR

cd social-media-website/packages/server
npm run dev
```
