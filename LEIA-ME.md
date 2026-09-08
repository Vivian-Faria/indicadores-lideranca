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

Quatro blocos de 25 pontos. Ou bate a meta, ou não bate.

| Bloco | Meta |
|---|---|
| Ponto do time | 90% ou mais, média das semanas |
| Cobertura de escala | até 2 faltas não cobertas, somadas no mês |
| Indicador da área | Agiza 80% ou mais, ou chat em até 3 minutos |
| Conduta própria | até 4 atrasos somados e nenhuma falta |

Descontos: troca de escala fora do processo −15, freela acima do limite −15,
cada reembolso por pedido errado −5. Nunca fica negativo.

Percentuais e tempos são média das semanas. Faltas, atrasos e reembolsos são
soma. Semanas sem lançamento são ignoradas.

**A pontuação não paga bônus.** O bônus segue os dois blocos de R$ 250 e os
zeradores das fichas de cargo. Esta pontuação serve para ranquear e reconhecer.

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
