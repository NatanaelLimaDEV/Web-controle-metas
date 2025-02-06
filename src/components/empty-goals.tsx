import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

import logo from "../assets/logo-in-controle-de-metas.svg";
import lestStart from "../assets/lets-start-illustration.svg";

// Tela quando não há metas cadastradas. 
export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="logo" />
      <img src={lestStart} alt="start" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>

      {/* asChild passa os atributos para o botão filho (button) */}
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
