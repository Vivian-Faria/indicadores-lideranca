import { getStore } from "@netlify/blobs";

const CHAVE = "painel";
const VAZIO = { people: [], weeks: [], records: {} };

function json(corpo, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

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
      return json({ erro: "Corpo invalido." }, 400);
    }

    const { people, weeks, records } = corpo || {};
    if (!Array.isArray(people) || !Array.isArray(weeks) || typeof records !== "object") {
      return json({ erro: "Formato invalido." }, 400);
    }

    try {
      const anterior = await deposito.get(CHAVE);
      if (anterior) await deposito.set(CHAVE + ":anterior", anterior);
      await deposito.set(CHAVE, JSON.stringify({ people, weeks, records }));
      return json({ ok: true, salvoEm: new Date().toISOString() });
    } catch (e) {
      return json({ erro: "Nao foi possivel gravar." }, 500);
    }
  }

  return json({ erro: "Metodo nao suportado." }, 405);
};

export const config = { path: "/api/dados" };
