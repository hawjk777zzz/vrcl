export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { descricao, valor, vencimento } = req.body;

  try {
    const response = await fetch("https://api.blackpayoficial.com/pix/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SEU_TOKEN_AQUI"
      },
      body: JSON.stringify({ descricao, valor, vencimento })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao gerar Pix", detalhes: err.message });
  }
}
