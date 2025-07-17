// stopwords.js

/**
 * @file Lista de stop words em Português do Brasil.
 * Stop words são palavras comuns que geralmente não agregam valor semântico significativo
 * para o processamento de linguagem natural e podem ser removidas para otimização.
 * @author [Seu Nome ou Nome da Organização]
 * @version 1.1.0
 */

/**
 * Array contendo stop words em Português do Brasil, incluindo artigos, preposições,
 * pronomes, conjunções, advérbios e alguns verbos e numerais comuns.
 * @type {string[]}
 */
const STOP_WORDS_PT_BR = [
    // Artigos e contrações
    "a", "o", "as", "os", "um", "uma", "uns", "umas",
    "da", "do", "das", "dos", "na", "no", "nas", "nos",
    "pelo", "pela", "pelos", "pelas",
    "à", "às", "ao", "aos",

    // Preposições
    "de", "em", "para", "por", "com", "sem", "sobre", "sob", "entre", "após",
    "até", "desde", "durante", "mediante", "perante", "salvo", "tirante", "através",
    "contra",

    // Conjunções
    "e", "ou", "mas", "porém", "contudo", "todavia", "entretanto", "nem", "porque",
    "pois", "portanto", "logo", "assim", "conforme", "enquanto", "embora", "seja",
    "que", "se", "como", "quando", "onde",

    // Pronomes
    "eu", "tu", "ele", "ela", "nós", "vós", "eles", "elas",
    "me", "te", "se", "o", "a", "os", "as", "lhe", "lhes",
    "mim", "ti", "si", "conosco", "convosco",
    "meu", "minha", "meus", "minhas",
    "teu", "tua", "teus", "tuas",
    "seu", "sua", "seus", "suas",
    "nosso", "nossa", "nossos", "nossas",
    "vosso", "vossa", "vossos", "vossas",
    "este", "esta", "estes", "estas", "isto",
    "esse", "essa", "esses", "essas", "isso",
    "aquele", "aquela", "aqueles", "aquelas", "aquilo",
    "quem", "qual", "quais", "quanto", "quantos", "quanta", "quantas",
    "cujo", "cuja", "cujos", "cujas",

    // Advérbios
    "já", "ainda", "sempre", "nunca", "muito", "pouco", "mais", "menos",
    "apenas", "só", "somente", "mesmo", "próprio", "também",
    "aqui", "ali", "lá", "cá", "acolá", "abaixo", "acima", "adiante", "atrás", "dentro", "fora", "longe", "perto",
    "cedo", "tarde", "ontem", "hoje", "amanhã", "agora", "antes", "depois", "já", "ainda", "sempre", "nunca",
    "bem", "mal", "melhor", "pior", "assim", "depressa", "devagar",

    // Verbos auxiliares e comuns (conjugados ou no infinitivo)
    "ser", "estar", "ir", "haver", "ter", "fazer", "dizer", "poder", "querer",
    "era", "foi", "são", "estão", "irá", "havia", "teve", "fez", "disse", "pode", "quis",
    "é", "está", "vai", "há", "tem", "faz", "diz", "pode", "quer",

    // Outros termos comuns
    "etc", "etcetera", "cerca", "quase", "logo", "então", "tão", "tal", "tais",
    "qualquer", "quaisquer", "nenhum", "nenhuma", "nenhuns", "nenhumas",
    "algum", "alguma", "alguns", "algumas",
    "todo", "toda", "todos", "todas",
    "nada", "ninguém", "tudo", "alguém",
    "daqui", "dali", "daí", "desta", "deste", "disto", "desse", "dessa", "disso",
    "aquela", "aquele", "aqueles", "aquelas", "aquilo",
];