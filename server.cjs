/* Painel Órion — servidor local
   Guarda tudo em dados/dados.json. Sem banco, sem nuvem. */

const express = require("express");
const fs = require("fs");
const path = require("path");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "dados");
const DATA_FILE = path.join(DATA_DIR, "dados.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");

const VAZIO = { people: [], weeks: [], records: {} };

/* ---------- leitura e escrita ---------- */

function garantirPastas() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function ler() {
  garantirPastas();
  if (!fs.existsSync(DATA_FILE)) return { ...VAZIO };
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (e) {
    console.error("dados.json ilegível. Usando base vazia e preservando o arquivo antigo.");
    fs.copyFileSync(DATA_FILE, path.join(BACKUP_DIR, `corrompido-${Date.now()}.json`));
    return { ...VAZIO };
  }
}

/* Escrita atômica: grava num temporário e só depois substitui.
   Se faltar energia no meio, o arquivo bom continua intacto. */
function gravar(dados) {
  garantirPastas();
  const tmp = DATA_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(dados, null, 2), "utf8");
  fs.renameSync(tmp, DATA_FILE);
}

/* Uma cópia por dia, mantendo as 30 últimas */
function backupDiario() {
  if (!fs.existsSync(DATA_FILE)) return;
  const hoje = new Date().toISOString().slice(0, 10);
  const destino = path.join(BACKUP_DIR, `dados-${hoje}.json`);
  if (!fs.existsSync(destino)) fs.copyFileSync(DATA_FILE, destino);

  const antigos = fs.readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith("dados-"))
    .sort();
  while (antigos.length > 30) {
    fs.unlinkSync(path.join(BACKUP_DIR, antigos.shift()));
  }
}

/* ---------- rotas ---------- */

app.use(express.json({ limit: "25mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/dados", (req, res) => {
  res.json(ler());
});

app.put("/api/dados", (req, res) => {
  const { people, weeks, records } = req.body || {};
  if (!Array.isArray(people) || !Array.isArray(weeks) || typeof records !== "object") {
    return res.status(400).json({ erro: "Formato inválido." });
  }
  try {
    backupDiario();
    gravar({ people, weeks, records });
    res.json({ ok: true, salvoEm: new Date().toISOString() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: "Não foi possível gravar o arquivo." });
  }
});

/* ---------- inicialização ---------- */

function enderecosDaRede() {
  const saida = [];
  const redes = os.networkInterfaces();
  Object.values(redes).forEach((lista) => {
    (lista || []).forEach((n) => {
      if (n.family === "IPv4" && !n.internal) saida.push(n.address);
    });
  });
  return saida;
}

app.listen(PORT, "0.0.0.0", () => {
  garantirPastas();
  console.log("");
  console.log("  Painel Órion no ar");
  console.log("  ------------------------------------------");
  console.log(`  Neste computador:  http://localhost:${PORT}`);
  enderecosDaRede().forEach((ip) => {
    console.log(`  No celular:        http://${ip}:${PORT}`);
  });
  console.log("");
  console.log(`  Dados em: ${DATA_FILE}`);
  console.log("  Para encerrar, aperte Ctrl+C nesta janela.");
  console.log("");
});
