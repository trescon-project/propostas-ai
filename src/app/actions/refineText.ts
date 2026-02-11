'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function refineTextAction(currentText: string, context: string) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return { success: false, error: 'API Key not configured' };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Changed to stable model

        const prompt = `
        Você é um redator especializado em propostas comerciais de alto impacto.
        Melhore o seguinte texto mantendo-o conciso e profissional, levando em conta o contexto geral da proposta.
        
        CONTEXTO GERAL:
        "${context}"
        
        TEXTO PARA MELHORAR:
        "${currentText}"
        
        Responda APENAS com o texto melhorado, sem explicações ou aspas.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        return { success: true, text };
    } catch (error: any) {
        console.error('Refine Text Error:', error);
        return { success: false, error: error.message || 'Erro ao processar com IA' };
    }
}
