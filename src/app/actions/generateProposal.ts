'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateProposalAction(context: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return { success: false, error: 'Chave de API (GEMINI_API_KEY) não configurada no servidor.' };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: { responseMimeType: "application/json" } });

    const prompt = `
    Você é um Arquiteto de Soluções e Especialista em Vendas B2B.
    Seu objetivo é gerar o conteúdo de uma proposta comercial de alto impacto baseada no seguinte contexto do cliente:

    CONTEXTO:
    "${context}"

    Gere um JSON estritamente com a estrutura de um ARRAY de objetos (slides).
    Cada objeto deve ter "type" (string) e "content" (objeto).
    
    ESTRUTURA JSON (Array):
    [
      {
        "type": "home",
        "content": {
          "title": "Título curto e impactante",
          "subtitle": "Subtítulo de valor",
          "date": "Data (DD/MM/YYYY)"
        }
      },
      {
        "type": "challenge",
        "content": {
          "title": "O Cenário / Desafio",
          "description": "Descrição do problema (max 30 palavras)",
          "points": ["Dor 1", "Dor 2", "Dor 3"]
        }
      },
      {
        "type": "solution",
        "content": {
          "title": "Nossa Solução",
          "description": "Resumo da solução (max 60 palavras)",
          "features": [
            { "title": "Destaque 1", "description": "Detalhe" },
            { "title": "Destaque 2", "description": "Detalhe" }
          ]
        }
      },
      {
        "type": "methodology",
        "content": {
          "title": "Nossa Abordagem",
          "steps": [
             { "label": "Discovery", "description": "Descrição..." },
             { "label": "Definição", "description": "Descrição..." },
             { "label": "Desenvolvimento", "description": "Descrição..." },
             { "label": "Entrega", "description": "Descrição..." },
             { "label": "Acompanhamento", "description": "Descrição..." }
          ]
        }
      },
      {
        "type": "pricing",
        "content": {
          "title": "Investimento",
          "totalValue": "R$ Valor",
          "features": ["Benefício 1", "Benefício 2"],
          "deliverables": ["Entregável 1", "Entregável 2"]
        }
      },
      {
        "type": "work_plan",
        "content": {
          "title": "Cronograma",
          "weeks": [
             { "title": "Fase 1", "mainActivity": "Atividade chave" },
             { "title": "Fase 2", "mainActivity": "Atividade chave" },
             { "title": "Fase 3", "mainActivity": "Atividade chave" }
          ]
        }
      }
    ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const slidesData = JSON.parse(cleanText);

    // Ensure IDs are present
    const slidesWithIds = Array.isArray(slidesData) ? slidesData.map((slide: any) => ({
      ...slide,
      id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      extraContent: []
    })) : [];

    return { success: true, data: slidesWithIds };

  } catch (error) {
    console.error('Gemini API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    return { success: false, error: errorMessage };
  }
}
