# Painel Órion

Painel de indicadores dos supervisores do Varanda e dos líderes de Expedição.

Os dados ficam no Netlify Blobs — sobrevivem a novas publicações e são os mesmos
no computador e no celular.

---

## Estrutura

Esta é a posição correta dos arquivos. Se algum sair do lugar, o deploy quebra.

```
index.html                      <- na raiz
netlify.toml
package.json
netlify/functions/dados.mjs     <- dentro de duas pastas
```

---

## Publicar — caminho do terminal

Abra o terminal dentro desta pasta e rode:

```
npx netlify-cli deploy --prod
```

Quando ele perguntar o que fazer, escolha **Link this directory to an existing
project** e aponte para o site que você já criou. Se for a primeira vez, escolha
**Create & configure a new project**.

Para atualizar depois, é o mesmo comando.

---

## Publicar — caminho do GitHub

Na tela de upload do repositório, **arraste os itens direto do Explorador**:

- os arquivos soltos: `index.html`, `netlify.toml`, `package.json`
- a **pasta** `netlify` inteira, arrastada como pasta

Arrastar a pasta é o que preserva a estrutura. Escolher pelo botão "choose your
files" achata tudo na raiz e o deploy falha.

---

## Depois de publicar: a senha

Sem senha, quem tiver o endereço vê nomes, fotos e desempenho da equipe.

1. No Netlify: **Site configuration → Environment variables → Add a variable**
2. Chave `SENHA_PAINEL`, valor: a senha que você escolher
3. **Deploys → Trigger deploy → Deploy site**

Na primeira vez que abrir o painel, ele pede a senha.

---

## Como usar

**Equipe** — cadastre cada supervisor ou líder com nome, cargo e hub. Clique na
moldura cinza para enviar a foto. Abaixo de cada pessoa ficam as metas do cargo.

**Apuração** — escolha qualquer dia da semana que vai lançar; o painel monta a
semana de segunda a domingo. Lance os números brutos. O painel aplica os cortes
sozinho. Para desfazer, use **Apagar esta semana**.

**Desempenho** — pontuação acumulada semana a semana, comparativo do mês e o
detalhe bloco a bloco.

**Destaque do mês** — vencedor apurado automaticamente, com foto e critérios.
Em caso de empate, o desempate segue: ponto do time, faltas não cobertas, margem
no indicador da área, descontos.

---

## Pontuação

Cada cargo tem sua própria lista de indicadores, editável na aba **Indicadores**.
Cada indicador tem meta e peso.

Sugestão de fábrica, para os dois cargos:

| Indicador | Peso | Meta |
|---|---|---|
| Faltas não cobertas | 35 | até 2 no mês, somadas |
| Ponto do time | 30 | 90% ou mais, média das semanas |
| Indicador da área | 25 | Agiza 80% ou mais · chat 60% dos atendimentos dentro de 3 min |
| Atrasos dele | 5 | até 4 no mês |
| Faltas dele | 5 | nenhuma |

O peso segue duas coisas: quanto a pessoa controla o número e quanto ele custa à
operação. Cobrir a escala é a função, então pesa mais. Chegar no horário é a
condição para trabalhar, não desempenho — e já zera o bônus por conta própria,
então pesa pouco.

**Indicador sem dado no mês sai da conta.** Os 100 pontos se redistribuem entre
os que sobraram. Quem acerta tudo faz 100, tendo cinco indicadores medidos ou
dois. Quem não tem nenhum dado no mês não aparece na classificação.

**Fatos de conduta não tiram pontos.** Troca de escala fora do processo, freela
acima do limite e reembolso por pedido errado zeram o bônus, conforme as fichas
de cargo, mas não mexem no placar. O ranking mede desempenho; o bônus mede
conduta.

**Rankings separados por cargo.** Varanda e Expedição têm listas de indicadores
diferentes, então disputam separado, com um destaque do mês para cada.

**A pontuação não paga bônus.** Ela serve para ranquear e reconhecer.

---

## Ligar e desligar indicadores

Na aba **Indicadores** você edita nome, dica, forma de apuração, meta, unidade e
peso de cada indicador, e pode criar ou excluir indicadores.

A soma dos pesos não precisa dar 100 — o placar é proporcional ao que está em
jogo.

Na aba **Equipe**, cada pessoa tem a lista de indicadores do cargo com uma caixa
de seleção. Desmarcar tira aquele indicador só daquela pessoa, sem apagar
lançamento nenhum.

---

## Se algo der errado

**Página abre mas fica vazia, dizendo "Acesso não liberado"** — a função não
subiu. Confira se `netlify/functions/dados.mjs` está no repositório, dentro das
duas pastas.

**Deploy falha com "Deploy directory does not exist"** — o `netlify.toml` aponta
para uma pasta que não existe. Nesta versão ele aponta para a raiz, então
`index.html` precisa estar solto na raiz, não dentro de `public`.

**Pede senha e não aceita** — confira a variável `SENHA_PAINEL` no Netlify e
republique depois de criá-la.
