import { Button, FunctionButton } from "@/shared/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input, PasswordInput } from "@/shared/ui/input/input";
import { Segment } from "@/shared/ui/segmented-control";
import { FC, useState } from "react";

export const LoginPage: FC = () => {
  const [login, setLogin] = useState("");
  return (
    <main>
      <div className="w-[400px] h-[500px] bg-bg-surface1">
        <div className="flex flex-col gap-2">
          <Input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин"
          />
          <PasswordInput
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин"
          />
          <Segment disabled variant="primary">
            hey
          </Segment>
          <Dialog>
            <DialogTrigger>hey</DialogTrigger>
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
          <AlertDialog>
            <AlertDialogTrigger>hey</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>хотите выйти?</AlertDialogTitle>
              </AlertDialogHeader>
              <div></div>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button color="neutral" variant="secondary">
                    Отмена
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button>Подтвердить</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Dialog>
            <DialogTrigger>hey</DialogTrigger>
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
      </div>
    </main>
  );
};
