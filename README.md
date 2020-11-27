# **Confira o jogo em sua última versão:**
https://winterjeferson.github.io/open-source-adventure/production/

# **Objetivos:**
* Manter um código limpo e acessível, independente do nível de experiência do desenvolvedor.
* Separar o **Front end** do **Back end**, facilitando a integração em diferentes linguagens.

# Dependências:
* **NPM: https://www.npmjs.com/get-npm**
* **Gulp JS: https://gulpjs.com/docs/en/getting-started/quick-start**
* Servidor Local

# Recomendações:
* VS Code: https://code.visualstudio.com/
* Servidor: https://www.apachefriends.org/pt_br/index.html

# Estrutura de pastas:
* Pasta **development**: Onde ficam os arquivos abertos e onde devem ser alterados. Conhecida como **SRC** em muitos projetos. Deve ser versionada.
* Pasta **homologation**: Onde os arquivos em desenvolvimento são exibidos no navegador. Não deve ser versionada.
* Pasta **production**: Onde os arquivos são minificados após a conclusão do desenvolvimento. Conhecida como **DIST** em muitos projetos. Não deve ser versionada.

# Estrutura de repositórios:
* **Master > patch-XX-XX-XX**
* Deve ser clonado o repositório relativo ao patch atual. 
* O repositório Master é o que estará disponível para a visualização no endereço de Github Pages.

# Começando o desenvolvimento:
* Clone o projeto
* Abra um terminal na pasta **development/gulp** e execute o comando: **npm install**
* Após a conclusão, abra um terminal na pasta **development/gulp** e execute o comando: **gulp**
* Altere os arquivos na pasta **development** de acordo com sua task.
* Visualize as alterações através de um endereço **localhost**.
* Após a conclusão, abrir um Pool Request para a branch **patch-XX-XX-XX**. 
