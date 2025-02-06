// Define o formato da resposta esperada da API.
type SummaryResponse = {
    completed: number;
    total: number;
    goalsPerDay: Record<
      string,
      {
        id: string;
        title: string;
        completedAt: string;
      }[]
    >;
  };

// Busca o resumo das metas. 
export async function getSummary(): Promise<SummaryResponse> {
    const response = await fetch("https://metas-xi-nine.vercel.app/summary");
      const data = await response.json();
      
      return data.summary
}