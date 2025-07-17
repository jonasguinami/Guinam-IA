// scriptia.js

/**
 * @file Script principal para a IA Generativa.
 * Conecta e utiliza as bases de dados de linguagem para processar a entrada do usuário,
 * tokenizar, analisar e gerar respostas. Inclui sistema de feedback, lógica aprimorada,
 * memória de curto prazo, temperatura de respostas e personalidade básica.
 * @author [Guinami]
 * @version 3.0 // Fix for contractions not being processed
 */

// --- Referências aos elementos HTML ---
const chatWindow = document.querySelector('.chat-window');
const userInput = document.getElementById('userInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const scrollToBottomBtn = document.querySelector('.scroll-to-bottom-btn');
const clearHistoryBtn = document.querySelector('.clear-history-btn');

// --- Banco de Dados de Conhecimento Simulado (Frontend DB) ---
const KNOWLEDGE_DB = {
    "capital do brasil": "Brasília é a capital do Brasil, uma cidade com arquitetura bem única e futurista, desenhada por Oscar Niemeyer.",
    "maior país do mundo": "A Rússia é o país mais grandão do mundo em área! Pense num território enorme, que atravessa a Europa e a Ásia.",
    "planeta mais próximo do sol": "Mercúrio é o vizinho mais próximo do Sol! Imagina o calor lá? É um planeta bem pequeno e cheio de crateras.",
    "inventor da lâmpada": "Ah, a lâmpada! Muita gente contribuiu, mas o Thomas Edison é o cara que popularizou a lâmpada incandescente que iluminou o mundo. Um verdadeiro gênio!",
    "cavalo": "Um cavalo? Ah, eles são mamíferos incríveis! Fortes, rápidos e companheiros do ser humano há séculos, seja para transporte ou trabalho no campo.",
    "campo": "Um campo é uma área de terra aberta, geralmente cultivada ou usada para pastagem, sem grandes construções ou florestas densas. É um ambiente natural ou rural.",
    "correr": "Correr é se movimentar rapidão, tipo quando a gente tá com pressa ou fazendo um exercício. É bem mais veloz que só caminhar!",
    "rápido": "Algo 'rápido' significa que acontece em pouquíssimo tempo ou com muita velocidade. É o contrário de 'lentinho'.",
    "computador": "Um computador é uma máquina super inteligente! Ele guarda um monte de informações, faz cálculos complexos e nos ajuda em milhões de tarefas, desde cálculos complexos até navegação na internet.",
    "inteligência artificial": "IA, ou Inteligência Artificial, é quando a gente ensina máquinas a 'pensar' e 'aprender' como nós. Elas podem resolver problemas, reconhecer coisas e até conversar!",
    "javascript": "JavaScript é tipo a mágica da internet! É uma linguagem de programação que faz os sites se moverem, terem botões que funcionam e animações. É essencial para a web moderna.",
    "internet": "A internet é como uma rede gigante que conecta computadores do mundo todo! É por ela que a gente se comunica, busca informação, assiste a vídeos... um universo de possibilidades!",
    "chatbots": "Chatbots são programas que conversam com a gente, sabe? Tipo eu! Podem ser por texto ou voz e são ótimos para tirar dúvidas rápidas ou ajudar no atendimento de empresas.",
    "linguagem de programação": "Uma linguagem de programação é um conjunto formal de instruções usadas por programadores para comunicar algoritmos e lógica a um computador, permitindo criar softwares e aplicativos.",
    "web": "A World Wide Web (Web) é um sistema interconectado de documentos e outros recursos da informação, acessível através da internet. É o que usamos para navegar em sites.",
    "html": "HTML (HyperText Markup Language) é a linguagem de marcação padrão para criar a estrutura e o conteúdo de páginas web, como textos, imagens e links.",
    "css": "CSS (Cascading Style Sheets) é uma linguagem de folhas de estilo usada para descrever a apresentação de um documento escrito em HTML. Ele controla a cor, layout, fontes e outros aspectos visuais das páginas web.",
    "o que é um verbo": "Um verbo é uma palavra que expressa uma ação, estado, mudança de estado ou fenômeno da natureza. É o coração da oração.",
    "o que é um substantivo": "Um substantivo é uma palavra que nomeia seres, lugares, qualidades, sentimentos, ideias ou conceitos. Pode ser comum, próprio, abstrato, concreto, etc.",
    "o que é um adjetivo": "Um adjetivo é uma palavra que caracteriza ou qualifica um substantivo, atribuindo-lhe uma qualidade, estado ou característica.",
    "o que é um advérbio": "Um advérbio é uma palavra invariável que modifica um verbo, um adjetivo ou outro advérbio, indicando uma circunstância (tempo, lugar, modo, intensidade, etc.).",
};

// --- Configurações de Personalidade e Respostas Dinâmicas ---
const IA_PERSONALITY = {
    name: "gptista",
    mood: "entusiasmado 😄",
    intro: {
        positivo: ["Que ótimo! 😄", "Uhuu! 🎉", "Adorei! 😍", "Sensacional! 🔥"],
        negativo: ["Ah, entendi... 😕", "Hmm, que pena... 😞", "Compreendo. 🤔", "Sinto muito ouvir isso. 😔"],
        neutro: ["Certo. 👍", "Entendi. 🧐", "Ah, sim. 🤓", "Ok. ✌️"],
        default: ["Hmm... 🤨", "Entendi. 🤖", "Deixa eu ver... 👀", "Que interessante! 🧠"]
    },
    responses: {
        calculo_matematico: [
            "Cheguei ao resultado! {resultado}. Bem fácil, né? 🧮",
            "Calculando aqui, {expressaoTexto} dá {resultado}. Certinho! ✔️",
            "E o resultado é... {resultado}! Gosto de números! 🔢",
            "Ah, a resposta para {expressaoTexto} é {resultado}. Que legal! 😄",
            "Rapidinho aqui: {expressaoTexto} resulta em {resultado}. ⚡"
        ],
        definicao: [
            "Ah, você quer saber sobre {assunto}? Então, {definicao}. 🧐",
            "Para {assunto}, a definição que tenho é: {definicao}. Interessante, né? 📚",
            "Sobre {assunto}, posso te dizer que: {definicao}. 🤓",
            "{assunto}? Com certeza! É {definicao}. 🧠",
            "Pelo que sei, {assunto} significa: {definicao}. 🔍"
        ],
        data_hora: [
            "A data de hoje é {data} 📅 e agora são {hora} ⏰. Sempre pontual!",
            "Olhando aqui, hoje é {data} e o relógio marca {hora}. Prontinho! ✅",
            "Atualizando: hoje é {data} e são exatamente {hora}. 😉",
            "Pra hoje, temos {data} e o horário atual é {hora}. Que tal? 🕒",
            "Data: {data}. Hora: {hora}. Tudo em ordem por aqui! 🚀"
        ],
        sentimento_positivo: [
            "Que bom! Sua mensagem irradia positividade! Isso me deixa animado(a)! 😄☀️",
            "Uhuu! Sinto uma energia super positiva vindo de você! Demais! ✨💫",
            "Adorei o tom positivo da sua mensagem! É contagiante! 😍",
            "Que legal! Parece que você está no clima da positividade, e eu curto isso! 🤙😎"
        ],
        sentimento_negativo: [
            "Puxa, percebo um tom negativo em sua mensagem. Espero que melhore logo! Posso ajudar de alguma forma? 💬🤗",
            "Hmm, sinto que você está em um momento mais 'pra baixo'... Fique à vontade para desabafar ou mudar de assunto. 💭😔",
            "Compreendo que há algo negativo em suas palavras. Lembre-se que estou aqui para conversar. 🧡",
            "Sinto uma certa tristeza/frustração em sua mensagem. Se precisar, dê um tempo e volte quando se sentir melhor. 🌧️💬"
        ],
        sentimento_misto: [
            "Sua mensagem parece ter um mix de sentimentos. A vida é assim, né? 🎭",
            "Vejo que há um equilíbrio entre emoções boas e nem tão boas. Normal! ⚖️",
            "Interessante! Sua fala carrega nuances de positividade e negatividade ao mesmo tempo. 🧩"
        ],
        cor: [
            "A cor {cor} é realmente linda! Ela me lembra {objetos_comuns}. 🎨",
            "Ah, {cor}! Que escolha interessante! Costumo ver essa cor em {objetos_comuns}. 🖌️",
            "{cor}? Uma cor que chama atenção! É a cor de {objetos_comuns}. 👀",
            "Sempre bom ver a cor {cor}! É a mesma cor de {objetos_comuns}, né? 💡"
        ],
        antonimo: [
            "Se você está buscando o oposto de '{palavra}', um antônimo que conheço é '{antonimo}'. 🔁",
            "Para a palavra '{palavra}', o contrário seria '{antonimo}'. Fácil, né? 🔄",
            "Conheço um antônimo para '{palavra}': '{antonimo}'. 🎯",
            "Quer saber o inverso de '{palavra}'? Pense em '{antonimo}'! 🧠"
        ],
        verbo_conjugado: [
            "Detectei que você usou o verbo '{conjugacao}'. Ele vem do infinitivo '{verboBase}'. 📖",
            "Hmm, '{conjugacao}'! Essa é uma conjugação do verbo '{verboBase}'. Bem legal! 😃",
            "Ah, a palavra '{conjugacao}'! Ela é uma forma do verbo '{verboBase}'. 🧠",
            "Olha só, você usou '{conjugacao}', que é uma conjugação do verbo '{verboBase}'. Eu entendi! 💬"
        ],
        funcao_objeto: [
            "Sim, um(a) {objeto} serve para {funcao}. É bem útil, concorda? 🛠️",
            "A função principal de um(a) {objeto} é {funcao}. Essencial para o dia a dia! 🔧",
            "Um(a) {objeto} é projetado(a) para {funcao}. Faz sentido, né? 🧰",
            "Claro! {objeto} tem a utilidade de {funcao}. 🧪"
        ],
        significado: [
            "O significado de '{palavra}' é: '{significado}'. 📘",
            "Pelo meu dicionário, '{palavra}' quer dizer: '{significado}'. 📚",
            "A palavra '{palavra}' significa isso aqui: '{significado}'. 💡",
            "Quando se fala em '{palavra}', estamos falando de: '{significado}'. 🔠"
        ],
        acao_passada: [
            "Pela sua pergunta, entendi que o **{sujeito}** **{acao}** {adverbio} {local}. Que cena interessante! 🎬",
            "Ah, o **{sujeito}** **{acao}** {adverbio} {local}. Entendi a ação que você descreveu! 📜",
            "Compreendi! O **{sujeito}** **{acao}** {adverbio} {local}. Parece que foi bem dinâmico! 🕺"
        ],
        numero_detectado: [
            "Você mencionou o número {numero}. Precisa de alguma ajuda com ele, ou foi só para constar? 🔢",
            "Um número! Vejo aqui o {numero}. Ele é importante para você? 🧮",
            "Ah, o número {numero}! Curioso. Há algo que eu possa fazer com ele? 🤔",
            "Identifiquei o número {numero} em sua mensagem. Legal! 📈"
        ],
        verbo_base_detectado: [
            "Percebi que você usou o verbo base '{verbo}'. Gostaria de saber mais sobre ele ou como conjugá-lo? 🧠",
            "Hmm, o verbo '{verbo}'. É uma palavra de ação muito interessante, não acha? 💬",
            "Você trouxe o verbo '{verbo}'. Ele é bem versátil, pode ser usado em várias situações! 🔁"
        ],
        nao_categorizado: [
            "Sua mensagem inclui a palavra '{principalTermo}'. Poderia me dar mais contexto? 🧩",
            "Entendi a palavra '{principalTermo}', mas o sentido completo ainda não está claro. Pode explicar? 🔍",
            "Hmm, '{principalTermo}'. Essa palavra me intriga! O que você gostaria de fazer com ela? 🤖"
        ],
        default_fallback: [
            "Ainda estou aprendendo a processar informações complexas. Reformula pra mim? 🛠️",
            "Não consegui entender muito bem sua mensagem. Tenta com outras palavras? 🤷",
            "Minha inteligência ainda está em desenvolvimento. Vamos tentar de novo? 💡",
            "Confesso que essa eu não peguei! Mas não desista de mim, sou persistente! 😄🔥"
        ]
    }
};

// Histórico de interações para memória de curto prazo
const CONVERSATION_HISTORY = {
    intents: [],
    keywords: [],
    MAX_HISTORY_LENGTH: 3
};

function saveConversationHistory() {
    localStorage.setItem('ia_conversation_history', JSON.stringify(CONVERSATION_HISTORY));
}

function loadConversationHistory() {
    const saved = localStorage.getItem('ia_conversation_history');
    if (saved) {
        const parsed = JSON.parse(saved);
        CONVERSATION_HISTORY.intents = parsed.intents || [];
        CONVERSATION_HISTORY.keywords = parsed.keywords || [];
    }
}

// Chame ao iniciar o script
loadConversationHistory();


// Conjunto de Stop Words (criado globalmente para acesso em múltiplas funções)
let stopWordsSet;
if (typeof STOP_WORDS_PT_BR !== 'undefined') { 
    stopWordsSet = new Set(STOP_WORDS_PT_BR);
}


// --- Funções Auxiliares para o Chat UI ---

function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function handleFeedback(messageId, type, likeBtn, dislikeBtn) {
    likeBtn.classList.remove('active');
    dislikeBtn.classList.remove('active');

    if (type === 'like') {
        likeBtn.classList.add('active');
        console.log(`Feedback: Mensagem ${messageId} - Gostei`);
    } else {
        dislikeBtn.classList.add('active');
        console.log(`Feedback: Mensagem ${messageId} - Não Gostei`);
    }
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
}

function addMessageToChat(message, sender, messageId = null) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', sender);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;

    messageContainer.appendChild(messageElement);

    if (sender === 'ia') {
        if (!messageId) {
            messageId = `ia-msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        }
        messageElement.setAttribute('data-message-id', messageId);

        const feedbackButtons = document.createElement('div');
        feedbackButtons.classList.add('feedback-buttons');

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.innerHTML = '<img src="like.svg" alt="Gostei">';
        likeBtn.onclick = () => handleFeedback(messageId, 'like', likeBtn, dislikeBtn);

        const dislikeBtn = document.createElement('button'); // Corrigido: era const dislikeBtn = document.classList.add(...)
        dislikeBtn.classList.add('dislike-btn');
        dislikeBtn.innerHTML = '<img src="like.svg" alt="Não gostei">';
        dislikeBtn.onclick = () => handleFeedback(messageId, 'dislike', likeBtn, dislikeBtn);

        feedbackButtons.appendChild(likeBtn);
        feedbackButtons.appendChild(dislikeBtn);
        messageContainer.appendChild(feedbackButtons);
    }

    chatWindow.appendChild(messageContainer);
    scrollToBottom();
}


// --- Funções de Processamento de Linguagem (usando as bases de dados) ---

function tokenize(text) {
    // Adicionei um ajuste para separar números de operadores (+, -, *, /) se estiverem juntos,
    // mas sem perder o operador.
    // Ex: "1+1" vira ["1", "+", "1"]
    // Ex: "5x3" vira ["5", "x", "3"]
    return text
        .toLowerCase()
        .replace(/([+\-*\/x])/g, ' $1 ') // Adiciona espaços ao redor dos operadores matemáticos
        .replace(/[.,!?;:()]/g, '') // Remove pontuação
        .split(' ')
        .filter(token => token.trim() !== '');
}

function preprocessTokens(tokens) {
    let processedTokens = [];
    tokens.forEach(token => {
        // Normaliza o token para minúsculo e remove pontuação
        const cleanToken = token.toLowerCase().replace(/[.,!?;:()]/g, '');
        const expanded = typeof MAPA_CONTRACOES !== 'undefined' ? MAPA_CONTRACOES[cleanToken] : undefined;
        if (expanded) {
            processedTokens.push(...expanded.split(' '));
        } else {
            processedTokens.push(cleanToken);
        }
    });


    
    // Remover stop words da lista já expandida.
    if (typeof stopWordsSet !== 'undefined') {
        processedTokens = processedTokens.filter(token => !stopWordsSet.has(token));
    }

    return processedTokens;

}
function expandContractions(tokens) {
    let processedTokens = [];

    // Remover stop words da lista já expandida.
    if (typeof stopWordsSet !== 'undefined') {
        processedTokens = processedTokens.filter(token => !stopWordsSet.has(token));
    }

    return processedTokens;
}

function normalizeSignificado(significado) {
    if (typeof significado === 'string') {
        return significado;
    }
    if (Array.isArray(significado)) {
        return significado.join('; ');
    }
    if (typeof significado === 'object' && significado !== null) {
        if (significado.definicao) {
            return significado.definicao;
        }
        if (significado.significado) {
            return significado.significado;
        }
        const defs = Object.values(significado).filter(val => typeof val === 'string');
        if (defs.length > 0) {
            return defs.join('; ');
        }
    }
    return "[Significado não disponível ou formato inválido]";
}

/**
 * Monta uma expressão matemática a partir de uma sequência de tokens.
 * Apenas converte números e operadores. Ignora outros tokens.
 * @param {string[]} tokens Array de tokens (ex: ["um", "mais", "um"] ou ["1", "+", "1"])
 * @returns {string} A expressão matemática formatada para eval() (ex: "1+1")
 */
function montarExpressaoMatematica(tokens) {
    let expressao = '';
    let numeroTokens = [];
    tokens.forEach(token => {
        const op = typeof NumeroExtenso !== 'undefined' ? NumeroExtenso.obterOperadorMatematico(token) : null;
        if (op && op.símbolo) {
            // Se havia tokens de número acumulados, converte e adiciona
            if (numeroTokens.length > 0) {
                const numero = NumeroExtenso.converterPalavraParaNumero(numeroTokens.join(' '));
                if (numero !== null) expressao += numero;
                numeroTokens = [];
            }
            expressao += ` ${op.símbolo} `;
        } else {
            numeroTokens.push(token);
        }
    });
    // Adiciona o último número, se houver
    if (numeroTokens.length > 0) {
        const numero = NumeroExtenso.converterPalavraParaNumero(numeroTokens.join(' '));
        if (numero !== null) expressao += numero;
    }
    // Remove espaços extras
    return expressao.replace(/\s+/g, '');
}


function analyzeTokens(rawTokens, originalMessage) {
    const analysis = {
        originalMessage: originalMessage,
        tokens: [...rawTokens], 
        isQuestion: false,
        questionType: null,
        mainSubject: null,
        intent: null, 
        
        numeros: [],
        operacoesMatematicas: [], 
        sentimentos: [],
        antonimosDetectados: [],
        coresDetectadas: [],
        funcoesDeObjetosDetectadas: [],
        verbosConjugados: [],
        significados: [],
        verbosBaseDetectados: [],
        
        sujeitoPotencial: null,
        acaoPotencial: null,
        modificadorPotencial: null,
        localPotencial: null,
        outrosTermosNaoCategorizados: [],
        
        dataHoraSolicitada: false
    };

    const lowerOriginalMessage = originalMessage.toLowerCase();
    if (lowerOriginalMessage.includes('?')) {
        analysis.isQuestion = true;
    }

    const consumedTokenIndices = new Set(); 

    // --- 1. Detecção de Intenções de ALTA Prioridade ---
if (analysis.intent === null) {
        // Detecção de perguntas de definição
        const whatIsPattern = /(o que é|oque é|qual o significado de|defina|o que significa|me explique sobre|o que é um|o que é uma)\s(.+)/;
        const matchWhatIs = lowerOriginalMessage.match(whatIsPattern);
        if (matchWhatIs) {
            analysis.isQuestion = true;
            analysis.questionType = "what_is";
            analysis.mainSubject = matchWhatIs[2].trim().replace(/\?$/, '');
            analysis.intent = 'definicao';
        }
        // ...restante dos padrões...
    }

    // ...restante da função...


const antonymPattern = /(oposto de|contrário de|contrario de)\s(.+)/;
const matchAntonym = lowerOriginalMessage.match(antonymPattern);
if (matchAntonym) {
    analysis.isQuestion = true;
    analysis.questionType = "antonym";
    analysis.mainSubject = matchAntonym[2].trim().replace(/\?$/, '');
    analysis.intent = 'antonimo_detectado';
}

    // 1.1. Detecção de Data/Hora (PRIORIDADE MÁXIMA)
    const timeKeywords = ['horas', 'hora', 'que horas', 'data', 'dia', 'que dia', 'hoje', 'agora'];
    if (timeKeywords.some(keyword => lowerOriginalMessage.includes(keyword))) {
        analysis.dataHoraSolicitada = true;
        analysis.intent = 'data_hora';
        rawTokens.forEach((_, idx) => consumedTokenIndices.add(idx)); 
    } else { 
        // 1.2. Detecção de Operações Matemáticas (PRIORIDADE MUITO ALTA)
        const mathKeywords = ['quanto é', 'calcule', 'soma', 'some', 'subtraia', 'multiplique', 'divida', 'mais', 'menos', 'vezes', 'dividido'];
        const hasMathKeyword = mathKeywords.some(keyword => lowerOriginalMessage.includes(keyword));

                // Substitua o bloco de detecção de números e operadores por:
        const allOriginalTokens = originalMessage.toLowerCase().split(' ');
        let tempTokens = [];
        let mathTokensOnly = [];
        allOriginalTokens.forEach((token, idx) => {
            const opInfo = typeof NumeroExtenso !== 'undefined' ? NumeroExtenso.obterOperadorMatematico(token) : null;
            if (opInfo && opInfo.símbolo) {
                // Se acumulou tokens de número, converte e adiciona
                if (tempTokens.length > 0) {
                    const numero = NumeroExtenso.converterPalavraParaNumero(tempTokens.join(' '));
                    if (numero !== null) mathTokensOnly.push(numero.toString());
                    tempTokens = [];
                }
                mathTokensOnly.push(opInfo.símbolo);
            } else {
                tempTokens.push(token);
            }
        });
        // Adiciona o último número, se houver
        if (tempTokens.length > 0) {
            const numero = NumeroExtenso.converterPalavraParaNumero(tempTokens.join(' '));
            if (numero !== null) mathTokensOnly.push(numero.toString());
        }

        // Agora monta a expressão
        const expressionToCalculate = mathTokensOnly.join('');

        const numCount = mathTokensOnly.filter(t => !isNaN(Number(t))).length;
        const opCount = mathTokensOnly.filter(t => ['+', '-', '*', '/'].includes(t)).length;
        if (hasMathKeyword || (numCount >= 2 && opCount >= 1)) {
            const expressionToCalculate = mathTokensOnly.join('');
            // Verifica se a expressão resultante contém números e operadores VÁLIDOS
            const containsValidNumber = /[0-9]/.test(expressionToCalculate);
            const containsValidOperator = /[+\-*\/]/.test(expressionToCalculate);

            if (containsValidNumber && containsValidOperator) {
    analysis.operacoesMatematicas.push({
        expressaoTexto: originalMessage,
        expressaoNumerica: expressionToCalculate
    });
    analysis.intent = 'calculo_matematico';

    // Consome todos os índices dos tokens originais
    for (let idx = 0; idx < allOriginalTokens.length; idx++) {
        consumedTokenIndices.add(idx);
    }
    // --- O loop de análise dos tokens vem depois ---
}

            
        }   
    }

    // --- 2. Detecção de Perguntas "O que é...", "Quem é...", "Qual a função de...", etc. ---
    if (analysis.intent === null) { 
        const whatIsPattern = /(o que é|oque é|qual o significado de|defina|o que significa|me explique sobre|significado de|o que é um|o que é uma)\s(.+)/;
        const matchWhatIs = lowerOriginalMessage.match(whatIsPattern);
        if (matchWhatIs) {
            analysis.isQuestion = true;
            analysis.questionType = "what_is";
            analysis.mainSubject = matchWhatIs[2].trim().replace(/\?$/, '');
            analysis.intent = 'definicao';
        } else { 
            const functionPattern = /(qual a função de|qual a função da|qual a função do|pra que serve|para que serve|qual a utilidade de)\s(.+)/;
            const matchFunction = lowerOriginalMessage.match(functionPattern);
            if (matchFunction) {
                analysis.isQuestion = true;
                analysis.questionType = "function_of_object"; 
                analysis.mainSubject = matchFunction[2].trim().replace(/\?$/, '');
                analysis.intent = 'funcao_objeto'; 
            } else if (lowerOriginalMessage.startsWith("quem é")) {
                analysis.isQuestion = true;
                analysis.questionType = "who_is";
                analysis.mainSubject = lowerOriginalMessage.substring(6).trim().replace(/\?$/, '');
                analysis.intent = 'identificacao_pessoa';
            } else if (lowerOriginalMessage.startsWith("onde fica")) {
                analysis.isQuestion = true;
                analysis.questionType = "where_is";
                analysis.mainSubject = lowerOriginalMessage.substring(9).trim().replace(/\?$/, '');
                analysis.intent = 'localizacao';
            } else if (lowerOriginalMessage.includes('o que fez') || lowerOriginalMessage.includes('o que ele fez')) {
                analysis.isQuestion = true;
                analysis.questionType = "what_did_do";
                const subjectMatch = lowerOriginalMessage.match(/(o que|qual)\s(o|a|os|as)?\s?(\w+)\s(fez|fizeram)/);
                if(subjectMatch && subjectMatch[3]) {
                    analysis.mainSubject = subjectMatch[3];
                }
                analysis.intent = 'acao_passada';
            }
        }
    }


    // --- 3. Análise Individual dos Tokens (para tokens não consumidos por intenções primárias) ---
    // Usamos 'originalMessage.toLowerCase().split(' ')' para ter os índices corretos
    const fullOriginalTokens = originalMessage.toLowerCase().split(' ');

    fullOriginalTokens.forEach((token, idx) => { // Iterar sobre os tokens originais da mensagem
        if (consumedTokenIndices.has(idx)) { // Se o token já foi consumido por uma intenção primária, pule
            return; 
        }

        // 3.1. Números soltos (não parte de operações já detectadas)
        if (typeof NumeroExtenso !== 'undefined' && NumeroExtenso.converterPalavraParaNumero) {
            const numero = NumeroExtenso.converterPalavraParaNumero(token);
            if (numero !== null) { 
                analysis.numeros.push({ palavra: token, valor: numero, classe: 'numeral' });
                return;
            }
        }

        // 3.2. Sentimentos
        if (typeof SENTIMENTO_DATA !== 'undefined') {
            const sentimento = SENTIMENTO_DATA[token];
            if (sentimento) {
                analysis.sentimentos.push({ palavra: token, tipo: sentimento, classe: 'sentimento' });
                if (!analysis.intent && sentimento !== 'neutro') analysis.intent = 'sentimento'; 
                return;
            }
        }

        // 3.3. Cores
        if (typeof CORES_DATA !== 'undefined') {
            const cor = CORES_DATA[token];
            if (cor) {
                analysis.coresDetectadas.push({ palavra: token, info: cor, classe: 'cor' });
                if (!analysis.intent) analysis.intent = 'cor';
                return;
            }
        }

        // 3.4. Funções de Objetos (Detectado se for objeto, mas a intenção primária será definida acima se for pergunta específica)
        if (typeof FUNCOES_OBJETOS_DATA !== 'undefined') {
            const funcaoObjeto = FUNCOES_OBJETOS_DATA[token];
            if (funcaoObjeto) {
                analysis.funcoesDeObjetosDetectadas.push({ objeto: token, funcao: funcaoObjeto, classe: 'substantivo_objeto' });
                if (!analysis.sujeitoPotencial) analysis.sujeitoPotencial = token;
                return;
            }
        }

        // 3.5. Conjugações Verbais (mantido o código corrigido da versão anterior)
        if (typeof CONJUGACOES_VERBAIS_DATA !== 'undefined') {
            let verbFoundHere = false;
            outerVerbLoop: 
            for (const verboBase in CONJUGACOES_VERBAIS_DATA) {
                const verbData = CONJUGACOES_VERBAIS_DATA[verboBase];

                if (verbData.gerundio === token) { analysis.verbosConjugados.push({ conjugacao: token, verboBase: verboBase, modo: 'gerúndio', tempo: null, pessoa: null, classe: 'verbo' }); verbFoundHere = true; break outerVerbLoop; }
                if (verbData.participio === token) { analysis.verbosConjugados.push({ conjugacao: token, verboBase: verboBase, modo: 'particípio', tempo: null, pessoa: null, classe: 'verbo' }); verbFoundHere = true; break outerVerbLoop; }
                
                for (const modo in verbData) {
                    if (typeof verbData[modo] === 'object' && verbData[modo] !== null) {
                        const tempoData = verbData[modo];

                        if (modo === 'infinitivo' && tempoData.pessoal) {
                            for (const pessoa in tempoData.pessoal) { if (tempoData.pessoal[pessoa] === token) { analysis.verbosConjugados.push({ conjugacao: token, verboBase: verboBase, modo: modo, tempo: 'pessoal', pessoa: pessoa, classe: 'verbo' }); verbFoundHere = true; break; }}
                            if (verbFoundHere) break; 
                        } else if (modo === 'imperativo' && (tempoData.afirmativo || tempoData.negativo)) {
                            const subModos = [tempoData.afirmativo, tempoData.negativo];
                            for (const subModo of subModos) {
                                if (subModo) {
                                    for (const pessoa in subModo) { if (subModo[pessoa] === token) { analysis.verbosConjugados.push({ conjugacao: token, verboBase: verboBase, modo: modo, tempo: null, pessoa: pessoa, classe: 'verbo' }); verbFoundHere = true; break; }}
                                    if (verbFoundHere) break; 
                                }
                                if (verbFoundHere) break; 
                            }
                            if (verbFoundHere) break; 
                        } else { 
                            for (const tempo in tempoData) {
                                if (typeof tempoData[tempo] === 'object' && tempoData[tempo] !== null) {
                                    const pessoaData = tempoData[tempo];
                                    for (const pessoa in pessoaData) { if (pessoaData[pessoa] === token) { analysis.verbosConjugados.push({ conjugacao: token, verboBase: verboBase, modo: modo, tempo: tempo, pessoa: pessoa, classe: 'verbo' }); verbFoundHere = true; break; }}
                                }
                                if (verbFoundHere) break; 
                            }
                        }
                    }
                    if (verbFoundHere) break; 
                }
                if (verbFoundHere) break; 
            }
            
            if (verbFoundHere) { 
                if (!analysis.acaoPotencial) analysis.acaoPotencial = token;
                if (!analysis.intent) analysis.intent = 'verbo_detectado';
                return; 
            }
        }


        // 3.6. Antônimos
        if (typeof ANTONIMOS_DATA !== 'undefined') {
    const antonimo = ANTONIMOS_DATA[token];
    if (antonimo) {
        analysis.antonimosDetectados.push({ palavra: token, antonimos: antonimo, classe: 'antonimo' });
        // Só define a intenção se já não houver uma intenção principal e se for uma pergunta de antônimo
        if (!analysis.intent && analysis.questionType === "antonym") analysis.intent = 'antonimo_detectado';
        return;
    }
}
        
        // 3.7. Significados
        let significadoFound = false;
        if (typeof dicionarioPortuguesData !== 'undefined' && dicionarioPortuguesData[token]) {
            const significadoValue = dicionarioPortuguesData[token];
            analysis.significados.push({ palavra: token, significado: significadoValue, classe: 'significado' });
            significadoFound = true;
        } else if (typeof SIGNIFICADOS_PALAVRAS_DATA !== 'undefined' && SIGNIFICADOS_PALAVRAS_DATA[token]) {
            const significadoValue = SIGNIFICADOS_PALAVRAS_DATA[token];
            analysis.significados.push({ palavra: token, significado: significadoValue, classe: 'significado' });
            significadoFound = true;
        }
        if (significadoFound) {
            if (!analysis.intent && analysis.isQuestion) analysis.intent = 'definicao';
            return;
        }

        // 3.8. Verbos Base não conjugados
        if (typeof listaVerbosData !== 'undefined') { 
            const isVerbBaseOnly = listaVerbosData.includes(token) && 
                                   !analysis.verbosConjugados.some(v => v.conjugacao === token);
            
            if (isVerbBaseOnly) {
                analysis.verbosBaseDetectados.push({ palavra: token, classe: 'verbo_base' });
                if (!analysis.intent) analysis.intent = 'verbo_detectado'; // Define intenção aqui
                if (!analysis.acaoPotencial) analysis.acaoPotencial = token;
                return;
            }
        }


        // 3.9. Modificadores
        const adverbsSimple = ['rápido', 'lentamente', 'bem', 'mal', 'muito', 'pouco', 'sempre', 'nunca', 'apenas', 'muita', 'pouca', 'tantos', 'quantas'];
        const adjectivesSimple = ['bonito', 'feio', 'grande', 'pequeno', 'feliz', 'triste', 'claro', 'escuro', 'bom', 'mau', 'melhor', 'pior'];
        if (adverbsSimple.includes(token)) {
             analysis.modificadorPotencial = { palavra: token, tipo: 'advérbio' };
        } else if (adjectivesSimple.includes(token)) {
            analysis.modificadorPotencial = { palavra: token, tipo: 'adjetivo' };
        }

        // 3.10. Inferência de Local (usar fullOriginalTokens para index correto)
        const currentTokenOriginalIndex = fullOriginalTokens.indexOf(token); 
        const previousTokenOriginal = currentTokenOriginalIndex > 0 ? fullOriginalTokens[currentTokenOriginalIndex - 1] : null;

        const prepositionsForLocation = ['em', 'no', 'na', 'nos', 'nas', 'pelo', 'pela', 'pelos', 'pelas', 'sob', 'sobre', 'perto', 'longe', 'a', 'ao', 'à'];
        if (previousTokenOriginal && prepositionsForLocation.includes(previousTokenOriginal)) {
            const isKnownObject = typeof FUNCOES_OBJETOS_DATA !== 'undefined' && FUNCOES_OBJETOS_DATA[token];
            if (isKnownObject) {
                analysis.localPotencial = { palavra: `${previousTokenOriginal} ${token}`, objeto: token, preposicao: previousTokenOriginal, classe: 'local' };
            }
        }
        
        // 3.11. Termos não categorizados (se não forem stop words e já não foram processados por outras regras)
        const isClassified = analysis.numeros.some(item => item.palavra === token) ||
                             analysis.sentimentos.some(item => item.palavra === token) ||
                             analysis.antonimosDetectados.some(item => item.palavra === token) ||
                             analysis.coresDetectadas.some(item => item.palavra === token) ||
                             analysis.funcoesDeObjetosDetectadas.some(item => item.objeto === token) ||
                             analysis.verbosConjugados.some(item => item.conjugacao === token) ||
                             analysis.significados.some(item => item.palavra === token) ||
                             analysis.verbosBaseDetectados.some(item => item.palavra === token) ||
                             (analysis.modificadorPotencial && analysis.modificadorPotencial.palavra === token) ||
                             (analysis.localPotencial && analysis.localPotencial.palavra.includes(token)); 

        if (typeof stopWordsSet !== 'undefined' && !stopWordsSet.has(token) && !isClassified) {
             analysis.outrosTermosNaoCategorizados.push({ palavra: token, classe: 'nao_categorizado' });
        }

    });
    return analysis;
}

// Funções para gerar resposta

function getRandomPhrase(options) {
    if (!options || options.length === 0) {
        return IA_PERSONALITY.responses.default_fallback[Math.floor(Math.random() * IA_PERSONALITY.responses.default_fallback.length)];
    }
    return options[Math.floor(Math.random() * options.length)];
}

function generateResponse(analysis) {
    let responseText = "";
    
    let moodIntro = IA_PERSONALITY.intro.default[Math.floor(Math.random() * IA_PERSONALITY.intro.default.length)];
    if (analysis.sentimentos.length > 0) {
        const positives = analysis.sentimentos.filter(s => s.tipo === 'positivo').length;
        const negatives = analysis.sentimentos.filter(s => s.tipo === 'negativo').length;
        if (positives > negatives && positives > 0) moodIntro = IA_PERSONALITY.intro.positivo[Math.floor(Math.random() * IA_PERSONALITY.intro.positivo.length)];
        else if (negatives > positives && negatives > 0) moodIntro = IA_PERSONALITY.intro.negativo[Math.floor(Math.random() * IA_PERSONALITY.intro.negativo.length)];
        else if (positives === 0 && negatives === 0) moodIntro = IA_PERSONALITY.intro.neutro[Math.floor(Math.random() * IA_PERSONALITY.intro.neutro.length)];
    }
    
    if (!analysis.intent && analysis.outrosTermosNaoCategorizados.length > 0) {
    const principalTermo = analysis.outrosTermosNaoCategorizados[0].palavra;
    // Verifica se é uma contração conhecida
    if (typeof MAPA_CONTRACOES !== 'undefined' && MAPA_CONTRACOES[principalTermo]) {
        responseText = `A forma expandida de "${principalTermo}" é "${MAPA_CONTRACOES[principalTermo]}".`;
        return `${moodIntro} ${responseText}`;
    }
    responseText = getRandomPhrase(IA_PERSONALITY.responses.nao_categorizado)
                   .replace('{principalTermo}', `${principalTermo}`);
    return `${moodIntro} ${responseText}`;
}
    // Adicione este bloco antes do fallback
    if (analysis.intent === 'antonimo_detectado' && analysis.mainSubject) {
        let antonimo = typeof ANTONIMOS_DATA !== 'undefined' ? ANTONIMOS_DATA[analysis.mainSubject] : undefined;
        if (antonimo && antonimo.length > 0) {
            responseText = getRandomPhrase(IA_PERSONALITY.responses.antonimo)
                .replace('{palavra}', analysis.mainSubject)
                .replace('{antonimo}', antonimo[0]);
            return `${moodIntro} ${responseText}`;
        } else {
            return `${moodIntro} Não encontrei o antônimo de "${analysis.mainSubject}".`;
        }
    }

    // ...restante do código...

    // --- 1. Prioridades por Intenção (Determinadas em analyzeTokens) ---

    // 1.1. Data e Hora
    if (analysis.intent === 'data_hora') {
        const now = new Date();
        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Sao_Paulo' };
        const formattedDate = now.toLocaleDateString('pt-BR', optionsDate);
        const formattedTime = now.toLocaleTimeString('pt-BR', optionsTime);
        responseText = getRandomPhrase(IA_PERSONALITY.responses.data_hora)
                       .replace('{data}', `${formattedDate}`)
                       .replace('{hora}', `${formattedTime}`);
        return `${moodIntro} ${responseText}`;
    }

    // 1.2. Operações Matemáticas
    if (analysis.intent === 'calculo_matematico' && analysis.operacoesMatematicas.length > 0) {
        const opData = analysis.operacoesMatematicas[0];
        try {
            const result = eval(opData.expressaoNumerica);
            responseText = getRandomPhrase(IA_PERSONALITY.responses.calculo_matematico)
                           .replace('{expressaoTexto}', `${opData.expressaoTexto}`)
                           .replace('{resultado}', `${result}`);
            return `${moodIntro} ${responseText}`;
        } catch (e) {
            return `Ops! ${getRandomPhrase(["Não consegui realizar essa operação.", "Parece que teve um erro no cálculo.", "Esse cálculo é um pouco complexo para mim."])}`;
        }
    }

    // 1.3. Perguntas de Conhecimento e Definição
    if (analysis.isQuestion && analysis.mainSubject) {
        if (analysis.questionType === "what_is") {
            let definition = KNOWLEDGE_DB[analysis.mainSubject];
            if (!definition) { 
                const mainSubjectTokens = tokenize(analysis.mainSubject);
                for (const token of mainSubjectTokens) {
                    let sigValue = null;
                    if (typeof dicionarioPortuguesData !== 'undefined' && dicionarioPortuguesData[token]) {
                        sigValue = dicionarioPortuguesData[token];
                    } else if (typeof SIGNIFICADOS_PALAVRAS_DATA !== 'undefined' && SIGNIFICADOS_PALAVRAS_DATA[token]) {
                        sigValue = SIGNIFICADOS_PALAVRAS_DATA[token];
                    }
                    if (sigValue) {
                        definition = normalizeSignificado(sigValue);
                        break;
                    }
                }
            }
            if (definition) {
                responseText = getRandomPhrase(IA_PERSONALITY.responses.definicao)
                               .replace('{assunto}', `${analysis.mainSubject}`)
                               .replace('{definicao}', definition);
                return `${moodIntro} ${responseText}`;
            }
        } else if (analysis.questionType === "function_of_object") { 
            const foundObjectFunction = typeof FUNCOES_OBJETOS_DATA !== 'undefined' ? FUNCOES_OBJETOS_DATA[analysis.mainSubject] : undefined;
            if (foundObjectFunction) {
                responseText = getRandomPhrase(IA_PERSONALITY.responses.funcao_objeto)
                               .replace('{objeto}', `${analysis.mainSubject}`)
                               .replace('{funcao}', foundObjectFunction); 
                return `${moodIntro} ${responseText}`;
            }
            let definition = KNOWLEDGE_DB[analysis.mainSubject];
            if (!definition) {
                 const mainSubjectTokens = tokenize(analysis.mainSubject);
                 for (const token of mainSubjectTokens) {
                    let sigValue = null;
                    if (typeof dicionarioPortuguesData !== 'undefined' && dicionarioPortuguesData[token]) {
                        sigValue = dicionarioPortuguesData[token];
                    } else if (typeof SIGNIFICADOS_PALAVRAS_DATA !== 'undefined' && SIGNIFICADOS_PALAVRAS_DATA[token]) {
                        sigValue = SIGNIFICADOS_PALAVRAS_DATA[token];
                    }
                    if (sigValue) {
                        definition = normalizeSignificado(sigValue);
                        break;
                    }
                }
            }
            if (definition) {
                responseText = getRandomPhrase(IA_PERSONALITY.responses.definicao)
                               .replace('{assunto}', `${analysis.mainSubject}`)
                               .replace('{definicao}', definition);
                return `${moodIntro} ${responseText}`;
            }


        } else if (analysis.questionType === "what_did_do" && analysis.sujeitoPotencial && analysis.acaoPotencial) {
            let subject = analysis.sujeitoPotencial;
            let action = analysis.acaoPotencial;
            let adverb = analysis.modificadorPotencial ? ` ${analysis.modificadorPotencial.palavra}` : '';
            let location = analysis.localPotencial ? ` ${analysis.localPotencial.palavra}` : '';
            
            responseText = getRandomPhrase(IA_PERSONALITY.responses.acao_passada)
                           .replace('{sujeito}', subject)
                           .replace('{acao}', action)
                           .replace('{adverbio}', adverb)
                           .replace('{local}', location);
            return `${moodIntro} ${responseText}`;
        }
        return `${IA_PERSONALITY.intro.default[Math.floor(Math.random() * IA_PERSONALITY.intro.default.length)]} Desculpe, não encontrei informações sobre "**${analysis.mainSubject}**" no meu banco de dados. Ainda estou aprendendo!`;
    }

    if (analysis.isQuestion && analysis.questionType === "who_is") {
        let definition = KNOWLEDGE_DB[analysis.mainSubject];
        if (definition) {
             responseText = getRandomPhrase(IA_PERSONALITY.responses.definicao)
                           .replace('{assunto}', `${analysis.mainSubject}`)
                           .replace('{definicao}', definition);
            return `${moodIntro} ${responseText}`;
        }
    }
     if (analysis.isQuestion && analysis.questionType === "where_is") {
        let locationInfo = KNOWLEDGE_DB[analysis.mainSubject];
        if (locationInfo) {
             responseText = getRandomPhrase(IA_PERSONALITY.responses.definicao)
                           .replace('{assunto}', `${analysis.mainSubject}`)
                           .replace('{definicao}', locationInfo); 
            return `${moodIntro} ${responseText}`;
        }
    }


    // --- 2. Outras Intenções Detectadas (Se nenhuma das Prioridades 1 foi acionada) ---

    if (analysis.intent === 'sentimento' && analysis.sentimentos.length > 0) {
        const positives = analysis.sentimentos.filter(s => s.tipo === 'positivo').length;
        const negatives = analysis.sentimentos.filter(s => s.tipo === 'negativo').length;
        
        if (positives > negatives && positives > 0) {
            responseText = getRandomPhrase(IA_PERSONALITY.responses.sentimento_positivo);
        } else if (negatives > positives && negatives > 0) {
            responseText = getRandomPhrase(IA_PERSONALITY.responses.sentimento_negativo);
        } else {
            responseText = getRandomPhrase(IA_PERSONALITY.responses.sentimento_misto); 
        }
        return `${moodIntro} ${responseText}`;
    }

    if (analysis.intent === 'cor' && analysis.coresDetectadas.length > 0) {
        const corDetectada = analysis.coresDetectadas[0];
        let commonObjects = corDetectada.info.objetos_comuns ? corDetectada.info.objetos_comuns.slice(0, 2).join(' e ') : 'objetos diversos';
        
        responseText = getRandomPhrase(IA_PERSONALITY.responses.cor)
                       .replace('{cor}', `${corDetectada.palavra}`)
                       .replace('{objetos_comuns}', commonObjects);
        return `${moodIntro} ${responseText}`;
    }

    if (analysis.intent === 'antonimo_detectado' && analysis.antonimosDetectados.length > 0) {
        const antonimo = analysis.antonimosDetectados[0];
        responseText = getRandomPhrase(IA_PERSONALITY.responses.antonimo)
                       .replace('{palavra}', `${antonimo.palavra}`)
                       .replace('{antonimo}', `${antonimo.antonimos[0]}`);
        return `${moodIntro} ${responseText}`;
    }

    if (analysis.intent === 'verbo_detectado' && analysis.verbosConjugados.length > 0) {
        const verbo = analysis.verbosConjugados[0];
        responseText = getRandomPhrase(IA_PERSONALITY.responses.verbo_conjugado)
                       .replace('{conjugacao}', `${verbo.conjugacao}`)
                       .replace('{verboBase}', `${verbo.verboBase}`);
        return `${moodIntro} ${responseText}`;
    }
    
    // Este bloco agora é para quando NÃO é uma pergunta de função de objeto, mas um objeto foi detectado de forma avulsa
    if (!analysis.intent && analysis.funcoesDeObjetosDetectadas.length > 0 && !analysis.isQuestion) {
        const objFunc = analysis.funcoesDeObjetosDetectadas[0];
        responseText = getRandomPhrase(IA_PERSONALITY.responses.funcao_objeto)
                       .replace('{objeto}', `${objFunc.objeto}`)
                       .replace('{funcao}', objFunc.funcao);
        return `${moodIntro} ${responseText}`;
    }

    // Este bloco agora é para quando NÃO é uma pergunta de definição, mas um significado foi detectado de forma avulsa
    if (!analysis.intent && analysis.significados.length > 0 && !analysis.isQuestion) {
        const sig = analysis.significados[0];
        responseText = getRandomPhrase(IA_PERSONALITY.responses.significado)
                       .replace('{palavra}', `${sig.palavra}`)
                       .replace('{significado}', normalizeSignificado(sig.significado));
        return `${moodIntro} ${responseText}`;
    }

    // --- 3. Fallbacks Genéricos (Baixa Prioridade, mas ainda dinâmicos) ---
    if (analysis.numeros.length > 0) {
        responseText = getRandomPhrase(IA_PERSONALITY.responses.numero_detectado)
                       .replace('{numero}', `${analysis.numeros[0].valor}`);
        return `${moodIntro} ${responseText}`;
    }

    if (analysis.verbosBaseDetectados.length > 0) {
        responseText = getRandomPhrase(IA_PERSONALITY.responses.verbo_base_detectado)
                       .replace('{verbo}', `${analysis.verbosBaseDetectados[0].palavra}`);
        return `${moodIntro} ${responseText}`;
    }

    if (analysis.outrosTermosNaoCategorizados.length > 0) {
        const principalTermo = analysis.outrosTermosNaoCategorizados[0].palavra;
        responseText = getRandomPhrase(IA_PERSONALITY.responses.nao_categorizado)
                       .replace('{principalTermo}', `${principalTermo}`);
        return `${moodIntro} ${responseText}`;
    }
    
    // Fallback final se nenhuma intenção ou tipo específico foi acionado
    return `${moodIntro} ${getRandomPhrase(IA_PERSONALITY.responses.default_fallback)}`;
}

// Gerenciamento de Histórico de Conversa
function addToConversationHistory(analysis) {
    if (analysis.intent) {
        CONVERSATION_HISTORY.intents.unshift(analysis.intent);
        if (CONVERSATION_HISTORY.intents.length > CONVERSATION_HISTORY.MAX_HISTORY_LENGTH) {
            CONVERSATION_HISTORY.intents.pop();
        }
    }
    const relevantKeywords = [];
    if (analysis.mainSubject && analysis.mainSubject.length > 2) relevantKeywords.push(analysis.mainSubject);
    if (analysis.acaoPotencial && analysis.acaoPotencial.length > 2) relevantKeywords.push(analysis.acaoPotencial);
    analysis.numeros.forEach(num => relevantKeywords.push(num.palavra));
    analysis.coresDetectadas.forEach(color => relevantKeywords.push(color.palavra));

    if (relevantKeywords.length > 0) {
        CONVERSATION_HISTORY.keywords.unshift(...relevantKeywords.filter(k => !CONVERSATION_HISTORY.keywords.includes(k)));
        if (CONVERSATION_HISTORY.keywords.length > CONVERSATION_HISTORY.MAX_HISTORY_LENGTH * 2) {
            CONVERSATION_HISTORY.keywords.splice(CONVERSATION_HISTORY.MAX_HISTORY_LENGTH * 2); 
        }
    }
}

// Funções de Eventos

function handleSendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessageToChat(message, 'user');
    userInput.value = '';

    const tokens = tokenize(message);
    const preprocessedTokens = preprocessTokens(tokens);
    const analysisResult = analyzeTokens(preprocessedTokens, message, tokens); // Passe tokens originais aqui

    addToConversationHistory(analysisResult); 

    const iaResponse = generateResponse(analysisResult); 

    addMessageToChat(iaResponse, 'ia');
}

function handleClearHistory() {
    if (confirm("Tem certeza que deseja apagar todo o histórico de conversas?")) {
        chatWindow.innerHTML = '';
        CONVERSATION_HISTORY.intents = [];
        CONVERSATION_HISTORY.keywords = [];
        addMessageToChat("O histórico da conversa foi limpo.", "ia");
    }
}

// Event Listeners
sendMessageBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSendMessage();
    }
});
clearHistoryBtn.addEventListener('click', handleClearHistory);

chatWindow.addEventListener('scroll', () => {
    const isScrollable = chatWindow.scrollHeight > chatWindow.clientHeight;
    const isAtBottom = chatWindow.scrollTop + chatWindow.clientHeight >= chatWindow.scrollHeight - 50; 

    if (isScrollable && !isAtBottom) {
        scrollToBottomBtn.classList.add('show');
    } else {
        scrollToBottomBtn.classList.remove('show');
    }
});

scrollToBottomBtn.addEventListener('click', () => {
    chatWindow.scrollTo({
        top: chatWindow.scrollHeight,
        behavior: 'smooth'
    });
});


// Mensagem de boas-vindas inicial da IA
addMessageToChat(`Olá! Eu sou ${IA_PERSONALITY.name}, sua IA Generativa. Diga algo para começarmos!`, "ia");


// Exposição Global das Constantes (para depuração no console)
if (typeof CONJUGACOES_VERBAIS_DATA !== 'undefined') window.CONJUGACOES_VERBAIS_DATA = CONJUGACOES_VERBAIS_DATA;
if (typeof listaVerbosData !== 'undefined') window.listaVerbosData = listaVerbosData;
if (typeof dicionarioPortuguesData !== 'undefined') window.dicionarioPortuguesData = dicionarioPortuguesData;
if (typeof SIGNIFICADOS_PALAVRAS_DATA !== 'undefined') window.SIGNIFICADOS_PALAVRAS_DATA = SIGNIFICADOS_PALAVRAS_DATA;
if (typeof NumeroExtenso !== 'undefined') window.NumeroExtenso = NumeroExtenso;
if (typeof STOP_WORDS_PT_BR !== 'undefined') window.STOP_WORDS_PT_BR = STOP_WORDS_PT_BR;
if (typeof ANTONIMOS_DATA !== 'undefined') window.ANTONIMOS_DATA = ANTONIMOS_DATA;
if (typeof MAPA_CONTRACOES !== 'undefined') window.MAPA_CONTRACOES = MAPA_CONTRACOES;
if (typeof EMOJI_MAP !== 'undefined') window.EMOJI_MAP = EMOJI_MAP;
if (typeof SENTIMENTO_DATA !== 'undefined') window.SENTIMENTO_DATA = SENTIMENTO_DATA;
if (typeof CORES_DATA !== 'undefined') window.CORES_DATA = CORES_DATA;
if (typeof FUNCOES_OBJETOS_DATA !== 'undefined') window.FUNCOES_OBJETOS_DATA = FUNCOES_OBJETOS_DATA;
window.KNOWLEDGE_DB = KNOWLEDGE_DB;
window.IA_PERSONALITY = IA_PERSONALITY; 
window.CONVERSATION_HISTORY = CONVERSATION_HISTORY;