// Arquivo: /api/gerar-pix.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const { descricao, valor, vencimento } = req.body;

  try {
    const response = await fetch("https://api.blackpayoficial.com/pix/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 47f0051d501a2bea473c5b2129a7c69dfd664a0443cadce74b574bbf2fa01bb6"
      },
      body: JSON.stringify({ descricao, valor, vencimento })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ erro: "Erro da API", detalhes: data });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ erro: "Erro interno", detalhes: err.message });
  }
}
