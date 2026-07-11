import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Wrench, 
  ShieldAlert, 
  Scale, 
  Search, 
  SlidersHorizontal, 
  Layers, 
  Eye, 
  Binary, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  X, 
  Flame, 
  CornerDownRight, 
  Sparkles, 
  RotateCcw, 
  Compass, 
  HelpCircle, 
  Activity, 
  FileText, 
  Settings, 
  Play, 
  Check, 
  ChevronRight,
  Info,
  CalendarDays,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { buildingSystems, normasTransversais } from './data';

// Combine datasets to form the unified Biblia Predial knowledge database
const fullDatabase = buildingSystems.flatMap(s => 
  s.tipologias.map(t => ({
    ...t,
    categoria: s.categoria
  }))
);

const isFieldMissing = (value: any) => {
  if (!value) return true;
  if (typeof value === 'string') {
    const v = value.toLowerCase().trim();
    return v.includes('ausência de informação') || v.includes('ausencia de informacao') || v === '';
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return false;
};

interface RenderFieldProps {
  value: string | undefined;
  label: string;
  className?: string;
}

const RenderField: React.FC<RenderFieldProps> = ({ value, label, className = "" }) => {
  if (isFieldMissing(value)) {
    return (
      <div className={`bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl flex items-start gap-3 ${className}`}>
        <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">{label}</h5>
          <p className="text-amber-200/70 text-xs leading-relaxed">
            ⚠️ <strong>Ausência de Informação de Projeto/Obra/Manutenção.</strong> Por favor, envie-nos esses dados específicos para podermos integrar esta tipologia plenamente no dossiê técnico da Bíblia Predial.
          </p>
        </div>
      </div>
    );
  }

  // Split lines and parse simple markdown (**bold** and bullets)
  const lines = (value || '').split('\n');
  return (
    <div className={`space-y-2 ${className}`}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
        const cleanLine = isBullet ? trimmed.substring(1).trim() : trimmed;
        
        const parts = cleanLine.split('**');
        const content = parts.map((part, index) => {
          if (index % 2 === 1) {
            return <strong key={index} className="text-white font-bold">{part}</strong>;
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={i} className="flex items-start gap-2 text-slate-300 text-xs md:text-sm leading-relaxed mt-1">
              <span className="text-cyan-400 font-bold shrink-0">•</span>
              <span>{content}</span>
            </div>
          );
        }
        return (
          <p key={i} className="text-slate-300 text-xs md:text-sm leading-relaxed">
            {content}
          </p>
        );
      })}
    </div>
  );
};

