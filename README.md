# :car: Projeto FordEnter - Dashboard

Um Dashboard de informações de veículos desenvolvido como desafio do programa [FordEnter](https://www.ford.com.br/sobre-a-ford/ford-enter/) em parceria com o [SENAI-CIMATEC](https://www.senaicimatec.com.br).

## ✨ Funcionalidades

- Autenticação/Login
- Informações e Autorização de acordo com o tipo de usuário (admin ou user)
- Exibição dinâmica de informações dos modelos de carros
- Busca de informações precisar sobre um carro através do (VinCode)
- Cadastro e edição de usuários com formulário validado
- Modal dinâmico com conteúdos reutilizáveis (formulário ou lista)
- Controle de estado do formulário com Signals (`formState`)
- Sistema de mensagens de sucesso e erro
- Exibição dinâmica do título do modal baseado no estado atual

## 📁 Estrutura do Projeto

```
src
 ┣ app
 ┃ ┣ components
 ┃ ┣ guards
 ┃ ┣ interfaces
 ┃ ┣ pages
 ┃ ┃ ┣ dashboard
 ┃ ┃ ┣ home
 ┃ ┃ ┣ login
 ┃ ┃ ┗ not-found-page
 ┃ ┣ services
 ┃ ┣ types
 ┃ ┣ app.component.html
 ┃ ┣ app.component.scss
 ┃ ┣ app.component.ts
 ┃ ┣ app.config.ts
 ┃ ┗ app.routes.ts
 ┣ environments
 ┣ styles
 ┃ ┣ _bootstrap-custom.scss
 ┃ ┗ _variables.scss
 ┣ index.html
 ┣ main.ts
 ┗ styles.scss
```

## 🛠️ Tecnologias Utilizadas

- **Angular 19+**
- **Bootstrap 5 (via CDN e integração JS)**
- **RxJS + Angular Signals**
- **Forms reativos (Reactive Forms)**
- **TypeScript**


## 🚀 Como Rodar o Projeto

1. **Clone o repositório**
```bash
git clone https://github.com/alvarento/fordenter_dashboard.git
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
ng serve
```

4. Acesse em `http://localhost:4200`.

### Rodando Localmente em Dispositivos Móveis 📱
(Computador e Dispositivo precisam estar na mesma rede)

* Rode o comando `ipconfig` e copie/anote o endereço IPv4

```Bash
  ipconfig
```

* Rode o Projeto Angular (substitua pelo seu IPv4 Local)
```Bash
  ng serve --host 192.136.3.14
```

* 4. Acesse em `http://192.136.3.14:4200`.

## 📌 Observações

- O formulário reseta automaticamente ao fechar o modal.
- A lógica de abertura/fechamento do modal é baseada no Bootstrap JS.

##
#### 🖼️ Dashboard
![Página Home](/public/images/capa_dashboard.png)


### :link: Deploy Online

#### Veja a versão final hospedada:

:point_right: [Acesse aqui](https://alvaro-fordenterdashboard.netlify.app)

---
### 👤 Autor
Desenvolvido com 💙 por **Álvaro Nascimento**
- 🔗 [Linkedin](https://www.linkedin.com/in/alvarento)
- 📧 alvarento@hotmail.com