// entidades.js
const ENTIDADES_CONHECIDAS = {
    // Pessoas e Personagens
    "jesus": { tipo: "pessoa", categoria: "religioso", relevancia: "central" },
    "maria": { tipo: "pessoa", categoria: "religioso" },
    "moisés": { tipo: "pessoa", categoria: "religioso" },
    "pedro": { tipo: "pessoa", categoria: "religioso" },
    "paulo": { tipo: "pessoa", categoria: "religioso" },
    "lucas": { tipo: "pessoa", categoria: "religioso" },
    "mateus": { tipo: "pessoa", categoria: "religioso" },
    "joão": { tipo: "pessoa", categoria: "religioso" },
    "judas": { tipo: "pessoa", categoria: "religioso" },
    "deus": { tipo: "ser_divino", categoria: "religioso", relevancia: "suprema" },
    "diabo": { tipo: "ser_espiritual", categoria: "religioso" },

    // Lugares
    "jerusalem": { tipo: "lugar", categoria: "cidade", importancia: "alta_religiosa" },
    "galileia": { tipo: "lugar", categoria: "região", importancia: "religiosa" },
    "israel": { tipo: "lugar", categoria: "país", importancia: "alta_religiosa" },
    "roma": { tipo: "lugar", categoria: "cidade" },
    "egito": { tipo: "lugar", categoria: "país" },
    "brasil": { tipo: "lugar", categoria: "país", capital: "Brasília" },
    "paris": { tipo: "lugar", categoria: "cidade", pais: "França" },

    // Objetos e Animais (exemplos para QI básico)
    "maça": { tipo: "fruta", cor_padrao: "vermelho", comestivel: true },
    "banana": { tipo: "fruta", cor_padrao: "amarelo", comestivel: true },
    "morango": { tipo: "fruta", cor_padrao: "vermelho", comestivel: true },
    "cachorro": { tipo: "animal", especie: "canino", domestico: true },
    "gato": { tipo: "animal", especie: "felino", domestico: true },
    "mesa": { tipo: "móvel", funcao_principal: "apoiar objetos" },
    "cadeira": { tipo: "móvel", funcao_principal: "sentar" },
    "caneta": { tipo: "utensílio", funcao_principal: "escrever" },
    "lápis": { tipo: "utensílio", funcao_principal: "escrever" },
    "computador": { tipo: "eletrônico", funcao_principal: "processar dados" },
    "celular": { tipo: "eletrônico", funcao_principal: "comunicação" },
    "sol": { tipo: "estrela", cor_padrao: "amarelo", emissao_luz: true },
    "lua": { tipo: "satélite", cor_padrao: "branco", emissao_luz: false },
    "água": { tipo: "substância", estado_comum: "líquido", essencial_vida: true },
    "céu": { tipo: "ambiente", cor_padrao: "azul" },
    "grama": { tipo: "planta", cor_padrao: "verde" },
    "sangue": { tipo: "líquido_biológico", cor_padrao: "vermelho" },
    "fogo": { tipo: "fenômeno", cor_padrao: "vermelho/laranja", produz_calor: true }
};