export default function App() {
  // Navigation & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeTypology, setActiveTypology] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('geral');
  const [showNormasTransversais, setShowNormasTransversais] = useState(false);

  // Standalone "Pulo do Gato" Pre-dimensioning Calculator State
  const [calcSystemId, setCalcSystemId] = useState('concreto-armado');
  const [calcVao, setCalcVao] = useState(5);
  const [calcPavimentos, setCalcPavimentos] = useState(3);
  const [calcAreaPilar, setCalcAreaPilar] = useState(25);
  const [calcUso, setCalcUso] = useState('res');

  // Mini active modal calculator state
  const [modalCalcVao, setModalCalcVao] = useState(6);
  const [modalCalcPav, setModalCalcPav] = useState(4);
  const [modalCalcArea, setModalCalcArea] = useState(30);
  const [modalCalcUso, setModalCalcUso] = useState('res');

  // Available categories extracted dynamically
  const categories = useMemo(() => {
    const list = new Set(fullDatabase.map(item => item.categoria));
    return ['Todos', ...Array.from(list)];
  }, []);

  // Filtered typologies based on category and search query
  const filteredTypologies = useMemo(() => {
    return fullDatabase.filter(item => {
      const matchCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
      const matchSearch = 
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.normas.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Handle opening a typology modal
  const handleOpenTypology = (typology: any) => {
    setActiveTypology(typology);
    setActiveTab('geral');
    // Seed system specific values to local modal calculator if matching structural data
    if (typology.calcData) {
      setModalCalcVao(6);
      setModalCalcPav(4);
      setModalCalcArea(30);
      setModalCalcUso('res');
    }
  };

  // Standalone Sandbox Calculator Output
  const sandboxCalculations = useMemo(() => {
    const currentData = fullDatabase.find(item => item.id === calcSystemId);
    if (!currentData || !currentData.calcData) return null;

    const { divisorViga, maxVao, multPilarRes, multPilarCom } = currentData.calcData;
    const mult = calcUso === 'res' ? multPilarRes : multPilarCom;

    // Height of beam/slab estimate (cm)
    let vigaHeight = 0;
    if (divisorViga > 1) {
      vigaHeight = (calcVao * 100) / divisorViga;
    }

    // Area of pillar (cm²)
    const calculatedPilarArea = calcAreaPilar * calcPavimentos * mult;
    let minLado = Math.round(Math.sqrt(calculatedPilarArea));
    if (minLado < 19) minLado = 19; // NBR minimum rule of thumb for standard grids

    const isVaoSeguro = calcVao <= maxVao;

    return {
      vigaHeight: Math.round(vigaHeight),
      pilarArea: Math.round(calculatedPilarArea),
      minLado,
      isVaoSeguro,
      maxVao,
      divisorViga
    };
  }, [calcSystemId, calcVao, calcPavimentos, calcAreaPilar, calcUso]);

  // Modal specific calculator output
  const modalCalculations = useMemo(() => {
    if (!activeTypology || !activeTypology.calcData) return null;
    const { divisorViga, maxVao, multPilarRes, multPilarCom } = activeTypology.calcData;
    const mult = modalCalcUso === 'res' ? multPilarRes : multPilarCom;

    let vigaHeight = 0;
    if (divisorViga > 1) {
      vigaHeight = (modalCalcVao * 100) / divisorViga;
    }

    const calculatedPilarArea = modalCalcArea * modalCalcPav * mult;
    let minLado = Math.round(Math.sqrt(calculatedPilarArea));
    if (minLado < 19) minLado = 19;

    const isVaoSeguro = modalCalcVao <= maxVao;

    return {
      vigaHeight: Math.round(vigaHeight),
      pilarArea: Math.round(calculatedPilarArea),
      minLado,
      isVaoSeguro,
      maxVao,
      divisorViga
    };
  }, [activeTypology, modalCalcVao, modalCalcPav, modalCalcArea, modalCalcUso]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Premium Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl border border-cyan-400/20 shadow-lg shadow-cyan-500/10">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest bg-cyan-950 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
                  Amorim Tech
                </span>
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                  v4.0
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">
                Bíblia Predial <span className="text-cyan-400 font-light">4.0</span>
              </h1>
            </div>
          </div>

          {/* Quick Access Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setShowNormasTransversais(!showNormasTransversais)}
              className={`flex items-center justify-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all w-full sm:w-auto ${
                showNormasTransversais 
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20' 
                : 'bg-slate-900/60 text-slate-300 border-slate-700/80 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span>Normas Transversais (ABNT)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Dynamic Normas Transversais Drawer/Block */}
        <AnimatePresence>
          {showNormasTransversais && (
            <motion.section 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-850 rounded-2xl border border-brand-cyan/20 overflow-hidden shadow-2xl relative"
            >
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Scale className="text-cyan-400 w-5 h-5" />
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                      Arcabouço Normativo Transversal (Célula Mater da Engenharia Diagnóstica)
                    </h2>
                  </div>
                  <button 
                    onClick={() => setShowNormasTransversais(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-slate-400">
                  Estas normas nacionais regulamentam os ritos jurídicos, classificações de risco e relatórios técnicos. Devem ser integradas a todo e qualquer laudo predial (RTIPA) para validação legal.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {normasTransversais.map((norma, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 hover:border-slate-700/60 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{norma.codigo}</span>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/20 px-1.5 py-0.5 rounded">OBLIGATÓRIO</span>
                        </div>
                        <h4 className="text-white text-sm font-semibold mb-2 line-clamp-1">{norma.titulo}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{norma.aplicacao}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                        <span>ABNT Regulador</span>
                        <span>Confirmado</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Pitada do Método: Inspeção Predial 4.0 */}
        <section className="bg-slate-850 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-blue-600"></div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-cyan-400 w-5 h-5" />
              <h2 className="text-xl font-bold text-white tracking-wide uppercase">Pitada do Método: Rastreio e Diagnóstico 4.0</h2>
            </div>
            <p className="text-sm md:text-base text-slate-400 mb-8 max-w-4xl leading-relaxed">
              Diretrizes de <strong>inspeção não destrutiva, sensorial e automatizada</strong> para rastrear anomalias estruturais, infiltrações térmicas e falhas de compatibilização antes de qualquer intervenção de quebra.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1 */}
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80 hover:border-slate-700/60 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-slate-850 rounded-lg flex items-center justify-center mb-4 text-cyan-400 border border-slate-700/50">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-2">1. Rastreio Sensorial</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mapeamento humano primário. Visão focada para desaprumos; tato para humidades escondidas; e ensaio de percussão acústica para mapear descolamentos de placas de fachada.
                  </p>
                </div>
                <div className="mt-4 text-[10px] text-cyan-400/80 font-mono tracking-wider uppercase">Fase Inicial / Humano</div>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80 hover:border-slate-700/60 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-slate-850 rounded-lg flex items-center justify-center mb-4 text-cyan-400 border border-slate-700/50">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-2">2. Checklists Paramétricos</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Substituição de planilhas soltas por dados parametrizados dividindo o ativo em: Envoltória (Pele), Núcleo Estrutural e Artérias (Instalações MEP).
                  </p>
                </div>
                <div className="mt-4 text-[10px] text-cyan-400/80 font-mono tracking-wider uppercase">Racionalização de Dados</div>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80 hover:border-slate-700/60 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-slate-850 rounded-lg flex items-center justify-center mb-4 text-cyan-400 border border-slate-700/50">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-2">3. Varredura Térmica</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Uso de termografia infravermelha para registrar infiltrações de água camufladas atrás do gesso ou pontos quentes (sobrecarga térmica) em disjuntores e fiações.
                  </p>
                </div>
                <div className="mt-4 text-[10px] text-cyan-400/80 font-mono tracking-wider uppercase">Não Destrutivo (IND)</div>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80 hover:border-slate-700/60 transition-colors flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-slate-850 rounded-lg flex items-center justify-center mb-4 text-cyan-400 border border-slate-700/50">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-2">4. Voo de Inspeção (Drones)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mapeamento detalhado de fachadas cegas elevadas, platibandas e coberturas industriais de difícil acesso sem a necessidade de andaimes e balancins.
                  </p>
                </div>
                <div className="mt-4 text-[10px] text-cyan-400/80 font-mono tracking-wider uppercase">Mapeamento Aéreo</div>
              </div>
            </div>
          </div>
        </section>

        {/* "O Pulo do Gato Paramétrico" STANDALONE SANDBOX CALCULATOR */}
        <section className="bg-slate-850 rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 text-8xl text-cyan-500/5 transform rotate-12 pointer-events-none">
            <Calculator className="w-24 h-24" />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="text-cyan-400 w-5 h-5" />
                  <span>O Pulo do Gato Paramétrico — Simulador de Concepção</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Estime dimensões de vigas e pilares e teste limites de vão antes de iniciar os desenhos arquitetônicos.
                </p>
              </div>

              {/* System Selector for Calculator */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">Sistema:</span>
                <select 
                  value={calcSystemId}
                  onChange={(e) => setCalcSystemId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-400 rounded-lg p-2.5 outline-none focus:border-cyan-400"
                >
                  <option value="concreto-armado">Concreto Armado in loco</option>
                  <option value="protendido">Concreto Protendido</option>
                  <option value="alvenaria">Alvenaria Estrutural</option>
                  <option value="metalica">Estrutura Metálica (Aço)</option>
                </select>
              </div>
            </div>

            {/* Calculadora Input Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Inputs Panel */}
              <div className="space-y-4 bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-inner">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Entrada de Parâmetros</h4>
                
                {/* Vão Livre */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Vão Livre Desejado (Metros)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="1" 
                      max="30"
                      value={calcVao}
                      onChange={(e) => setCalcVao(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white text-sm outline-none focus:border-cyan-400 font-mono"
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-mono">metros</span>
                  </div>
                </div>

                {/* Pavimentos */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Número de Pavimentos (Andares)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="1" 
                      max="40"
                      value={calcPavimentos}
                      disabled={calcSystemId === 'alvenaria'}
                      onChange={(e) => setCalcPavimentos(Math.max(1, parseInt(e.target.value) || 0))}
                      className={`w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white text-sm outline-none focus:border-cyan-400 font-mono ${
                        calcSystemId === 'alvenaria' ? 'opacity-40 cursor-not-allowed' : ''
                      }`}
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-mono">andares</span>
                  </div>
                </div>

                {/* Área de Influência */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Área de Influência por Pilar (m²)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="5" 
                      max="100"
                      value={calcAreaPilar}
                      disabled={calcSystemId === 'alvenaria'}
                      onChange={(e) => setCalcAreaPilar(Math.max(1, parseFloat(e.target.value) || 0))}
                      className={`w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white text-sm outline-none focus:border-cyan-400 font-mono ${
                        calcSystemId === 'alvenaria' ? 'opacity-40 cursor-not-allowed' : ''
                      }`}
                    />
                    <span className="absolute right-3 top-3 text-xs text-slate-500 font-mono">m²</span>
                  </div>
                </div>

                {/* Uso */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-semibold">Destinação de Uso do Prédio</label>
                  <select 
                    value={calcUso}
                    disabled={calcSystemId === 'alvenaria'}
                    onChange={(e) => setCalcUso(e.target.value)}
                    className={`w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-white text-sm outline-none focus:border-cyan-400 ${
                      calcSystemId === 'alvenaria' ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="res">Residencial / Habitação</option>
                    <option value="com">Corporativo / Escritórios / Lojas</option>
                  </select>
                </div>
              </div>

              {/* Calculator Output and Warning Panels */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Status Callout Card */}
                {sandboxCalculations && (
                  <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    sandboxCalculations.isVaoSeguro 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : 'bg-rose-950/20 border-rose-500/30'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        sandboxCalculations.isVaoSeguro ? 'bg-emerald-900/30 text-emerald-400' : 'bg-rose-900/30 text-rose-400'
                      }`}>
                        {sandboxCalculations.isVaoSeguro ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${sandboxCalculations.isVaoSeguro ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sandboxCalculations.isVaoSeguro ? 'VÃO RECOMENDADO E SEGURO' : 'ALERTA: VÃO FORA DO PADRÃO ECONÔMICO'}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {sandboxCalculations.isVaoSeguro 
                            ? `Este vão de ${calcVao}m está dentro do limite econômico ideal de ${sandboxCalculations.maxVao}m da tipologia.`
                            : `A tipologia exige vigas gigantescas ou grauteamentos caros para vãos acima de ${sandboxCalculations.maxVao}m.`
                          }
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      sandboxCalculations.isVaoSeguro ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {sandboxCalculations.isVaoSeguro ? 'Ideal ✓' : 'Atenção ⚠'}
                    </span>
                  </div>
                )}

                {/* Calculated Values Displays */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Viga Height */}
                  <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 shadow-md">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Altura Estimada Viga / Laje</span>
                    <p className="text-2xl font-black text-white mt-1">
                      {calcSystemId === 'alvenaria' ? 'N/A' : `${sandboxCalculations?.vigaHeight} cm`}
                    </p>
                    <span className="text-[9px] text-slate-400 block mt-1 font-mono">
                      {calcSystemId === 'alvenaria' ? 'Apoio na parede estrutural' : `Base L / ${sandboxCalculations?.divisorViga}`}
                    </span>
                  </div>

                  {/* Pilar Section Area */}
                  <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 shadow-md">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Área Mínima do Pilar</span>
                    <p className="text-2xl font-black text-white mt-1">
                      {calcSystemId === 'alvenaria' ? 'Parede Maciça' : `${sandboxCalculations?.pilarArea} cm²`}
                    </p>
                    <span className="text-[9px] text-slate-400 block mt-1 font-mono">
                      {calcSystemId === 'alvenaria' ? 'Não usa colunas' : `Mín. ${sandboxCalculations?.minLado} x ${sandboxCalculations?.minLado} cm`}
                    </span>
                  </div>

                  {/* Custo Indicador */}
                  <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 shadow-md">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Vão Máximo Recomendado</span>
                    <p className="text-2xl font-black text-cyan-400 mt-1">
                      {sandboxCalculations?.maxVao} metros
                    </p>
                    <span className="text-[9px] text-slate-400 block mt-1 font-mono">Limite para viabilidade</span>
                  </div>
                </div>

                {/* Concept advice banner */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
                  <Info className="text-cyan-400 w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Lembrete de Projeto:</strong>
                    Esses cálculos são baseados em pré-dimensionamento de rascunho de engenharia (gabarito). O cálculo estrutural definitivo com emissão de ART é obrigação civil exclusiva do Engenheiro de Estruturas credenciado.
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section with Search & Filtering */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide uppercase flex items-center gap-2">
                <SlidersHorizontal className="text-cyan-400 w-5 h-5" />
                <span>Catálogo de Sistemas & Tipologias</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Explore os dossiês técnicos detalhados com patologias de vistoria, manutenção periódica e clash detection.
              </p>
            </div>

            {/* Filtering Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-3.5 text-slate-500 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Pesquisar sistema, NBR ou defeito..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400 transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const scrollPos = window.scrollY;
                  // Set active category
                  document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('bg-cyan-500', 'text-slate-950'));
                  setSelectedCategory(cat);
                  // Keep scroll position
                  setTimeout(() => window.scrollTo(0, scrollPos), 2);
                }}
                className={`cat-pill px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                  ? 'bg-cyan-500 text-slate-950 border border-cyan-400' 
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Typology Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTypologies.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => handleOpenTypology(item)}
                className="bg-slate-850 p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-cyan-500/10 group flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl border border-slate-700/80 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-cyan-500/40 transition-transform">
                      <span>{item.icon}</span>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.categoria}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {item.definicao}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      Obra: {item.custoObra.includes('Ausência') ? '⚠️ Ausente' : item.custoObra.replace('R$ ', '')}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                    <span>Ver Dossiê</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}

            {filteredTypologies.length === 0 && (
              <div className="col-span-full py-16 text-center bg-slate-900 rounded-2xl border border-dashed border-slate-800">
                <ShieldAlert className="text-slate-600 w-12 h-12 mx-auto mb-3" />
                <h4 className="text-white font-bold text-base">Nenhum sistema predial encontrado</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Tente alterar os termos de pesquisa ou remover as pílulas de filtro de categorias.
                </p>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">
            Amorim Tech Engenharia & Sistemas Prediais
          </p>
          <p>© 2026 - Manual Técnico Unificado Bíblia Predial 4.0. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* COMPLETE EXHAUSTIVE MODAL/SLIDE-OVER */}
      <AnimatePresence>
        {activeTypology && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveTypology(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-850">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
                    {activeTypology.icon}
                  </div>
                  <div>
                    <div className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-1">
                      {activeTypology.categoria}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                      {activeTypology.titulo}
                    </h2>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Costs badge */}
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Custo Obra</span>
                    {activeTypology.custoObra.includes('Ausência') ? (
                      <span className="text-xs font-bold text-amber-500">⚠️ Ausente</span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400">{activeTypology.custoObra} / m²</span>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveTypology(null)}
                    className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-700/50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Sub-Navigation Tabs */}
              <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-800 bg-slate-900/60 px-4 pt-2">
                {[
                  { id: 'geral', label: 'Visão Geral', icon: BookOpen },
                  { id: 'patologias', label: 'Patologias & Exame', icon: ShieldAlert },
                  { id: 'predim', label: 'Pré-Dimensionamento', icon: Calculator },
                  { id: 'clash', label: 'Compatibilização (Clash)', icon: Flame },
                  { id: 'manutencao', label: 'Manutenção & Normas', icon: CalendarDays }
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-3.5 font-bold text-xs whitespace-nowrap uppercase tracking-wider border-b-2 transition-all ${
                        activeTab === tab.id
                        ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <IconComp className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Modal Body Container */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-slate-900 scroll-smooth space-y-6">
                
                {/* TAB 1: GERAL */}
                {activeTab === 'geral' && (
                  <div className="space-y-6 fade-in">
                    {/* Definition */}
                    <div className="bg-slate-850 p-6 rounded-xl border border-slate-800/80">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <BookOpen className="text-cyan-400 w-4 h-4" />
                        <span>Definição Técnica do Sistema</span>
                      </h3>
                      <RenderField value={activeTypology.definicao} label="Definição Técnica do Sistema" />
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/60">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Componentes Principais</h4>
                        <RenderField value={activeTypology.componentes} label="Componentes Principais" />
                      </div>
                      <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/60">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Aplicações Comuns</h4>
                        <RenderField value={activeTypology.aplicacoes} label="Aplicações Comuns" />
                      </div>
                    </div>

                    {/* Vantagens vs Desvantagens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-emerald-950/15 p-5 rounded-xl border border-emerald-500/20 border-l-4 border-l-emerald-500">
                        <h4 className="text-emerald-400 text-xs md:text-sm font-bold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Vantagens & Benefícios</span>
                        </h4>
                        <RenderField value={activeTypology.vantagens} label="Vantagens & Benefícios" />
                      </div>
                      <div className="bg-rose-950/15 p-5 rounded-xl border border-rose-500/20 border-l-4 border-l-rose-500">
                        <h4 className="text-rose-400 text-xs md:text-sm font-bold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Desvantagens & Gargalos</span>
                        </h4>
                        <RenderField value={activeTypology.desvantagens} label="Desvantagens & Gargalos" />
                      </div>
                    </div>

                    {/* Viabilidade do Canteiro */}
                    <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-800/60">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Logística e Viabilidade do Canteiro de Obras</h4>
                      <RenderField value={activeTypology.viabilidade} label="Logística e Viabilidade do Canteiro" />
                    </div>
                  </div>
                )}

                {/* TAB 2: PATOLOGIAS & EXAME */}
                {activeTab === 'patologias' && (
                  <div className="space-y-6 fade-in">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ShieldAlert className="text-rose-400 w-4 h-4" />
                        <span>Catálogo de Patologias & Manifestações Crônicas</span>
                      </h3>
                      <p className="text-xs text-slate-400 mb-4">
                        Tabela de sintomas visuais para reconhecimento imediato em vistorias periciais e laudos técnicos de engenharia civil.
                      </p>

                      {/* Pathologies Table */}
                      {isFieldMissing(activeTypology.patologias) ? (
                        <div className="bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl flex items-start gap-3">
                          <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">Catálogo de Patologias</h5>
                            <p className="text-amber-200/70 text-xs leading-relaxed">
                              ⚠️ <strong>Ausência de Informação de Patologias.</strong> Por favor, envie-nos o catálogo de sintomas, anomalias e causas raiz desta tipologia para inserção pericial na Bíblia Predial.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th>Anomalia / Falha</th>
                                <th>Sintoma Visual (Na Vistoria)</th>
                                <th>Mecânica da Causa Raiz</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80 text-xs">
                              {activeTypology.patologias.map((p: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-850/50">
                                  <td className="p-4 font-bold text-rose-400 whitespace-nowrap">{p.anomalia}</td>
                                  <td className="p-4 text-slate-300 whitespace-normal leading-relaxed">{p.sintoma}</td>
                                  <td className="p-4 text-slate-400 whitespace-normal leading-relaxed">{p.causa}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Diagnósticos Tradicional vs 4.0 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-850 p-5 rounded-xl border border-slate-800">
                        <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                          <FileText className="text-slate-400 w-4 h-4" />
                          <span>Métodos Diagnósticos Tradicionais (ABNT NBR)</span>
                        </h4>
                        <RenderField value={activeTypology.diagnostico} label="Métodos Diagnósticos Tradicionais" />
                      </div>

                      <div className="bg-cyan-950/10 p-5 rounded-xl border border-cyan-500/20">
                        <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span>Tecnologias Preditivas & Métodos 4.0</span>
                        </h4>
                        {isFieldMissing(activeTypology.tecnologias) ? (
                          <div className="bg-amber-950/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-2">
                            <AlertTriangle className="text-amber-500 w-4 h-4 shrink-0 mt-0.5" />
                            <p className="text-amber-200/70 text-xs leading-relaxed">
                              ⚠️ <strong>Ausência de Informação de Tecnologias.</strong> Envie os métodos de ensaios e tecnologias inovadoras aplicadas a esta tipologia.
                            </p>
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {activeTypology.tecnologias.map((t: string, idx: number) => (
                              <li key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                                <span className="text-cyan-400 select-none">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: PRÉ-DIMENSIONAMENTO */}
                {activeTab === 'predim' && (
                  <div className="space-y-6 fade-in">
                    <div className="bg-gradient-to-br from-slate-850 to-slate-900 p-6 rounded-xl border border-cyan-500/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 text-7xl pointer-events-none">
                        <Calculator className="w-20 h-20" />
                      </div>
                      
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
                        <Calculator className="text-cyan-400 w-4 h-4" />
                        <span>Regras Práticas de Concepção e Pré-Dimensionamento</span>
                      </h3>
                      {isFieldMissing(activeTypology.predimensionamentoText) ? (
                        <div className="bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl flex items-start gap-3 relative z-10">
                          <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">Pré-Dimensionamento</h5>
                            <p className="text-amber-200/70 text-xs leading-relaxed">
                              ⚠️ <strong>Ausência de Informação de Pré-Dimensionamento.</strong> Por favor, envie-nos as regras práticas de pré-dimensionamento, fórmulas ou limites geométricos recomendados para esta tipologia.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="text-xs md:text-sm text-slate-300 leading-relaxed space-y-3 relative z-10"
                          dangerouslySetInnerHTML={{ __html: activeTypology.predimensionamentoText }}
                        />
                      )}
                    </div>

                    {/* Integrated mini calculator for structural systems */}
                    {activeTypology.calcData && modalCalculations && (
                      <div className="bg-slate-950/60 p-6 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Binary className="w-4 h-4" />
                          <span>Widget de Simulação Rápida para: {activeTypology.titulo}</span>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Vão Desejado (m)</label>
                            <input 
                              type="number"
                              value={modalCalcVao}
                              onChange={(e) => setModalCalcVao(Math.max(1, parseFloat(e.target.value) || 0))}
                              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-xs outline-none focus:border-cyan-400 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Andares</label>
                            <input 
                              type="number"
                              value={modalCalcPav}
                              onChange={(e) => setModalCalcPav(Math.max(1, parseInt(e.target.value) || 0))}
                              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-xs outline-none focus:border-cyan-400 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Área de Pilar (m²)</label>
                            <input 
                              type="number"
                              value={modalCalcArea}
                              onChange={(e) => setModalCalcArea(Math.max(1, parseFloat(e.target.value) || 0))}
                              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-xs outline-none focus:border-cyan-400 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Uso do Prédio</label>
                            <select 
                              value={modalCalcUso}
                              onChange={(e) => setModalCalcUso(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-xs outline-none focus:border-cyan-400"
                            >
                              <option value="res">Residencial</option>
                              <option value="com">Comercial</option>
                            </select>
                          </div>
                        </div>

                        {/* Calculations Results */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Altura Viga/Laje</span>
                            <p className="text-xl font-bold text-white mt-1">{modalCalculations.vigaHeight} cm</p>
                          </div>
                          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Área do Pilar</span>
                            <p className="text-xl font-bold text-white mt-1">{modalCalculations.pilarArea} cm²</p>
                            <span className="text-[9px] text-slate-400 block mt-0.5">Sugerido: {modalCalculations.minLado}x{modalCalculations.minLado} cm</span>
                          </div>
                          <div className={`p-4 rounded-lg border flex items-center justify-between ${
                            modalCalculations.isVaoSeguro ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-950/10 border-rose-500/20 text-rose-400'
                          }`}>
                            <div>
                              <span className="text-[10px] text-slate-500 font-bold uppercase block">Status do Vão</span>
                              <span className="text-xs font-bold">{modalCalculations.isVaoSeguro ? 'VÃO RECOMENDADO ✓' : 'FALHA DE VIABILIDADE ⚠'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: COMPATIBILIZAÇÃO */}
                {activeTab === 'clash' && (
                  <div className="space-y-6 fade-in">
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Flame className="text-amber-500 w-4 h-4" />
                        <span>Matriz de Conflitos e Clash Detection (MEP vs. Civil)</span>
                      </h3>
                      <p className="text-xs text-slate-400 mb-6">
                        Exame de interferências físicas típicas no canteiro e como modelar barreiras e desvios para mitigar custos de demolição pós-concretagem.
                      </p>

                      {isFieldMissing(activeTypology.conflitos) ? (
                        <div className="bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl flex items-start gap-3">
                          <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">Compatibilização (Clash)</h5>
                            <p className="text-amber-200/70 text-xs leading-relaxed">
                              ⚠️ <strong>Ausência de Informação de Compatibilização (Clash).</strong> Por favor, envie-nos os principais conflitos recorrentes e soluções recomendadas entre esta tipologia e os demais sistemas prediais.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {activeTypology.conflitos.map((c: any, idx: number) => (
                            <div key={idx} className="bg-slate-850 p-6 rounded-xl border border-slate-800 shadow-md">
                              <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                <CornerDownRight className="text-cyan-400 w-4 h-4 shrink-0" />
                                <span>{c.conflito || c.clash}</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
                                <div className="bg-emerald-950/15 p-4 rounded-lg border border-emerald-500/20">
                                  <strong className="text-emerald-400 block mb-1 uppercase tracking-wider">✓ Resolução em Projeto (BIM / Prancheta)</strong>
                                  <p className="text-slate-300 leading-relaxed">{c.prevencao || c.preventivo}</p>
                                </div>
                                <div className="bg-blue-950/15 p-4 rounded-lg border border-blue-500/20">
                                  <strong className="text-blue-400 block mb-1 uppercase tracking-wider">⚠ Ação Mitigadora Corretiva na Obra (Canteiro)</strong>
                                  <p className="text-slate-300 leading-relaxed">{c.mitigacao}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 5: MANUTENÇÃO & NORMAS */}
                {activeTab === 'manutencao' && (
                  <div className="space-y-6 fade-in">
                    {/* Maintenance Schedule Table */}
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CalendarDays className="text-cyan-400 w-4 h-4" />
                        <span>Cronograma Parametrizado de Gestão da Manutenção</span>
                      </h3>
                      <p className="text-xs text-slate-400 mb-4">
                        Cronograma de atividades preventivas recomendadas para manter o sistema operando dentro dos limites de Vida Útil de Projeto (VUP) conforme a NBR 5674.
                      </p>

                      {isFieldMissing(activeTypology.manutencao) ? (
                        <div className="bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl flex items-start gap-3">
                          <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">Gestão da Manutenção</h5>
                            <p className="text-amber-200/70 text-xs leading-relaxed">
                              ⚠️ <strong>Ausência de Cronograma de Atividades de Manutenção.</strong> Envie-nos o plano de operações e periodicidade de manutenção preventivo-corretiva para inclusão nos padrões técnicos.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th>Atividade / Operação Preventiva</th>
                                <th>Periodicidade</th>
                                <th>Diretriz de Execução Recomendada</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80 text-xs">
                              {activeTypology.manutencao.map((m: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-850/50">
                                  <td className="p-4 font-bold text-white whitespace-normal">{m.atividade}</td>
                                  <td className="p-4 whitespace-nowrap">
                                    <span className="bg-cyan-950 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                      {m.periodicidade}
                                    </span>
                                  </td>
                                  <td className="p-4 text-slate-400 whitespace-normal leading-relaxed">{m.recomendacao}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Specific ABNT Standards */}
                    <div className="bg-slate-850 p-6 rounded-xl border border-slate-800">
                      <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText className="text-slate-400 w-4 h-4" />
                        <span>Arcabouço Regulador e Normativo (ABNT NBR Específico)</span>
                      </h4>
                      <p className="text-xs text-slate-400 mb-4">
                        Estas normas nacionais regulamentam especificamente o cálculo, execução e controle de qualidade desta tipologia construtiva.
                      </p>
                      {isFieldMissing(activeTypology.normas) ? (
                        <div className="bg-amber-950/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-2">
                          <AlertTriangle className="text-amber-500 w-4 h-4 shrink-0 mt-0.5" />
                          <p className="text-amber-200/70 text-xs leading-relaxed">
                            ⚠️ <strong>Ausência de Normas Específicas Catalogadas.</strong> Envie as principais normas ABNT aplicáveis a esta tipologia.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {activeTypology.normas.map((n: string, idx: number) => (
                            <span key={idx} className="bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
                              {n}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-slate-800 bg-slate-850/80 flex items-center justify-between text-xs text-slate-500">
                <span>Plataforma Bíblia Predial 4.0 — Amorim Tech</span>
                <button 
                  onClick={() => setActiveTypology(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-xl transition-all border border-slate-700 hover:border-slate-600"
                >
                  Fechar Dossiê
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
