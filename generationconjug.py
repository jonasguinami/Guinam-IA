# generate_conjugations.py

import csv
import json

def generate_conjugations_js(csv_filepath, output_js_filepath):
    conjugations_data = {}

    try:
        with open(csv_filepath, 'r', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile, delimiter=';') # Usando csv.reader para controle manual
            
            # --- Leitura das Linhas de Cabeçalho ---
            main_header_row = [h.strip() for h in next(reader)] # Primeira linha: "Presente", "Pretérito Perfeito", etc.
            pronoun_header_row = [p.strip() for p in next(reader)] # Segunda linha: "eu", "tu", "você", etc.

            # --- Mapeamento Dinâmico de Colunas e Tempos Verbais ---
            # Vamos criar um mapa de blocos de conjugação com seus modos, tempos e pronomes
            # Ex: {'presente_indicativo': {'start_col': 4, 'pronouns': ['eu', 'tu', 'ele', ...]}, ...}
            
            conjugation_col_map = [] # Lista de (start_col, mode_name, tense_name, num_pronouns_in_block)

            current_mode = ""
            current_tense = ""
            
            # Identifica os blocos de conjugação da primeira linha de cabeçalho
            # E assume que cada bloco tem 6 pronomes (eu, tu, ele, nós, vós, eles) para Indicativo/Subjuntivo
            # E 5 pronomes (tu, você, nós, vós, vocês) para Imperativo.
            
            # Posições conhecidas de colunas especiais
            gerundio_col_index = -2 # Penúltima coluna
            participio_col_index = -1 # Última coluna
            
            # Mapeamento do seu CSV
            # Os tempos verbais são: Presente, Pretérito Perfeito, Pretérito Imperfeito, Pretérito Mais-que-perfeito, Futuro do Presente, Futuro do Pretérito
            # Subjuntivo: Presente, Pretérito Imperfeito, Futuro
            # Infinitivo Pessoal, Imperativo Afirmativo, Imperativo Negativo
            
            # HARDCODED: Mapeamento de modos e tempos com seus respectivos nomes e se são 'que_', 'se_', 'quando_'
            # Baseado na primeira linha de cabeçalho e na ordem do seu CSV.
            # E quantos pronomes cada bloco tem (geralmente 6 para indicativo/subjuntivo, 5 para imperativo)
            
            # [start_col_index, modo_interno, tempo_interno, pronomes_para_esse_bloco (lista)]
            column_parsing_structure = []
            
            # Indicativo (6 pronomes por tempo)
            column_parsing_structure.append([4, 'indicativo', 'presente', ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']])
            column_parsing_structure.append([10, 'indicativo', 'pret_perfeito', ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']])
            column_parsing_structure.append([16, 'indicativo', 'pret_imperfeito', ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']])
            column_parsing_structure.append([22, 'indicativo', 'pret_mais_que_perfeito', ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']])
            column_parsing_structure.append([28, 'indicativo', 'fut_presente', ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']])
            
            # Subjuntivo (6 pronomes por tempo, mas com prefixos 'que_', 'se_', 'quando_')
            column_parsing_structure.append([34, 'subjuntivo', 'presente', ['que_eu', 'que_tu', 'que_ele', 'que_nós', 'que_vós', 'que_eles']])
            column_parsing_structure.append([40, 'subjuntivo', 'pret_imperfeito', ['se_eu', 'se_tu', 'se_ele', 'se_nós', 'se_vós', 'se_eles']])
            column_parsing_structure.append([46, 'subjuntivo', 'futuro', ['quando_eu', 'quando_tu', 'quando_ele', 'quando_nós', 'quando_vós', 'quando_eles']])
            
            # Infinitivo Pessoal (6 pronomes)
            column_parsing_structure.append([52, 'infinitivo', 'pessoal', ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']])

            # Futuro do Pretérito (6 pronomes)
            column_parsing_structure.append([58, 'indicativo', 'fut_preterito', ['eu', 'tu', 'ele', 'nós', 'vós', 'eles']]) # Assumindo essa posição

            # Imperativo (5 pronomes no seu CSV, mas na ordem 'tu;ele;nós;vós;eles' para Imperativo Afirmativo)
            # Para 'ser', Imperativo Afirmativo: sê;seja;sejamos;sede;sejam (tu, você, nós, vós, vocês)
            # No seu CSV o pronome 'ele' está no cabeçalho. Vamos usar os pronomes padrões e assumir a ordem correta dos dados
            column_parsing_structure.append([64, 'imperativo', 'afirmativo', ['tu', 'você', 'nós', 'vós', 'vocês']])
            column_parsing_structure.append([70, 'imperativo', 'negativo', ['tu', 'você', 'nós', 'vós', 'vocês']]) # Assumindo a posição

            # Gerúndio e Particípio (índices já definidos como -2, -1)
            
            # --- Processa as linhas de dados ---
            # A partir da 3ª linha do CSV, que é a linha de dados reais (índice 2)
            for row_num, row_data in enumerate(reader, start=2): # Começa a contar do 2 (0-indexed)
                if not row_data or len(row_data) < 70: # Verifica se a linha tem colunas suficientes
                    # print(f"Atenção: Linha {row_num + 1} ignorada (dados insuficientes ou linha vazia).")
                    continue

                verb_infinitive = row_data[0].strip().lower() # Verbo na primeira coluna

                if not verb_infinitive:
                    # print(f"Atenção: Linha {row_num + 1} ignorada (verbo infinitivo ausente na coluna 0).")
                    continue
                
                # Inicializa a estrutura para o verbo
                if verb_infinitive not in conjugations_data:
                    conjugations_data[verb_infinitive] = {}

                # Adiciona gerúndio e particípio
                if gerundio_col_index < len(row_data) and row_data[gerundio_col_index].strip():
                    conjugations_data[verb_infinitive]['gerundio'] = row_data[gerundio_col_index].strip().lower()
                if participio_col_index < len(row_data) and len(row_data) > (len(row_data) + participio_col_index): # check bounds before access
                    conjugations_data[verb_infinitive]['participio'] = row_data[participio_col_index].strip().lower()
                
                # Processa os blocos de conjugação
                for block_config in column_parsing_structure:
                    start_col, mode, tense, pronouns_list = block_config
                    
                    if (start_col + len(pronouns_list)) > len(row_data):
                        # print(f"Atenção: Linha {row_num + 1} - Dados insuficientes para {mode} {tense} de '{verb_infinitive}'.")
                        continue # Pular este bloco se a linha não tiver todas as colunas

                    # Cria a estrutura de modo e tempo se não existir
                    if mode not in conjugations_data[verb_infinitive]:
                        conjugations_data[verb_infinitive][mode] = {}
                    if tense not in conjugations_data[verb_infinitive][mode]:
                        conjugations_data[verb_infinitive][mode][tense] = {}
                    
                    # Popula as conjugações para as pessoas
                    for i, pron_key in enumerate(pronouns_list):
                        conjugation_value = row_data[start_col + i].strip().lower()
                        if conjugation_value: # Adiciona apenas se não estiver vazio
                            conjugations_data[verb_infinitive][mode][tense][pron_key] = conjugation_value
        
        print(f"CSV lido com sucesso. Total de {len(conjugations_data)} verbos processados.")

    except FileNotFoundError:
        print(f"Erro: Arquivo CSV '{csv_filepath}' não encontrado. Verifique o caminho.")
        return
    except Exception as e:
        print(f"Erro ao processar o CSV: {e}")
        # row_num + 1 é a linha do CSV onde o erro pode ter ocorrido.
        # row_data é o conteúdo da linha.
        print(f"Problema na linha do CSV: {row_num + 1} - Dados da linha (parciais para depuração): {row_data[0:min(len(row_data), 10)]} ...") 
        return

    # Salva o conteúdo JS
    js_content = f"const CONJUGACOES_VERBAIS_DATA = {json.dumps(conjugations_data, indent=2, ensure_ascii=False)};"
    
    try:
        with open(output_js_filepath, 'w', encoding='utf-8') as js_file:
            js_file.write(js_content)
        print(f"Arquivo {output_js_filepath} gerado com sucesso com {len(conjugations_data)} verbos!")
    except Exception as e:
        print(f"Erro ao escrever o arquivo JS: {e}")

# --- EXEMPLO DE USO ---
# Substitua 'seu_arquivo_de_conjugacoes.csv' pelo nome real do seu arquivo CSV
# E 'knowledge/conjugacoes.js' pelo caminho de saída desejado
# Lembre-se de que o CSV deve estar na mesma pasta ou o caminho deve ser absoluto.
generate_conjugations_js('conjugacoes_exemplo.csv', 'conjugação.js')