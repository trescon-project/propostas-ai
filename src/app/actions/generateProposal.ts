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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest', generationConfig: { responseMimeType: "application/json" } });

    const prompt = `
    Você é um Arquiteto de Soluções e Especialista em Vendas B2B.
    Seu objetivo é gerar o conteúdo de uma proposta comercial de alto impacto baseada no seguinte contexto do cliente:

    CONTEXTO:
    "${context}"

    Gere um JSON estritamente com a seguinte estrutura para preencher os slides da proposta. 
    Seja persuasivo, profissional e use termos técnicos adequados.
    
    ESTRUTURA JSON:
    {
      "home": {
        "title": "Título curto e impactante da proposta",
        "subtitle": "Subtítulo focado em valor"
      },
      "challenge": {
        "title": "Título do Slide de Desafio (ex: O Cenário Atual)",
        "description": "Descrição concisa do problema/dor do cliente (max 30 palavras para caber no slide)."
      },
      "solution": {
        "title": "Título da Solução (ex: Arquitetura Cloud Native)",
        "description": "Descrição da solução técnica e estratégica proposta (max 60 palavras).",
        "features": [
           { "title": "Destaque 1", "description": "Breve detalhe" },
           { "title": "Destaque 2", "description": "Breve detalhe" }
        ]
      },
      "pricing": {
        "totalValue": "Valor estimado (ex: R$ 150.000,00)",
        "features": ["Benefício 1 (ex: Time Senior)", "Benefício 2 (ex: 4 Semanas)"],
        "deliverables": [
          { "title": "Entregável 1", "description": "Descrição curta" },
          { "title": "Entregável 2", "description": "Descrição curta" },
          { "title": "Entregável 3", "description": "Descrição curta" }
        ]
      },
      "methodology": {
        "title": "Nossa Abordagem",
        "steps": [
            { "id": "discovery", "label": "Discovery", "description": "Descrição adaptada ao contexto do cliente" },
            { "id": "definicao", "label": "Definição", "description": "Descrição adaptada" },
            { "id": "desenvolvimento", "label": "Desenvolvimento", "description": "Descrição adaptada" },
            { "id": "entrega", "label": "Entrega", "description": "Descrição adaptada" },
            { "id": "acompanhamento", "label": "Acompanhamento", "description": "Descrição adaptada" }
        ]
      },
      "workPlan": {
        "title": "Plano de Trabalho",
        "weeks": [
            { "label": "SEMANA 1", "date": "Data estimada" },
            { "label": "SEMANA 2", "date": "Data estimada" },
            { "label": "SEMANA 3", "date": "Data estimada" },
            { "label": "SEMANA 4", "date": "Data estimada" },
            { "label": "SEMANA 5", "date": "Data estimada" },
            { "label": "SEMANA 6", "date": "Data estimada" }
        ],
        "phases": [
            { "label": "Imersão", "start": 0.1, "width": 0.8, "color": "purple" },
            { "label": "Execução", "start": 1.1, "width": 3.8, "color": "blue" },
            { "label": "Encerramento", "start": 5.1, "width": 0.8, "color": "purple" }
        ]
      },
      "weeklyDetails": [
        {
            "id": 1,
            "title": "Fase Inicial",
            "subtitle": "Subtítulo da semana 1",
            "actions": ["Ação 1", "Ação 2"],
            "deliverables": ["Entregável da semana"],
            "team3con": ["Papel 1", "Papel 2"],
            "teamClient": ["Papel 1"]
        },
        {
            "id": 2,
            "title": "Fase de Execução",
            "subtitle": "Subtítulo da semana 2",
            "actions": ["Ação 1", "Ação 2"],
            "deliverables": ["Entregável da semana"],
            "team3con": ["Papel 1", "Papel 2"],
            "teamClient": ["Papel 1"]
        }
      ]
    }
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini Raw Response:", text);

    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse JSON safely
    const data = JSON.parse(cleanText);
    return { success: true, data };

  } catch (error) {
    console.error('Gemini API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    return { success: false, error: errorMessage };
  }
}
