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
    name: "Pitaco liberado",
    category: "Brincadeiras & Liberdades",
    price: 250.00,
    image: "https://i.pinimg.com/736x/97/0b/93/970b937e0a0662746feb39cfdf157952.jpg",
    description: "Direito de dar um pitaco no casamento uma vez."
  },
  {
    id: "2",
    name: "Pitaco sem limites",
    category: "Brincadeiras & Liberdades",
    price: 500.00,
    image: "https://i.pinimg.com/1200x/60/85/7a/60857a6c0436077ec667cff38aaf9d25.jpg",
    description: "Pitacos ilimitados sem julgamento."
  },
  {
    id: "3",
    name: "Juiz da DR",
    category: "Brincadeiras & Liberdades",
    price: 330.00,
    image: "https://i.pinimg.com/1200x/27/b4/96/27b49607ea768b8e3a5249ab65eed27f.jpg",
    description: "Opine oficialmente nas discussões do casal."
  },
  {
    id: "4",
    name: "Tribunal do amor",
    category: "Brincadeiras & Liberdades",
    price: 400.00,
    image: "https://i.pinimg.com/736x/42/0c/a6/420ca64512b634979c8ffd82a1272184.jpg",
    description: "Escolha quem está certo na discussão."
  },
  {
    id: "5",
    name: "Fila VIP do buffet",
    category: "Comida & Bebida",
    price: 250.00,
    image: "https://br.pinterest.com/pin/76139049947527271/",
    description: "Passe na frente do buffet sem culpa."
  },
  {
    id: "6",
    name: "Repeteco liberado",
    category: "Comida & Bebida",
    price: 200.00,
    image: "https://i.pinimg.com/1200x/37/5e/cb/375ecb634bad823eaffcf69d8f00f66a.jpg",
    description: "Repita o prato sem julgamentos."
  },
  {
    id: "7",
    name: "DJ por um momento",
    category: "Festa & Diversão",
    price: 100.00,
    image: "https://i.pinimg.com/736x/20/15/f5/2015f5b6b706749dd329b0fe0ad4895d.jpg",
    description: "Escolha a próxima música da festa."
  },
  {
    id: "8",
    name: "Furto doce autorizado",
    category: "Comida & Bebida",
    price: 150.00,
    image: "https://i.pinimg.com/1200x/1d/33/c5/1d33c579f19ed6b3395ab79c84361148.jpg",
    description: "Roube um docinho sem ser julgado."
  },
  {
    id: "9",
    name: "Docinho to-go",
    category: "Comida & Bebida",
    price: 150.00,
    image: "https://i.pinimg.com/736x/29/d9/f1/29d9f1722f42df2d358d39beae70b03a.jpg",
    description: "Leve docinhos para viagem."
  },
  {
    id: "10",
    name: "Interrupção sem culpa",
    category: "Brincadeiras & Liberdades",
    price: 400.00,
    image: "https://i.pinimg.com/736x/a0/55/94/a055940d350c0e8fe60fbabfcd733890.jpg",
    description: "Interrompa a conversa do casal."
  },

  {
    id: "11",
    name: "Pergunta clássica",
    category: "Brincadeiras & Liberdades",
    price: 300.00,
    image: "https://i.pinimg.com/1200x/85/40/55/854055366d02a36498cd4ed55b122e75.jpg",
    description: "Pergunte 'e os filhos?' sem constrangimento."
  },
  {
    id: "12",
    name: "Uber do amor",
    category: "Contribuições & Apoio Financeiro",
    price: 400.00,
    image: "https://i.pinimg.com/736x/2c/ea/3e/2cea3e7494f8f6f763216b708c21f4f2.jpg",
    description: "Ajude no transporte dos noivos."
  },
  {
    id: "13",
    name: "After liberado",
    category: "Festa & Diversão",
    price: 500.00,
    image: "https://i.pinimg.com/736x/f4/49/99/f449991b5381d26852c7af37eab4cd82.jpg",
    description: "Fique até o último minuto da festa."
  },
  {
    id: "14",
    name: "Spa relax pré-casamento",
    category: "Bem-estar & Relacionamento",
    price: 1000.00,
    image: "https://br.pinterest.com/pin/991566042972533138/",
    description: "Momento relaxante para a noiva."
  },
  {
    id: "15",
    name: "DR assistida",
    category: "Bem-estar & Relacionamento",
    price: 500.00,
    image: "https://i.pinimg.com/736x/5d/f1/44/5df14410e05919391aa0b233f6856b0b.jpg",
    description: "Terapia preventiva para o casal."
  },
  {
    id: "16",
    name: "Fundo do sofá",
    category: "Vida a Dois",
    price: 250.00,
    image: "https://i.pinimg.com/736x/3a/67/3a/3a673a2a88e2387283db5e064106f34c.jpg",
    description: "Reserva emergencial para dormir no sofá."
  },
  {
    id: "17",
    name: "Viagem anti-DR",
    category: "Experiências & Viagens",
    price: 1200.00,
    image: "https://i.pinimg.com/1200x/78/24/d2/7824d2581ee6694f947631e0b549ada8.jpg",
    description: "Viagem rápida para esfriar a cabeça."
  },
  {
    id: "18",
    name: "Controle da paz",
    category: "Vida a Dois",
    price: 200.00,
    image: "https://i.pinimg.com/736x/a5/ed/a1/a5eda1d1bc9cb255a73050ecf69c20c7.jpg",
    description: "Evite brigas com um controle extra."
  },
  {
    id: "19",
    name: "Ajuda simbólica",
    category: "Contribuições & Apoio Financeiro",
    price: 50.00,
    image: "https://i.pinimg.com/736x/37/f8/3c/37f83c0977d880c5279b12f817395647.jpg",
    description: "Contribuição simbólica e carinhosa."
  },
  {
    id: "20",
    name: "Kit primeiros socorros",
    category: "Brincadeiras & Liberdades",
    price: 100.00,
    image: "https://i.pinimg.com/736x/55/8e/9d/558e9d13ec517eb043afdd2d3865c08b.jpg",
    description: "Para emergências matrimoniais."
  },

  {
    id: "21",
    name: "Noite especial",
    category: "Estilo & Utilidades",
    price: 200.00,
    image: "https://i.pinimg.com/1200x/08/df/5a/08df5a7130a2050ea0dd2af9b87627f9.jpg",
    description: "Presente para a noite de núpcias."
  },
  {
    id: "22",
    name: "Fundo bebê",
    category: "Contribuições & Apoio Financeiro",
    price: 500.00,
    image: "https://br.pinterest.com/pin/336644140917897258/",
    description: "Ajuda para o primeiro filho."
  },
  {
    id: "23",
    name: "Silêncio garantido",
    category: "Vida a Dois",
    price: 150.00,
    image: "https://br.pinterest.com/pin/4606478867898946304/",
    description: "Tampão de ouvido para dormir melhor."
  },
  {
    id: "24",
    name: "Chef iniciante",
    category: "Vida a Dois",
    price: 300.00,
    image: "https://br.pinterest.com/pin/91972017379020107/",
    description: "Curso de culinária para o noivo."
  },
  {
    id: "25",
    name: "Cobertor da razão",
    category: "Vida a Dois",
    price: 200.00,
    image: "https://br.pinterest.com/pin/91972017379020107/",
    description: "Para a noiva estar sempre coberta de razão."
  },
  {
    id: "26",
    name: "Maratona a dois",
    category: "Festa & Diversão",
    price: 150.00,
    image: "https://br.pinterest.com/pin/313352086588252328/",
    description: "3 meses de Netflix garantidos."
  },
  {
    id: "27",
    name: "Truco liberado",
    category: "Festa & Diversão",
    price: 1500.00,
    image: "https://br.pinterest.com/pin/1900024837308885/",
    description: "Jogue truco no time do noivo."
  },
  {
    id: "28",
    name: "Autoridade máxima",
    category: "Brincadeiras & Liberdades",
    price: 300.00,
    image: "https://br.pinterest.com/pin/2392606047831540/",
    description: "Rolo de macarrão oficial da casa."
  },
  {
    id: "29",
    name: "Proteção anti-buquê",
    category: "Brincadeiras & Liberdades",
    price: 500.00,
    image: "https://br.pinterest.com/pin/76139049947525729/",
    description: "Evite que o buquê seja lançado."
  },
  {
    id: "30",
    name: "Sushi garantido",
    category: "Comida & Bebida",
    price: 200.00,
    image: "https://br.pinterest.com/pin/397231629653827864/",
    description: "Rodízio japonês para a noiva."
  },

  {
    id: "31",
    name: "Dia de jogo",
    category: "Estilo & Utilidades",
    price: 200.00,
    image: "https://br.pinterest.com/pin/197947346118679075/",
    description: "Camiseta do time para o noivo."
  },
  {
    id: "32",
    name: "Defesa do noivo",
    category: "Brincadeiras & Liberdades",
    price: 150.00,
    image: "https://br.pinterest.com/pin/242561129984219664/",
    description: "Capacete contra o rolo de macarrão."
  },
  {
    id: "33",
    name: "Ajuda na festa",
    category: "Contribuições & Apoio Financeiro",
    price: 800.00,
    image: "https://br.pinterest.com/pin/362469470041069285/",
    description: "Contribuição direta para a festa."
  },
  {
    id: "34",
    name: "Sanidade do casal",
    category: "Bem-estar & Relacionamento",
    price: 600.00,
    image: "https://br.pinterest.com/pin/48906345949776936/",
    description: "Psicólogo para os noivos."
  },
  {
    id: "35",
    name: "Visual em dia",
    category: "Estilo & Utilidades",
    price: 700.00,
    image: "https://br.pinterest.com/pin/76139049947525726/",
    description: "Barba e cabelo do noivo por um ano."
  },
  {
    id: "36",
    name: "Abastecimento do lar",
    category: "Vida a Dois",
    price: 400.00,
    image: "https://br.pinterest.com/pin/235594624252586708/",
    description: "Ajuda com compras do mercado."
  },
  {
    id: "37",
    name: "Ajuda abençoada",
    category: "Contribuições & Apoio Financeiro",
    price: 1000.00,
    image: "https://br.pinterest.com/pin/67342956923152925/",
    description: "Contribuição generosa."
  },
  {
    id: "38",
    name: "Kit calma",
    category: "Bem-estar & Relacionamento",
    price: 150.00,
    image: "https://br.pinterest.com/pin/82120393200834423/",
    description: "Calmantes para o grande dia."
  },
  {
    id: "39",
    name: "Lembrancinha sincera",
    category: "Contribuições & Apoio Financeiro",
    price: 100.00,
    image: "https://br.pinterest.com/pin/67342956923152928/",
    description: "Presente simples, mas de coração."
  },
  {
    id: "40",
    name: "Futuro garantido",
    category: "Contribuições & Apoio Financeiro",
    price: 500.00,
    image: "https://br.pinterest.com/pin/146155950401642959/",
    description: "Ajuda para a aposentadoria dos noivos."
  },
  {
    id: "41",
    name: "Controle saudável",
    category: "Vida a Dois",
    price: 80.00,
    image: "https://br.pinterest.com/pin/52002570694602917/",
    description: "Balança para manter a saúde em dia."
  },
  {
    id: "42",
    name: "Faxina automática",
    category: "Vida a Dois",
    price: 1500.00,
    image: "https://br.pinterest.com/pin/951737333781345944/",
    description: "Robô para ajudar na limpeza da casa."
  }
];

export const categories = [...new Set(products.map(p => p.category))];