const CHAVE_PROGRESSO = "me-cative-progresso";

export interface ProgressoLocal {
    estrelas: number;
    fome: number;
    energia: number;
    humor: number;
    inventario: {
        food_id: number;
        nome: string;
        preco: number;
        quantidade: number;
    }[];
}

export function salvarProgresso(progresso: ProgressoLocal): void {
    localStorage.setItem(
        CHAVE_PROGRESSO,
        JSON.stringify(progresso)
    );
}

export function carregarProgresso(): ProgressoLocal | null {
    const dados = localStorage.getItem(CHAVE_PROGRESSO);

    if (!dados) {
        return null;
    }

    try {
        return JSON.parse(dados) as ProgressoLocal;
    } catch {
        return null;
    }
}