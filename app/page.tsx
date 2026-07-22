"use client";

import { useEffect, useRef, useState } from "react";

type SegmentKey = "health" | "law" | "realty";

type Segment = {
  key: SegmentKey;
  tab: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  cta: string;
  secondaryCta: string;
  badge: string;
  professional: string;
  role: string;
  initials: string;
  metrics: { value: number; prefix?: string; suffix?: string; label: string }[];
  aboutTitle: string;
  aboutText: string;
  services: { icon: string; title: string; text: string }[];
  quote: string;
  author: string;
  authorRole: string;
  contactTitle: string;
  contactText: string;
};

const segments: Record<SegmentKey, Segment> = {
  health: {
    key: "health",
    tab: "Saúde",
    eyebrow: "Cuidado que começa antes da consulta",
    title: "Seu sorriso merece um cuidado",
    titleAccent: "feito para você.",
    subtitle: "Odontologia humanizada, tecnologia de ponta e um plano de tratamento pensado para devolver sua confiança.",
    cta: "Agendar uma avaliação",
    secondaryCta: "Conheça a clínica",
    badge: "Atendimento acolhedor",
    professional: "Dra. Helena Duarte",
    role: "Cirurgiã-dentista · CRO 00.000",
    initials: "HD",
    metrics: [
      { value: 12, suffix: "+", label: "anos de experiência" },
      { value: 2400, suffix: "+", label: "sorrisos transformados" },
      { value: 98, suffix: "%", label: "de satisfação" },
      { value: 4.9, label: "avaliação no Google" },
    ],
    aboutTitle: "Excelência clínica com um olhar humano",
    aboutText: "Acreditamos que uma boa experiência transforma a relação com a saúde. Por isso, unimos escuta atenta, diagnóstico preciso e tratamentos modernos em um ambiente leve e seguro.",
    services: [
      { icon: "✦", title: "Implantes", text: "Planejamento digital para recuperar função, conforto e segurança." },
      { icon: "◌", title: "Estética dental", text: "Soluções naturais que respeitam a harmonia de cada sorriso." },
      { icon: "◇", title: "Ortodontia", text: "Alinhadores e tratamentos personalizados para todas as idades." },
    ],
    quote: "Eu tinha muito medo de dentista. Desde o primeiro contato, me senti ouvida e segura. O resultado ficou mais natural do que eu imaginava.",
    author: "Marina Carvalho",
    authorRole: "Paciente da clínica",
    contactTitle: "Vamos cuidar do seu sorriso?",
    contactText: "Dê o primeiro passo. Nossa equipe responde em poucos minutos.",
  },
  law: {
    key: "law",
    tab: "Jurídico",
    eyebrow: "Estratégia jurídica com clareza",
    title: "Decisões seguras começam com",
    titleAccent: "orientação precisa.",
    subtitle: "Assessoria jurídica próxima, transparente e estratégica para proteger seus direitos e o futuro do seu negócio.",
    cta: "Falar com um especialista",
    secondaryCta: "Áreas de atuação",
    badge: "Sigilo e transparência",
    professional: "Almeida & Prado",
    role: "Advocacia estratégica · OAB/SP 0000",
    initials: "A&P",
    metrics: [
      { value: 18, suffix: "+", label: "anos de atuação" },
      { value: 850, suffix: "+", label: "casos conduzidos" },
      { value: 96, suffix: "%", label: "de acordos favoráveis" },
      { value: 24, suffix: "h", label: "para o primeiro retorno" },
    ],
    aboutTitle: "Rigor técnico, relações transparentes",
    aboutText: "Traduzimos cenários complexos em caminhos claros. Cada caso recebe análise profunda, comunicação direta e uma estratégia construída para gerar segurança em cada decisão.",
    services: [
      { icon: "§", title: "Direito empresarial", text: "Prevenção de riscos e suporte jurídico para empresas em crescimento." },
      { icon: "⌂", title: "Direito imobiliário", text: "Segurança em contratos, negociações e regularizações patrimoniais." },
      { icon: "◎", title: "Direito de família", text: "Condução sensível, discreta e responsável para questões pessoais." },
    ],
    quote: "A equipe tornou um processo difícil muito mais claro. Sempre soube o que estava acontecendo e quais seriam os próximos passos.",
    author: "Ricardo Mendes",
    authorRole: "Cliente empresarial",
    contactTitle: "Seu caso merece uma estratégia sólida.",
    contactText: "Conte brevemente sua situação e receba uma orientação inicial.",
  },
  realty: {
    key: "realty",
    tab: "Imóveis",
    eyebrow: "Curadoria de imóveis extraordinários",
    title: "O próximo capítulo da sua vida",
    titleAccent: "começa aqui.",
    subtitle: "Imóveis selecionados, negociação inteligente e acompanhamento completo para você encontrar o lugar certo.",
    cta: "Encontrar meu imóvel",
    secondaryCta: "Ver oportunidades",
    badge: "Curadoria personalizada",
    professional: "Caio Nogueira",
    role: "Especialista imobiliário · CRECI 00000-F",
    initials: "CN",
    metrics: [
      { value: 320, suffix: "+", label: "imóveis vendidos" },
      { value: 180, prefix: "R$ ", suffix: "M", label: "em negócios fechados" },
      { value: 14, label: "dias para vender" },
      { value: 97, suffix: "%", label: "de clientes indicam" },
    ],
    aboutTitle: "Muito além de abrir portas",
    aboutText: "Entendemos seu momento, filtramos as melhores oportunidades e cuidamos de cada detalhe da negociação. Menos visitas sem sentido, mais decisões confiantes.",
    services: [
      { icon: "⌂", title: "Compra personalizada", text: "Uma busca guiada pelo seu estilo de vida, objetivos e orçamento." },
      { icon: "↗", title: "Venda estratégica", text: "Posicionamento, apresentação e negociação para valorizar seu imóvel." },
      { icon: "▦", title: "Investimentos", text: "Análise de oportunidades com visão de rentabilidade e patrimônio." },
    ],
    quote: "Caio entendeu exatamente o que buscávamos. Visitamos apenas quatro imóveis e o quarto era a nossa casa. O processo foi impecável.",
    author: "Ana e Guilherme",
    authorRole: "Compradores",
    contactTitle: "Qual imóvel combina com o seu momento?",
    contactText: "Conte o que você procura. A curadoria começa por você.",
  },
};

