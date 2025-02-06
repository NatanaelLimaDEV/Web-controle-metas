import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

import logo from "../assets/icon.svg";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import ptBR from "dayjs/locale/pt-br";
import dayjs from "dayjs";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR);

// Resumo semanal das metas.
export function Summary() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  if (!data) {
    return <p>Carregando ou sem dados... </p>;
  }

  // Obtêm o primeiro dia da semana
  const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
  // Obtêm o último dia da semana
  const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

  // Cálculo da porcentagem de metas concluídas
  const calcPorcentagem = Math.round((data.completed * 100) / data.total);

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        {/* asChild passa os atributos para o botão filho (button) */}
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        {/* Barra de progresso */}
        <Progress value={data?.completed} max={data?.total}>
          <ProgressIndicator style={{ width: `${calcPorcentagem}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed}</span> de{" "}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{calcPorcentagem}%</span>
        </div>
      </div>

      <Separator />

      {/* Chamada para exibir as metas pendentes */}
      <div className="flex flex-col gap-2">
        <h2>Metas pendentes</h2>
        <span className="text-xs text-zinc-400">Clique na meta ao concluir</span>
        <PendingGoals />
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay ?? {}).map(([date, goals]) => {
          // Obtém o dia da semana por extenso.
          const weekDay = dayjs(date).format("dddd");
          // Formata a data
          const formattedDate = dayjs(date).format("D[ de ]MMMM");

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                <span className="capitalize">{weekDay}</span>{" "}
                <span className="text-zinc-400 text-xs">({formattedDate})</span>
              </h3>

              {/* Lista as metas concluídas */}
              <ul className="flex flex-col gap-3">
                {goals.map((goal) => {
                  const time = dayjs(goal.completedAt).format('HH:mm')

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-teal-200" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{" "}
                        <span className="text-zinc-100">{time}h</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
