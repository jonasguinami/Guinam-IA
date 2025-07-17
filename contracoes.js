// contracoes.js

/**
 * @file Dicionário de contrações e abreviações comuns em Português do Brasil.
 * Mapeia formas contraídas ou informais para suas formas expandidas.
 * Esta lista é abrangente e visa auxiliar no pré-processamento de texto.
 * @author [Seu Nome ou Nome da Organização]
 * @version 1.0.0
 */

const MAPA_CONTRACOES = {
    // --- Contrações de Preposições + Artigos/Pronomes/Advérbios ---
    // De +
    "do": "de o",
    "da": "de a",
    "dos": "de os",
    "das": "de as",
    "dum": "de um",
    "duma": "de uma",
    "duns": "de uns",
    "dumas": "de umas",
    "dele": "de ele",
    "dela": "de ela",
    "deles": "de eles",
    "delas": "de elas",
    "disso": "de isso",
    "disto": "de isto",
    "daquilo": "de aquilo",
    "daquele": "de aquele",
    "daquela": "de aquela",
    "daqueles": "de aqueles",
    "daquelas": "de aquelas",
    "desse": "de esse",
    "dessa": "de essa",
    "desses": "de esses",
    "dessas": "de essas",
    "daqui": "de aqui",
    "dali": "de ali",
    "daí": "de aí",
    "onde": "de onde", // Em alguns contextos, ex: "vindo donde"

    // Em +
    "no": "em o",
    "na": "em a",
    "nos": "em os",
    "nas": "em as",
    "num": "em um",
    "numa": "em uma",
    "nuns": "em uns",
    "numas": "em umas",
    "nele": "em ele",
    "nela": "em ela",
    "neles": "em eles",
    "nelas": "em elas",
    "nisso": "em isso",
    "nisto": "em isto",
    "naquilo": "em aquilo",
    "neste": "em este",
    "nesta": "em esta",
    "nestes": "em estes",
    "nestas": "em estas",
    "naquele": "em aquele",
    "naquela": "em aquela",
    "naqueles": "em aqueles",
    "naquelas": "em aquelas",

    // Para +
    "pro": "para o",
    "pra": "para a",
    "pros": "para os",
    "pras": "para as",

    // A + (fusão com artigo ou pronome demonstrativo)
    "à": "a a",
    "às": "a as",
    "àquele": "a aquele",
    "àquela": "a aquela",
    "àqueles": "a aqueles",
    "àquelas": "a aquelas",
    "àquilo": "a aquilo",
    "ao": "a o",
    "aos": "a os",

    // Por +
    "pelo": "por o",
    "pela": "por a",
    "pelos": "por os",
    "pelas": "por as",

    // Com +
    "comigo": "com mim",
    "contigo": "com tu",
    "conosco": "com nós",
    "convosco": "com vós",
    "consigo": "com si",

    // --- Contrações e Abreviações Verbais/Informais ---
    // Verbos de "estar"
    "tá": "está",
    "tava": "estava",
    "tavam": "estavam",
    "tô": "estou",
    "tamo": "estamos",
    "tavares": "estava você", // Gíria menos comum, mas possível
    "tô indo": "estou indo",
    "tá bom": "está bom",
    "tá certo": "está certo",
    "tô nem aí": "não estou nem aí",

    // Verbos de "ir"
    "vô": "vou",
    "vamo": "vamos",
    "bora": "embora", // "Vamos embora" -> "Vamo bora"

    // Verbos de "ter"
    "tem": "ele tem", // Em alguns contextos, "a gente tem"
    "teve": "ele teve",
    "tinha": "ele tinha",
    "tiver": "ele tiver",
    "tivessem": "eles tivessem",

    // Verbos de "ser"
    "eh": "é", // Common typo/informalism
    "num é": "não é",
    "era": "ele era",

    // Verbos de "fazer"
    "faz": "ele faz",
    "fez": "ele fez",
    "fiz": "eu fiz",

    // --- Gírias e Abreviações Comuns ---
    "cê": "você",
    "vc": "você",
    "vcs": "vocês",
    "kd": "cadê", // Cade você?
    "pq": "porque",
    "qn": "quando",
    "qnd": "quando",
    "tb": "também",
    "tbm": "também",
    "mto": "muito",
    "mt": "muito",
    "pouco": "pouco",
    "dps": "depois",
    "agr": "agora",
    "blz": "beleza",
    "fmz": "firmeza",
    "flw": "falou",
    "vdd": "verdade",
    "sdd": "saudade",
    "fds": "fim de semana",
    "oq": "o que",
    "cmg": "comigo",
    "cntg": "contigo",
    "qlq": "qualquer",
    "gnt": "gente",
    "add": "adicionar",
    "vdd": "verdade",
    "abs": "abraços",
    "bj": "beijo",
    "bjs": "beijos",
    "obg": "obrigado",
    "obgda": "obrigada",
    "pfv": "por favor",
    "pff": "por favor",
    "qdo": "quando",
    "qto": "quanto",
    "tava": "estava",
    "tô": "estou",
    "vc tá": "você está",
    "tá rolando": "está rolando",
    "e aí": "e então",
    "né": "não é",
    "num": "não em um", // "num quero" (não quero) é diferente de "num canto" (em um canto)
    "vamo que vamo": "vamos que vamos",
    "pra caramba": "para caramba",
    "pra valer": "para valer",
    "q tal": "que tal",
    "eh isso": "é isso",
    "q bom": "que bom",
    "q pena": "que pena",
    "sei lá": "sei lá", // Informal speech
    "tipo assim": "tipo assim",
    "valeu": "obrigado",
    "vc me": "você me",
    "vc te": "você te",
    "pra vc": "para você",
    "por vc": "por você",
    "sabe": "sabe", // Quando usado como interjeição
    "mano": "irmão", // Gíria
    "mina": "menina", // Gíria
    "tipo": "similar a", // Em contextos informais
    "mermão": "meu irmão",
    "cabei": "acabei",
    "vamo ver": "vamos ver",
    "pelo menos": "por o menos",
    "pelas mãos": "por as mãos",
    "tô ligado": "estou ciente",
    "tô nem aí": "não estou nem aí",
    "demais": "muito", // Em "legal demais"
    "top": "excelente", // Gíria
    "show": "ótimo", // Gíria
    "bacana": "legal",
    "chapa": "amigo", // Gíria
    "massa": "legal", // Gíria
    "da hora": "ótimo", // Gíria
    "irado": "ótimo", // Gíria
    "fera": "experto", // Gíria
    "sussa": "tranquilo", // Gíria
    "partiu": "vamos", // Gíria
    "fui": "fui embora", // Gíria
    "então tá": "então está",
    "né não": "não é não",
    "pra mim": "para mim",
    "pra ti": "para ti",
    "tô afim": "estou com vontade",
    "tô de boa": "estou tranquilo",
    "tô em casa": "estou em casa",
    "tô fora": "estou fora",
    "tô dentro": "estou dentro",
    "tô ligado": "estou ciente",
    "tô nem aí": "não estou nem aí",
    "tô por fora": "estou desinformado",
    "tô por dentro": "estou informado",
    "tô rindo": "estou rindo",
    "tô triste": "estou triste",
    "tá tudo bem": "está tudo bem",
    "tá tudo certo": "está tudo certo",
    "tá na mão": "está na mão",
    "tá na hora": "está na hora",
    "tá na boa": "está na boa",
    "tá que tá": "está que está",
    "tô a fim": "estou a fim",
    "tá beleza": "está beleza",
    "vamo nessa": "vamos nessa",
    "bora lá": "vamos lá",
    "cabeça": "mente", // Em algumas expressões
    "mão": "mão", // Em "na mão"
    "pé": "pé", // Em "no pé"
    "olho": "olho", // Em "no olho"
    "boca": "boca", // Em "na boca"
    "coração": "coração", // Em "no coração"
    "casa": "casa", // Em "em casa"
    "rua": "rua", // Em "na rua"
    "volta": "retorno", // Em "dar uma volta"
    "só que": "somente que",
    "aí sim": "aí sim",
    "e tal": "e tal",
    "meu deus": "meu Deus",
    "pelo amor de deus": "por o amor de Deus",
    "pra mim tanto faz": "para mim tanto faz",
    "quer dizer": "quer dizer",
    "se vira": "se vira",
    "tá ligado": "está ligado",
    "tipo assim": "tipo assim",
    "vlw": "valeu", // Agradecimento informal
    "vms": "vamos",
    "xô": "deixe-o", // "xô pra lá!"
    "fdd": "foda", // Informal/Slang (sensitive content) - considerar uso cauteloso
    "mrm": "irmão", // Informal/Slang
    "kra": "cara", // Informal/Slang
    "mina": "menina", // Informal/Slang
    "mlk": "moleque", // Informal/Slang
    "guri": "menino", // Regional slang
    "guria": "menina", // Regional slang
    "bagulho": "coisa", // Informal/Slang
    "rolê": "passeio", // Informal/Slang
    "treta": "briga", // Informal/Slang
    "parada": "coisa", // Informal/Slang
    "tipo": "tal como", // Informal
    "poxa": "expressão de surpresa/frustração",
    "putz": "expressão de surpresa/frustração",
    "caraca": "expressão de surpresa/admiração",
    "poxa vida": "expressão de frustração",
    "ai meu deus": "ai meu Deus",
    "valeu a pena": "valeu a pena",
    "em cima": "em cima",
    "em baixo": "em baixo",
    "de novo": "de novo",
    "a partir de": "a partir de",
    "por causa de": "por causa de",
    "apesar de": "apesar de",
    "por mais que": "por mais que",
    "se bem que": "se bem que",
    "a não ser que": "a não ser que",
    "assim que": "assim que",
    "desde que": "desde que",
    "ainda que": "ainda que",
    "mesmo que": "mesmo que",
    "talvez que": "talvez que",
    "a fim de": "a fim de",
    "a partir de": "a partir de",
    "de acordo com": "de acordo com",
    "em vez de": "em vez de",
    "por exemplo": "por exemplo",
    "ou seja": "ou seja",
    "isto é": "isto é",
    "a saber": "a saber",
    "via de regra": "via de regra",
    "a duras penas": "a duras penas",
    "a olhos vistos": "a olhos vistos",
    "a torto e a direito": "a torto e a direito",
    "de repente": "de repente",
    "porventura": "porventura",
    "por um fio": "por um fio",
    "a troco de": "a troco de",
    "ao mesmo tempo": "ao mesmo tempo",
    "por outro lado": "por outro lado",
    "diga se de passagem": "diga-se de passagem",
    "se é que": "se é que",
    "de vez em quando": "de vez em quando",
    "a esmo": "a esmo",
    "a fio": "a fio",
    "a par de": "a par de",
    "em frente": "em frente",
    "atrás de": "atrás de",
    "ao redor": "ao redor",
    "longe de": "longe de",
    "perto de": "perto de",
    "dentro de": "dentro de",
    "fora de": "fora de",
    "acima de": "acima de",
    "abaixo de": "abaixo de",
    "à direita": "a a direita",
    "à esquerda": "a a esquerda",
    "em cima de": "em cima de",
    "em baixo de": "em baixo de",
    "no meio de": "em o meio de",
    "ao lado de": "a o lado de",
    "em frente a": "em frente a",
    "a bordo": "a bordo",
    "a cavalo": "a cavalo",
    "a pé": "a pé",
    "à toa": "a a toa",
    "à vontade": "a a vontade",
    "às vezes": "a as vezes",
    "à beça": "a a beça",
    "à deriva": "a a deriva",
    "à escuta": "a a escuta",
    "à luz de": "a a luz de",
    "à sombra de": "a a sombra de",
    "a seco": "a seco",
    "à queima-roupa": "a a queima-roupa",
    "a toque de caixa": "a toque de caixa",
    "a torto e a direito": "a torto e a direito",
    "de balde": "de balde",
    "de boa": "de boa",
    "de cor": "de cor",
    "de fato": "de fato",
    "de graça": "de graça",
    "de jure": "de jure",
    "de longe": "de longe",
    "de perto": "de perto",
    "de praxe": "de praxe",
    "de pronto": "de pronto",
    "de roldão": "de roldão",
    "de súbito": "de súbito",
    "de todo": "de todo",
    "em branco": "em branco",
    "em cheio": "em cheio",
    "em dia": "em dia",
    "em face de": "em face de",
    "em fim": "em fim",
    "em geral": "em geral",
    "em nada": "em nada",
    "em pé": "em pé",
    "em ponto": "em ponto",
    "em público": "em público",
    "em vão": "em vão",
    "por acaso": "por acaso",
    "por fora": "por fora",
    "por hora": "por hora",
    "por isso": "por isso",
    "porventura": "porventura",
    "sempre": "sempre", // Não é uma contração, mas útil para normalização
    "nunca": "nunca",   // Não é uma contração, mas útil para normalização
    "muito": "muito",   // Não é uma contração, mas útil para normalização
    "pouco": "pouco"    // Não é uma contração, mas útil para normalização
};