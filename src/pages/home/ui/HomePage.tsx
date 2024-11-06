import { FC } from "react";
import { Button, FunctionButton } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

export const HomePage: FC = () => {
  return (
    <section className="w-full h-full bg-bg-surface1 rounded-l">
      <div className="flex gap-2 p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Боковая модалка</Button>
          </DialogTrigger>
          <DialogContent full>
            <DialogHeader full>
              <DialogTitle full>камеры</DialogTitle>
            </DialogHeader>
            <div className="flex-1">hey</div>
            <div className="flex-1">hey</div>
            <div className="flex-1">hey</div>
            <DialogFooter full>
              <Button>Подтвердить</Button>
              <Button>Подтвердить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button>обычная модалка</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>камеры</DialogTitle>
              <DialogDescription>Описание</DialogDescription>
            </DialogHeader>
            <div className="flex-1">hey</div>
            <div className="flex-1">hey</div>
            <div className="flex-1">hey</div>
            <DialogFooter>
              <Button>Подтвердить</Button>
              <FunctionButton className="!justify-start">
                Подтвердить
              </FunctionButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
