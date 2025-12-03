## PROJ-LANDINGPAGE
- Landing Page de Captura de E-mails para E-book
Este projeto é uma Landing Page simples e responsiva criada para promover um E-book gratuito sobre HTML, CSS e JavaScript. Ele captura e-mails de visitantes e os salva no backend.

## Funcionalidades Principais

  * **Frontend:** Exibe o material promocional e coleta dados do usuário via formulário.
  * **Backend:** Um servidor Node.js que recebe os dados e os armazena no arquivo `data.json`.

## Tecnologias

  * **Frontend:** HTML5, CSS3 (com Flexbox para responsividade) e JavaScript.
  * **Backend:** Node.js e Express.

## Etapas de Desenvolvimento

O projeto foi desenvolvido em três etapas principais:

1.  Criação da estrutura e do design responsivo com HTML/CSS (Flexbox).
2.  Implementação da validação front-end com JavaScript.
3.  Configuração do servidor Node.js/Express para receber a requisição `POST /register` e salvar os dados no arquivo `data.json`.

## Estrutura (Pastas Chave)

```
PROJ-LANDINGPAGE/
├── backend/
│   ├── node_modules/       
│   ├── public/          - Arquivos do Front-end
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   ├── data.json       - Onde os e-mails são salvos
│   ├── package.json       
│   └── server.js       -Servidor Express.js
└── README.md
```
## Como Executar

Você precisa ter o Node.js instalado.

1.  **Clone o projeto e acesse a pasta:**

    ```bash
    git clone https://github.com/angelaaraujo-jpg/proj-landingpage
    cd PROJ-LANDINGPAGE/backend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor:**

    ```bash
    node server.js
    ```

4.  #Acesse: Abra seu navegador e vá para `http://localhost:8080`.


Desenvolvido por: Angela Araújo ([@angelaaraujo-jpg](https://github.com/angelaaraujo-jpg))

