# PetCare – QA Portfolio Project

PetCare é uma aplicação fictícia de agendamento de banho e tosa para pets, criada como parte de um projeto de portfólio de Quality Assurance (QA). O objetivo é demonstrar o ciclo completo de QA: levantamento de requisitos, execução de testes manuais, reporte de bugs, evidências, correção, reteste e versionamento.

## Descrição do Projeto

O PetCare permite que clientes:

- Criem uma conta
- Façam login
- Cadastrem seus pets
- Visualizem serviços disponíveis
- Agendem serviços de banho e tosa
- Visualizem seus agendamentos

A Versão 1.0 da aplicação contém bugs intencionalmente reproduzidos, que foram identificados durante a execução de testes manuais na versão fictícia original. Esses bugs serão corrigidos individualmente em versões futuras para demonstrar o ciclo de vida completo de QA.

## Tecnologias

- **React** – Biblioteca para construção de interfaces
- **TypeScript** – Tipagem estática
- **Vite** – Build tool e dev server
- **Tailwind CSS** – Estilização
- **React Router** – Roteamento
- **LocalStorage** – Persistência de dados no navegador
- **Lucide React** – Ícones

## Funcionalidades Principais

- Cadastro de cliente com validação de campos
- Login com autenticação
- Cadastro de pets
- Listagem de serviços (Banho, Tosa, Banho + Tosa, Corte de Unhas)
- Fluxo de agendamento em etapas (pet → serviço → data → horário → revisão → confirmação)
- Validações de: serviço obrigatório, data passida, agendamento duplicado
- Preservação do progresso de agendamento ao recarregar a página
- Página "Meus Agendamentos"

## Como Instalar

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd petcare

# Instale as dependências
npm install
```

## Como Rodar

```bash
# Modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Pré-visualizar o build
npm run preview
```

A aplicação estará disponível em `http://localhost:5173`.

## Estrutura do Projeto

```
src/
  components/       # Componentes reutilizáveis (layout, navegação)
  pages/            # Páginas da aplicação
  services/         # Lógica de autenticação, dados e catálogo
  types/            # Definições de tipos TypeScript
  utils/            # Utilitários (storage, helpers)
```

## Notas para QA

Esta é a Versão 1.0 do projeto. Bugs identificados durante os testes manuais foram intencionalmente reproduzidos no código-fonte, marcados com comentários contendo os IDs dos bugs (ex: `// INTENTIONAL QA BUG - BUG-001`). Esses bugs não estão documentados na interface do usuário, apenas no código-fonte, para que possam ser corrigidos individualmente em commits futuros.
