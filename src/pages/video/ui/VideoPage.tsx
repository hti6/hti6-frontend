import { Camera, CamerasResponse } from "@/pages/video/types";
import { AddLarge } from "@atomaro/icons";
import { TableWidget } from "@/widgets/table";
import {TableConfig} from "@/widgets/table/types";
import {Card} from "@/shared/ui/card";
import {SolarMap} from "@/shared/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {useUser} from "@/app/providers";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/shared/ui/form/form.tsx";
import {Input} from "@/shared/ui/input";

type RefetchFunction = () => void;

export const VideoPage = () => {
  const tableConfig: TableConfig<Camera, CamerasResponse> = {
    endpoint: "http://nvision.su/api/v1/user/cameras",
    columns: [
      {
        key: "id",
        title: "ID КАМЕРЫ",
        sortable: true,
        className: "w-[300px]",
      },
      {
        key: "latitude",
        title: "МЕСТОПОЛОЖЕНИЕ",
        className: "flex-1",
        render: (_value: string | number, row: Camera) => (<span>{row.latitude + ', ' + row.longitude}</span>),
      },
    ],
    defaultSort: {
      field: "created_at",
      order: "desc",
    },
    rowKey: "id",
    perPageOptions: [15, 30, 50, 100],
    dataTransform: (response: CamerasResponse) => ({
      data: response.result,
      meta: response.meta,
    }),
    rowClassName:
      "hover:bg-[#F7F7F8] cursor-pointer transition-colors duration-200",
    renderHeaderButton: (onRefetch: RefetchFunction) => (
        <AddCameraDialog onRefetch={onRefetch} />
    ),
    dialog: {
      title: (row: Camera) => ({
        label: "Камера",
        highlight: `ID ${row.id}`
      }),
      content: (row: Camera) => ({
        photo_url: row.photo_url,
        sections: [
          {
            content: (
                <div className="grid grid-cols-2 gap-4">
                  <Card icon={<SolarMap/>} title={"Местоположение"} content={row.latitude + ', ' + row.longitude} />
                </div>
            )
          }
        ]
      }),
      actions: (row: Camera) => [
        {
          variant: 'primary',
          label: "Обсудить с ИИ",
          onClick: () => {
            console.log("Открыть чат с ИИ для камеры:", row.id);
          }
        },
        {
          variant: 'secondary',
          label: "Посмотреть на карте",
          onClick: () => {
            console.log("Открыть карту с камерой:", row.id);
          }
        }
      ]
    }
  };

  return (
    <TableWidget<Camera>
      config={tableConfig}
      onRowClick={(row) => {
        console.log("Navigate to camera details:", row);
      }}
      renderEmptyState={() => (
        <div className="text-center py-12">
          <p className="text-[#93979F] text-lg">Камер пока нет</p>
          <p className="text-[#93979F] mt-2">
            Нажмите + чтобы добавить новую камеру
          </p>
        </div>
      )}
      className="bg-white rounded-[24px] shadow-sm"
    />
  );
};


const AddCameraDialog = ({ onRefetch }: { onRefetch: RefetchFunction }) => {
  const {token} = useUser()

  const formSchema = z.object({
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
    url: z.string().min(15, 'URL должен содержать минимум 15 символов'),
    latitude: z.string().min(2, 'Координаты должны содержать минимум 2 символа'),
    longitude: z.string().min(2, 'Координаты должны содержать минимум 2 символа'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      latitude: "",
      longitude: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("http://nvision.su/api/v1/user/cameras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok) {
        onRefetch();
        form.reset();

        const dialogTrigger = document.querySelector('[role="dialog"]')?.querySelector('[aria-label="Close"]');
        if (dialogTrigger instanceof HTMLElement) {
          dialogTrigger.click();
        }
      }
      alert(json.message);
    } catch (error) {
      console.error('Error adding camera:', error);
      alert('Ошибка при добавлении камеры');
    }
  };

  return (
      <Dialog>
        <DialogTrigger asChild>
          <button
              className="bg-[#E22E65] hover:bg-[#E22E65]/75 text-white rounded-[16px] w-12 h-12 flex items-center justify-center shadow-md transition-colors duration-200">
            <AddLarge fill={"#fff"} className="w-5 h-5"/>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить камеру</DialogTitle>
            <DialogDescription>Заполните данные нового пользователя</DialogDescription>
          </DialogHeader>

          <div className="flex justify-center my-4">
            <img src="/add-illustration.png" alt="Иллюстрация" className="w-60 h-60" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              placeholder="Имя"
                              {...field}
                          />
                        </FormControl>
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              placeholder="URL"
                              {...field}
                          />
                        </FormControl>
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              placeholder="Широта"
                              value={field.value}
                              onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                              placeholder="Долгота"
                              value={field.value}
                              onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <DialogFooter>
                <Button type="submit">
                  Добавить
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
};