# Car Rental System - Full Stack Application 🚗💨

Este é um sistema para gerenciamento de aluguéis de veículos, desenvolvido para automatizar o processo de check-in, check-out e controle de frotas. O projeto aplica padrões de arquitetura modernos para garantir performance e segurança.

## Tecnologias Principais

### Backend 
- **Java 17** & **Spring Boot 3**

### Frontend 
- **Angular 18**
- **Bootstrap** & **Bootstrap Icons**

---

## 🚀 Funcionalidades do Sistema
O sistema possui diferentes níveis de acesso (Roles), garantindo que cada usuário visualize e interaja apenas com os recursos permitidos.

** Credenciais usuário admin: ```username: userAdmin``` & ```password:admin123``` **

### 📋 Gestão de Aluguéis
#### Módulo do Cliente:
- Visualização histórica de todos os aluguéis vinculados ao seu perfil.

#### Módulo Administrativo:
- Painel Geral: Acesso à listagem completa de aluguéis registrados no sistema com paginação.
- Busca Especializada: Localização de aluguéis por número de recibo ou filtragem por um usuário específico.
- Fluxo de Operação: Realização de Check-in (abertura de aluguel) e Check-out (finalização com cálculo de valores).

### 👥 Gestão de Usuários
#### Controle Administrativo:
- É possível listar todos os usuários do sistema e deletar os com a role CLIENTE.
- Busca Avançada: É possível buscar usuários por CPF, E-mail ou Username, facilitando a localização rápida de clientes.

### 🚗 Gestão de Automóveis
- Catálogo de Veículos: Clientes podem pesquisar e visualizar todos os automóveis disponíveis na frota.
- Inventário: Administradores possuem permissão para cadastrar e remover novos veículos ao sistema.



---

## 🚀 Como Rodar o Projeto
A forma mais simples de subir o ambiente completo (Banco de Dados, Backend e Frontend) é utilizando o Docker, garantindo que todas as dependências estejam configuradas corretamente.

### 📋 Pré-requisitos
- Docker e Docker Compose instalados.

### 🛠️ Passo a Passo
- Clone o repositório:
```
bash
git clone https://github.com/GCouzzi/CarRentalAPI-FullStack.git
cd CarRentalAPI-FullStack
```
* Suba a aplicação com Docker: Na raiz do projeto (onde está o arquivo docker-compose.yml), execute o comando abaixo. Ele irá baixar as imagens, buildar os containers e configurar as redes automaticamente:
```
Bash
docker-compose up --build
```

## 🚀 Futuras Implementações
- Adicionar página de perfil para que o usuário logado visualize seus dados
- Possibilitar alteração de e-mail, telefone e cpf
- Possibilitar alteração e adicionar status de manutenção e inativo para os automóveis
- Listagem de aluguéis com possibilidade de filtro por status (em andamento, finalizado)
- Listagem de automóveis com filtro por status (livre, alugado, manutencao, inativo), marca e modelo
