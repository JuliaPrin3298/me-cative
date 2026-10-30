import { useEffect, useState } from "react";
import { ModalBase } from "./ModalBase";
import "./InventoryModal.css";
import {
  carregarProgresso,
  salvarProgresso,
} from "../../services/localStorage";

import { CurrencyDisplay } from "../hud/CurrencyDisplay";

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
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [comprandoId, setComprandoId] = useState<number | null>(null);
  const [comprados, setComprados] = useState<Record<number, number>>({});


  const itensNoCarrinho = produtos
    .filter((produto) => (comprados[produto.id] ?? 0) > 0)
    .map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      quantidade: comprados[produto.id],
    }));

  const itensNaMochila = inventario
    .map((item) => ({
      ...item,
      quantidade: item.quantidade - (comprados[item.food_id] ?? 0),
    }))
    .filter((item) => item.quantidade > 0);

  function imagemDoProduto(nome: string): string | undefined {
    const alvo = nome.trim().toLowerCase();

    return Object.entries(produtosVisuais).find(
      ([chave]) => chave.trim().toLowerCase() === alvo
    )?.[1].imagem;
  }


  useEffect(() => {
    async function carregarDados() {
      try {
        const respostaProdutos = await fetch(`${API_URL}/api/foods/`);

        if (!respostaProdutos.ok) {
          throw new Error("Não foi possível carregar os produtos.");
        }

        const dadosProdutos: ProdutoAPI[] = await respostaProdutos.json();
        setProdutos(dadosProdutos);

        // Primeiro, tenta recuperar as compras salvas no navegador.
        const progresso = carregarProgresso();

        if (progresso) {
          setInventario(progresso.inventario);
        } else {
          // Usa o inventário da API somente se não houver progresso salvo.
          const respostaInventario = await fetch(
            `${API_URL}/api/foods/inventory`
          );

          if (!respostaInventario.ok) {
            throw new Error("Não foi possível carregar o inventário.");
          }

          const dadosInventario: ItemInventario[] =
            await respostaInventario.json();

          setInventario(dadosInventario);
        }
      } catch (erro) {
        console.error("Erro ao carregar a loja:", erro);
        setMensagem("Erro ao carregar a loja. Confira se o backend está ligado.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);


  async function comprarProduto(produto: ProdutoAPI) {
    if (comprandoId !== null) return;

    setComprandoId(produto.id);
    setMensagem("");

    try {
      const progresso = carregarProgresso();

      if (!progresso) {
        throw new Error(
          "O progresso ainda não foi inicializado. Recarregue o jogo."
        );
      }

      if (progresso.estrelas < produto.preco) {
        throw new Error("Você não tem estrelas suficientes!");
      }

      const inventarioAtualizado = [...progresso.inventario];
      const itemExistente = inventarioAtualizado.find(
        (item) => item.food_id === produto.id
      );

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        inventarioAtualizado.push({
          food_id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
        });
      }

      const estrelasAtualizadas = progresso.estrelas - produto.preco;

      salvarProgresso({
        ...progresso,
        estrelas: estrelasAtualizadas,
        inventario: inventarioAtualizado,
      });

      onStarsChange?.(estrelasAtualizadas);
      setInventario(inventarioAtualizado);

      setComprados((atual) => ({
        ...atual,
        [produto.id]: (atual[produto.id] ?? 0) + 1,
      }));

      setMensagem(`${produto.nome} comprado com sucesso!`);
    } catch (erro) {
      setMensagem(
        erro instanceof Error
          ? erro.message
          : "Ocorreu um erro ao realizar a compra."
      );
    } finally {
      setComprandoId(null);
    }
  }

  return (
    <ModalBase title="Loja da Raposa" onClose={onClose}>
      <div className="hud-currency">
        <CurrencyDisplay amount={stars} />
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
              const visual = Object.entries(produtosVisuais).find(
                ([nome]) =>
                  nome.trim().toLowerCase() === produto.nome.trim().toLowerCase()
              )?.[1];

              if (!visual) {
                console.warn("Produto sem imagem cadastrada:", produto.nome);
                return null;
              }

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
            <div
              className="cart-items"
              role="list"
              aria-label="Itens comprados no carrinho"
            >
              {itensNoCarrinho.map((item) => {
                const imagem = imagemDoProduto(item.nome);

                return (
                  <span
                    className="cart-item"
                    role="listitem"
                    // a key muda com a quantidade para repetir a animação de "cair no carrinho"
                    key={`${item.id}-${item.quantidade}`}
                  >
                    {imagem && <img src={imagem} alt={item.nome} />}
                    {item.quantidade > 1 && (
                      <span className="cart-item-qty">{item.quantidade}</span>
                    )}
                  </span>
                );
              })}
            </div>

            <img
              src="/assets/objects/carrinho.png"
              alt="Carrinho da Raposa"
            />
          </div>
        </div>

        {mensagem && (
          <p className="store-toast" role="status">
            {mensagem}
          </p>
        )}

        {itensNaMochila.length > 0 && (
          <ul className="inventory-mini" aria-label="Itens que você já tem">
            {itensNaMochila.map((item) => {
              const imagem = imagemDoProduto(item.nome);

              return (
                <li
                  className="inventory-mini-item"
                  key={item.food_id}
                  title={item.nome}
                  aria-label={`${item.nome}: ${item.quantidade}`}
                >
                  {imagem ? <img src={imagem} alt="" /> : <span>{item.nome}</span>}
                  <span className="inventory-mini-qty">{item.quantidade}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </ModalBase>
  );
}