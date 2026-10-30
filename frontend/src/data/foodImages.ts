// Imagem de cada alimento, indexada pelo nome (sem diferenciar maiúsculas/minúsculas).
const imagensPorNome: Record<string, string> = {
    "morango": "/assets/objects/morango.png",
    "pão estrela": "/assets/objects/paoEstrela.png",
    "biscoito lua": "/assets/objects/biscoitoLua.png",
    "amora": "/assets/objects/amora.png",
    "carne": "/assets/objects/carne.png",
    "coxa de frango": "/assets/objects/coxaFrango.png",
    "fruta mistério": "/assets/objects/fruta.png",
    "linguiça": "/assets/objects/linguica.png",
    "mirtilos": "/assets/objects/mirtilo.png",
    "peixe assado": "/assets/objects/peixe.png",
    "sopa": "/assets/objects/sopa.png",
    "suco de laranja": "/assets/objects/sucoLaranja.png",
    "suco de uva": "/assets/objects/sucoUva.png",
};

export function getFoodImage(nome: string): string | undefined {
    return imagensPorNome[nome.trim().toLowerCase()];
}