const tourSteps = [
  { target: "header", title: "Três negócios, três experiências", text: "Use as abas para comparar como estratégia, texto e visual mudam para cada público." },
  { target: "hero", title: "A primeira impressão", text: "O hero comunica a promessa principal e conduz o visitante para uma ação clara." },
  { target: "metrics", title: "Confiança em números", text: "Resultados concretos reduzem a insegurança e aumentam a credibilidade da oferta." },
  { target: "services", title: "Valor fácil de entender", text: "Os serviços organizam a oferta e ajudam o cliente a se identificar rapidamente." },
];

function useCountUp(value: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, active]);

  return Number.isInteger(value) ? Math.round(count) : count.toFixed(1);
}

function Metric({ metric, active }: { metric: Segment["metrics"][number]; active: boolean }) {
  const count = useCountUp(metric.value, active);
  return (
    <div className="metric">
      <strong>{metric.prefix}{typeof count === "number" ? count.toLocaleString("pt-BR") : count}{metric.suffix}</strong>
      <span>{metric.label}</span>
    </div>
  );
}

export default function Home() {
  const [segmentKey, setSegmentKey] = useState<SegmentKey>("health");
  const [explainMode, setExplainMode] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const metricsRef = useRef<HTMLElement>(null);
  const segment = segments[segmentKey];

  useEffect(() => {
    const seen = localStorage.getItem("vitrine-tour-seen");
    if (!seen) {
      const timer = window.setTimeout(() => setTourOpen(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setMetricsVisible(true);
    }, { threshold: 0.25 });
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, [segmentKey]);

  useEffect(() => {
    setMetricsVisible(false);
    window.setTimeout(() => setMetricsVisible(true), 80);
  }, [segmentKey]);

  const closeTour = () => {
    setTourOpen(false);
    localStorage.setItem("vitrine-tour-seen", "true");
  };

  const nextTourStep = () => {
    if (tourStep === tourSteps.length - 1) closeTour();
    else setTourStep((step) => step + 1);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className={`site theme-${segmentKey} ${explainMode ? "is-explaining" : ""}`}>
      <header className="topbar" data-tour="header">
        <button className="brand" onClick={() => scrollTo("inicio")} aria-label="Voltar ao início">
          <span className="brand-mark">V</span><span>VITRINE<small>experiências que convertem</small></span>
        </button>
        <nav className="tabs" aria-label="Modelos de landing page">
          {(Object.keys(segments) as SegmentKey[]).map((key) => (
            <button key={key} className={segmentKey === key ? "active" : ""} onClick={() => setSegmentKey(key)}>
              {segments[key].tab}
            </button>
          ))}
        </nav>
        <button className={`explain-toggle ${explainMode ? "active" : ""}`} onClick={() => setExplainMode(!explainMode)}>
          <span>?</span><em>Modo explicação</em><i aria-hidden="true" />
        </button>
      </header>

      <section className="hero" id="inicio" data-tour="hero">
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        <div className="hero-copy">
          <span className="eyebrow"><i />{segment.eyebrow}</span>
          <h1>{segment.title}<br /><em>{segment.titleAccent}</em></h1>
          <p>{segment.subtitle}</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => scrollTo("contato")}>{segment.cta}<span>→</span></button>
            <button className="secondary" onClick={() => scrollTo("sobre")}>{segment.secondaryCta}</button>
          </div>
          <div className="trust-row"><span>✓ Sem compromisso</span><span>✓ Atendimento personalizado</span></div>
        </div>
        <div className="portrait-wrap" aria-label={segment.professional}>
          <div className="portrait-card">
            <div className="portrait-art"><span>{segment.initials}</span><i className="portrait-ring" /></div>
            <div className="professional-card">
              <span className="avatar">{segment.initials.slice(0, 1)}</span>
              <div><strong>{segment.professional}</strong><small>{segment.role}</small></div>
              <b>✓</b>
            </div>
          </div>
          <div className="floating-badge"><span>♡</span><div><strong>{segment.badge}</strong><small>Você em primeiro lugar</small></div></div>
        </div>
        {explainMode && <Explain label="Hero" text="Promessa clara + benefício emocional + uma ação principal." />}
      </section>

      <section className="metrics-section" ref={metricsRef} data-tour="metrics">
        <div className="metrics-grid">
          {segment.metrics.map((metric) => <Metric key={metric.label} metric={metric} active={metricsVisible} />)}
        </div>
        {explainMode && <Explain label="Prova em números" text="Métricas tornam a experiência e os resultados mais concretos." />}
      </section>

      <section className="about section" id="sobre">
        <div className="section-kicker">Sobre</div>
        <div className="about-grid">
          <h2>{segment.aboutTitle}</h2>
          <div><p>{segment.aboutText}</p><button className="text-link">Conheça nossa história <span>↗</span></button></div>
        </div>
        <div className="values-strip">
          <span><i>01</i>Escuta genuína</span><span><i>02</i>Excelência em cada detalhe</span><span><i>03</i>Relações de confiança</span>
        </div>
        {explainMode && <Explain label="Sobre nós" text="Apresenta valores e cria conexão antes de falar sobre serviços." />}
      </section>

      <section className="services section" id="servicos" data-tour="services">
        <div className="section-heading">
          <div><span className="section-kicker">Especialidades</span><h2>Como podemos ajudar</h2></div>
          <p>Soluções pensadas para o que você precisa hoje — e para onde deseja chegar.</p>
        </div>
        <div className="service-grid">
          {segment.services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span className="service-number">0{index + 1}</span><i className="service-icon">{service.icon}</i>
              <h3>{service.title}</h3><p>{service.text}</p><button aria-label={`Saiba mais sobre ${service.title}`}>Saiba mais <span>→</span></button>
            </article>
          ))}
        </div>
        {explainMode && <Explain label="Serviços" text="Cards escaneáveis ajudam o visitante a encontrar a solução certa." />}
      </section>

      <section className="testimonial section">
        <span className="quote-mark">“</span>
        <blockquote>{segment.quote}</blockquote>
        <div className="quote-author"><span>{segment.author.charAt(0)}</span><div><strong>{segment.author}</strong><small>{segment.authorRole}</small></div><b>★★★★★</b></div>
        {explainMode && <Explain label="Prova social" text="A voz de clientes reais reduz objeções e gera identificação." />}
      </section>

      <section className="contact section" id="contato">
        <div><span className="section-kicker">Vamos conversar</span><h2>{segment.contactTitle}</h2><p>{segment.contactText}</p></div>
        <button className="contact-button">Iniciar conversa <span>↗</span></button>
        {explainMode && <Explain label="CTA final" text="Repete o próximo passo no momento em que o visitante está mais convencido." />}
      </section>

      <footer>
        <div className="brand"><span className="brand-mark">V</span><span>VITRINE<small>experiências que convertem</small></span></div>
        <p>Este é um projeto demonstrativo. Todos os dados são fictícios.</p>
        <button onClick={() => scrollTo("inicio")}>Voltar ao topo ↑</button>
      </footer>

      {tourOpen && (
        <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Tour pelo site">
          <div className="tour-card">
            <div className="tour-top"><span>{String(tourStep + 1).padStart(2, "0")} / {String(tourSteps.length).padStart(2, "0")}</span><button onClick={closeTour}>Pular tour ×</button></div>
            <span className="tour-icon">✦</span>
            <h2>{tourSteps[tourStep].title}</h2><p>{tourSteps[tourStep].text}</p>
            <div className="tour-bottom"><div>{tourSteps.map((_, index) => <i key={index} className={index === tourStep ? "active" : ""} />)}</div><button onClick={nextTourStep}>{tourStep === tourSteps.length - 1 ? "Explorar site" : "Próximo"} <span>→</span></button></div>
          </div>
        </div>
      )}
    </main>
  );
}

function Explain({ label, text }: { label: string; text: string }) {
  return <aside className="explain"><strong>{label}</strong><p>{text}</p></aside>;
}
