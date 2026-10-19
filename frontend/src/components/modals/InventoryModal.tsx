import { useEffect, useState } from "react";
import { ModalBase } from "./ModalBase";
import "./InventoryModal.css";

interface Props {
  onClose: () => void;
  stars: number;
  onStarsChange?: (stars: number) => void;
}

interface ProdutoAPI {
  id: number;
  nome: string;
  preco: number;
}

interface ItemInventario {
  food_id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

const API_URL = "http://127.0.0.1:8000";

const produtosVisuais: Record<
  string,
  {
    imagem: string;
    left: string;
    top: string;
  }
> = {
  Morango: {
    imagem: "/assets/objects/morango.png",
    left: "32%",
    top: "24%",
  },
  "Pão Estrela": {
    imagem: "/assets/objects/paoEstrela.png",
    left: "42%",
    top: "26%",
  },
  "Biscoito Lua": {
    imagem: "/assets/objects/biscoitoLua.png",
    left: "52%",
    top: "24%",
  },
  Amora: {
    imagem: "/assets/objects/amora.png",
    left: "62%",
    top: "24%",
  },
  Carne: {
    imagem: "/assets/objects/carne.png",
    left: "72%",
    top: "26%",
  },
  "Coxa de Frango": {
    imagem: "/assets/objects/coxaFrango.png",
    left: "32%",
    top: "45%",
  },
  "Fruta Mistério": {
    imagem: "/assets/objects/fruta.png",
    left: "42%",
    top: "41%",
  },
  Linguiça: {
    imagem: "/assets/objects/linguica.png",
    left: "52%",
    top: "45%",
  },
  Mirtilos: {
    imagem: "/assets/objects/mirtilo.png",
    left: "62%",
    top: "44%",
  },
  "Peixe Assado": {
    imagem: "/assets/objects/peixe.png",
    left: "72%",
    top: "45%",
  },
  Sopa: {
    imagem: "/assets/objects/sopa.png",
    left: "32%",
    top: "60%",
  },
  "Suco de Laranja": {
    imagem: "/assets/objects/sucoLaranja.png",
    left: "42%",
    top: "60%",
  },
  "Suco de Uva": {
    imagem: "/assets/objects/sucoUva.png",
    left: "52%",
    top: "60%",
  },
};

export function InventoryModal({ onClose, stars, onStarsChange }: Props) {
  const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);
  const [inventario, setInventario] = useState<ItemInventario[]>([]);
  const [saldoLocal, setSaldoLocal] = useState(stars);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [comprandoId, setComprandoId] = useState<number | null>(null);

  useEffect(() => {
    setSaldoLocal(stars);
  }, [stars]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [respostaProdutos, respostaInventario] = await Promise.all([
          fetch(`${API_URL}/api/foods/`),
          fetch(`${API_URL}/api/foods/inventory`),
        ]);

        if (!respostaProdutos.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }

        if (!respostaInventario.ok) {
          throw new Error("Não foi possível carregar o inventário.");
        }

        const dadosProdutos: ProdutoAPI[] = await respostaProdutos.json();
        const dadosInventario: ItemInventario[] =
          await respostaInventario.json();

        setProdutos(dadosProdutos);
        setInventario(dadosInventario);
      } catch {
        setMensagem(
          "Erro ao carregar a loja. Confira se o backend está ligado.",
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  async function carregarInventario() {
    const resposta = await fetch(`${API_URL}/api/foods/inventory`);

    if (!resposta.ok) {
      throw new Error("Não foi possível atualizar o inventário.");
    }

    const dados: ItemInventario[] = await resposta.json();
    setInventario(dados);
  }

  async function comprarProduto(produto: ProdutoAPI) {
    if (comprandoId !== null) return;

    setComprandoId(produto.id);
    setMensagem("");

    try {
      const resposta = await fetch(`${API_URL}/api/foods/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food_id: produto.id,
        }),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Não foi possível comprar este produto.",
        );
      }

      if (typeof resultado.estrelas === "number") {
        setSaldoLocal(resultado.estrelas);
        onStarsChange?.(resultado.estrelas);
      }

      setMensagem(`${produto.nome} comprado com sucesso!`);

      try {
        await carregarInventario();
      } catch {
        setMensagem(
          `${produto.nome} comprado, mas não foi possível atualizar o inventário.`,
        );
      }
    } catch (erro) {
      setMensagem(
        erro instanceof Error
          ? erro.message
          : "Ocorreu um erro ao realizar a compra.",
      );
    } finally {
      setComprandoId(null);
    }
  }

  return (
    <ModalBase title="Loja da Raposa" onClose={onClose}>
      <div className="hud-currency">
        <span>⭐ {saldoLocal}</span>
      </div>

      <div className="store-scene">
        <img
          className="store-background"
          src="/assets/backgrounds/bgLoja.png"
          alt="Loja da Raposa"
        />

        <div className="store-products">
          {carregando && <p>Carregando produtos...</p>}

          {!carregando &&
            produtos.map((produto) => {
              const visual = produtosVisuais[produto.nome];

              if (!visual) return null;

              const comprando = comprandoId === produto.id;

              return (
                <button
                  className="store-product"
                  key={produto.id}
                  style={{
                    left: visual.left,
                    top: visual.top,
                  }}
                  type="button"
                  disabled={comprando || comprandoId !== null}
                  onClick={() => comprarProduto(produto)}
                  aria-label={`Comprar ${produto.nome} por ${produto.preco} estrelas`}
                >
                  <img src={visual.imagem} alt={produto.nome} />

                  <span className="product-tooltip">
                    <strong>{produto.nome}</strong>
                    <small>
                      {comprando ? "Comprando..." : `⭐ ${produto.preco}`}
                    </small>
                  </span>
                </button>
              );
            })}

          <div className="fox-cart">
            <img
              src="/assets/objects/carrinho.png"
              alt="Carrinho da Raposa"
            />
          </div>
        </div>
      </div>

      {mensagem && <p role="status">{mensagem}</p>}

      {inventario.length > 0 && (
        <section aria-label="Inventário de alimentos">
          <h3>Seus alimentos</h3>
          <ul>
            {inventario.map((item) => (
              <li key={item.food_id}>
                {item.nome} — quantidade: {item.quantidade}
              </li>
            ))}
          </ul>
        </section>
      )}
    </ModalBase>
  );
}
