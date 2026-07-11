export interface Patologia {
  anomalia: string;
  sintoma: string;
  causa: string;
}

export interface Manutencao {
  atividade: string;
  periodicidade: string;
  recomendacao: string;
  tech_diagnostics?: string;
}

export interface Conflito {
  conflito?: string;
  prevencao?: string;
  mitigacao?: string;
  clash?: string;
  preventivo?: string;
}

export interface CalcData {
  maxVao: number;
  divisorViga: number;
  multPilarRes: number;
  multPilarCom: number;
  hasCalculator: boolean;
}

export interface Tipologia {
  id: string;
  titulo: string;
  icon: string;
  custoObra: string;
  custoManutencao: string;
  definicao: string;
  componentes: string;
  aplicacoes: string;
  vantagens: string;
  desvantagens: string;
  viabilidade: string;
  patologias: Patologia[];
  diagnostico: string;
  tecnologias?: string[];
  manutencao: Manutencao[];
  predimensionamentoText: string;
  calcData?: CalcData;
  conflitos: Conflito[];
  normas: string[];
}

export interface Sistema {
  categoria: string;
  icon: string;
  intro: string;
  tipologias: Tipologia[];
}

export const normasTransversais = [
  { codigo: 'ABNT NBR 16747', titulo: 'Inspeção predial — Diretrizes, conceitos, terminologia e procedimento', aplicacao: 'Metodologia base para toda a inspeção predial, classificação de risco e emissão do laudo técnico (RTIPA).' },
  { codigo: 'ABNT NBR 5674', titulo: 'Manutenção de edificações — Requisitos para o sistema de gestão de manutenção', aplicacao: 'Auditoria do plano de manutenção preventiva e estruturação de cronogramas por sistema.' },
  { codigo: 'ABNT NBR 14037', titulo: 'Diretrizes para elaboração de manuais de uso, operação e manutenção das edificações', aplicacao: 'Verificação do manual de uso entregue pela construtora contendo limites de carga e conservação.' },
  { codigo: 'ABNT NBR 16280', titulo: 'Reforma em edificações — Sistema de gestão de reformas — Requisitos', aplicacao: 'Auditoria de obras particulares internas para verificar integridade estrutural e hidráulica.' },
  { codigo: 'ABNT NBR 15575-1', titulo: 'Edificações habitacionais — Desempenho — Parte 1: Requisitos gerais', aplicacao: 'Parâmetros transversais de estanqueidade, conforto e Vida Útil de Projeto (VUP).' },
  { codigo: 'ABNT NBR 17170', titulo: 'Edificações — Garantias — Prazos recomendados e diretrizes', aplicacao: 'Determinação de prazos legais e recomendações de garantia para subsidiar laudos técnicos.' },
];

