'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel, EffectFade } from 'swiper/modules';
import HomeSlide from '@/components/templates/HomeSlide';
import HistorySlide from '@/components/templates/HistorySlide';
import ChallengeSlide from '@/components/templates/ChallengeSlide';
import SolutionSlide from '@/components/templates/SolutionSlide';
import MethodologySlide from '@/components/templates/MethodologySlide';
import WorkPlanSlide from '@/components/templates/WorkPlanSlide';
import WorkPlanDrilldownSlide from '@/components/templates/WorkPlanDrilldownSlide';
import InitialFlowsSlide from '@/components/templates/InitialFlowsSlide';
import PricingSlide from '@/components/templates/PricingSlide';
import { WEEKS_DETAIL } from '@/data/weeks';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const PROPOSAL_TITLE = "Migração Cloud AWS";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-screen h-screen bg-black" />;

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Mousewheel, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        mousewheel={true}
        className="w-full h-full"
      >
        <SwiperSlide className="w-full h-full">
          <HomeSlide title={PROPOSAL_TITLE} date="05/02/2026" className="w-full h-full" />
        </SwiperSlide>

        {/* Slide 02 - Nossa História */}
        <SwiperSlide className="w-full h-full">
          <HistorySlide
            title="Nossa história"
            text={`Com mais de 30 anos de expertise, a 3CON se consolidou como uma referência em soluções tecnológicas inovadoras. Desde 1993, nossa missão tem sido transformar os negócios de nossos clientes, aumentando sua eficiência operacional e produtividade por meio de soluções digitais sob medida. A cada ano, evoluímos para nos tornar uma das principais empresas de inovação no Brasil, com um compromisso firme em antecipar tendências e focar na experiência do usuário.

Somos uma Plataforma de Inovação com foco em criar soluções que impulsionam a transformação digital e a eficiência dos nossos clientes. Nossos projetos são guiados pela combinação de pesquisa, prototipação e desenvolvimento ágil, proporcionando resultados concretos e mensuráveis.

Nosso diferencial está na capacidade de conectar inovação, estratégia e tecnologia. No nosso Laboratório de Inovação, realizamos experimentos e estudos para validar a viabilidade de novos projetos, garantindo um desenvolvimento rápido, com custos reduzidos e tecnologias de ponta aplicadas de forma eficaz.`}
            className="w-full h-full"
          />
        </SwiperSlide>

        {/* Slide 03 - Desafio */}
        <SwiperSlide className="w-full h-full">
          <ChallengeSlide proposalTitle={PROPOSAL_TITLE} className="w-full h-full" />
        </SwiperSlide>

        {/* Slide 04 - Solução */}
        <SwiperSlide className="w-full h-full">
          <SolutionSlide
            title="Arquitetura de Microserviços Escalável"
            description={`A 3CON propõe uma reestruturação completa do ambiente legado para uma arquitetura baseada em microserviços na AWS. 

Esta abordagem permitirá:
1. Desacoplamento de funcionalidades críticas, reduzindo riscos de indisponibilidade.
2. Escalabilidade automática (Auto Scaling) para suportar picos de acesso sem degradação de performance.
3. Otimização de custos através do uso de instâncias Spot e serviços serverless (AWS Lambda).

Utilizaremos o Amazon EKS (Kubernetes) para orquestração, garantindo portabilidade e gestão eficiente dos containers. A segurança será reforçada com AWS WAF e Shield, protegendo a aplicação contra ameaças externas.`}
            className="w-full h-full"
          />
        </SwiperSlide>



        {/* Slide 06 - Metodologia */}
        <SwiperSlide className="w-full h-full">
          <MethodologySlide className="w-full h-full" />
        </SwiperSlide>

        {/* Slide 06 - Plano de Trabalho */}
        <SwiperSlide className="w-full h-full">
          <WorkPlanSlide className="w-full h-full" />
        </SwiperSlide>

        {/* Slides 07+ - Detalhe do Plano (Weeks 1-6) */}
        {WEEKS_DETAIL.map((week) => (
          <SwiperSlide key={week.id} className="w-full h-full">
            <WorkPlanDrilldownSlide week={week} className="w-full h-full" />
          </SwiperSlide>
        ))}

        <SwiperSlide className="w-full h-full">
          <InitialFlowsSlide className="w-full h-full" />
        </SwiperSlide>

        {/* Slide 09 - Investimento */}
        <SwiperSlide className="w-full h-full">
          <PricingSlide className="w-full h-full" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
