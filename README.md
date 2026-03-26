# Car Rental System — Full Stack Application 🚗💨

![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-6DB33F?logo=springboot)
![Angular](https://img.shields.io/badge/Angular-18-DD0031?logo=angular)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)

Sistema para gerenciamento de aluguéis de veículos, desenvolvido para automatizar o processo de check-in, check-out e controle de frotas. O projeto aplica padrões de arquitetura modernos para garantir performance e segurança.

---

## 📐 Arquitetura

```
┌─────────────────────┐       ┌──────────────────────┐       ┌──────────────┐
│   Frontend          │       │   Backend            │       │   Banco de   │
│   Angular 18        │──────▶│   Spring Boot 3      │──────▶│   Dados      │
│   :80               │       │   :8080              │       │   MySQL :3306│
└─────────────────────┘       └──────────────────────┘       └──────────────┘
         └────────────────────── Docker Compose ───────────────────────┘
```

```
CarRentalAPI-FullStack/
├── backend/           # API REST em Spring Boot
├── frontend/          # SPA em Angular
├── docker-compose.yml # Orquestração dos containers
└── README.md
```

---

## 🛠️ Tecnologias

### Backend

| Tecnologia | Utilização |
| --- | --- |
| **Java 17 + Spring Boot 3** | Framework principal para criação e execução da API REST |
| **Spring Security + JWT** | Autenticação e autorização via JSON Web Token |
| **Spring Data JPA** | Abstração para persistência e operações com banco de dados |
| **Spring HATEOAS** | Suporte a hiperlinks nas respostas (REST HATEOAS) |
| **Spring WebFlux + WebTestClient** | Testes de integração dos endpoints |
| **Swagger / Springdoc OpenAPI** | Geração automática de documentação interativa |
| **ModelMapper** | Mapeamento entre entidades e DTOs |
| **Lombok** | Redução de código boilerplate |
| **MySQL** | Banco de dados relacional principal |
| **PostgreSQL** | Utilizado em testes de integração |

### Frontend

| Tecnologia | Utilização |
| --- | --- |
| **Angular 18** | Framework principal do SPA, organizado com NgModules |
| **Angular Router** | Roteamento dinâmico com guards de autenticação por role |
| **Reactive Forms** | Formulários reativos com validação declarativa |
| **RxJS** | Programação reativa com Observables para consumo da API e gerenciamento de eventos assíncronos |
| **Bootstrap + Bootstrap Icons** | Estilização e componentes visuais |

---

## 🚀 Funcionalidades

O sistema possui diferentes níveis de acesso (Roles), garantindo que cada usuário interaja apenas com os recursos permitidos.

### 📋 Gestão de Aluguéis

**Administrador e Cliente:**
- Visualização do histórico de aluguéis vinculados ao seu perfil.

**Administrador:**
- Painel geral com listagem completa de aluguéis, paginação e filtragem.
- Busca por número de recibo ou filtragem por usuário.
- Fluxo de Check-in (abertura) e Check-out (finalização com cálculo de valores).

### 👥 Gestão de Usuários

**Administrador:**
- Listagem de todos os usuários e exclusão de usuários com role `CLIENTE`.
- Busca avançada por CPF, e-mail ou username.

### 🚗 Gestão de Automóveis

**Administrador e Cliente:**
- Catálogo de veículos disponíveis na frota com possibilidade de filtro e busca por placa. (visível a clientes).

**Administrador:**
- Cadastro, remoção de veículos e alteração de status (exclusivo para administradores).

### 👤 Perfil

**Administrador e Cliente:**
- Visualização dos dados de usuário
- Alteração de dados de contato
- Alteração de senha

---

## ▶️ Como Rodar o Projeto

A forma mais simples de subir o ambiente completo é via Docker, que configura automaticamente o banco de dados, o backend e o frontend.

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### Passo a Passo

**1. Clone o repositório:**

```bash
git clone https://github.com/GCouzzi/CarRentalAPI-FullStack.git
cd CarRentalAPI-FullStack
```

**2. Suba os containers:**

Na raiz do projeto (onde está o `docker-compose.yml`), execute:

```bash
docker-compose up --build
```

**3. Acesse a aplicação:**

| Serviço | URL |
| --- | --- |
| Frontend (Angular) | http://localhost |
| Backend (API REST) | http://localhost:8080 |
| Swagger (Documentação) | http://localhost:8080/swagger-ui.html |

### Credenciais de Demonstração

> ⚠️ **Atenção:** As credenciais abaixo são exclusivas para ambiente local de demonstração. Não utilize em produção.

| Role | Username | Password |
| --- | --- | --- |
| Admin | `userAdmin` | `admin123` |

---

## 📄 Licença

Este projeto está sob a licença [MIT](./LICENSE). Veja o arquivo `LICENSE` para mais detalhes.
