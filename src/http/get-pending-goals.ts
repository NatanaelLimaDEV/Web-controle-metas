// Define o formato da resposta esperada da API.
type PendingGoalsResponse = {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
}[]

// Busca as metas pendentes no backend.
export async function getPendingGoals(): Promise<PendingGoalsResponse> {
    const response = await fetch("https://metas-xi-nine.vercel.app/pending-goals");
      const data = await response.json();
      
      return data.pendingGoals
}