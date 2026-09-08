/* Painel Órion — função que guarda e devolve os dados.
   No lugar do arquivo em disco, usa o Netlify Blobs. */

import { getStore } from "@netlify/blobs";

const CHAVE = "painel";
const VAZIO = { people: [], weeks: [], records: {} };

function json(corpo, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/* A senha vive numa variável de ambiente do Netlify, nunca no código.
   Se ninguém configurou senha, o painel fica aberto — e avisa isso. */
function senhaConfere(req) {
  const esperada = process.env.SENHA_PAINEL;
  if (!esperada) return true;
  return req.headers.get("x-senha") === esperada;
}

export default async (req) => {
  if (!senhaConfere(req)) {
    return json({ erro: "Senha incorreta." }, 401);
  }

  const deposito = getStore({ name: "painel-orion", consistency: "strong" });

  if (req.method === "GET") {
    try {
      const bruto = await deposito.get(CHAVE);
      return json(bruto ? JSON.parse(bruto) : VAZIO);
    } catch (e) {
      return json(VAZIO);
    }
  }

  if (req.method === "PUT") {
    let corpo;
    try {
      corpo = await req.json();
    } catch (e) {
      return json({ erro: "Corpo inválido." }, 400);
    }

    const { people, weeks, records } = corpo || {};
    if (!Array.isArray(people) || !Array.isArray(weeks) || typeof records !== "object") {
      return json({ erro: "Formato inválido." }, 400);
    }

    try {
      /* Guarda uma cópia do estado anterior antes de sobrescrever.
         Só a última — o suficiente para desfazer um engano. */
      const anterior = await deposito.get(CHAVE);
      if (anterior) await deposito.set(CHAVE + ":anterior", anterior);

      await deposito.set(CHAVE, JSON.stringify({ people, weeks, records }));
      return json({ ok: true, salvoEm: new Date().toISOString() });
    } catch (e) {
      return json({ erro: "Não foi possível gravar." }, 500);
    }
  }

  return json({ erro: "Método não suportado." }, 405);
};

export const config = { path: "/api/dados" };
