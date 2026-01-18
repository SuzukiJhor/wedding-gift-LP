export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Jogo de Panelas Tramontina",
        description: "Conjunto com 7 peças em alumínio antiaderente, ideal para o dia a dia do casal.",
        price: 599.90,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        category: "Cozinha"
    },
    {
        id: "2",
        name: "Jogo de Cama Queen",
        description: "Lençol 400 fios em algodão egípcio, branco com acabamento em ponto palito.",
        price: 459.90,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
        category: "Quarto"
    },
    {
        id: "3",
        name: "Cafeteira Nespresso",
        description: "Máquina de café expresso automática com design moderno e compacto.",
        price: 749.90,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
        category: "Cozinha"
    },
    {
        id: "4",
        name: "Aparelho de Jantar 42 Peças",
        description: "Porcelana branca com filete dourado, elegante para ocasiões especiais.",
        price: 899.90,
        image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400&h=400&fit=crop",
        category: "Mesa"
    },
    {
        id: "5",
        name: "Cobertor Casal Soft",
        description: "Manta em microfibra extra macia, perfeita para noites aconchegantes.",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
        category: "Quarto"
    },
    {
        id: "6",
        name: "Mixer de Mão Profissional",
        description: "Mixer 800W com lâminas de aço inox e copo dosador incluído.",
        price: 349.90,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
        category: "Cozinha"
    },
    {
        id: "7",
        name: "Jogo de Toalhas 8 Peças",
        description: "Conjunto de toalhas 100% algodão, fio penteado, cor marfim.",
        price: 279.90,
        image: "https://images.unsplash.com/photo-1620127252536-03bdfcb5a434?w=400&h=400&fit=crop",
        category: "Banho"
    },
    {
        id: "8",
        name: "Taças de Cristal Bohemia",
        description: "Conjunto com 6 taças para vinho tinto em cristal lapidado.",
        price: 459.90,
        image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=400&fit=crop",
        category: "Mesa"
    },
    {
        id: "9",
        name: "Aspirador Robô Inteligente",
        description: "Aspirador com mapeamento por laser e controle via aplicativo.",
        price: 1299.90,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        category: "Casa"
    },
    {
        id: "10",
        name: "Faqueiro Inox 72 Peças",
        description: "Conjunto completo em aço inox com cabo em madeira nobre.",
        price: 549.90,
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
        category: "Mesa"
    },
    {
        id: "11",
        name: "Travesseiro Viscoelástico",
        description: "Par de travesseiros em espuma viscoelástica com capa removível.",
        price: 299.90,
        image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&h=400&fit=crop",
        category: "Quarto"
    },
    {
        id: "12",
        name: "Air Fryer Digital 5L",
        description: "Fritadeira elétrica sem óleo com painel digital e cesto antiaderente.",
        price: 499.90,
        image: "https://images.unsplash.com/photo-1648145766304-dca04ba5d52f?w=400&h=400&fit=crop",
        category: "Cozinha"
    }
];

export const categories = [...new Set(products.map(p => p.category))];
