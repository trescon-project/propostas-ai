'use client';

const ASSETS = {
    BG: '/assets/background-2.png',
};

import { GlassBox } from "@/components/ui/GlassBox";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DiamondIcon from '@mui/icons-material/Diamond';

interface HistorySlideProps {
    title: string;
    text: string;
    className?: string;
}

export default function HistorySlide({
    title,
    text,
    className
}: HistorySlideProps) {
    // Process text to handle newlines
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');

    return (
        <div className={`relative w-full h-full bg-[#bfbfbf] overflow-hidden font-poppins ${className}`}>

            {/* Background Image with Scale Animation */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-scaleIn z-0"
                style={{ backgroundImage: `url(${ASSETS.BG})` }}
            />



            {/* Left Content Container - History */}
            <div className="absolute left-[5.5%] top-[15%] w-[40%] h-[80%] flex flex-col justify-center z-20 text-white">

                {/* Title */}
                <h2 className="text-[4vh] font-bold mb-[3vh] leading-tight animate-slideUp text-blue-400">
                    {title}
                </h2>

                {/* Text Content */}
                <div className="space-y-[2vh] overflow-y-auto pr-4 scrollbar-hide">
                    {paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="text-[2vh] leading-relaxed font-light text-gray-200 animate-slideUp"
                            style={{ animationDelay: `${(index + 1) * 200}ms` }}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* Right Content Container - Mission, Vision, Values */}
            <div className="absolute right-[5.5%] top-[15%] w-[45%] h-[80%] flex flex-col justify-center gap-6 z-20">
                <GlassBox className="p-8 animate-slideLeft hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <RocketLaunchIcon className="text-blue-400 text-[3vh]" />
                        <h3 className="text-[2.5vh] font-bold text-white">Missão</h3>
                    </div>
                    <p className="text-[1.8vh] font-light text-gray-200 leading-relaxed">
                        Prover soluções de qualidade e sucesso em todos os projetos, impactando positivamente o mercado de TI, com foco nos resultados dos nossos clientes, colaboradores e parceiros, preparando-os para o futuro, com total compromisso e inovação.
                    </p>
                </GlassBox>

                <GlassBox className="p-8 animate-slideLeft delay-100 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <VisibilityIcon className="text-blue-400 text-[3vh]" />
                        <h3 className="text-[2.5vh] font-bold text-white">Visão</h3>
                    </div>
                    <p className="text-[1.8vh] font-light text-gray-200 leading-relaxed">
                        Acreditamos que as melhores soluções de tecnologia são aquelas que refletem perfeitamente a realidade do mercado e do negócio. Investimos e envidamos esforços contínuos para aperfeiçoar, sendo por tecnologias próprias ou de parceiros, a implementação de qualidade, desempenho e resultados expressivos em cada etapa dos nossos projetos. Trabalhamos firmemente para se manter referência em qualidade, profissionalismo e em soluções que transformam e impactam positivamente os nossos clientes.
                    </p>
                </GlassBox>

                <GlassBox className="p-8 animate-slideLeft delay-200 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-2">
                        <DiamondIcon className="text-blue-400 text-[3vh]" />
                        <h3 className="text-[2.5vh] font-bold text-white">Valores</h3>
                    </div>
                    <p className="text-[1.8vh] font-light text-gray-200 leading-relaxed">
                        Cremos e utilizamos preceitos de ética, sustentabilidade e governança que nos norteiam, através de valores que estão declarados em nosso Código de Ética e Comportamento, seriedade, valorização de nossos colaboradores, responsabilidade social e respeito à natureza e ecologia.
                    </p>
                </GlassBox>
            </div>
        </div>
    );
}
