import { ModalBase } from "./ModalBase";
import "./InventoryModal.css";

interface Props {
  onClose: () => void;
}

const produtos = [
  {
    id: "morango",
    nome: "Morango",
    preco: 20,
    imagem: "/assets/objects/morango.png",
    posicao: {
      left: "32%",
      top: "24%",
    },
  },
  {
    id: "paoEstrela",
    nome: "Pão Estrela",
    preco: 30,
    imagem: "/assets/objects/paoEstrela.png",
    posicao: {
      left: "42%",
      top: "26%",
    },
  },
  {
    id: "biscoitoLua",
    nome: "Biscoito Lua",
    preco: 25,
    imagem: "/assets/objects/biscoitoLua.png",
    posicao: {
      left: "52%",
      top: "24%",
    },
  },
  {
    id: "amora",
    nome: "Amora",
    preco: 20,
    imagem: "/assets/objects/amora.png",
    posicao: {
      left: "62%",
      top: "24%",
    },
  },
  {
    id: "carne",
    nome: "Carne",
    preco: 30,
    imagem: "/assets/objects/carne.png",
    posicao: {
      left: "72%",
      top: "26%",
    },
  },
  {
    id: "coxaFrango",
    nome: "Coxa de Frango",
    preco: 30,
    imagem: "/assets/objects/coxaFrango.png",
    posicao: {
      left: "32%",
      top: "45%",
    },
  },
   {
    id: "fruta",
    nome: "Fruta Mistério",
    preco: 40,
    imagem: "/assets/objects/fruta.png",
    posicao: {
      left: "42%",
      top: "41%",
    },
  },
   {
    id: "linguica",
    nome: "Linguiça",
    preco: 25,
    imagem: "/assets/objects/linguica.png",
    posicao: {
      left: "52%",
      top: "45%",
    },
  },
   {
    id: "mirtilo",
    nome: "Mirtilos",
    preco: 15,
    imagem: "/assets/objects/mirtilo.png",
    posicao: {
      left: "62%",
      top: "44%",
    },
  },
   {
    id: "peixe",
    nome: "Peixe Assado",
    preco: 30,
    imagem: "/assets/objects/peixe.png",
    posicao: {
      left: "72%",
      top: "45%",
    },
  },
 {
    id: "sopa",
    nome: "Sopa",
    preco: 30,
    imagem: "/assets/objects/sopa.png",
    posicao: {
      left: "32%",
      top: "60%",
    },
  },
   {
    id: "sucoLaranja",
    nome: "Suco de Laranja",
    preco: 30,
    imagem: "/assets/objects/sucoLaranja.png",
    posicao: {
      left: "42%",
      top: "60%",
    },
  },
   {
    id: "sucoUva",
    nome: "Suco de Uva",
    preco: 30,
    imagem: "/assets/objects/sucoUva.png",
    posicao: {
      left: "52%",
      top: "60%",
    },
  },
];

export function InventoryModal({ onClose }: Props) {
  return (
    <ModalBase title="Loja da Raposa" onClose={onClose}>
      <div className="store-scene">
        <img
          className="store-background"
          src="/assets/backgrounds/bgLoja.png"
          alt="Loja da Raposa"
        />

        <div className="store-products">
          {produtos.map((produto) => (
            <button
              className="store-product"
              key={produto.id}
              style={{
                left: produto.posicao.left,
                top: produto.posicao.top,
              }}
              type="button"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
              />

              <span className="product-tooltip">
                <strong>{produto.nome}</strong>
                <small>⭐ {produto.preco}</small>
              </span>
            </button>
          ))}
          <div className="fox-cart">
            <img
              src="/assets/objects/carrinho.png"
              alt="Carrinho da Raposa"
            />
          </div>
        </div>


      </div>
    </ModalBase >
  );
}