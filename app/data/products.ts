export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

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
        name: "Fritadeira Elétrica Air Fryer",
        category: "Eletroportáteis",
        price: 450.00,
        image: "https://m.media-amazon.com/images/I/61MhKNTYsyS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",
        description: "Fritadeira sem óleo 4L, essencial para uma cozinha prática."
    },
    {
        id: "2",
        name: "Forno Micro-ondas 30L",
        category: "Eletroportáteis",
        price: 680.00,
        image: "https://m.media-amazon.com/images/I/71+0y7v5JFL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Exemplo Samsung/Brastemp 30L inox
        description: "Micro-ondas inox com funções pré-programadas."
    },
    {
        id: "3",
        name: "Sanduicheira e Grill",
        category: "Eletroportáteis",
        price: 120.00,
        image: "https://m.media-amazon.com/images/I/71EkMaUGytL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Philco/Electrolux sanduicheira grill antiaderente
        description: "Placas antiaderentes, ideal para lanches rápidos."
    },
    {
        id: "4",
        name: "Jogo de Panelas Antiaderentes (10 peças)",
        category: "Cozinha",
        price: 550.00,
        image: "https://m.media-amazon.com/images/I/81BJmhzVfuL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Conjunto 10 peças antiaderente com tampas
        description: "Conjunto completo com tampas de vidro temperado."
    },
    {
        id: "5",
        name: "Aparelho de Jantar 20 Peças",
        category: "Mesa Posta",
        price: 320.00,
        image: "https://m.media-amazon.com/images/I/71Cka-GJbhL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Tramontina/Oxford 20 peças porcelana branca
        description: "Porcelana branca com detalhes clássicos."
    },
    {
        id: "6",
        name: "Liquidificador de Alta Potência",
        category: "Eletroportáteis",
        price: 280.00,
        image: "https://m.media-amazon.com/images/I/61dxafi+CgL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Liquidificador 1200W copo vidro
        description: "Copo de vidro resistente e 1200W de potência."
    },
    {
        id: "7",
        name: "Batedeira Planetária",
        category: "Eletroportáteis",
        price: 490.00,
        image: "https://m.media-amazon.com/images/I/71h9jyPkG6L._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Planetária preta/inox similar
        description: "Ideal para quem ama fazer bolos e pães caseiros."
    },
    {
        id: "8",
        name: "Cafeteira de Cápsulas",
        category: "Eletroportáteis",
        price: 399.00,
        image: "https://m.media-amazon.com/images/I/51Ls1iSTcuS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Nespresso ou similar cápsulas
        description: "Cafeteira expresso multi-bebidas."
    },
    {
        id: "9",
        name: "Conjunto de Faqueiro 42 peças",
        category: "Mesa Posta",
        price: 250.00,
        image: "https://m.media-amazon.com/images/I/71EkMaUGytL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Faqueiro inox 42 peças com estojo
        description: "Aço inox de alta durabilidade com estojo."
    },
    {
        id: "10",
        name: "Aspirador de Pó Robô",
        category: "Limpeza",
        price: 850.00,
        image: "https://m.media-amazon.com/images/I/81BJmhzVfuL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Robô aspirador Roomba-like
        description: "Varre, aspira e passa pano automaticamente."
    },
    {
        id: "11",
        name: "Jogo de Cama King 400 Fios",
        category: "Cama e Banho",
        price: 420.00,
        image: "https://m.media-amazon.com/images/I/61f9+3aqpwL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Lençol king algodão egípcio neutro
        description: "Algodão egípcio, cor neutra."
    },
    {
        id: "12",
        name: "Kit de Toalhas Banhão (5 peças)",
        category: "Cama e Banho",
        price: 180.00,
        image: "https://m.media-amazon.com/images/I/71Cka-GJbhL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Kit toalhas algodão alta gramatura
        description: "100% algodão de alta gramatura."
    },
    {
        id: "13",
        name: "Ferro de Passar a Vapor",
        category: "Eletroportáteis",
        price: 150.00,
        image: "https://m.media-amazon.com/images/I/51tjHZoyUmL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Ferro vapor base cerâmica
        description: "Base cerâmica com desligamento automático."
    },
    {
        id: "14",
        name: "Mesa de Cabeceira Retro",
        category: "Móveis",
        price: 220.00,
        image: "https://m.media-amazon.com/images/I/61MhKNTYsyS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Mesa cabeceira MDF retro pés madeira
        description: "Móvel decorativo em MDF com pés de madeira."
    },
    {
        id: "15",
        name: "Mixer Vertical 3 em 1",
        category: "Eletroportáteis",
        price: 210.00,
        image: "https://m.media-amazon.com/images/I/71EkMaUGytL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Mixer vertical com acessórios
        description: "Mixer, processador e batedor de claras."
    },
    {
        id: "16",
        name: "Smart TV 50 Polegadas 4K",
        category: "Eletrônicos",
        price: 2400.00,
        image: "https://m.media-amazon.com/images/I/81BJmhzVfuL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Smart TV 50" 4K UHD
        description: "Resolução Ultra HD com comandos de voz."
    },
    {
        id: "17",
        name: "Adega para 12 Vinhos",
        category: "Eletroportáteis",
        price: 750.00,
        image: "https://m.media-amazon.com/images/I/61dxafi+CgL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Adega 12 garrafas vidro digital
        description: "Controle digital de temperatura e acabamento em vidro."
    },
    {
        id: "18",
        name: "Pipoqueira Elétrica",
        category: "Eletroportáteis",
        price: 135.00,
        image: "https://m.media-amazon.com/images/I/71h9jyPkG6L._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Pipoqueira ar quente elétrica
        description: "Pipoca saudável feita com ar quente."
    },
    {
        id: "19",
        name: "Conjunto de Taças de Cristal (6 peças)",
        category: "Mesa Posta",
        price: 190.00,
        image: "https://m.media-amazon.com/images/I/51Ls1iSTcuS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Taças vinho cristal tinto 6 peças
        description: "Elegantes taças para vinho tinto."
    },
    {
        id: "20",
        name: "Escorredor de Pratos Inox",
        category: "Cozinha",
        price: 145.00,
        image: "https://m.media-amazon.com/images/I/71Cka-GJbhL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Escorredor inox 16 pratos
        description: "Capacidade para 16 pratos e porta talheres."
    },
    {
        id: "21",
        name: "Mousse Maker / Batedor de Leite",
        category: "Cozinha",
        price: 85.00,
        image: "https://m.media-amazon.com/images/I/61f9+3aqpwL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Batedor elétrico leite/espuma
        description: "Para fazer espuma de leite tipo cafeteria."
    },
    {
        id: "22",
        name: "Chapa de Ferro Fundido",
        category: "Cozinha",
        price: 110.00,
        image: "https://m.media-amazon.com/images/I/61MhKNTYsyS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Chapa ferro fundido grelha
        description: "Ideal para grelhados e hambúrgueres."
    },
    {
        id: "23",
        name: "Quadro Decorativo Minimalista",
        category: "Decoração",
        price: 160.00,
        image: "https://m.media-amazon.com/images/I/71EkMaUGytL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Quadro abstrato minimalista madeira
        description: "Moldura em madeira com arte abstrata."
    },
    {
        id: "24",
        name: "Luminária de Chão Moderna",
        category: "Decoração",
        price: 295.00,
        image: "https://m.media-amazon.com/images/I/81BJmhzVfuL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Luminária chão industrial moderna
        description: "Design industrial para sala de estar."
    },
    {
        id: "25",
        name: "Purificador de Água",
        category: "Eletroportáteis",
        price: 520.00,
        image: "https://m.media-amazon.com/images/I/61dxafi+CgL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Purificador gelada natural filtro
        description: "Água gelada e natural com filtro de alta eficiência."
    },
    {
        id: "26",
        name: "Jogo de Utensílios de Silicone",
        category: "Cozinha",
        price: 115.00,
        image: "https://m.media-amazon.com/images/I/71h9jyPkG6L._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Kit utensílios silicone cozinha
        description: "Resistentes ao calor, não riscam as panelas."
    },
    {
        id: "27",
        name: "Porta Temperos Giratório",
        category: "Cozinha",
        price: 95.00,
        image: "https://m.media-amazon.com/images/I/51Ls1iSTcuS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Suporte giratório 12 potes vidro inox
        description: "12 potes de vidro com suporte em inox."
    },
    {
        id: "28",
        name: "Conjunto de Travessas Refratárias",
        category: "Cozinha",
        price: 185.00,
        image: "https://m.media-amazon.com/images/I/71Cka-GJbhL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Travessas vidro refratárias 3 peças
        description: "3 peças de vidro que podem ir ao forno."
    },
    {
        id: "29",
        name: "Garrafa Térmica Premium",
        category: "Mesa Posta",
        price: 130.00,
        image: "https://m.media-amazon.com/images/I/61f9+3aqpwL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Garrafa térmica 12h café
        description: "Mantém o café quente por até 12 horas."
    },
    {
        id: "30",
        name: "Mala de Viagem Média",
        category: "Utilidades",
        price: 340.00,
        image: "https://m.media-amazon.com/images/I/61MhKNTYsyS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Mala rígida média rodinhas 360
        description: "Rígida, com rodinhas 360 graus para a lua de mel."
    },
    {
        id: "31",
        name: "Processador de Alimentos",
        category: "Eletroportáteis",
        price: 199.00,
        image: "https://m.media-amazon.com/images/I/71EkMaUGytL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Processador pica fatia legumes
        description: "Pica e fatia legumes em segundos."
    },
    {
        id: "32",
        name: "Vaporizador de Roupas (Steamer)",
        category: "Eletroportáteis",
        price: 175.00,
        image: "https://m.media-amazon.com/images/I/81BJmhzVfuL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Steamer vaporizador roupas cabide
        description: "Desamassa roupas direto no cabide."
    },
    {
        id: "33",
        name: "Balança Digital de Cozinha",
        category: "Cozinha",
        price: 45.00,
        image: "https://m.media-amazon.com/images/I/61dxafi+CgL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Balança digital precisão cozinha
        description: "Precisão para suas receitas culinárias."
    },
    {
        id: "34",
        name: "Organizador de Geladeira (Set)",
        category: "Organização",
        price: 125.00,
        image: "https://m.media-amazon.com/images/I/71h9jyPkG6L._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Kit gavetas acrílicas geladeira
        description: "Kit com 4 gavetas acrílicas empilháveis."
    },
    {
        id: "35",
        name: "Petisqueira de Bambu",
        category: "Mesa Posta",
        price: 75.00,
        image: "https://m.media-amazon.com/images/I/51Ls1iSTcuS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Petisqueira bambu ecológica
        description: "Ecológica e charmosa para receber amigos."
    },
    {
        id: "36",
        name: "Jogo de Banho Gigante (2 peças)",
        category: "Cama e Banho",
        price: 140.00,
        image: "https://m.media-amazon.com/images/I/71Cka-GJbhL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Toalhas banho gigante premium
        description: "Toalhas premium extra macias."
    },
    {
        id: "37",
        name: "Panela de Pressão Elétrica",
        category: "Eletroportáteis",
        price: 380.00,
        image: "https://m.media-amazon.com/images/I/61f9+3aqpwL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Panela pressão elétrica segura
        description: "Muito mais segura e silenciosa que a tradicional."
    },
    {
        id: "38",
        name: "Edredom Queen Soft Touch",
        category: "Cama e Banho",
        price: 290.00,
        image: "https://m.media-amazon.com/images/I/61MhKNTYsyS._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Edredom queen dupla face soft
        description: "Dupla face e extremamente confortável."
    },
    {
        id: "39",
        name: "Conjunto de Copos de Vidro (12 peças)",
        category: "Mesa Posta",
        price: 90.00,
        image: "https://m.media-amazon.com/images/I/71EkMaUGytL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Conjunto copos vidro altos/baixos
        description: "Copos altos e baixos para uso diário."
    },
    {
        id: "40",
        name: "Caixa de Som Bluetooth",
        category: "Eletrônicos",
        price: 250.00,
        image: "https://m.media-amazon.com/images/I/81BJmhzVfuL._AC_UF894,1000_QL80_.jpg?w=800&fit=crop",  // Caixa som Bluetooth à prova d'água
        description: "À prova d'água para animar a casa nova."
    }
];

export const categories = [...new Set(products.map(p => p.category))];