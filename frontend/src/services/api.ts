const API_URL = "http://127.0.0.1:8000";

export async function getWallet() {
  const response = await fetch(`${API_URL}/api/wallet`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar a carteira.");
  }

  return response.json();
}

export async function getInventory() {
  const response = await fetch(`${API_URL}/api/foods/inventory`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar o inventário.");
  }

  return response.json();
}

export async function getFox() {
  const response = await fetch(`${API_URL}/api/fox`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar o estado da Raposa.");
  }

  return response.json();
}