// Existing detailed typologies
const detailedTypologies: Record<string, Partial<Tipologia>> = {
  "concreto-armado": {
    id: "concreto-armado",
    titulo: "Concreto Armado in loco",
    icon: "🏛️",
    custoObra: "R$ 1.200 a 1.800",
    custoManutencao: "R$ 6 a 12",
    definicao: "Elemento de suporte estrutural primário moldado no canteiro através do preenchimento de fôrmas com concreto fluido em torno de armadura de aço previamente montada. Funciona pela aderência mútua: o concreto absorve a compressão e o aço a tração e o cisalhamento.",
    componentes: "Fôrmas e escoras (madeira/metal/plástico), Armaduras de Aço (CA-50 e CA-60), Concreto estrutural usinado (brita, areia, cimento e aditivos com Fck de projeto).",
    aplicacoes: "Edificações residenciais e comerciais verticais, cortinas de subsolo, fundações indiretas e obras de arte de engenharia.",
    vantagens: "Extrema versatilidade de formas arquitetônicas (permite balanços e curvas). Excelente inércia térmica e comportamento sob ação do fogo. Mão de obra farta e materiais acessíveis localmente.",
    desvantagens: "Peso próprio elevadíssimo (encarece as fundações). Processo lento, dependente de cura úmida (28 dias) e gerador de resíduos de fôrmas no canteiro.",
    viabilidade: "Custo inicial atrelado à oscilação das commodities (aço e cimento). Exige espaço de canteiro para central de armação, formas e manobra de caminhões-betoneira.",
    patologias: [
      {
        anomalia: "Corrosão de Armaduras (Spalling)",
        sintoma: "Manchas de ferrugem avermelhadas, fissuras paralelas aos ferros e destacamento da capa de concreto de cobrimento.",
        causa: "Carbonatação do concreto (queda do pH) ou infiltração de cloretos (maresia) associada a cobrimento insuficiente de concreto."
      },
      {
        anomalia: "Fissuras de Flexão e Cisalhamento",
        sintoma: "Trincas verticais na parte inferior central de vigas/lajes, ou fissuras inclinadas (45º) perto dos pilares.",
        causa: "Sobrecarga de uso excessiva não prevista, retirada precoce de escoras ou subdimensionamento da ferragem."
      },
      {
        anomalia: "Bicheiras (Segregação)",
        sintoma: "Ninhos de britas expostas sem argamassa de cimento ao redor, visíveis logo após a desforma.",
        causa: "Falta de vibração adequada no lançamento ou queda livre do concreto de alturas superiores a 2 metros."
      }
    ],
    diagnostico: "Uso de Pacometria para localizar a posição tridimensional das armaduras; Esclerometria para aferir a dureza superficial do concreto; e Termografia infravermelha para capturar vazamentos e percolações internas.",
    tecnologias: ["BIM 4D/5D para planejamento fino de concretagens", "Sensores IoT de maturidade química inseridos na fôrma", "Drones térmicos para fachadas cegas"],
    manutencao: [
      { atividade: "Inspeção visual detalhada de fissuras, manchas e infiltrações", periodicidade: "Anual", recomendacao: "Utilizar fissurômetros analógicos ou digitais para monitorar se a trinca está ativa (movendo-se) ou estável." },
      { atividade: "Recomposição de juntas de dilatação estruturais e selantes", periodicidade: "A cada 3 anos", recomendacao: "Garantir estanqueidade nas juntas de garagens de subsolo." },
      { atividade: "Extração de testemunhos e testes químicos de carbonatação", periodicidade: "A cada 5-10 anos", recomendacao: "Em prédios agressivos (maresia severa) para planejar intervenções antes da oxidação do aço." }
    ],
    predimensionamentoText: "A altura da viga ($h$) é estimada dividindo o vão livre ($L$) por 10 a 12. A espessura da laje maciça ($h$) deve ser de pelo menos $L/40$. A seção de concreto do pilar ($Ac$) mínima é de 360 cm² (ex: 14x26cm ou superior) para evitar desaprumos e instabilidade.",
    calcData: {
      maxVao: 7,
      divisorViga: 10,
      multPilarRes: 12,
      multPilarCom: 15,
      hasCalculator: true
    },
    conflitos: [
      {
        conflito: "Dutos de Ar-Condicionado (HVAC) vs. Vigas de Concreto",
        prevencao: "Furos in vigas devem nascer previstos em projeto, alocados no eixo neutro central (zona de menor tensão) e limitados a 1/3 da altura total da viga.",
        mitigacao: "Se não previsto, desvie o duto por baixo da viga sacrificando pé-direito e esconda com sanca de gesso. É proibido cortar estribos de vigas prontas."
      },
      {
        conflito: "Instalações de Esgoto embutidas em Pilares",
        prevencao: "Nunca passar tubos de queda por dentro de pilares estruturais. Prever shafts (paredes falsas visitáveis) ao lado do pilar.",
        mitigacao: "Construir uma pilastra falsa em alvenaria ou drywall ao redor do cano que precisará descer aparente colado ao pilar estrutural."
      }
    ],
    normas: ["ABNT NBR 6118 (Projeto)", "ABNT NBR 14931 (Execução)", "ABNT NBR 15575-2 (Desempenho Estrutural)"]
  },
  "concreto-protendido": {
    id: "concreto-protendido",
    titulo: "Concreto protendido",
    icon: "🔗",
    custoObra: "R$ 1.500 a 2.100",
    custoManutencao: "R$ 8 a 15",
    definicao: "Introdução calculada de tensões de compressão no concreto antes da aplicação de cargas, através do estiramento mecânico (tração) de cabos de aço de altíssima resistência (cordoalhas), mitigando a flexão e a fissuração.",
    componentes: "Cabos/Cordoalhas de aço engraxados, Bainhas plásticas, Ancoragens (cunhas metálicas), Concreto de alta resistência, Macacos Hidráulicos de protensão.",
    aplicacoes: "Lajes planas corporativas ( Open Space ), lajes nervuradas de garagens de subsolo, pontes, viadutos e pisos industriais de grandes cargas.",
    vantagens: "Vence vãos livres monumentais (10m a 14m) sem pilares intermediários. Reduz a espessura total das lajes, economizando altura do prédio e material de fachadas.",
    desvantagens: "Exige equipe altamente especializada e equipamentos de precisão. Risco severo em reformas cegas: perfurar um cabo sob tensionamento pode liberar energia letal e causar colapsos locais.",
    viabilidade: "Possui custo inicial elevado de insumos, mas compensa-se pelo ganho de área útil e eliminação de vigas penduradas (teto liso de gesso).",
    patologias: [
      {
        anomalia: "Ruptura Súbita de Cordoalha",
        sintoma: "Surgimento repentino de flechas acentuadas no meio da laje e estrondos metálicos de alta frequência no prédio.",
        causa: "Perfuração mecânica acidental em reformas pós-obra ou corrosão extrema de cabos devido a infiltração de água nas ancoragens."
      },
      {
        anomalia: "Falha Local de Ancoragem (Borda)",
        sintoma: "Fissuras intensas do concreto em formato de leque nas faces externas da laje estrutural (periferia do prédio).",
        causa: "Protensão exagerada aplicada ao concreto ainda fresco ou falta de estribos helicoidais de reforço atrás da cunha."
      }
    ],
    diagnostico: "Mapeamento tridimensional com equipamento de Georadar (GPR) para marcar a posição exata da curvatura dos cabos antes de reformas.",
    tecnologias: ["GPR - Georadar", "Software computacional de análise de perdas de protensão", "Macacos com telemetria de torque digital"],
    manutencao: [
      { atividade: "Nivelamento topográfico de flechas centrais em lajes sem vigas", periodicidade: "Anual", recomendacao: "Detectar movimentações lentas por fluência e deformação excessiva." },
      { atividade: "Inspeção e selagem impermeável dos nichos de ancoragem das cordoalhas", periodicidade: "Bianual", recomendacao: "Impedir o acesso de água da chuva que oxida as cordoalhas de borda." }
    ],
    predimensionamentoText: "Para lajes planas maciças protendidas, a espessura ideal de projeto é estimada dividindo o vão livre por 40 a 45. Para lajes nervuradas protendidas, utilize o vão dividido por 35 a 38. Muito mais fino que concreto comum.",
    calcData: {
      maxVao: 14,
      divisorViga: 35,
      multPilarRes: 10,
      multPilarCom: 13,
      hasCalculator: true
    },
    conflitos: [
      {
        conflito: "Instalação de Divisórias e Gesso vs. Cordoalhas Ativas",
        prevencao: "Prever shafts e passagens de dutos horizontais na fase de forma e armação antes de concretar a laje.",
        mitigacao: "O instalador deve rastrear a laje com Georadar antes de fixar buchas metálicas no teto. É proibido usar parafusos com comprimento superior a 3 cm sem mapeamento."
      }
    ],
    normas: ["ABNT NBR 6118 (Estruturas)", "ABNT NBR 7483 (Cordoalhas de Aço Especificação)"]
  },
  "alvenaria-estrutural": {
    id: "alvenaria-estrutural",
    titulo: "Alvenaria estrutural",
    icon: "🧱",
    custoObra: "R$ 800 a 1.100",
    custoManutencao: "R$ 4 a 8",
    definicao: "Sistema construtivo racionalizado onde as próprias paredes da edificação, formadas por blocos vazados modulares sobrepostos, suportam as cargas verticais e as lajes, eliminando pilares e vigas.",
    componentes: "Blocos estruturais de concreto ou cerâmicos (MPa específico), Argamassa de assentamento, Graute (microconcreto fluido para enchimento de furos), Ferragem passiva vertical/horizontal.",
    aplicacoes: "Edifícios residenciais padronizados de até 20 pavimentos (Habitação Popular), condomínios horizontais e sobrados repetitivos.",
    vantagens: "Elimina fôrmas de madeira, carpintaria e desperdício de ferro. Linha de produção rápida por repetição industrializada. Economiza até 30% do custo bruto estrutural.",
    desvantagens: "Arquitetura engessada: impede qualquer reforma interna futura de derrubada de paredes (a parede é o pilar). Dificulta fachadas com panos inteiros de vidro ou portas gigantes.",
    viabilidade: "Altamente viável em escala e repetição. Exige coordenação rigorosa de modulação em planta (medidas múltiplas do tamanho do bloco).",
    patologias: [
      {
        anomalia: "Fissuração Dinâmica em 'Escadinha'",
        sintoma: "Trincas que seguem o formato dos degraus das juntas de assentamento entre os blocos.",
        causa: "Recalques leves da fundação debaixo do prédio, dilatação térmica severa de lajes empurrando a parede, ou falta de argamassa nas juntas."
      },
      {
        anomalia: "Esmagamento e Trincas Verticais de Bloco",
        sintoma: "Rachaduras verticais cortando os tijolos de cima a baixo, geralmente concentradas sob apoios de lajes.",
        causa: "Uso de blocos de baixa resistência (MPa inferior ao calculado), falta de grauteamento em pontos de apoio de vigas de transição ou sobrecargas não previstas."
      }
    ],
    diagnostico: "Termografia infravermelha para captar se o graute estrutural vertical foi devidamente preenchido ou se há furos ocos por erro do pedreiro.",
    tecnologias: ["BIM modulação milimétrica de blocos", "Termografia de varredura", "Ensaios de compressão de prismas"],
    manutencao: [
      { atividade: "Inspeção de fissuras de retração e dilatação térmica", periodicidade: "Anual", recomendacao: "Se surgirem fissuras, instalar fissurômetros de precisão para monitorar movimentações sazonais." },
      { atividade: "Monitoramento e controle de reformas internas de moradores", periodicidade: "Permanente", recomendacao: "É dever do síndico barrar demolições de paredes ou cortes horizontais sem ART de engenheiro calculista." }
    ],
    predimensionamentoText: "A planta deve ser 100% modulada (medidas com múltiplos do tamanho do bloco, ex: 15cm ou 20cm). Os vãos livres horizontais não devem superar 4,5 metros para manter a estabilidade econômica das lajes apoiadas.",
    calcData: {
      maxVao: 5,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Cortes horizontais de Makita para passar tubulações",
        prevencao: "As instalações elétricas e hidráulicas devem descer embutidas pelos furos verticais ocos dos blocos durante a elevação da parede.",
        mitigacao: "O corte horizontal destrói a parede estrutural. Se feito, escore a laje superior, preencha o rasgo com graute estrutural de alta aderência e use tela metálica no reboco. Desvie fios por rodapés ou gesso."
      }
    ],
    normas: ["ABNT NBR 16868-1 (Projeto Alvenaria)", "ABNT NBR 16868-2 (Execução e Controle)"]
  },
  "estrutura-metalica": {
    id: "estrutura-metalica",
    titulo: "Estrutura metálica (Aço)",
    icon: "🏗️",
    custoObra: "R$ 1.800 a 2.600",
    custoManutencao: "R$ 12 a 18",
    definicao: "Esqueleto estrutural autoportante formado por perfis de aço laminado ou soldado de alto limite de escoamento. As conexões são pré-fabricadas e aparafusadas ou soldadas no local de forma limpa e industrializada.",
    componentes: "Perfis metálicos laminados ou soldados (Formatos I, H, W, U), Parafusos estruturais de alta resistência (ASTM A325/A490), Chapas de reforço (Gussets), Contraventamentos, Pintura intumescente antichamas.",
    aplicacoes: "Galpões industriais de grandes vãos, edifícios corporativos de múltiplos andares (arranha-céus), retrofits rápidos de edifícios antigos e mezaninos.",
    vantagens: "Construção seca, sem resíduos e com velocidade de montagem imbatível. Peças delgadas que liberam espaço arquitetônico. Alivia o peso final nas fundações.",
    desvantagens: "Altíssimo custo do insumo bruto do aço. Perda severa de resistência mecânica sob altas temperaturas em incêndios (> 500ºC). Exige pintura contínua contra corrosão atmosférica.",
    viabilidade: "Altamente viável em empreendimentos corporativos de grande porte onde o retorno do investimento (ROI) é adiantado devido à rapidez de inauguração da obra.",
    patologias: [
      {
        anomalia: "Corrosão e Oxidação Ativa",
        sintoma: "Estufamento e descascamento da tinta de acabamento, seguido do aparecimento de placas marrons de ferrugem e perda de espessura do perfil.",
        causa: "Falha na especificação da tinta protetora, arranhões de montagem não retocados ou infiltração de água condensada em cantos fechados dos perfis."
      },
      {
        anomalia: "Flambagem Local e Instabilidade",
        sintoma: "Empenamento lateral ou deformação por torção de pilares e vigas metálicas sob carga.",
        causa: "Omissão de travamentos laterais (contraventamentos em X), subdimensionamento de perfis ou cargas verticais excessivas."
      }
    ],
    diagnostico: "Medidores digitais de espessura de tinta e aço por ultrassom; Ensaios de Líquido Penetrante (LP) para verificar microtrincas nas soldas estruturais.",
    tecnologias: ["BIM LOD 400 (Tekla) com integração CNC direto com a fábrica", "Drones para monitoramento de fachadas", "Pinturas intumescentes nanoestruturadas"],
    manutencao: [
      { atividade: "Inspeção visual detalhada de pontos de ferrugem e descascamento", periodicidade: "Anual", recomendacao: "Se houver oxidação, lixar o aço até o branco metálico e aplicar primer de zinco e esmalte de poliuretano na mesma semana." },
      { atividade: "Inspeção e reaperto de parafusos das ligações estruturais", periodicidade: "A cada 3 anos", recomendacao: "Utilizar chaves de torque calibradas (torquímetros) para garantir a integridade estrutural contra trepidações." }
    ],
    predimensionamentoText: "A altura das vigas metálicas de andares ($d$) é estimada dividindo o vão livre ($L$) por 15 a 20. Para coberturas leves de galpões, utilize o vão dividido por 20 a 25. Os pilares de formato H oferecem seções compactas e podem sumir em drywall.",
    calcData: {
      maxVao: 15,
      divisorViga: 18,
      multPilarRes: 3,
      multPilarCom: 4,
      hasCalculator: true
    },
    conflitos: [
      {
        conflito: "Transposição de Dutos de Ar Condicionado vs. Vigas de Aço",
        prevencao: "Projetar vigas casteladas ou alveolares (vigas com furos hexagonais ou circulares embutidos de fábrica) para passagem de dutos.",
        mitigacao: "Nunca fure a viga de aço no canteiro com maçarico de oxicorte. A furação exige soldagem de chapas enrijecedoras laterais calculadas para repor a resistência mecânica."
      }
    ],
    normas: ["ABNT NBR 8800 (Projeto de Estruturas de Aço)", "ABNT NBR 14762 (Perfis Dobrados a Frio)", "ABNT NBR 14323 (Estruturas Metálicas em Situação de Incêndio)"]
  },
  "sapata-isolada": {
    id: "sapata-isolada",
    titulo: "Sapatas Isoladas e Corridas",
    icon: "🔲",
    custoObra: "R$ 300 a 600",
    custoManutencao: "R$ 0",
    definicao: "Fundações diretas superficiais (rasas) executadas em concreto armado. A Sapata Isolada apoia um único pilar central, enquanto a Sapata Corrida apoia cargas lineares (paredes portantes), transmitindo as pressões ao solo pela base alargada.",
    componentes: "Concreto estrutural, Armadura inferior de aço (gaiola/esteira), Concreto magro de lastro (mínimo 5 cm para isolar a terra), Solo firme compactado.",
    aplicacoes: "Edificações de pequeno a médio porte (casas, galpões leves) assentadas sobre solos firmes de alta capacidade de carga nas camadas superficiais.",
    vantagens: "Custo de execução baixíssimo. Execução simples que dispensa guindastes e bate-estacas pesados. Permite inspeção visual direta do solo de apoio antes da concretagem.",
    desvantagens: "Limitada a solos firmes e cargas moderadas. Altamente suscetível a erosões locais e amolecimento por vazamentos hidráulicos subterrâneos nas vizinhanças.",
    viabilidade: "Excelente custo-benefício para obras residenciais de poucos andares com laudo de sondagem SPT positivo nas primeiras camadas.",
    patologias: [
      {
        anomalia: "Recalque Diferencial de Fundação",
        sintoma: "Surgimento de trincas inclinadas (45º) em paredes de vedação, pisos rachados e portas que começam a agarrar no batente.",
        causa: "Solo heterogêneo sob o prédio, vazamento crônico de rede de esgoto lavando a areia sob a sapata, ou fundação mal calculada."
      },
      {
        anomalia: "Giro da Sapata (Excentricidade)",
        sintoma: "Inclinação visível do pilar desde a base, com fissuras de esmagamento na junta pilar-sapata.",
        causa: "Locação errada do pilar fora do centro de gravidade da sapata, gerando momentos fletores pesados não previstos."
      }
    ],
    diagnostico: "Nivelamento topográfico de alta precisão ao longo dos anos para verificar se o prédio parou de assentar; Sondagem SPT complementar ao lado da patologia.",
    tecnologias: ["Inclinômetros de fibra óptica nos pilares de subsolo", "Sondagem SPT-T de precisão"],
    manutencao: [
      { atividade: "Monitoramento de trincas e desnível de pisos do térreo", periodicidade: "Anual", recomendacao: "Se as trincas continuarem abrindo após o término da obra, chamar equipe de reforço estrutural." },
      { atividade: "Inspeção contra vazamentos de canos enterrados próximos a sapatas", periodicidade: "Bianual", recomendacao: "Prevenir que a água percole e amoleça o solo firme de apoio." }
    ],
    predimensionamentoText: "A área de base da sapata ($A$) é calculada dividindo a carga do pilar ($P$) pela tensão admissível do solo (obtida na sondagem SPT). Nunca inicie a escavação de sapatas sem antes obter a sondagem de solo SPT.",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Tubulações de esgoto cruzando cavas de Sapatas",
        prevencao: "As redes hidráulicas enterradas devem trafegar paralelas e afastadas das sapatas. Vazamentos de canos de água enterrados dissolvem e amolecem o solo de fundação.",
        mitigacao: "Canos de PVC sob a fundação devem ser protegidos dentro de envelopes de concreto ou trocados por tubos de PEAD soldados de altíssima segurança."
      }
    ],
    normas: ["ABNT NBR 6122 (Fundações)", "ABNT NBR 8036 (Sondagem SPT)"]
  },
  "radier": {
    id: "radier",
    titulo: "Radier (Laje de Fundação)",
    icon: "🗺️",
    custoObra: "R$ 350 a 600",
    custoManutencao: "R$ 0",
    definicao: "Fundação direta rasa composta por uma laje contínua de concreto armado que abrange toda a projeção em planta da edificação, atuando como uma balsa rígida que distribui uniformemente todas as cargas estruturais no solo.",
    componentes: "Laje de concreto estrutural espessa, Malha de aço dupla (superior/inferior), Camada impermeável (lona plástica grossa antiumidade), Colchão de brita nivelado.",
    aplicacoes: "Casas térreas rápidas em loteamentos industriais, obras em Steel Frame, Alvenaria Estrutural ou solos arenosos homogêneos.",
    vantagens: "Nula chance de recalques diferenciais locais (o prédio se move como um bloco rígido único). Execução extremamente rápida: o contrapiso e a fundação nascem na mesma concretagem.",
    desvantagens: "Qualquer vazamento hidráulico subterrâneo exige quebrar a laje de fundação (destruindo a estrutura) para consertar. Não suporta terrenos em ladeiras íngremes sem arrimos prévios.",
    viabilidade: "Custo imbatível para residências unifamiliares em terrenos planos de areia ou solos firmes.",
    patologias: [
      {
        anomalia: "Fissuras de Retração e Contração Plástica",
        sintoma: "Microfissuras em formato de teia de aranha espalhadas por toda a superfície do piso do térreo nas primeiras semanas.",
        causa: "Cura deficiente do concreto (água evaporou muito rápido sob o sol) ou falta de lona plástica drenando a água de cura pro solo seco."
      },
      {
        anomalia: "Umidade Ascendente por Capilaridade",
        sintoma: "Manchas escuras de umidade na base dos rodapés de gesso, mofo crônico e descascamento da tinta das paredes.",
        causa: "Omissão da lona plástica grossa ou do aditivo impermeabilizante sob o Radier antes do lançamento do concreto estrutural."
      }
    ],
    diagnostico: "Ensaios de umidade por resistividade elétrica; Termografia infravermelha para achar tubos vazando por baixo da laje.",
    tecnologias: ["Aditivos cristalizantes de concreto de fábrica", "Câmeras de alta sensibilidade térmica"],
    manutencao: [
      { atividade: "Inspeção visual de trincas superficiais nas quinas das paredes", periodicidade: "Anual", recomendacao: "Selar trincas no piso com selante elástico de poliuretano (PU) para impedir o ingresso de umidade capilar." }
    ],
    predimensionamentoText: "A espessura de um Radier residencial varia de 12 cm a 15 cm. O radier deve ter uma 'viga de borda' (dente de concreto) adentrando pelo menos 30 cm no solo nas extremidades para evitar infiltrações perimetrais e fixar a estrutura.",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Esquecimento de tubulações sob o Radier",
        prevencao: "Em projeto 3D, marque a posição milimétrica de todas as esperas de canos (esgotos de pias, privadas e ralos) que passarão sob o Radier antes de concretar.",
        mitigacao: "Se o tubo ficou no lugar errado, é estritamente proibido quebrar o Radier estrutural com marretas. A única solução é elevar o piso do banheiro com contrapiso extra (box elevado) para passar o cano acima da fundação."
      }
    ],
    normas: ["ABNT NBR 6122 (Fundações)", "ABNT NBR 9575 (Impermeabilização Seleção)"]
  },
  "alvenaria-vedacao": {
    id: "alvenaria-vedacao",
    titulo: "Alvenaria de Vedação (Tijolos)",
    icon: "🧱",
    custoObra: "R$ 150 a 280",
    custoManutencao: "R$ 2 a 5",
    definicao: "Paredes construídas com blocos ou tijolos cerâmicos/de concreto assentados com argamassa. Não possuem função estrutural: sua única finalidade é isolar ambientes e fachadas.",
    componentes: "Blocos de argila ou cimento, Argamassa de cimento e areia, Chapisco de aderência, Reboco liso, Telas metálicas de amarração.",
    aplicacoes: "Fechamentos internos e externos de edifícios residenciais e comerciais de estrutura convencional.",
    vantagens: "Familiaridade cultural por toda a mão de obra. Ótima inércia térmica e isolamento acústico a ruídos aéreos. Permite chumbar armários pesados em qualquer lugar.",
    desvantagens: "Peso próprio elevado sobre vigas e lajes. Geração enorme de lixo por recortes no canteiro. Exige quebra de paredes com maquita para embutir fios, gerando retrabalho.",
    viabilidade: "Custo inicial baixo por m², mas gera perdas invisíveis na cadeia logística e limpeza da obra.",
    patologias: [
      {
        anomalia: "Trincas de Descolamento Pilar-Parede",
        sintoma: "Fissuras verticais contínuas bem na quina onde a parede de tijolo encosta na coluna de concreto.",
        causa: "Omissão de telas metálicas (ferro cabelo) ancorando os tijolos no pilar de concreto durante a elevação."
      },
      {
        anomalia: "Fissuras inclinadas em Janelas (45º)",
        sintoma: "Trincas que partem das quinas inferiores e superiores de esquadrias de portas e janelas.",
        causa: "Ausência de vergas e contravergas (pequenas vigas armadas de concreto) acima e abaixo dos vãos para distribuir esforços."
      }
    ],
    diagnostico: "Mapeamento visual e medição com fissurômetro; Termografia infravermelha para verificar se o construtor esqueceu de instalar a contraverga sob a janela.",
    tecnologias: ["Argamassas colantes poliméricas prontas", "Telas de fibra de vidro anti-fissuras"],
    manutencao: [
      { atividade: "Inspeção visual de fissuras em rebocos e texturas", periodicidade: "Anual", recomendacao: "Tratar fissuras antes que virem infiltrações ativas na fachada externa." }
    ],
    predimensionamentoText: "As paredes internas acabadas medem entre 14 cm e 15 cm de espessura (bloco de 9 cm + rebocos). Paredes externas de fachada medem 20 cm (bloco de 14 cm + rebocos) para comportar esquadrias e vedar a chuva.",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Cortes para canos de esgoto de 100mm",
        prevencao: "Desenhe trechos de parede mais grossa (bonecas de alvenaria) ou shafts de drywall onde as tubulações hidráulicas descerão.",
        mitigacao: "Se a parede foi cortada verticalmente de ponta a ponta na obra, ela perdeu estabilidade mecânica. Recomenda-se preencher com argamassa forte e instalar tela de aço no reboco antes de pintar."
      }
    ],
    normas: ["ABNT NBR 15270 (Blocos Cerâmicos)", "ABNT NBR 15575-4 (Vedações Desempenho)"]
  },
  "revestimento-ceramico-externo": {
    id: "revestimento-ceramico-externo",
    titulo: "Revestimento Cerâmico Externo (Pastilhas/Porcelanato)",
    icon: "🔳",
    custoObra: "R$ 180 a 350",
    custoManutencao: "R$ 10 a 25",
    definicao: "Camada de acabamento e estanqueidade de fachadas composta por placas cerâmicas, porcelanatos ou pastilhas coladas sobre o emboço curado por meio de argamassas colantes químicas de alta aderência.",
    componentes: "Emboço sarrafeado curado, Argamassa colante AC-III, Placas cerâmicas, Rejunte impermeável flexível, Juntas de dilatação em Poliuretano (PU).",
    aplicacoes: "Fachadas de edifícios residenciais verticais de múltiplos andares, piscinas suspensas e ambientes de maresia agressiva.",
    vantagens: "Incomparável durabilidade e facilidade de limpeza (baixa manutenção). Garante estanqueidade absoluta às fachadas externas contra batidas de chuvas com ventos.",
    desvantagens: "Extremo risco de desastre se mal assentado (placas caindo de 20 andares de altura). Retrabalho em fachadas antigas (recuperação) custa fortunas imensas e exige balancins.",
    viabilidade: "Altamente viável em edifícios residenciais de alto padrão pela valorização estética e redução das taxas de condomínio por repintura.",
    patologias: [
      {
        anomalia: "Desplacamento Cerâmico (Queda de Placas)",
        sintoma: "Som oco ao bater nas placas com martelo macio, placas estufando e caindo inteiras.",
        causa: "Ausência de dupla-colagem em placas grandes (>30x30cm), uso de argamassa AC-I ou AC-II barata, ou omissão das juntas de movimentação elástica."
      },
      {
        anomalia: "Eflorescência Salina",
        sintoma: "Rastros e crostas brancas escorrendo pelas juntas do rejunte da fachada, parecendo giz.",
        causa: "Infiltração de água da chuva que dissolveu o hidróxido de cálcio do cimento da parede e escorreu, cristalizando no rejunte."
      }
    ],
    diagnostico: "Teste de percussão em rapel (batendo pecinha por pecinha caçando som oco) e termografia com drones (áreas ocas retêm calor diferente).",
    tecnologias: ["Drones equipados com câmeras térmicas de alta definição", "Ensaios de arrancamento hidráulico por dinamômetro"],
    manutencao: [
      { atividade: "Mapeamento preventivo de som oco na fachada", periodicidade: "A cada 2 anos", recomendacao: "Realizar o teste de percussão por rapel para arrancar placas soltas antes que caiam e causem acidentes graves." },
      { atividade: "Limpeza com hidrojateamento de baixa pressão", periodicidade: "A cada 3 anos", recomendacao: "Remover fungos e poeira que degradam as juntas de rejuntamento." }
    ],
    predimensionamentoText: "É OBRIGATÓRIO prever Juntas de Movimentação (rasgos horizontais e verticais vedados com selante de PU elástico) a cada 3 metros em fachadas externas expostas ao sol. Evite assentamentos de juntas secas (sem espaçamento).",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Instalação de toldos, placas e ar-condicionado na cerâmica pronta",
        prevencao: "Furos de fixação na fachada devem ser previstos de fábrica ou chumbados diretamente no concreto estrutural profundo, nunca apoiados apenas na cerâmica oca.",
        mitigacao: "O técnico deve preencher o buraco do furo com injeção pesada de PU elástico antes de rosquear a bucha, impedindo que a chuva entre por trás do painel cerâmico."
      }
    ],
    normas: ["ABNT NBR 13755 (Execução Fachadas com Argamassa Colante)", "ABNT NBR 14081 (Argamassas Colantes Requisitos)"]
  },
  "agua-fria-quente": {
    id: "agua-fria-quente",
    titulo: "Abastecimento de Água Fria e Quente",
    icon: "🚿",
    custoObra: "R$ 90 a 160",
    custoManutencao: "R$ 2 a 5",
    definicao: "Rede de tubos e conexões responsável por elevar a água da rua, armazenar em reservatórios (inferiores e superiores) de forma estanque e distribuir sob pressão confortável fria/quente para todos os pontos de consumo.",
    componentes: "Tubos rígidos (PVC, PPR) ou flexíveis (PEX), Registros e misturadores, Castelos d'água e cisternas, Bombas de recalque, Válvulas Redutoras de Pressão (VRP), Boilers e aquecedores a gás.",
    aplicacoes: "Banheiros, cozinhas, áreas de serviço e vestiários de qualquer edificação habitável.",
    vantagens: "O uso de sistemas de PEX flexível permite 'dobrar' o cano pelos cantos, dispensando joelhos (emendas) e reduzindo brutalmente o risco de vazamentos ocultos.",
    desvantagens: "Instalação 100% oculta. Qualquer microvazamento de água exige quebrar revestimentos caros de porcelanato e refazer impermeabilizações.",
    viabilidade: "Materiais plásticos (PVC, PPR) têm custo viável. O maior custo financeiro ocorre na fase de reparação de vazamentos não detectados previamente.",
    patologias: [
      {
        anomalia: "Golpe de Aríete (Choque de Pressão)",
        sintoma: "Estrondos mecânicos e tremores violentos ouvidos nas paredes logo após fechar misturadores ou descargas.",
        causa: "Fechamento muito brusco de torneiras de alta pressão, gerando ondas de choque hidráulico que rompem joelhos no gesso."
      },
      {
        anomalia: "Vazamento em Conexões e Tubos",
        sintoma: "Manchas escuras de umidade na parede traseira, gotejamentos constantes no teto e contas de água duplicadas.",
        causa: "Falta de lixamento na solda química de PVC, ou furos acidentais causados por pregos e furadeiras em reformas de moradores."
      }
    ],
    diagnostico: "Ensaios pneumáticos de estanqueidade a ar comprimido; Geofones acústicos que amplificam o chiado microscópico do cano furado na madrugada.",
    tecnologias: ["Hidrômetros inteligentes com telemetria via WiFi (IoT)", "Geofones com correlacionador de ruídos"],
    manutencao: [
      { atividade: "Limpeza e desinfecção química de reservatórios (caixas)", periodicidade: "Semestral", recomendacao: "Garantir a potabilidade da água livre de coliformes e bactérias nocivas." },
      { atividade: "Aferição periódica de Válvulas Redutoras de Pressão (VRP)", periodicidade: "Anual", recomendacao: "Se a VRP falhar, as torneiras do térreo vão receber pressões brutais e estourar os rabichos plásticos." }
    ],
    predimensionamentoText: "A velocidade máxima da água nos tubos não deve ultrapassar $3\\,m/s$ para não fazer barulho incômodo. A pressão máxima em qualquer ponto de consumo não deve passar de $40\\,m.c.a.$ (metros de coluna d'água) para não danificar torneiras.",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Marcenaria e instaladores furando canos na parede",
        prevencao: "Entregar aos moradores e carpinteiros o projeto 'As-Built' perfeitamente cotado com a distância horizontal dos tubos de água.",
        mitigacao: "O instalador de móveis furou o cano PEX no armário: Feche o registro geral. Quebre o revestimento no local e use uma luva de correr metálica específica com alicate de prensagem para vedar o trecho."
      }
    ],
    normas: ["ABNT NBR 5626 (Sistemas de Água Fria e Quente)", "ABNT NBR 15575-6 (Hidrossanitários Desempenho)"]
  },
  "esgoto-sanitario": {
    id: "esgoto-sanitario",
    titulo: "Esgoto Sanitário e Drenagem Pluvial",
    icon: "🚽",
    custoObra: "R$ 60 a 110",
    custoManutencao: "R$ 3 a 6",
    definicao: "Coleta por gravidade e afastamento de águas residuais (esgoto cinza e negro) e águas de chuva das coberturas, direcionando de forma rápida, higiênica e sem mau cheiro para as caixas de inspeção públicas.",
    componentes: "Tubos de PVC esgoto (Série Normal ou Reforçada), Caixas sifonadas (fecho hídrico), Caixas de gordura, Tubos de ventilação, Calhas e grelhas de teto (abacaxi).",
    aplicacoes: "Ralos de chuveiro, privadas, pias de cozinha, lavatórios e captação de água pluvial de telhados e sacadas.",
    vantagens: "O fecho hídrico (água retida na caixa sifonada) cria uma selagem física contra a entrada de baratas, ratos e gases explosivos da fossa da rua.",
    desvantagens: "Depende exclusivamente da declividade física (gravidade). Se o pedreiro errar a caída de nível na laje por 1 cm, a privada entope recorrentemente.",
    viabilidade: "Insumo barato (PVC), porém o maior custo de operação se dá nos reparos de desobstrução e vídeo-inspeção sob lajes prontas.",
    patologias: [
      {
        anomalia: "Sifonagem e Mau Cheiro Crônico",
        sintoma: "Odor forte de fossa saindo pelos ralos de banheiros, ouvindo barulho de borbulhos na pia ao dar descarga.",
        causa: "Ausência ou entupimento do Tubo de Ventilação vertical que sobe ao telhado. O vácuo da descarga de cima suga a água protetora do seu sifão."
      },
      {
        anomalia: "Transbordamento de Calhas na Cobertura",
        sintoma: "Água da chuva escorrendo pelas paredes externas da fachada, lavando cimento, janelas e gerando infiltrações.",
        causa: "Acúmulo crônico de folhas, terra e sujeira nos ralos da calha do telhado sem limpeza prévia na época das chuvas."
      }
    ],
    diagnostico: "Vídeo-inspeção por endoscopia com robôs portáteis dentro do cano de PVC caçando sedimentos endurecidos de cimento da obra.",
    tecnologias: ["Microcâmeras boroscópicas flexíveis com localizador de sinal de rádio", "Caixas de gordura autolimpantes"],
    manutencao: [
      { atividade: "Limpeza de caixas de gordura da cozinha e sifonados", periodicidade: "Trimestral", recomendacao: "Prevenir que a gordura petrifique no cano horizontal de saída do térreo." },
      { atividade: "Varredura e remoção de detritos de calhas e rufos", periodicidade: "Semestral", recomendacao: "Obrigatório antes do início da estação de tempestades (outono/primavera)." }
    ],
    predimensionamentoText: "A declividade mínima de projeto para tubulações horizontais de esgoto com diâmetro maior ou igual a 100 mm (vaso sanitário) é de 1%. Para tubos menores que 75 mm, a declividade mínima obrigatória é de 2%.",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Falta de rebaixo de laje para esgotos de banheiro",
        prevencao: "O arquiteto DEVE prever um rebaixo de 15 cm a 20 cm na laje maciça dos banheiros em planta. Isso permite embutir os desvios horizontais de esgotos sem invadir o teto do vizinho.",
        mitigacao: "Caso a laje seja plana e fina e não possua rebaixo, a tubulação terá de cruzar exposta no teto do vizinho de baixo, exigindo a instalação de forro falso de drywall para camuflar e negociar acessos."
      }
    ],
    normas: ["ABNT NBR 8160 (Esgoto Predial)", "ABNT NBR 10844 (Águas Pluviais)"]
  },
  "eletrica": {
    id: "eletrica",
    titulo: "SISTEMAS ELÉTRICOS & QUADROS",
    icon: "⚡",
    custoObra: "R$ 200,00 a R$ 450,00",
    custoManutencao: "R$ 5,00 a R$ 15,00",
    definicao: "Sistema responsável por receber a energia em baixa ou média tensão da concessionária, filtrar surtos, e distribuir correntes balanceadas para iluminação, tomadas e motores com proteção automática.",
    componentes: "Quadros de luz (QDCs), Disjuntores Termomagnéticos, Dispositivos Diferenciais Residuais (DR), Dispositivos de Proteção contra Surtos (DPS), Cabos de cobre isolados antichamas, Eletrodutos.",
    aplicacoes: "Iluminação, ar-condicionado, tomadas comuns e de força, motores de elevadores e bombas de água.",
    vantagens: "Uso do DR (Diferencial Residual) previne acidentes fatais por choques elétricos em tomadas de banheiros e cozinhas. O DPS protege eletrodomésticos caros contra queimas por raios.",
    desvantagens: "Trata-se de um sistema letal invisível. Cabos apertados frouxos nos disjuntores aquecem sozinhos por Efeito Joule e provocam a maioria dos incêndios prediais.",
    viabilidade: "Insumo indispensável. A viabilidade se dá no uso de cabeamentos de cobre com isolações nobres de XLPE que suportam mais amperes sem aquecer.",
    patologias: [
      {
        anomalia: "Sobreaquecimento nos Disjuntores (Ponto Quente)",
        sintoma: "Cheiro de peixe podre ou plástico queimado perto do quadro, disjuntores desarmando sem motivo aparente e deformações plásticas.",
        causa: "Aperto frouxo dos parafusos dos bornes dos disjuntores elétricos gerando arco elétrico, ou excesso de aparelhos puxando corrente num fio fino."
      },
      {
        anomalia: "Desarme recorrente do DR",
        sintoma: "A luz de força cai sempre que o chuveiro ou a lavadora é acionada, mesmo sem curto-circuito.",
        causa: "Isolação do fio descascada tocando no eletroduto úmido (vazamento invisível de corrente para a terra)."
      }
    ],
    diagnostico: "Termografia infravermelha rotineira (com os quadros abertos sob carga total) e Megômetro para aferir a resistência de isolação dos cabos.",
    tecnologias: ["Quadros Smart com disjuntores IoT monitorando amperes na nuvem", "Câmeras térmicas calibradas de bolso"],
    manutencao: [
      { atividade: "Inspeção termográfica de painéis e barramentos", periodicidade: "Anual", recomendacao: "Sempre inspecionar com o prédio em uso pico (ar condicionado ligado) para capturar aquecimentos reais." },
      { atividade: "Reaperto mecânico geral de parafusos de bornes", periodicidade: "Anual", recomendacao: "Obrigatório desligar a força geral antes. Reduz drasticamente riscos de faíscas e incêndios elétricos." }
    ],
    predimensionamentoText: "A taxa de ocupação máxima permitida dentro de eletrodutos é de 40% da sua seção para até 3 cabos, garantindo dissipação de calor térmico livre. Sempre deixe pelo menos 30% de espaço de reserva para novos disjuntores no QDC.",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Cabo de Energia colado em Tubos de Água e Gás",
        prevencao: "BIM coordenação: Cabos elétricos devem passar em eletrodutos isolados de PVC, mantendo distanciamento de pelo menos 20 cm de canos de água fria/quente ou tubos de gás.",
        mitigacao: "Se a colisão já ocorreu na parede, envolva o cano de gás com fita isolante térmica especial de silicone ou refaça a rota elétrica utilizando eletrodutos corrugados blindados pesados."
      }
    ],
    normas: ["ABNT NBR 5410 (Baixa Tensão)", "ABNT NBR 14039 (Média Tensão)", "NR-10 (Segurança Eletricidade)"]
  },
  "elevador-eletrico": {
    id: "elevador-eletrico",
    titulo: "Elevador de Tração Elétrica (MRL)",
    icon: "🛗",
    custoObra: "R$ 180.000 a 350.000",
    custoManutencao: "R$ 800 a 1.500",
    definicao: "Sistemas complexos integrados de transporte motorizado e tracionado projetados para elevar pessoas ou cargas em alta velocidade (1 a 7 m/s) e com robustez entre os pavimentos da estrutura. Geralmente formados pelo princípio da compensação de massas.",
    componentes: "Máquina de Tração (Motor Gearless de Ímã Permanente sem casa de máquinas - MRL), Cabos de Aço flexível super resistentes ou cintas planas de poliuretano, Freios de Segurança (Pará-quedas das guias), Quadro Eletrônico de Comando Inversor VVVF, Cabina, Contrapeso, Guias de T invertidas fixadas na parede do poço.",
    aplicacoes: "Toda infraestrutura verticalizada (arranha-céus, torres residenciais/corporativas, galpões logísticos e hospitais tipo maca-leito).",
    vantagens: "Eficiência de tração impressionante, altíssima velocidade, estabilidade de aceleração imperceptível e viagens incrivelmente seguras graças ao sistema rígido de segurança eletrônico/mecânico.",
    desvantagens: "Aprisionamento dos usuários durante blecautes prolongados (se não houver geradores e resgate automático), fobias induzidas a alguns ocupantes. Custos mensais fixos contratuais não flexíveis.",
    viabilidade: "Altamente complexo intertravamento econômico. Instalar elevadores é capital intensivo monumental (centenas de milhares de reais), OPEX é caro (KWh contínuos), o fechamento exigirá aprovações legais municipais.",
    patologias: [
      {
        anomalia: "Degradação da Alma do Cabo de Tração / Fios Rompidos",
        sintoma: "Ruídos de roçar de metal vindos do fosso, viagem vibrando levemente (tremor nas pernas ao subir).",
        causa: "Atrito e fadiga contínua nas ranhuras da polia tratora em alta velocidade. Fim da vida útil programada dos cabos, demandando troca emergencial obrigatória."
      },
      {
        anomalia: "Nivelamento Inadequado da Cabina",
        sintoma: "Ao parar e abrir as portas no hall do apartamento, o piso da cabina fica 2 cm a 5 cm mais baixo ou mais alto que o piso do corredor.",
        causa: "Desgaste ou descalibragem do sistema mecânico dos freios mestre que seguram o disco do motor de tração, associado a desprogramação de encoders e sensores magnéticos das paradas nas guias."
      },
      {
        anomalia: "Falha de Micro Switches em Portas e Intertravamento",
        sintoma: "As portas da cabina fecham no térreo, tentam subir, cancelam a operação e abrem repetidas vezes, travando a viagem e gerando fila de espera do lado de fora.",
        causa: "A sujeira, terra, grãos e pêlos trancam os trilhos das soleiras inferiores do elevador, acionando micro chaves e forçando a reversão de segurança."
      }
    ],
    diagnostico: "Testes de Inspeção e Análise Cinemática da Viagem (EVA - Elevator Ride Quality Analysis via giroscópios digitais ultrassensíveis aferindo os milésimos de solavanco e vibração ISO).",
    tecnologias: ["Giroscópios de precisão com análise EVA", "Sistemas integrados de resgate automático de passageiros"],
    manutencao: [
      { atividade: "Inspeção, limpeza e lubrificação geral", periodicidade: "Mensal", recomendacao: "Obrigatório por lei. Realizado pela empresa de manutenção credenciada.", tech_diagnostics: "Inspeção visual e tátil." },
      { atividade: "Análise de vibração do motor e polias", periodicidade: "Anual", recomendacao: "Detectar desgaste de rolamentos da máquina tratora.", tech_diagnostics: "Analisador de vibração." }
    ],
    predimensionamentoText: "<p><strong class=\"text-white\">Cálculo de Tráfego de Trânsito Vertical e Tempo de Espera:</strong> O 'Tempo Provável de Espera Máximo' não deve ultrapassar 30 a 50 segundos em edifícios de escritórios na hora de pico.</p><p class=\"mt-2\"><strong class=\"text-white\">Fosso Inferior Extra de Segurança:</strong> O Poço do edifício necessita descer um rebaixo de molas e amortecedores hidráulicos variando de 1,2 m até 3 m.</p><p class=\"mt-2\"><strong class=\"text-white\">Altura de Escape Final Teto:</strong> O topo do poço acima da cobertura exige sobrefolgas gigantes, chegando entre 4,20 m até 5 m livres verticais.</p>",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Alinhamento a Prumo de Paredes de Alvenaria e Cortinas do Fosso",
        prevencao: "A principal razão dos atrasos nas montagens é o erro da construtora (concreto) ao moldar a torre do poço torta/torcida para os andares acima.",
        mitigacao: "Picotar, corrigir com groute ou quebrar dentes de vigas na caixa do elevador é a medida de salvação comum se a tolerância for pequena."
      }
    ],
    normas: ["ABNT NBR 16858 (Requisitos elevadores)", "ABNT NBR NM 313 (Normas técnicas antigas e compatíveis)", "ABNT NBR 15597 (Acessibilidade exigida legalmente para PCDs)"]
  },
  "incendio-hidrantes": {
    id: "incendio-hidrantes",
    titulo: "Sistemas de Alarme e Combate (Hidrantes & Sprinklers)",
    icon: "🔥",
    custoObra: "R$ 150 a 300",
    custoManutencao: "R$ 10 a 20",
    definicao: "O sistema vital voltado estritamente e exaustivamente a atuar nas poucas dezenas de minutos cruciais em salvar a estrutura da torre dos colapsos de incêndios avassaladores.",
    componentes: "Central Digital Endereçável Mestre (SACI/CGA), Sensores Ópticos Industriais de Fumaça Teto/Calor (Aspirantes a Laiser HSSD), Rede Autônoma Pressurizada Hidrante e Chuveiros Fixos tipo Sprinklers ligados a bombas gigantes de recalque de diesel ou blindadas elétricas no subsolo.",
    aplicacoes: "Requisito da aprovação das normativas obrigatórias de Habite-se para liberar funcionamento comercial perante a vistoria do Corpo de Bombeiros, englobando todas as tipologias prediais.",
    vantagens: "Resiliência impressionante de respostas antecipadas. Salva inúmeras vidas pela disposição do fogo ainda incipiente nos escritórios/andares corporativos com o alarme acionando válvulas VRP de fumaça pressurizada em lances de escape pelas escadas cegas (Garantir rotas limpas sem carbono fatal).",
    desvantagens: "Um dos OPEX engessados mais chatos (reapertos, aferição, falsos-positivos acidentais devido a vapores, obras temporárias ou fumaças e sprays comuns acionando sinos sonoros errôneos parando os trabalhos habituais).",
    viabilidade: "Altamente complexo e restrito sob o cerco das regulamentações de legislações estaduais pesadas. Nenhuma falha é aceitável, incorrendo os líderes do edifício a respondimento Cível e Criminal imediato.",
    patologias: [
      {
        anomalia: "Travamento das Bombas Centrífugas Principais por Ausência de Repetidas Inércias",
        sintoma: "Ao realizar teste de carga da rede de válvulas/mangueiras, a força do jato é débil, nula e o eixo dos blocos do rotor se encontra preso impedindo a partida no momento do alarme fatal.",
        causa: "Ausência mortal da prática em rotinas mensais (as bombas sofrem corrosão dos eixos rotativos se ficarem muitos meses adormecidas sob efeito da ferrugem/ar/umidade)."
      },
      {
        anomalia: "Obstrução de Bicos Automáticos (Sprinklers - Chuveiros Automáticos)",
        sintoma: "A cápsula de bulbo vermelha termo sensível rompe a 68 graus célsius de caloria e no momento fatal o chuveiro libera fluxos restritos fracos não apagando o foco.",
        causa: "Operários pintores espirrando acidentalmente grossas camadas de tinta plástica epoxy acrílica sobre a estrutura metálica entupindo embutidamente o mecanismo."
      }
    ],
    diagnostico: "Testes e Manobras Formais semanais de Partidas das Bombas Jovens Jockey / Mestres. Vistorias visuais de percurso buscando estanqueidades corrompidas de torneiras em escadas pressurizadas.",
    tecnologias: ["Sensores ópticos industriais de fumaça a laser", "Centrais eletrônicas auto-testáveis de incêndio"],
    manutencao: [
      { atividade: "Acionamento de simulação Manual em Botoeiras para Checagem da sirene áudio.", periodicidade: "Trimestral e testes massivos anuais", recomendacao: "Engajar os residentes ao menos em Treinamentos simuladores anuais da evacuação global (obrigação da CIPA/Brigada)." }
    ],
    predimensionamentoText: "<p><strong class='text-white'>Capacidade Brutal das Caixas de Água de Bombeiro (RTI - Reserva Técnica de Incêndio):</strong> Não entra e não mescla o dimensionamento do consumo potável limpo. Se exigida pelas regulamentações militares estaduais, a parte inferior do castelo exige reservar imensidões fixas que não baixam de milhares e milhares de litros fixos contínuos unicamente voltados às redes de combate dependendo do volume total ocupacional e do número assombroso de esguichos a pressão máxima atuando no pico de crise do prédio.</p>",
    calcData: {
      maxVao: 6,
      divisorViga: 1,
      multPilarRes: 1,
      multPilarCom: 1,
      hasCalculator: false
    },
    conflitos: [
      {
        conflito: "Redes Expostas Vermelhas X A Tensão Visual Estética da Arquitetura Fina",
        prevencao: "Tubos robustos galvanizados,  válvulas pintadas em vermelho fogo são imperativos por obrigatoriedade e não podem sofrer rebaixamento falso dificultando as roscas.",
        mitigacao: "Acordos plásticos, aprovações finas permitindo coberturas abertas que suportem acoplamentos tipo TETO COLMÉIA permitindo o jato romper e agir eficientemente na supressão, sem causar ofuscamentos visuais nos vãos expostos decorativos em shoppings e saguões de hall artísticos das sedes bancárias."
      }
    ],
    normas: ["Instruções Técnicas e Regulamentações rigorosas do Corpo de Bombeiros local de cada Estado (IT CBPMESP, etc)", "ABNT NBR 13714 (Sistemas de combate em edifícios hidráulicos robustos)", "ABNT NBR 10897 (Projeto de proteção robusto Sprinklers chuveiros teto fechado)"]
  }
};

