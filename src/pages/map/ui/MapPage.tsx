import { useMap, useUser } from "@/app/providers";
import { API_URL } from "@/shared/env";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form/form";
import { MapWidget } from "@/widgets/map";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  users: z.boolean().default(false),
  cameras: z.boolean().default(false),
  low_priority: z.boolean().default(false),
  middle_priority: z.boolean().default(false),
  high_priority: z.boolean().default(false),
  critical_priority: z.boolean().default(false),
  selected_categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item)),
});

interface Result {
  damages: {
    id: string;
    created_at: string;
    priority: string;
    user: {
      id: string;
      name: string;
      login: string;
      created_at: string;
      is_admin: boolean;
    };
    categories: { id: string; name: string }[];
    type: string;
    latitude: number;
    longitude: number;
    photo_url: string;
  }[];
  cameras: {
    id: string;
    name: string;
    url: string;
    latitude: number;
    longitude: number;
    created_at: string;
  }[];
}

interface Category {
  id: string;
  label: string;
}

export const MapPage: FC = () => {
  const { token } = useUser();
  const { cluster } = useMap();
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: false,
      cameras: false,
      low_priority: false,
      middle_priority: false,
      high_priority: false,
      critical_priority: false,
      selected_categories: [],
    },
    mode: "onChange",
  });

  const [body, setBody] = useState<Result>();

  const getCategories = async () => {
    const res2 = await fetch(API_URL + "/v1/user/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const categoriess = await res2.json();

    const cat = [];
    for (let i = 0; i < categoriess["result"].length; i++) {
      cat.push({
        id: categoriess["result"][i]["name"],
        label: categoriess["result"][i]["name"],
      });
    }
    setCategories(cat);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let result = "";
    for (let i = 0; i < form.getValues("selected_categories").length - 1; i++) {
      result += `categories[]=${form.getValues("selected_categories")[i]}&`;
    }
    result += `categories[]=${form.getValues("selected_categories")[form.getValues("selected_categories").length - 1]}`;
    const query = `${API_URL}/v1/user/map?users=${data.users ? 1 : 0}&cameras=${data.cameras ? 1 : 0}&low_priority=${data.low_priority ? 1 : 0}&middle_priority=${data.middle_priority ? 1 : 0}&high_priority=${data.high_priority ? 1 : 0}&critical_priority=${data.critical_priority ? 1 : 0}&${result}`;

    const res = await fetch(query, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const body = await res.json();

    console.log(cluster);

    setBody(body["result"]);
  };

  useEffect(() => {
    if (token) {
      const subscription = form.watch(() => form.handleSubmit(onSubmit)());
      return () => subscription.unsubscribe();
    }
  }, [form, token]);

  useEffect(() => {
    if (token) getCategories();
  }, [token]);

  return (
    <div className="w-full h-full flex gap-2 p-2 rounded-l bg-bg-surface1">
      <Form {...form}>
        <form
          className="py-2 pl-2 flex flex-col gap-2.5 overflow-y-auto flex-shrink-0"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <img src="/PickerDate.svg" />
          <div className="flex flex-col gap-4 p-4 bg-bg-surface2 rounded-m">
            <h2 className="heading-2">ЗАЯВКИ</h2>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Сотрудники</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cameras"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Камеры</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 bg-bg-surface2 rounded-m">
            <h2 className="heading-2">СРОЧНОСТЬ</h2>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="low_priority"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Низкая</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middle_priority"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Средняя</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="high_priority"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Высокая</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="critical_priority"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Критическая</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 bg-bg-surface2 rounded-m">
            <h2 className="heading-2">КАТЕГОРИИ</h2>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="selected_categories"
                render={() => (
                  <FormItem>
                    {categories.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="selected_categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                        ...field.value,
                                        item.id,
                                      ])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      <MapWidget data={body} />
    </div>
  );
};
