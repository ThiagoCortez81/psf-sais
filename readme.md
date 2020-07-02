# SAIS - Desenvolvimento de Aplicações em SI
> Projeto para agendamento e realização de visitas para o Programa Saúde da Familia - PSF

## Pré-Requisitos

Node
NPM
Angular Cli
Ionic 5 Cli

## Servidor

O servidor, desenvolvido em NodeJS, usando Typescript e algumas ferramentas importantes como o Express e integração com MySQL. O mesmo pode ser executado com os seguintes passos:
```
cd server
```
Fazer uma cópia do arquivo ".env.example" e salvar como ".env". Logo após abrir o mesmo e configurar os dados de acesso ao banco de dados.
Após preenchido, executar a instalação das dependências:
```
npm install
```
Uma vez a instalação terminada, fazer um build do projeto usando:
```
npm run build
```
Após finalizado o build, executar o servidor usando
```
npm start
```

Pronto, o servidor NodeJS já está online!

## APP Web usando Angular

A aplicação WEB foi desenvolvida usando o popular framework Angular, com Typescript e para o frontend o Bootstrap na versão 4.

Primeiramente, acesse o diretório do projeto Angular:

```
cd web
```

O primeiro passo é realizar a instalação das dependências. Pelo angular ser um framework denso, pode demorar alguns minutos.
```
npm install
```
Uma vez a instalação terminada, basta executar o comando abaixo, que o próprio Angular fará o trabalho de build e execução do projeto.
```
npm start
```

Pode ser necessário ajustar o IP interno do servidor, para a comunicação correta entre o frontend e o backend. Para isso acesse o arquivo: 'src/app/services/' e edite o arquivo 'webservice.service.ts'.



## APP Mobile usando Ionic

A aplicação mobile foi desenvolvida usando o framework de desenvolvimento híbrido Ionic, com Typescript e alguns plugins nativos importantes, como o de geolocalização. Para a integração nativa, utilizou-se do Cordova, ferramenta de middleware entre o Javascript do build do projeto com funções nativas de cada smartphone.

Primeiramente, acesse o diretório do projeto mobile:

```
cd mobile
```

O primeiro passo é realizar a instalação das dependências. Pelo ionic ter por base ferramentas em javascript, o mesmo tem várias dependências que devem ser baixadas, por isso, pode demorar alguns minutos para completar o processo.
```
npm install
```
Uma vez a instalação terminada, assim como no projeto WEB, basta executar o comando abaixo, que o próprio Ionic se encarregará de buildar e executar o projeto.
```
npm start
```

Pode ser necessário ajustar o IP interno do servidor, para a comunicação correta entre o mobile e o backend. Para isso acesse o arquivo: 'src/app/services/webservices' e edite o arquivo 'webservice.service.ts'.

## Autores

Antônio
Flávio
Isaías
Thiago

Desenvolvido em 2020, UNIFEI - Universidade Federal de Itajubá