// Registra a conclusão de uma meta. 
export async function createGoalCompletion(goalId: string) {
  await fetch('https://metas-xi-nine.vercel.app/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })
}
