// numeroextenso.js

/**
 * @file Mapeamentos para conversão de números e expressões matemáticas por extenso em valores numéricos e operações.
 * @author SeuNome <seu.email@example.com>
 * @version 1.1.1 // Updated for digit and symbol recognition
 */

/**
 * Objeto que mapeia palavras que representam números por extenso para seus respectivos valores numéricos.
 * Inclui unidades, dezenas, centenas, milhares, milhões, bilhões e trilhões.
 * @type {Object<string, number>}
 */
const NUMEROS_POR_EXTENSO = {
    // Unidades
    "zero": 0, "um": 1, "dois": 2, "três": 3, "quatro": 4,
    "cinco": 5, "seis": 6, "sete": 7, "oito": 8, "nove": 9,

    // Dezenas irregulares (10 a 19)
    "dez": 10, "onze": 11, "doze": 12, "treze": 13, "quatorze": 14,
    "quinze": 15, "dezesseis": 16, "dezessete": 17, "dezoito": 18, "dezenove": 19,

    // Dezenas exatas
    "vinte": 20, "trinta": 30, "quarenta": 40, "cinquenta": 50,
    "sessenta": 60, "setenta": 70, "oitenta": 80, "noventa": 90,

    // Centenas exatas
    "cem": 100, "cento": 100,
    "duzentos": 200, "trezentos": 300, "quatrocentos": 400,
    "quinhentos": 500, "seiscentos": 600, "setecentos": 700,
    "oitocentos": 800, "novecentos": 900,

    // Milhares e potências de 1000 (com suporte a plural)
    "mil": 1_000,
    "milhão": 1_000_000, "milhões": 1_000_000,
    "bilhão": 1_000_000_000, "bilhões": 1_000_000_000,
    "trilhão": 1_000_000_000_000, "trilhões": 1_000_000_000_000,
};

/**
 * Objeto que mapeia palavras que representam operadores e funções matemáticas para suas propriedades.
 * Cada entrada contém o tipo (operador/funcao), o símbolo ou nome da função para avaliação.
 * @type {Object<string, {tipo: string, símbolo?: string, nome?: string}>}
 */
const OPERADORES_MATEMATICOS = {
    // Operadores aritméticos básicos por extenso
    "mais": { "tipo": "operador", "símbolo": "+" },
    "menos": { "tipo": "operador", "símbolo": "-" },
    "dividido por": { "tipo": "operador", "símbolo": "/" },
    "vezes": { "tipo": "operador", "símbolo": "*" },
    "multiplicado por": { "tipo": "operador", "símbolo": "*" },
    "por": { "tipo": "operador", "símbolo": "/" }, // Para "dividir por cinco"

    // Operadores aritméticos por símbolo (NOVO)
    "+": { "tipo": "operador", "símbolo": "+" },
    "-": { "tipo": "operador", "símbolo": "-" },
    "/": { "tipo": "operador", "símbolo": "/" },
    "*": { "tipo": "operador", "símbolo": "*" },
    "x": { "tipo": "operador", "símbolo": "*" }, // Para "5 x 3"

    // Funções matemáticas e operadores avançados
    "elevado a": { "tipo": "funcao", "nome": "Math.pow", "símbolo": "**" },
    "elevado por": { "tipo": "funcao", "nome": "Math.pow", "símbolo": "**" },
    "potência de": { "tipo": "funcao", "nome": "Math.pow", "símbolo": "**" },
    "raiz quadrada de": { "tipo": "funcao", "nome": "Math.sqrt", "símbolo": "sqrt" },
    "logaritmo natural de": { "tipo": "funcao", "nome": "Math.log", "símbolo": "ln" },
    "logaritmo de": { "tipo": "funcao", "nome": "Math.log10", "símbolo": "log" },
    "seno de": { "tipo": "funcao", "nome": "Math.sin", "símbolo": "sin" },
    "cosseno de": { "tipo": "funcao", "nome": "Math.cos", "símbolo": "cos" },
    "tangente de": { "tipo": "funcao", "nome": "Math.tan", "símbolo": "tan" },
    "módulo de": { "tipo": "funcao", "nome": "Math.abs", "símbolo": "abs" },
    "fatorial de": { "tipo": "funcao", "nome": "fatorial", "símbolo": "!" },
    "por cento": { "tipo": "operador", "símbolo": "/100" },

    // Constantes e unidades
    "pi": { "tipo": "constante", "valor": Math.PI, "símbolo": "π" },
    "e constante": { "tipo": "constante", "valor": Math.E, "símbolo": "e" },
    "graus": { "tipo": "unidade", "símbolo": "°" },
};

/**
 * Objeto que mapeia conectivos usados na escrita de números por extenso.
 * Isso ajuda a interpretar como os números se combinam (ex: "vinte e cinco").
 * @type {Object<string, {tipo: string, ação: string}>}
 */
const CONECTIVOS_NUMERICOS = {
    "e": { "tipo": "conector", "ação": "soma" },
    "vírgula": { "tipo": "decimal", "ação": "separador" },
    "ponto": { "tipo": "decimal", "ação": "separador" },
};

// Funções auxiliares (dentro da IIFE NumeroExtenso)

/**
 * Módulo principal para manipulação de números por extenso.
 * @namespace NumeroExtenso
 */
const NumeroExtenso = (() => {
    // Mapeamentos internos (NUMEROS_POR_EXTENSO, OPERADORES_MATEMATICOS, CONECTIVOS_NUMERICOS)
    // Usaremos as constantes globais definidas acima.

    /**
     * Converte uma palavra de número por extenso ou um dígito numérico para seu valor numérico.
     * @param {string} palavra A palavra ou dígito a ser convertido (ex: "cinco", "10").
     * @returns {number|null} O valor numérico correspondente ou `null` se não encontrado.
     * @memberof NumeroExtenso
     */
    const converterPalavraParaNumero = (palavra) => {
        // Tenta converter se for um dígito (ex: "1", "10")
        if (!isNaN(parseFloat(palavra)) && isFinite(palavra)) {
            return parseFloat(palavra);
        }
        // Tenta converter se for por extenso
        return NUMEROS_POR_EXTENSO[palavra.toLowerCase()] || null;
    };

    /**
     * Retorna as propriedades de um operador ou função matemática por extenso ou por símbolo.
     * @param {string} termo O termo do operador/função (ex: "mais", "+", "raiz quadrada de").
     * @returns {Object|null} O objeto com as propriedades do operador/função ou `null` se não encontrado.
     * @memberof NumeroExtenso
     */
    const obterOperadorMatematico = (termo) => {
        return OPERADORES_MATEMATICOS[termo.toLowerCase()] || null;
    };

    /**
     * Retorna as propriedades de um conectivo numérico.
     * @param {string} conectivo O conectivo (ex: "e", "vírgula").
     * @returns {Object|null} O objeto com as propriedades do conectivo ou `null` se não encontrado.
     * @memberof NumeroExtenso
     */
    const obterConectivoNumerico = (conectivo) => {
        return CONECTIVOS_NUMERICOS[conectivo.toLowerCase()] || null;
    };

    // Interface pública do módulo
    return {
        NUMEROS_POR_EXTENSO: NUMEROS_POR_EXTENSO, // Expor para debug
        OPERADORES_MATEMATICOS: OPERADORES_MATEMATICOS, // Expor para debug
        CONECTIVOS_NUMERICOS: CONECTIVOS_NUMERICOS, // Expor para debug
        converterPalavraParaNumero: converterPalavraParaNumero,
        obterOperadorMatematico: obterOperadorMatematico,
        obterConectivoNumerico: obterConectivoNumerico,
    };
})(); // Fim da IIFE