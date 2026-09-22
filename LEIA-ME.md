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

## Como o bônus é calculado

O bônus de R$ 500 se divide entre indicadores, e cada um paga proporcionalmente
ao quanto foi atingido. Não existe mais tudo ou nada.

**Supervisor Varanda — 4 indicadores de R$ 125**

| Indicador | Meta | Como paga |
|---|---|---|
| Faltas dele | nenhuma | 1 falta zera este indicador |
| Atrasos dele | até 4 no mês | 1 atraso paga R$ 93,75 · 2 pagam R$ 62,50 · 4 pagam zero |
| Faltas não cobertas | até 2 no mês | 1 falta paga R$ 62,50 · 2 pagam zero |
| Escala preenchida | 90% | paga o que alcançou da meta |

**Líder de Expedição — 5 indicadores de R$ 100**

Os mesmos quatro, mais o tempo de atendimento: meta de 3 minutos de espera,
média do mês. Paga integral em 3 minutos, metade em 4,5 minutos, e zero a partir
de 6 minutos — o dobro da meta.

**O teto trava o total.** Cada cargo tem um campo "Bônus total deste cargo",
em R$ 500. Os valores dos indicadores são ajustados automaticamente para caber
nele, qualquer que seja a soma configurada. Um mês 100% positivo paga exatamente
R$ 500, nunca mais.

Os valores individuais funcionam como proporção. Se você colocar R$ 200 em cada
um dos quatro do Varanda, a soma daria R$ 800 — mas o painel divide o teto e cada
um passa a pagar R$ 125. Se quiser que um indicador pese o dobro dos outros, é só
dar a ele o dobro do valor; o teto continua sendo respeitado.

A coluna **Paga** na aba Indicadores mostra quanto cada um vale de fato, já
ajustado. O botão **Igualar os valores ao teto** reescreve os números
configurados para bater com o total, quando você quiser ver os dois iguais.

---

## As três formas de pagar

**Limite** — a meta é o teto tolerado, e o pagamento cai conforme se consome a
margem. Serve para faltas e atrasos.

**Alvo** — a meta é o que se quer atingir. Quanto maior melhor paga o que
alcançou da meta. Quanto menor melhor paga integral na meta e zera no dobro dela.

**Tudo ou nada** — paga o valor cheio se bater, zero se não bater.

---

## Conduta

Troca de escala fora do processo, freela acima do limite e reembolso por pedido
errado **não zeram o bônus inteiro**. Cada um zera apenas o indicador ligado a
ele, configurável na aba Indicadores:

| Aconteceu | Zera |
|---|---|
| Troca de escala fora do processo | Escala preenchida |
| Freela acima do limite da escala | Faltas não cobertas |
| Reembolso por pedido errado | Tempo de atendimento |

---

## O extrato

Na aba **Desempenho** cada pessoa tem o rendimento do mês aberto indicador por
indicador: o número que ela fez, uma barra com o percentual atingido, e quanto
isso vale em reais. É a tela para mostrar na reunião.

**Indicador sem dado no mês não entra na conta** — nem no valor conquistado nem
no total possível. Assim ninguém é punido por medição que não aconteceu.

---

## Ligar e desligar indicadores

Na aba **Indicadores** você edita nome, dica, apuração, meta, unidade, forma de
pagamento e valor, e pode criar ou excluir indicadores.

Na aba **Equipe**, cada pessoa tem a lista do cargo com caixas de seleção.
Desmarcar tira aquele indicador só daquela pessoa.

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
