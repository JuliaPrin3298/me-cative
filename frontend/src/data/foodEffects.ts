export interface FoodEffect {
    fome: number; 
    humor: number; 
}

const efeitosPorNome: Record<string, FoodEffect> = {
    "morango": { fome: 8, humor: 3 },
    "amora": { fome: 10, humor: 3 },
    "mirtilos": { fome: 12, humor: 4 },
    "suco de uva": { fome: 12, humor: 4 },
    "suco de laranja": { fome: 14, humor: 4 },
    "pão estrela": { fome: 18, humor: 5 },
    "biscoito lua": { fome: 15, humor: 8 },
    "linguiça": { fome: 22, humor: 5 },
    "sopa": { fome: 25, humor: 6 },
    "coxa de frango": { fome: 27, humor: 6 },
    "carne": { fome: 30, humor: 6 },
    "peixe assado": { fome: 32, humor: 7 },
    "fruta mistério": { fome: 50, humor: 15 },
};

const EFEITO_PADRAO: FoodEffect = { fome: 20, humor: 5 };

export function getFoodEffect(nome: string): FoodEffect {
    return efeitosPorNome[nome.trim().toLowerCase()] ?? EFEITO_PADRAO;
}