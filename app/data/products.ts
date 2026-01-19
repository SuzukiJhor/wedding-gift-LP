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
        image: "https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=400&h=400&fit=crop",
        description: "Fritadeira sem óleo 4L, essencial para uma cozinha prática."
    },
    {
        id: "2",
        name: "Forno Micro-ondas 30L",
        category: "Eletroportáteis",
        price: 680.00,
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=400&fit=crop",
        description: "Micro-ondas inox com funções pré-programadas."
    },
    {
        id: "3",
        name: "Sanduicheira e Grill",
        category: "Eletroportáteis",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1584946391152-d11440c94610?w=400&h=400&fit=crop",
        description: "Placas antiaderentes, ideal para lanches rápidos."
    },
    {
        id: "4",
        name: "Jogo de Panelas Antiaderentes (10 peças)",
        category: "Cozinha",
        price: 550.00,
        image: "https://images.unsplash.com/photo-1584990344468-5a12626d8f8d?w=400&h=400&fit=crop",
        description: "Conjunto completo com tampas de vidro temperado."
    },
    {
        id: "5",
        name: "Aparelho de Jantar 20 Peças",
        category: "Mesa Posta",
        price: 320.00,
        image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400&h=400&fit=crop",
        description: "Porcelana branca com detalhes clássicos."
    },
    {
        id: "6",
        name: "Liquidificador de Alta Potência",
        category: "Eletroportáteis",
        price: 280.00,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop",
        description: "Copo de vidro resistente e 1200W de potência."
    },
    {
        id: "7",
        name: "Batedeira Planetária",
        category: "Eletroportáteis",
        price: 490.00,
        image: "https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?w=400&h=400&fit=crop",
        description: "Ideal para quem ama fazer bolos e pães caseiros."
    },
    {
        id: "8",
        name: "Cafeteira de Cápsulas",
        category: "Eletroportáteis",
        price: 399.00,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
        description: "Cafeteira expresso multi-bebidas."
    },
    {
        id: "9",
        name: "Conjunto de Faqueiro 42 peças",
        category: "Mesa Posta",
        price: 250.00,
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=400&fit=crop",
        description: "Aço inox de alta durabilidade com estojo."
    },
    {
        id: "10",
        name: "Aspirador de Pó Robô",
        category: "Limpeza",
        price: 850.00,
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
        description: "Varre, aspira e passa pano automaticamente."
    },
    {
        id: "11",
        name: "Jogo de Cama King 400 Fios",
        category: "Cama e Banho",
        price: 420.00,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
        description: "Algodão egípcio, cor neutra."
    },
    {
        id: "12",
        name: "Kit de Toalhas Banhão (5 peças)",
        category: "Cama e Banho",
        price: 180.00,
        image: "https://images.unsplash.com/photo-1620127252536-03bdfcb5a434?w=400&h=400&fit=crop",
        description: "100% algodão de alta gramatura."
    },
    {
        id: "13",
        name: "Ferro de Passar a Vapor",
        category: "Eletroportáteis",
        price: 150.00,
        image: "https://images.unsplash.com/photo-1620127252536-03bdfcb5a434?w=400&h=400&fit=crop",
        description: "Base cerâmica com desligamento automático."
    },
    {
        id: "14",
        name: "Mesa de Cabeceira Retro",
        category: "Móveis",
        price: 220.00,
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop",
        description: "Móvel decorativo em MDF com pés de madeira."
    },
    {
        id: "15",
        name: "Mixer Vertical 3 em 1",
        category: "Eletroportáteis",
        price: 210.00,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
        description: "Mixer, processador e batedor de claras."
    },
    {
        id: "16",
        name: "Smart TV 50 Polegadas 4K",
        category: "Eletrônicos",
        price: 2400.00,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
        description: "Resolução Ultra HD com comandos de voz."
    },
    {
        id: "17",
        name: "Adega para 12 Vinhos",
        category: "Eletroportáteis",
        price: 750.00,
        image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?w=400&h=400&fit=crop",
        description: "Controle digital de temperatura e acabamento em vidro."
    },
    {
        id: "18",
        name: "Pipoqueira Elétrica",
        category: "Eletroportáteis",
        price: 135.00,
        image: "https://images.unsplash.com/photo-1585647347384-2593bcac551e?w=400&h=400&fit=crop",
        description: "Pipoca saudável feita com ar quente."
    },
    {
        id: "19",
        name: "Conjunto de Taças de Cristal (6 peças)",
        category: "Mesa Posta",
        price: 190.00,
        image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=400&fit=crop",
        description: "Elegantes taças para vinho tinto."
    },
    {
        id: "20",
        name: "Escorredor de Pratos Inox",
        category: "Cozinha",
        price: 145.00,
        image: "https://images.unsplash.com/photo-1622219808331-5696c7476852?w=400&h=400&fit=crop",
        description: "Capacidade para 16 pratos e porta talheres."
    },
    {
        id: "21",
        name: "Mousse Maker / Batedor de Leite",
        category: "Cozinha",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1553909489-ee060f936377?w=400&h=400&fit=crop",
        description: "Para fazer espuma de leite tipo cafeteria."
    },
    {
        id: "22",
        name: "Chapa de Ferro Fundido",
        category: "Cozinha",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1584990344468-5a12626d8f8d?w=400&h=400&fit=crop",
        description: "Ideal para grelhados e hambúrgueres."
    },
    {
        id: "23",
        name: "Quadro Decorativo Minimalista",
        category: "Decoração",
        price: 160.00,
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=400&fit=crop",
        description: "Moldura em madeira com arte abstrata."
    },
    {
        id: "24",
        name: "Luminária de Chão Moderna",
        category: "Decoração",
        price: 295.00,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        description: "Design industrial para sala de estar."
    },
    {
        id: "25",
        name: "Purificador de Água",
        category: "Eletroportáteis",
        price: 520.00,
        image: "https://images.unsplash.com/photo-1585771724684-252702b6442e?w=400&h=400&fit=crop",
        description: "Água gelada e natural com filtro de alta eficiência."
    },
    {
        id: "26",
        name: "Jogo de Utensílios de Silicone",
        category: "Cozinha",
        price: 115.00,
        image: "https://images.unsplash.com/photo-1594759842811-9f9a4c884cb4?w=400&h=400&fit=crop",
        description: "Resistentes ao calor, não riscam as panelas."
    },
    {
        id: "27",
        name: "Porta Temperos Giratório",
        category: "Cozinha",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1532083158185-3c141d0820ec?w=400&h=400&fit=crop",
        description: "12 potes de vidro com suporte em inox."
    },
    {
        id: "28",
        name: "Conjunto de Travessas Refratárias",
        category: "Cozinha",
        price: 185.00,
        image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&h=400&fit=crop",
        description: "3 peças de vidro que podem ir ao forno."
    },
    {
        id: "29",
        name: "Garrafa Térmica Premium",
        category: "Mesa Posta",
        price: 130.00,
        image: "https://images.unsplash.com/photo-1560934149-623838247070?w=400&h=400&fit=crop",
        description: "Mantém o café quente por até 12 horas."
    },
    {
        id: "30",
        name: "Mala de Viagem Média",
        category: "Utilidades",
        price: 340.00,
        image: "https://images.unsplash.com/photo-1565026073735-a1024218ba45?w=400&h=400&fit=crop",
        description: "Rígida, com rodinhas 360 graus para a lua de mel."
    },
    {
        id: "31",
        name: "Processador de Alimentos",
        category: "Eletroportáteis",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?w=400&h=400&fit=crop",
        description: "Pica e fatia legumes em segundos."
    },
    {
        id: "32",
        name: "Vaporizador de Roupas (Steamer)",
        category: "Eletroportáteis",
        price: 175.00,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
        description: "Desamassa roupas direto no cabide."
    },
    {
        id: "33",
        name: "Balança Digital de Cozinha",
        category: "Cozinha",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1625244666014-9494372e9d28?w=400&h=400&fit=crop",
        description: "Precisão para suas receitas culinárias."
    },
    {
        id: "34",
        name: "Organizador de Geladeira (Set)",
        category: "Organização",
        price: 125.00,
        image: "https://images.unsplash.com/photo-1584622781564-1d9876a13d1e?w=400&h=400&fit=crop",
        description: "Kit com 4 gavetas acrílicas empilháveis."
    },
    {
        id: "35",
        name: "Petisqueira de Bambu",
        category: "Mesa Posta",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1541533693007-7ea47d894b0c?w=400&h=400&fit=crop",
        description: "Ecológica e charmosa para receber amigos."
    },
    {
        id: "36",
        name: "Jogo de Banho Gigante (2 peças)",
        category: "Cama e Banho",
        price: 140.00,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
        description: "Toalhas premium extra macias."
    },
    {
        id: "37",
        name: "Panela de Pressão Elétrica",
        category: "Eletroportáteis",
        price: 380.00,
        image: "https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?w=400&h=400&fit=crop",
        description: "Muito mais segura e silenciosa que a tradicional."
    },
    {
        id: "38",
        name: "Edredom Queen Soft Touch",
        category: "Cama e Banho",
        price: 290.00,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
        description: "Dupla face e extremamente confortável."
    },
    {
        id: "39",
        name: "Conjunto de Copos de Vidro (12 peças)",
        category: "Mesa Posta",
        price: 90.00,
        image: "https://images.unsplash.com/photo-1516919549054-e08258f296c5?w=400&h=400&fit=crop",
        description: "Copos altos e baixos para uso diário."
    },
    {
        id: "40",
        name: "Caixa de Som Bluetooth",
        category: "Eletrônicos",
        price: 250.00,
        image: "https://images.unsplash.com/photo-1608155613953-24157075210c?w=400&h=400&fit=crop",
        description: "À prova d'água para animar a casa nova."
    }
];

export const categories = [...new Set(products.map(p => p.category))];