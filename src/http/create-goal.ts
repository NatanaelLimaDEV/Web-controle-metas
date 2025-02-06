// Define o formato esperado do objeto a ser enviado para criar uma meta.
interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

// Cria uma nova meta no backend.
export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  await fetch('https://metas-xi-nine.vercel.app/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
}
