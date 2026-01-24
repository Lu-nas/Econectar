# Econectar — Frontend (React + Vite)


Este repositório corresponde ao **frontend do projeto Econectar**, desenvolvido com React + Vite, com foco acadêmico e de portfólio.
O projeto evidencia decisões arquiteturais, integração backend e evolução incremental do software.

---

## 🧱 Arquitetura geral do projeto

O Econectar é um projeto **fullstack**, dividido em dois repositórios principais:

* **Frontend**: React + Vite (este repositório)
* **Backend**: API REST em Java com Spring Boot

Essa separação segue boas práticas de engenharia de software, facilitando manutenção, testes e evolução independente das camadas.

---

### 🔒 Backend — Estado estável

O backend é uma API REST desenvolvida em Java com Spring Boot, responsável pelas regras de negócio, autenticação e persistência de dados.

#### Principais pontos consolidados:

* Uso de DTOs de resposta para controle de contratos da API
* Testes unitários e de integração (postman)
* Documentação via Swagger/OpenAPI
* Estado: estável, funcional e documentado 

📁 Repositório do backend:
https://github.com/Lu-nas/Econectar_PI_Gen.git 

Melhorias como paginação, ordenação e tratamento global de exceções, foram registradas no roadmap para evoluções futuras.

---

### 🔧 Frontend — Refatoração em andamento

O frontend está passando por uma **refatoração estrutural de arquitetura**, registrada em um **commit consolidado** para manter a coerência histórica do projeto.

#### Objetivos da refatoração:

* Reorganizar a estrutura de pastas (components, pages, services, hooks, context, etc.)
* Alinhar o frontend aos contratos atuais do backend
* Preparar a aplicação para integração incremental com a API
* Facilitar manutenção, escalabilidade e clareza de responsabilidades

⚠️ **Importante:** O frontend ainda não está totalmente funcional. Os commits registrados representam um *checkpoint técnico* da transição arquitetural.

---

### 🔗 Comunicação com o backend

A base de comunicação com o backend já está implementada, utilizando **Axios** com interceptors configurados para:

* Definição de `baseURL`
* Envio automático de token JWT nas requisições
* Tratamento inicial de erros HTTP (ex: 401 — sessão expirada)

📄 Arquivo de configuração: `src/services/api.ts` 

Essa camada será evoluída gradualmente para cobrir outros cenários de erro e refinamentos.

---

### 👣  Próximos passos planejados (Frontend)

A evolução do frontend seguirá uma estratégia incremental:

1. **Consumir endpoints reais do backend** (ex: listagem de serviços)
2. **Implementação e refinamento do contexto de autenticação**, com foco em UX
3. **Centralizar de forma mais completa do tratamento de erros HTTP**
4. **Ajustar tipagens e alinhar contratos de resposta**
5. **Refinar a interface**

---

## Como rodar o projeto localmente 

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git
- Backend do projeto Econectar em execução

---
#### Clonando o repositório

```bash

git clone https://github.com/Lu-nas/Econectar.git

cd Econectar

```
#### Instalando dependências:

npm install

ou, se utilizar yarn:

yarn install

#### Executando o projeto:

npm run dev


⚠️ Observação:  Caso o backend não esteja ativo ou acessível, algumas funcionalidades do frontend poderão não funcionar corretamente.
---

### 🎓 Observação acadêmica

Este projeto prioriza **decisões técnicas conscientes** em vez de apenas funcionalidades completas, evidenciando o processo de evolução do software — aspecto valorizado tanto em contextos acadêmicos quanto profissionais.