// Declared systems with 13 categories and full list of typologies
export const systemsDeclaration = [
  {
    categoria: "Sistemas Estruturais",
    icon: "🏛️",
    intro: "Esta seção aborda a espinha dorsal do edifício: os sistemas que garantem sua estabilidade, resistência mecânica e segurança contra colapsos. A concepção adequada e a manutenção preditiva garantem a integridade ao longo de décadas.",
    tipologias: [
      { id: "concreto-armado", titulo: "Concreto Armado in loco" },
      { id: "concreto-protendido", titulo: "Concreto protendido" },
      { id: "alvenaria-estrutural", titulo: "Alvenaria estrutural" },
      { id: "estrutura-metalica", titulo: "Estrutura metálica (Aço)" },
      { id: "concreto-pre-moldado", titulo: "Concreto Pré-moldado" },
      { id: "madeira-estrutural", titulo: "Madeira Estrutural (Glulam/CLT)" },
      { id: "parede-concreto-in-loco", titulo: "Parede de Concreto moldada in loco" }
    ]
  },
  {
    categoria: "Sistemas de Fundações",
    icon: "🌱",
    intro: "A interface fundamental do edifício com a terra. Transmite as cargas colossais da superestrutura para as camadas de solo resistente, evitando recalques diferenciais catastróficos.",
    tipologias: [
      { id: "sapata-isolada", titulo: "Sapatas Isoladas e Corridas" },
      { id: "radier", titulo: "Radier (Laje de Fundação)" },
      { id: "estacas-escavadas", titulo: "Estacas Escavadas e Hélice Contínua" },
      { id: "estacas-pre-moldadas", titulo: "Estacas Pré-moldadas (Concreto/Aço)" },
      { id: "tubuloes", titulo: "Tubulões a Céu Aberto e Ar Comprimido" }
    ]
  },
  {
    categoria: "Sistemas de Vedação e Revestimento Externo",
    icon: "🖼️",
    intro: "A envoltória que protege os usuários do clima externo. Controla as trocas de calor, ruído, poeira e água, garantindo estanqueidade absoluta, conforto acústico e térmico interno.",
    tipologias: [
      { id: "alvenaria-vedacao", titulo: "Alvenaria de Vedação (Tijolos)" },
      { id: "revestimento-ceramico-externo", titulo: "Revestimento Cerâmico Externo (Pastilhas/Porcelanato)" },
      { id: "drywall-divisorias", titulo: "Drywall e Divisórias Internas" },
      { id: "fachada-glazing", titulo: "Fachada Glazing / Pele de Vidro" },
      { id: "texturas-pinturas", titulo: "Texturas e Pinturas Externas (Monocapa)" }
    ]
  },
  {
    categoria: "Sistemas de Cobertura",
    icon: "🏠",
    intro: "A proteção superior do edifício contra intempéries directas, insolação extrema e chuvas fortes, garantindo excelente estanqueidade e conforto térmico de cobertura.",
    tipologias: [
      { id: "telhado-verde", titulo: "Telhado Verde (Ecológico)" },
      { id: "coberturas-metalicas", titulo: "Coberturas Metálicas (Telhas Zipadas/Sanduíche)" },
      { id: "telhas-ceramicas", titulo: "Telhas de Concreto e Cerâmicas" },
      { id: "lajes-expostas", titulo: "Lajes de Cobertura Expostas e Grelhas" }
    ]
  },
  {
    categoria: "Sistemas de Impermeabilização",
    icon: "💧",
    intro: "Barreiras físicas estanques aplicadas para impedir a infiltração de água nas lajes, reservatórios, áreas frias internas e coberturas.",
    tipologias: [
      { id: "manta-asfaltica", titulo: "Manta Asfáltica (Moldada a Quente)" },
      { id: "argamassas-polimericas", titulo: "Argamassas Poliméricas e Membranas Acrílicas" },
      { id: "injecao-pu", titulo: "Injeção Química de Poliuretano (PU) para trincas" },
      { id: "geomembrana-pead", titulo: "Membrana de PEAD (Geomembranas)" }
    ]
  },
  {
    categoria: "Sistemas Hidrossanitários",
    icon: "🚿",
    intro: "Abastecimento seguro de água potável fria/quente, escoamento de esgoto e ventilação, e gerenciamento de águas pluviais, reuso e atenuação de enchentes.",
    tipologias: [
      { id: "agua-fria-quente", titulo: "Abastecimento de Água Fria e Quente" },
      { id: "esgoto-sanitario", titulo: "Esgoto Sanitário e Drenagem Pluvial" },
      { id: "drenagem-pluvial", titulo: "Drenagem Pluvial e Caixas de Retenção" },
      { id: "reuso-agua-cinza", titulo: "Sistemas de Reuso de Água Cinza" }
    ]
  },
  {
    categoria: "Sistema de Gás Combustível",
    icon: "🔥",
    intro: "Redes seguras de transporte de gás liquefeito de petróleo ou gás natural de rua, instaladas sob os mais severos padrões de estanqueidade.",
    tipologias: [
      { id: "redes-glp", titulo: "Redes de Gás Liquefeito de Petróleo (GLP)" },
      { id: "redes-gn", titulo: "Redes de Gás Natural (GN/Canalizado)" },
      { id: "central-gas", titulo: "Central de Gás e Sistemas de Medição Individualizada" }
    ]
  },
  {
    categoria: "Sistemas Elétricos",
    icon: "⚡",
    intro: "Infraestrutura de recepção, proteção mecânica e distribuição segura de energia elétrica em baixa e média tensão para iluminação e motores.",
    tipologias: [
      { id: "eletrica", titulo: "SISTEMAS ELÉTRICOS & QUADROS" },
      { id: "subestacao", titulo: "Subestação Blindada e Transformadores" },
      { id: "spda", titulo: "Sistema de Proteção contra Descargas Atmosféricas (SPDA)" },
      { id: "geradores", titulo: "Grupos Geradores de Emergência" }
    ]
  },
  {
    categoria: "Climatização e Exaustão",
    icon: "❄️",
    intro: "Sistemas mecânicos de refrigeração e aquecimento térmico, exaustão forçada de monóxido e gases e renovação constante de ar interno.",
    tipologias: [
      { id: "ar-split", titulo: "Sistemas de Ar Condicionado Split e Multi-Split" },
      { id: "ar-vrf", titulo: "Sistema de Climatização Central VRF (Fluxo Variável)" },
      { id: "exaustao-mecanica", titulo: "Exaustão Mecânica de Banheiros e Cozinhas" },
      { id: "renovacao-ar", titulo: "Renovação de Ar e Ventilação Forçada (Garagens)" }
    ]
  },
  {
    categoria: "Sistemas de Incêndio e SPDA",
    icon: "🚨",
    intro: "Sistemas vitais de alarme de fumaça mestre, sprinklers automatizados, rotas de fuga seladas e pressurizadas para saída segura de ocupantes.",
    tipologias: [
      { id: "incendio-hidrantes", titulo: "Sistemas de Alarme e Combate (Hidrantes & Sprinklers)" },
      { id: "extintores-sinalizacao", titulo: "Extintores Portáteis e Sinalização de Emergência" },
      { id: "rotas-fuga", titulo: "Rotas de Fuga, Portas Corta-Fogo e Balizamento" },
      { id: "pressurizacao-escadas", titulo: "Pressurização de Escadas de Emergência" }
    ]
  },
  {
    categoria: "Transporte Vertical",
    icon: "🛗",
    intro: "Elevação vertical motorizada e automatizada de pessoas e cargas pesadas entre os diversos andares do empreendimento civil.",
    tipologias: [
      { id: "elevador-eletrico", titulo: "Elevador de Tração Elétrica (MRL)" },
      { id: "elevador-hidraulico", titulo: "Elevadores Hidráulicos e Plataformas PCD" },
      { id: "escadas-rolantes", titulo: "Escadas e Esteiras Rolantes" }
    ]
  },
  {
    categoria: "Comunicação e Segurança Interna",
    icon: "🔒",
    intro: "Sistemas digitais de telecomunicação, monitoramento eletrônico inteligente (CFTV), controle de acessos virtuais e biometria.",
    tipologias: [
      { id: "cftv", titulo: "CFTV (Circuito Fechado de TV) e Monitoramento" },
      { id: "controle-acesso", titulo: "Sistemas de Controle de Acesso e Portarias Virtuais" },
      { id: "cabeamento-estruturado", titulo: "Cabeamento Estruturado e Redes de Dados" },
      { id: "interfonia", titulo: "Interfonia e Antenas Coletivas" }
    ]
  },
  {
    categoria: "Paisagismo e Irrigação",
    icon: "🌳",
    intro: "Integração biofílica externa através de jardins comuns drenados e sistemas automatizados de aspersão e irrigação de plantas.",
    tipologias: [
      { id: "jardins-areas-verdes", titulo: "Jardins e Áreas Verdes Comuns" },
      { id: "irrigacao-automatizada", titulo: "Sistemas de Irrigação Automatizada" },
      { id: "espelhos-agua", titulo: "Espelhos d'Água e Fontes Ornamentais" }
    ]
  }
];

