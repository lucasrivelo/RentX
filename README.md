#### Trabalho Final

#### 202426610029 - Adriana de Oliveira Lopes
#### 202426610020 - Lucas Rivelo Campos Almeida

# RentX - Clean Architecture com InversifyJS
Sistema de locação de veículos aplicando Clean Architecture, DDD e Inversão de Controle (IoC)

## 📋 Arquitetura Limpa

1.  *Domain*: Entidades e interfaces (Contratos).
2.  *Application*: Casos de uso (Lógica).
3.  *Infra*: Implementação do BD (Prima) e containers.
4.  *Adapters*: Adaptadores de entrada (CLI).


## 🚀 Instalação e Execução

Abra o VSCode na raiz do projeto. Em seguida abra o terminal e siga os passos abaixo:

1.  Instale as dependências:
    ```
    npm install

2.  Prepare o Banco de Dados (SQLite):
    ```
    npm install @prisma/client inversify reflect-metadata dotenv
    npx prisma generate
    npx prisma migrate dev --name init
    
3. Certifique que o arquivo .env está na raiz com a variável:
   ```
   DATABASE_URL="file:./prisma/dev.db"
   
4.  Execute o programa:
    ````
    npx tsx src/adapters/cli/main.ts

## 🧪 Como Testar
1. Comando de Teste
   ```
   npx vitest run

### Exemplo de entrada/saída esperada:

`npx tsx src/adapters/cli/main.ts adicionar_aluguel "Polo" "Mario" "2026-02-08" `

` [dotenv@17.2.3] injecting env (0) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops `

`Aluguel agendado com sucesso!`

`ID: 0cdefq5uy095 | Usuário: Mario | Chassi: Polo| Entrega Estimada: 07/02/2026, 20:00:00 `
