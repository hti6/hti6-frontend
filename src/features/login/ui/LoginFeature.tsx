import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form/form";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogoIcon48 } from "@/shared/icons";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input, PasswordInput } from "@/shared/ui/input";
import { useUser } from "@/app/providers";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  login: z.string(),
  password: z.string(),
  remember: z.boolean().default(false),
});

export const LoginFeature: FC = () => {
  const { rememberToken } = useUser();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch("http://nvision.su/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    rememberToken(json["result"]["token"], data.remember);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-2 h-[448px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between bg-bg-surface1 rounded-l w-[512px] p-8"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <LogoIcon48 />
                <h1 className="uppercase heading-1 text-[32px]">
                  нейро <span className="text-accent">зрение</span>
                </h1>
              </div>
              <span className="body-m text-fg pt-4">
                Для доступа в систему необходимо заполнить данные
              </span>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Логин"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormControl>
                      <PasswordInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Пароль"
                      />
                    </FormControl>
                    <FormMessage className="pl-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="mt-6 flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Запомнить меня</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <Button className="mt-6 w-full justify-center" type="submit">
              Войти
            </Button>
          </form>
        </Form>
        <div className="bg-bg-surface1 rounded-l w-[512px] flex justify-center items-center">
          <img src="/arrow-illustration.png" />
        </div>
      </div>
    </div>
  );
};