// Combine everything to build the unified buildingSystems array
export const buildingSystems: Sistema[] = systemsDeclaration.map(sys => {
  const mappedTipologias: Tipologia[] = sys.tipologias.map(t => {
    const detailed = detailedTypologies[t.id];
    if (detailed) {
      return {
        ...detailed,
        icon: detailed.icon || sys.icon,
        id: t.id,
        titulo: detailed.titulo || t.titulo
      } as Tipologia;
    }

    // Default missing information structure for requested typologies
    const missingSentinel = "⚠️ Ausência de Informação (Solicitado ao Usuário)";
    return {
      id: t.id,
      titulo: t.titulo,
      icon: sys.icon,
      custoObra: missingSentinel,
      custoManutencao: missingSentinel,
      definicao: missingSentinel,
      componentes: missingSentinel,
      aplicacoes: missingSentinel,
      vantagens: missingSentinel,
      desvantagens: missingSentinel,
      viabilidade: missingSentinel,
      patologias: [],
      diagnostico: missingSentinel,
      tecnologias: [],
      manutencao: [],
      predimensionamentoText: missingSentinel,
      conflitos: [],
      normas: []
    };
  });

  return {
    categoria: sys.categoria,
    icon: sys.icon,
    intro: sys.intro,
    tipologias: mappedTipologias
  };
});
