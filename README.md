# Encurtador de URL Backend NodeJS

Projeto Template Backend NODEJS - Modelo John Papa


Configuração Schemas e Rotas:

- server\bin\bin.db.js: Adicionar os Schemas e Inicializar os mesmos;
    
- server/bin/bin.routes.js: Adicionar as Rotas utilizadas pelo sistema;
    

Configuração de Conexão com Database:

- server/configs/config.js: Setar arquivo de Development ou Production;

- server/configs/config.development.js: Configuração de Database QA/LOCALHOST;

- server/configs/config.production.js: Configuração de Database Production;


Configuração de Módulos:

- back_end/modules: Para cada módulo do sistema adotar padrão
    
    - NOME_MODULO
        - NOME_MODULO.controller
        - NOME_MODULO.model
        - NOME_MODULO.route
        - NOME_MODULO.schema 
 
                        
Requisítos para Inicializar Projeto:

- NodeJS;
- MongoDB;


Para Inicializar:

- Execute o comando "npm i" para instalar as dependências;
- Execute o comando "node app" na raiz do projeto;