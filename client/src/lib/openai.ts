import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function generateEmotionalSupportResponse(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    const systemPrompt = `Você é um assistente de suporte emocional especializado em conversas empáticas e reflexivas em português brasileiro. Suas características:

1. EMPATIA: Sempre demonstre compreensão e validação dos sentimentos compartilhados
2. REFLEXÃO: Faça perguntas abertas que ajudem a pessoa a refletir sobre seus sentimentos
3. CULTURAL: Use expressões e contextos culturais brasileiros apropriados
4. PRIVACIDADE: Lembre que esta é uma conversa confidencial e segura
5. LIMITES: Não ofereça diagnósticos médicos ou substitua terapia profissional
6. BREVIDADE: Mantenha respostas concisas mas significativas (máximo 3-4 frases)

Diretrizes específicas:
- Use linguagem calorosa e acolhedora
- Evite jargões psicológicos complexos
- Encoraje a expressão de sentimentos
- Ofereça perspectivas construtivas quando apropriado
- Sugira reflexões ou técnicas simples de autoconhecimento
- Sempre mantenha um tom respeitoso e não julgamental

Se a pessoa mencionar pensamentos suicidas ou automutilação, encoraje gentilmente a buscar ajuda profissional imediata.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...conversationHistory,
      { role: "user" as const, content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "Desculpe, não consegui processar sua mensagem. Pode tentar novamente?";
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Falha ao gerar resposta da IA: " + (error as Error).message);
  }
}

export async function analyzeSentiment(text: string): Promise<{
  rating: number;
  confidence: number;
  suggestions: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em análise de sentimentos. Analise o texto fornecido e retorne um JSON com:
          - rating: nota de 1 a 5 (1=muito negativo, 3=neutro, 5=muito positivo)
          - confidence: confiança da análise de 0 a 1
          - suggestions: array de 2-3 sugestões breves de apoio emocional em português`
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      rating: Math.max(1, Math.min(5, Math.round(result.rating || 3))),
      confidence: Math.max(0, Math.min(1, result.confidence || 0.5)),
      suggestions: result.suggestions || [],
    };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Falha ao analisar sentimento: " + (error as Error).message);
  }
}
