import { Category, MenuItem, StoreInfo } from '../types';
import { ASSET_IMAGES } from '../assets/imagesMap';

export const STORE_INFO: StoreInfo = {
  name: 'Sol Café & Confeitaria',
  tagline: '"Sabor, carinho e qualidade em cada momento!"',
  address: 'Estr. Manoel de Sá, 926 Lote XV',
  whatsapp: '5521986964717',
  instagram: 'https://instagram.com/solcafeconfeitaria',
  isOpen: true,
  hours: 'Terça a Domingo das 07:30 às 20:00',
  paymentMethods: ['PIX', 'Dinheiro', 'Cartão de Débito', 'Cartão de Crédito'],
  pixKey: '21986964717',
  logoUrl: ASSET_IMAGES.logo
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-tapiocas',
    name: 'Tapiocas',
    icon: '🥞',
    badge: 'Feito na hora',
    image: ASSET_IMAGES.tapiocaSalgada
  },
  {
    id: 'cat-cafe-lanches',
    name: 'Café da Manhã & Lanches',
    icon: '☕',
    badge: 'Favoritos',
    image: ASSET_IMAGES.paoOvo
  },
  {
    id: 'cat-salgados',
    name: 'Salgados',
    icon: '🥟',
    badge: 'Crocantes',
    image: ASSET_IMAGES.coxinha
  },
  {
    id: 'cat-pratos',
    name: 'Pratos Especiais',
    icon: '🍝',
    badge: 'Almoço & Jantar',
    image: ASSET_IMAGES.talharim
  },
  {
    id: 'cat-doces',
    name: 'Doces & Sobremesas',
    icon: '🍰',
    badge: 'Confeitaria',
    image: ASSET_IMAGES.pudim
  },
  {
    id: 'cat-bebidas-quentes',
    name: 'Bebidas Quentes',
    icon: '☕',
    badge: 'Cafés Especiais',
    image: ASSET_IMAGES.cappuccino
  },
  {
    id: 'cat-bebidas-geladas',
    name: 'Bebidas Geladas',
    icon: '🥤',
    badge: 'Refrescantes',
    image: ASSET_IMAGES.mateGelado
  },
  {
    id: 'cat-sucos',
    name: 'Sucos Naturais',
    icon: '🧃',
    badge: '100% Fruta',
    image: ASSET_IMAGES.sucoNatural
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // 🥞 TAPIOCAS
  {
    id: 'tap-1',
    category: 'cat-tapiocas',
    name: 'Tapioca Salgada',
    desc: 'Frango desfiado, frango com queijo, queijo ou ovo na chapa',
    price: 13.00,
    options: ['Frango', 'Frango com Queijo', 'Queijo', 'Ovo'],
    icon: '🥞',
    image: ASSET_IMAGES.tapiocaSalgada,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'tap-2',
    category: 'cat-tapiocas',
    name: 'Tapioca Doce',
    desc: 'Banana ou morango com Nutella cremosa original',
    price: 15.00,
    options: ['Morango com Nutella', 'Banana com Nutella'],
    icon: '🍓',
    image: ASSET_IMAGES.tapiocaDoce,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'tap-3',
    category: 'cat-tapiocas',
    name: 'Crepioca de Frango',
    desc: 'Massa leve e fofinha de tapioca com ovo e recheio suculento de frango',
    price: 14.00,
    icon: '🍳',
    image: ASSET_IMAGES.tapiocaSalgada,
    isAvailable: true
  },

  // ☕ CAFÉ DA MANHÃ & LANCHES
  {
    id: 'cfl-1',
    category: 'cat-cafe-lanches',
    name: 'Pão com ovo',
    desc: 'Pão quentinho com ovo frito na chapa na manteiga',
    price: 7.00,
    icon: '🍞',
    image: ASSET_IMAGES.paoOvo,
    isAvailable: true
  },
  {
    id: 'cfl-2',
    category: 'cat-cafe-lanches',
    name: 'Pão com ovo e queijo',
    desc: 'Pão francês com ovo frito e queijo derretido crocante',
    price: 8.00,
    icon: '🥪',
    image: ASSET_IMAGES.paoOvo,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'cfl-3',
    category: 'cat-cafe-lanches',
    name: 'Mexidão',
    desc: 'Pão francês, ovos mexidos, queijo, presunto, tomate e cebola fresca',
    price: 9.00,
    icon: '🍳',
    image: ASSET_IMAGES.paoOvo,
    isAvailable: true
  },
  {
    id: 'cfl-4',
    category: 'cat-cafe-lanches',
    name: 'Ovos mexidos',
    desc: 'Preparo cremoso com manteiga da terra (porção individual)',
    price: 2.50,
    icon: '🥚',
    image: ASSET_IMAGES.paoOvo,
    isAvailable: true
  },
  {
    id: 'cfl-5',
    category: 'cat-cafe-lanches',
    name: 'Omelete com queijo',
    desc: 'Omelete macia recheada com queijo derretido dourado',
    price: 7.00,
    icon: '🧀',
    image: ASSET_IMAGES.paoOvo,
    isAvailable: true
  },
  {
    id: 'cfl-6',
    category: 'cat-cafe-lanches',
    name: 'Omelete com frango',
    desc: 'Omelete fofinha recheada com frango desfiado temperado',
    price: 8.00,
    icon: '🍗',
    image: ASSET_IMAGES.paoOvo,
    isAvailable: true
  },
  {
    id: 'cfl-7',
    category: 'cat-cafe-lanches',
    name: 'Cuscuz recheado',
    desc: 'Tradicional nordestino recheado: frango, queijo ou ovos quentinhos',
    price: 17.00,
    options: ['Frango', 'Queijo', 'Ovos'],
    icon: '🌽',
    image: ASSET_IMAGES.cuscuz,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'cfl-8',
    category: 'cat-cafe-lanches',
    name: 'Cuscuz recheado com carne assada',
    desc: 'Cuscuz fofinho de milho com carne assada desfiada suculenta',
    price: 18.00,
    icon: '🥩',
    image: ASSET_IMAGES.cuscuz,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'cfl-9',
    category: 'cat-cafe-lanches',
    name: 'Pão com linguiça',
    desc: 'Pão crocante com linguiça artesanal tostada na chapa',
    price: 10.00,
    icon: '🥖',
    image: ASSET_IMAGES.sanduba,
    isAvailable: true
  },
  {
    id: 'cfl-10',
    category: 'cat-cafe-lanches',
    name: 'Pão com linguiça, queijo, ovo e salada',
    desc: 'Sanduíche completo, farto e suculento preparado na hora',
    price: 12.00,
    icon: '🥪',
    image: ASSET_IMAGES.sanduba,
    isAvailable: true
  },
  {
    id: 'cfl-11',
    category: 'cat-cafe-lanches',
    name: 'Sanduba da casa no pão francês',
    desc: 'Hambúrguer, linguiça, ovo, queijo, presunto e salada fresca',
    price: 15.00,
    icon: '🍔',
    image: ASSET_IMAGES.sanduba,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'cfl-12',
    category: 'cat-cafe-lanches',
    name: 'Misto quente no pão de forma',
    desc: 'Pão de forma tostado com queijo derretido e presunto',
    price: 7.00,
    icon: '🥪',
    image: ASSET_IMAGES.cafeLanches,
    isAvailable: true
  },
  {
    id: 'cfl-13',
    category: 'cat-cafe-lanches',
    name: 'Misto quente no pão francês',
    desc: 'Pão francês na chapa com muito queijo derretido e presunto',
    price: 6.50,
    icon: '🥖',
    image: ASSET_IMAGES.cafeLanches,
    isAvailable: true
  },
  {
    id: 'cfl-14',
    category: 'cat-cafe-lanches',
    name: 'Pão na chapa no pão francês',
    desc: 'Pão francês tostado na manteiga douradinha e crocante',
    price: 4.00,
    icon: '🧈',
    image: ASSET_IMAGES.cafeLanches,
    isAvailable: true
  },

  // 🥟 SALGADOS
  {
    id: 'salg-1',
    category: 'cat-salgados',
    name: 'Empadão de frango',
    desc: 'Massa podre que derrete na boca com recheio farto e cremoso',
    price: 12.00,
    icon: '🥧',
    image: ASSET_IMAGES.empadao,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'salg-2',
    category: 'cat-salgados',
    name: 'Coxinha de frango',
    desc: 'Massa crocante e dourada por fora com frango bem temperado',
    price: 8.00,
    icon: '🍗',
    image: ASSET_IMAGES.coxinha,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'salg-3',
    category: 'cat-salgados',
    name: 'Bolinho de aipim',
    desc: 'Massa cremosa de aipim frita sequinha no ponto certo com carne moída',
    price: 10.00,
    icon: '🥟',
    image: ASSET_IMAGES.bolinhoAipim,
    isAvailable: true
  },
  {
    id: 'salg-4',
    category: 'cat-salgados',
    name: 'Pizza brotinho',
    desc: 'Massa artesanal com molho de tomate, queijo muçarela e orégano',
    price: 10.00,
    icon: '🍕',
    image: ASSET_IMAGES.pizzaBrotinho,
    isAvailable: true
  },
  {
    id: 'salg-5',
    category: 'cat-salgados',
    name: 'Panquecas',
    desc: 'Massa caseira macia recheada: Frango ou Carne com molho de tomate',
    price: 14.00,
    options: ['Frango', 'Carne'],
    icon: '🌯',
    image: ASSET_IMAGES.panqueca,
    isAvailable: true
  },
  {
    id: 'salg-6',
    category: 'cat-salgados',
    name: 'Salgados assados',
    desc: 'Opções folhadas e assadas sequinhas com recheios variados',
    price: 10.00,
    icon: '🥐',
    image: ASSET_IMAGES.bolinhoAipim,
    isAvailable: true
  },
  {
    id: 'salg-7',
    category: 'cat-salgados',
    name: 'Torta salgada',
    desc: 'Fatia generosa e bem cremosa com pão de forma e frango desfiado',
    price: 15.00,
    icon: '🍰',
    image: ASSET_IMAGES.empadao,
    isAvailable: true
  },

  // 🍝 PRATOS ESPECIAIS
  {
    id: 'prat-1',
    category: 'cat-pratos',
    name: 'Macarrão com molho branco e brócolis',
    desc: 'Massa al dente com molho branco aveludado, brócolis e carne à sua escolha',
    price: 20.00,
    options: ['Frango', 'Calabresa', 'Carne Moída'],
    icon: '🍝',
    image: ASSET_IMAGES.talharim,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'prat-2',
    category: 'cat-pratos',
    name: 'Talharim ao molho branco com brócolis e camarão',
    desc: 'Prato refinado com camarões selecionados, brócolis frescos e molho suave',
    price: 28.00,
    icon: '🍤',
    image: ASSET_IMAGES.talharim,
    isAvailable: true,
    highlight: true
  },

  // 🍰 DOCES & SOBREMESAS
  {
    id: 'doc-1',
    category: 'cat-doces',
    name: 'Fatia de bolo de milho',
    desc: 'Receita caseira quentinha, macia e perfeita com café fresco',
    price: 6.00,
    icon: '🌽',
    image: ASSET_IMAGES.boloMilho,
    isAvailable: true
  },
  {
    id: 'doc-2',
    category: 'cat-doces',
    name: 'Fatia de bolo confeitado',
    desc: 'Deliciosos recheios artesanais da confeitaria Sol Café com coberturas finas',
    price: 14.00,
    icon: '🎂',
    image: ASSET_IMAGES.docesVitrine,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'doc-3',
    category: 'cat-doces',
    name: 'Rabanada tradicional',
    desc: 'Empanada no açúcar com canela especial e casquinha dourada',
    price: 6.00,
    icon: '🥖',
    image: ASSET_IMAGES.boloMilho,
    isAvailable: true
  },
  {
    id: 'doc-4',
    category: 'cat-doces',
    name: 'Pudim no pote',
    desc: 'Super lisinho com calda de caramelo dourada brilhante',
    price: 8.00,
    icon: '🍮',
    image: ASSET_IMAGES.pudim,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'doc-5',
    category: 'cat-doces',
    name: 'Tortelele',
    desc: 'Torta mini individual sabor Limão ou Maracujá com massa crocante',
    price: 8.00,
    options: ['Limão', 'Maracujá'],
    icon: '🥧',
    image: ASSET_IMAGES.pudim,
    isAvailable: true
  },
  {
    id: 'doc-6',
    category: 'cat-doces',
    name: 'Brigadeiro, cajuzinho ou beijinho',
    desc: 'Docinho tradicional de festa enrolado com chocolate belga e confeitos',
    price: 8.00,
    options: ['Brigadeiro Gourmet', 'Cajuzinho', 'Beijinho'],
    icon: '🍫',
    image: ASSET_IMAGES.brigadeiro,
    isAvailable: true
  },
  {
    id: 'doc-7',
    category: 'cat-doces',
    name: 'Mousse artesanal',
    desc: 'Mousse aerado sabor Maracujá, Limão ou Morango bem geladinho',
    price: 8.00,
    options: ['Maracujá', 'Limão', 'Morango'],
    icon: '🍨',
    image: ASSET_IMAGES.pudim,
    isAvailable: true
  },
  {
    id: 'doc-8',
    category: 'cat-doces',
    name: 'Brownie recheado',
    desc: 'Brownie bem molhadinho com recheio cremoso e casquinha crocante',
    price: 8.00,
    icon: '🍫',
    image: ASSET_IMAGES.brigadeiro,
    isAvailable: true
  },
  {
    id: 'doc-9',
    category: 'cat-doces',
    name: 'Pavé especial',
    desc: 'Camadas de creme suave, chocolate e biscoito selecionado',
    price: 15.00,
    icon: '🍰',
    image: ASSET_IMAGES.docesVitrine,
    isAvailable: true
  },
  {
    id: 'doc-10',
    category: 'cat-doces',
    name: 'Copo da felicidade',
    desc: 'Montado com brownies, morangos frescos e cremes nobres de confeitaria',
    price: 15.00,
    icon: '🍧',
    image: ASSET_IMAGES.docesVitrine,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'doc-11',
    category: 'cat-doces',
    name: 'Quindim',
    desc: 'Brilhante, cremoso e com muito coco fresco selecionado',
    price: 9.00,
    icon: '🍮',
    image: ASSET_IMAGES.pudim,
    isAvailable: true
  },
  {
    id: 'doc-12',
    category: 'cat-doces',
    name: 'Cheesecake (fatia)',
    desc: 'Base crocante de biscoito com cobertura de Morango, Amora ou Goiaba',
    price: 14.00,
    options: ['Morango', 'Amora', 'Goiaba'],
    icon: '🍓',
    image: ASSET_IMAGES.docesVitrine,
    isAvailable: true
  },
  {
    id: 'doc-13',
    category: 'cat-doces',
    name: 'Torta alemã',
    desc: 'Clássica torta com creme aveludado e cobertura espelhada de chocolate',
    price: 14.00,
    icon: '🍰',
    image: ASSET_IMAGES.docesVitrine,
    isAvailable: true
  },
  {
    id: 'doc-14',
    category: 'cat-doces',
    name: 'Torta de abacaxi com coco',
    desc: 'Fatia bem molhadinha com pedaços frescos de abacaxi e coco ralado',
    price: 14.00,
    icon: '🍍',
    image: ASSET_IMAGES.boloMilho,
    isAvailable: true
  },

  // ☕ BEBIDAS QUENTES
  {
    id: 'bq-1',
    category: 'cat-bebidas-quentes',
    name: 'Café pequeno',
    desc: 'Expresso ou coado tradicional na hora (50ml)',
    price: 3.00,
    icon: '☕',
    image: ASSET_IMAGES.cafeEspresso,
    isAvailable: true
  },
  {
    id: 'bq-2',
    category: 'cat-bebidas-quentes',
    name: 'Café médio',
    desc: 'Dose equilibrada para aquecer seu dia com grãos selecionados (100ml)',
    price: 4.50,
    icon: '☕',
    image: ASSET_IMAGES.cafeEspresso,
    isAvailable: true
  },
  {
    id: 'bq-3',
    category: 'cat-bebidas-quentes',
    name: 'Café grande',
    desc: 'Para quem ama um bom café encorpado e aromático (180ml)',
    price: 5.00,
    icon: '☕',
    image: ASSET_IMAGES.cafeEspresso,
    isAvailable: true
  },
  {
    id: 'bq-4',
    category: 'cat-bebidas-quentes',
    name: 'Café com leite médio',
    desc: 'Leite vaporizado quentinho com toque de café especial',
    price: 5.00,
    icon: '🥛',
    image: ASSET_IMAGES.cappuccino,
    isAvailable: true
  },
  {
    id: 'bq-5',
    category: 'cat-bebidas-quentes',
    name: 'Café com leite grande',
    desc: 'Clássico pingado na medida certa com espuma suave',
    price: 5.50,
    icon: '🥛',
    image: ASSET_IMAGES.cappuccino,
    isAvailable: true
  },
  {
    id: 'bq-6',
    category: 'cat-bebidas-quentes',
    name: 'Nescau quente',
    desc: 'Chocolate com leite quentinho cremoso',
    price: 7.00,
    icon: '☕',
    image: ASSET_IMAGES.cafeEspresso,
    isAvailable: true
  },
  {
    id: 'bq-7',
    category: 'cat-bebidas-quentes',
    name: 'Capuccino pequeno',
    desc: 'Polvilhado com canela e chocolate belga',
    price: 8.00,
    icon: '☕',
    image: ASSET_IMAGES.cappuccino,
    isAvailable: true
  },
  {
    id: 'bq-8',
    category: 'cat-bebidas-quentes',
    name: 'Capuccino médio',
    desc: 'Cremosidade irresistível com espuma de leite aveludada e toque de canela',
    price: 10.00,
    icon: '☕',
    image: ASSET_IMAGES.cappuccino,
    isAvailable: true,
    highlight: true
  },

  // 🥤 BEBIDAS GELADAS
  {
    id: 'bg-1',
    category: 'cat-bebidas-geladas',
    name: 'Mate da casa',
    desc: 'Chá mate carioca geladinho e refrescante preparado com limão',
    price: 8.00,
    icon: '🥤',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'bg-2',
    category: 'cat-bebidas-geladas',
    name: 'Guaravita',
    desc: 'Copo tradicional 290ml bem gelado',
    price: 2.00,
    icon: '🧃',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },
  {
    id: 'bg-3',
    category: 'cat-bebidas-geladas',
    name: 'Refrigerante em lata',
    desc: 'Lata 350ml gelada (Coca-Cola, Guaraná, Fanta)',
    price: 7.00,
    options: ['Coca-Cola Normal', 'Coca-Cola Zero', 'Guaraná Antarctica', 'Fanta Laranja'],
    icon: '🥤',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },
  {
    id: 'bg-4',
    category: 'cat-bebidas-geladas',
    name: 'Mineirinho',
    desc: 'Refrigerante tradicional geladinho',
    price: 7.00,
    icon: '🥤',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },
  {
    id: 'bg-5',
    category: 'cat-bebidas-geladas',
    name: 'Coquinha 200 ml',
    desc: 'Mini refrigerante gelado',
    price: 4.00,
    options: ['Coca-Cola 200ml', 'Fanta Uva 200ml', 'Fanta Laranja 200ml'],
    icon: '🥤',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },
  {
    id: 'bg-6',
    category: 'cat-bebidas-geladas',
    name: 'Coca-Cola 600 ml',
    desc: 'Garrafa individual gelada',
    price: 8.00,
    icon: '🥤',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },
  {
    id: 'bg-7',
    category: 'cat-bebidas-geladas',
    name: 'Guaraná Antarctica 1 L',
    desc: 'Tamanho família perfeito para compartilhar',
    price: 8.00,
    icon: '🍾',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },
  {
    id: 'bg-8',
    category: 'cat-bebidas-geladas',
    name: 'Água mineral sem gás',
    desc: 'Garrafa 500ml bem gelada',
    price: 2.50,
    icon: '💧',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },
  {
    id: 'bg-9',
    category: 'cat-bebidas-geladas',
    name: 'Água mineral com gás',
    desc: 'Garrafa 500ml bem gelada',
    price: 3.50,
    icon: '🫧',
    image: ASSET_IMAGES.mateGelado,
    isAvailable: true
  },

  // 🧃 SUCOS NATURAIS
  {
    id: 'suc-1',
    category: 'cat-sucos',
    name: 'Suco da fruta natural',
    desc: 'Feito com a fruta pura na hora: Laranja, Goiaba, Maracujá, Acerola ou Morango',
    price: 12.00,
    options: ['Laranja', 'Goiaba', 'Maracujá', 'Acerola', 'Morango'],
    icon: '🍊',
    image: ASSET_IMAGES.sucoNatural,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'suc-2',
    category: 'cat-sucos',
    name: 'Morango ao leite',
    desc: 'Batido com leite geladinho, cremoso e irresistível',
    price: 15.00,
    icon: '🍓',
    image: ASSET_IMAGES.sucoNatural,
    isAvailable: true,
    highlight: true
  },
  {
    id: 'suc-3',
    category: 'cat-sucos',
    name: 'Maracujá ao leite',
    desc: 'Cremoso, azedinho na medida perfeita e refrescante',
    price: 15.00,
    icon: '🍋',
    image: ASSET_IMAGES.sucoNatural,
    isAvailable: true
  }
];

export const formatBRL = (val: number): string => {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
