# Convenções de Commit — Me Cative

## Tipos de commit

| Tipo | Quando usar |
|---|---|
| `feat` | Adicionar uma funcionalidade ou recurso novo |
| `fix` | Corrigir um erro ou comportamento inesperado |
| `style` | Ajustar aparência ou formatação sem alterar a lógica |
| `refactor` | Reorganizar o código sem mudar seu comportamento |
| `perf` | Melhorar o desempenho |
| `test` | Adicionar ou modificar testes |
| `docs` | Alterar documentação |
| `build` | Alterar dependências ou ferramentas de build |
| `ci` | Alterar automações de integração contínua |
| `chore` | Tarefas gerais de manutenção ou configuração |
| `revert` | Reverter um commit anterior |

## Escopos do projeto

| Escopo | Quando usar |
|---|---|
| `ui` | Interface, botões, menus, modais e estilos |
| `frontend` | Configuração geral do frontend |
| `assets` | Imagens, ilustrações, texturas e áudio |
| `game` | Mecânicas e regras gerais do jogo |
| `fox` | Comportamento e animações da raposa |
| `story` | Narrativa e progressão da história |
| `minigame` | Implementação dos minijogos |
| `ranking` | Pontuações, classificações e placares |
| `backend` | API, serviços e regras do servidor |
| `database` | Estrutura e alterações do banco de dados |
| `readme` | Arquivo README e instruções principais |
| `docs` | Outras documentações do projeto |

## Formato

```text
tipo(escopo): descrição
```

Exemplo:

```text
feat(ui): adiciona fundo responsivo com moldura
```

## Convenção de Branches

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feature/` | Criar uma funcionalidade nova | `feature/sistema-de-ranking` |
| `fix/` | Corrigir um bug | `fix/fundo-responsivo` |
| `hotfix/` | Corrigir um problema urgente | `hotfix/erro-login` |
| `refactor/` | Reorganizar o código sem mudar o comportamento | `refactor/campo-principal` |
| `docs/` | Criar ou atualizar documentação | `docs/convencao-commits` |
| `test/` | Adicionar ou atualizar testes | `test/mecanica-minigame` |
| `chore/` | Manutenção ou configuração do projeto | `chore/configuracao-eslint` |

### Formato

`tipo/descricao-curta-em-kebab-case`

**Regras:**
- Usar letras minúsculas.
- Separar palavras com hífens (`-`).
- Evitar espaços, acentos e caracteres especiais.
- Criar uma branch por tarefa ou funcionalidade.
- Não desenvolver diretamente na `main`.

### Criando uma branch

```bash
git switch main
git pull origin main
git switch -c feature/nome-da-funcionalidade
```

### Enviando a branch para o GitHub

```bash
git push -u origin feature/nome-da-funcionalidade
```

### Exemplos para o Me Cative

- `feature/interacao-raposa`
- `feature/inventario`
- `feature/minigame-memoria`
- `fix/fundo-campo`
- `docs/convencao-branches`
