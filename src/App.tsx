import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import { EmptyGoals } from "./components/empty-goals";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

export function App() {
  // Busca os dados.
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });
  
  const total = data?.total ?? 0; // Usa 0 se data ou total forem undefined

  return (
    <Dialog>
      {/* Se houver metas, mostra tela de resumo. Caso não tenha metas, mostra outra tela */}
      {total > 0 ? <Summary /> : <EmptyGoals />}
      
      {/* Componente para cadastrar novas metas. */}
      <CreateGoal />
    </Dialog>
  );
}
