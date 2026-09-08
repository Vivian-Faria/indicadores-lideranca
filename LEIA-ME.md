# Painel Órion

Painel de indicadores dos supervisores do Varanda e dos líderes de Expedição.

Funciona de dois jeitos, com o mesmo código:

- **Publicado no Netlify** — endereço na internet, acessa de qualquer lugar,
  inclusive do celular fora de casa. Não precisa ligar nada.
- **No seu computador** — roda local, dados num arquivo seu.

Se você vai usar o painel do celular e de mais de um computador, publique no
Netlify. É o modo recomendado.

---

# Modo 1 — Publicar no Netlify

## Onde os dados ficam

No Netlify Blobs, um depósito do próprio Netlify. Os dados sobrevivem a novas
publicações. A cada salvamento, a versão anterior é guardada como cópia de
segurança.

## Passo a passo

**1. Crie uma conta em netlify.com.** O plano gratuito serve. Ele tem um teto
mensal de uso; para um painel usado por uma pessoa, sobra folga.

**2. Publique o projeto.**

O jeito mais simples é pelo terminal, dentro da pasta `painel-orion`:

```
npx netlify-cli login
npx netlify-cli deploy --build --prod
```

O primeiro comando abre o navegador para você entrar na conta. O segundo
pergunta se quer criar um site novo — responda que sim e aceite os padrões.
No fim, ele mostra o endereço do painel.

**3. Ponha uma senha. Este passo não é opcional.**

Sem senha, qualquer pessoa com o endereço vê nomes, fotos e desempenho da sua
equipe. No painel do Netlify, vá em **Site configuration → Environment
variables → Add a variable** e crie:

```
Chave:  SENHA_PAINEL
Valor:  a senha que você escolher
```

Depois republique com `npx netlify-cli deploy --build --prod`. Na primeira vez
que abrir o painel, ele vai pedir a senha.

Se a variável não existir, o painel funciona sem senha e fica aberto a quem
tiver o endereço.

**4. Pronto.** Salve o endereço nos favoritos do computador e do celular.

## Para atualizar depois

Rode `npx netlify-cli deploy --build --prod` de novo, na mesma pasta. Os dados
não são afetados.

---

# Modo 2 — Rodar no seu computador

## Instalar, uma vez só

**1. Instale o Node.js**
Baixe em https://nodejs.org e escolha a versão LTS. Instalação normal, avançar até o fim.

**2. Abra a pasta no terminal**
No Windows: entre na pasta `painel-orion`, clique na barra de endereço do Explorador,
digite `cmd` e aperte Enter.
No Mac: clique com o botão direito na pasta e escolha "Novo Terminal na Pasta".

**3. Instale a dependência**

```
npm install
```

Isso baixa o Express, a única biblioteca que o projeto usa. Demora alguns segundos.

---

## Usar, todo dia

Na mesma janela do terminal, dentro da pasta:

```
npm start
```

O terminal vai mostrar dois endereços:

```
Neste computador:  http://localhost:3000
No celular:        http://192.168.0.15:3000
```

Abra o primeiro no navegador do computador. **Deixe a janela do terminal aberta** —
fechar o terminal desliga o painel. Para encerrar, aperte `Ctrl + C` nessa janela.

### Acessar do celular

O endereço com números (`192.168...`) funciona em qualquer aparelho **na mesma
rede Wi-Fi** do computador. Digite ele no navegador do celular.

O computador precisa estar ligado e com o `npm start` rodando. Se o celular não
abrir, quase sempre é o firewall do Windows — na primeira execução ele pergunta
se o Node pode acessar a rede; responda que sim.

---

## Onde ficam os dados, no modo local

```
painel-orion/
  dados/
    dados.json          <- tudo: equipe, fotos, apurações
    backups/            <- uma cópia por dia, as 30 últimas
```

**Para levar os dados para outro computador**, copie a pasta `dados` inteira.

**Para não depender de cópia manual**, coloque a pasta `painel-orion` dentro do
seu Google Drive ou OneDrive. O arquivo sincroniza sozinho. Só não use o painel
em dois computadores ao mesmo tempo, senão a sincronização se confunde e uma das
versões sobrescreve a outra.

O arquivo é gravado de forma atômica: se faltar energia no meio de um salvamento,
o arquivo bom continua intacto.

---

## Como usar o painel

**Equipe** — cadastre cada supervisor ou líder com nome, cargo e hub. Clique na
moldura cinza para enviar a foto, que aparece depois no quadro do destaque.
Abaixo de cada pessoa ficam listadas as metas do cargo dela.

**Apuração** — escolha qualquer dia da semana que vai lançar; o painel monta a
semana de segunda a domingo e já sabe em que mês ela fecha. Lance os números
brutos: percentual do ponto, quantas faltas ficaram descobertas, a nota da Agiza
ou o tempo do chat, atrasos e faltas da própria pessoa. Marque as penalidades
quando houver. Clique em **Salvar semana**.

Você não marca "bateu" ou "não bateu" — o painel aplica os cortes sozinho.

Para desfazer um lançamento inteiro, abra a semana e clique em **Apagar esta
semana**. Isso remove a semana e os lançamentos de todas as pessoas nela, e não
tem volta. Se a semana já tinha dados, a confirmação avisa quantas pessoas serão
afetadas. Para apagar só o número de uma pessoa, basta limpar o campo e salvar.

**Desempenho** — a linha mostra a pontuação acumulada semana a semana; as barras
comparam as pessoas no mês; a tabela abre bloco a bloco, em verde ou vermelho,
com o valor que produziu cada resultado.

**Destaque do mês** — o vencedor sai automaticamente, com foto e os quatro
critérios. Havendo empate, o painel avisa e aplica o desempate: ponto do time,
depois faltas não cobertas, depois margem no indicador da área, depois descontos.
O botão **Imprimir o quadro** gera a folha só com o pôster, sem os menus.

---

## Como a pontuação é calculada

Quatro blocos de 25 pontos. Ou bate a meta, ou não bate — não existe atingimento
parcial.

| Bloco | Meta |
|---|---|
| Ponto do time | 90% ou mais, média das semanas |
| Cobertura de escala | até 2 faltas não cobertas, somadas no mês |
| Indicador da área | Agiza 80% ou mais, ou chat em até 3 minutos, média das semanas |
| Conduta própria | até 4 atrasos somados e nenhuma falta |

Descontos sobre o total: troca de escala fora do processo −15, freela acima do
limite −15, cada reembolso por pedido errado −5. A pontuação nunca fica negativa.

Percentuais e tempos são média das semanas. Faltas, atrasos e reembolsos são
soma — duas faltas não cobertas são duas no mês, não uma média.

Semanas sem nenhum lançamento são ignoradas. Quem não tem lançamento no mês não
aparece na classificação.

**A pontuação não paga bônus.** O bônus segue a regra dos dois blocos de R$ 250 e
dos zeradores, como está nas fichas de cargo. Esta pontuação existe para ranquear
e reconhecer.

---

## Se der problema

**"npm não é reconhecido"** — o Node.js não foi instalado, ou o terminal foi
aberto antes da instalação. Feche o terminal, abra de novo e tente outra vez.

**A página não abre** — confira se a janela do terminal ainda está aberta com o
`npm start` rodando.

**"porta 3000 já em uso"** — outro programa ocupa a porta. Rode assim:
`PORT=3100 npm start` no Mac, ou `set PORT=3100 && npm start` no Windows.

**Perdi os dados** — abra `dados/backups` e copie o arquivo do dia desejado por
cima de `dados/dados.json`, com o painel desligado.

---

## Se quiser acesso de qualquer lugar

Do jeito atual, o celular só alcança o painel na mesma rede Wi-Fi. Para acessar
de qualquer lugar, o projeto precisa ser publicado numa hospedagem — ele já está
pronto para isso, porque lê a porta da variável `PORT`. Nesse caso vale colocar
uma senha na frente, o que hoje não existe: quem tem o endereço, entra.
