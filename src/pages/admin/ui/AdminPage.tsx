import {FC, useState} from "react";
import {TableConfig} from "@/widgets/table/types";
import {AddLarge} from "@atomaro/icons";
import {TableWidget} from "@/widgets/table";
import {User, UsersResponse} from "@/pages/admin/types";
import {Category} from "@/pages/applications/types";
import {SolarUserRoundedIcon} from "@/shared/icons";
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
import { useForm } from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/shared/ui/form/form.tsx";
import {Input} from "@/shared/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useUser} from "@/app/providers";

export const AdminPage: FC = () => {
    const {token} = useUser();
    const [editedUsers, setEditedUsers] = useState<Record<string, User>>({});
    const tableConfig: TableConfig<User, UsersResponse> = {
        endpoint: "http://nvision.su/api/v1/admin",
        columns: [
            {
                key: "id",
                title: "ID ПОЛЬЗОВАТЕЛЯ",
                sortable: true,
                className: "w-[300px]",
            },
            {
                key: "name",
                title: "ИМЯ",
                sortable: true,
                className: "flex-1",
            },
            {
                key: "login",
                title: "ЛОГИН",
                sortable: true,
                className: "flex-1",
            },
            {
                key: "created_at",
                title: "ДАТА",
                sortable: true,
                render: (value: string | number | User | Category[]) => {
                    const date = new Date(value as string);
                    return date.toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                },
            },
        ],
        defaultSort: {
            field: "created_at",
            order: "desc",
        },
        rowKey: "id",
        perPageOptions: [15, 30, 50, 100],
        dataTransform: (response: UsersResponse) => ({
            data: response.result,
            meta: response.meta,
        }),
        rowClassName:
            "hover:bg-[#F7F7F8] cursor-pointer transition-colors duration-200",
        renderHeaderButton: (
            <AddUserDialog />
        ),
        dialog: {
            title: () => ({
                label: "НЕЙРО",
                highlight: `ПОЛЬЗОВАТЕЛЬ`
            }),
            content: (row: User) => {
                if (!editedUsers[row.id]) {
                    setEditedUsers(prev => ({
                        ...prev,
                        [row.id]: { ...row }
                    }));
                }
                return {
                    sections: [
                        {
                            content: (
                                <UserDialog
                                    row={editedUsers[row.id] || row}
                                    onUpdate={(updatedData) => {
                                        setEditedUsers(prev => ({
                                            ...prev,
                                            [row.id]: updatedData
                                        }));
                                    }}
                                />
                            )
                        }
                    ]
                }
            },
            actions: (row: User) => [
                {
                    variant: 'primary',
                    label: "Удалить пользователя",
                    onClick: async () => {
                        const res = await fetch("http://nvision.su/api/v1/admin/" + row.id, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + token
                            },
                        });
                        const json = await res.json();
                        alert(json.message);

                        setEditedUsers(prev => {
                            const newState = { ...prev };
                            delete newState[row.id];
                            return newState;
                        });
                    }
                },
                {
                    variant: 'secondary',
                    label: "Сохранить",
                    onClick: async () => {
                        const updatedUser = editedUsers[row.id];
                        if (!updatedUser) return;
                        const data = {
                            name: updatedUser.name,
                        }
                        try {
                            const res = await fetch(`http://nvision.su/api/v1/admin/${row.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify(data),
                            });
                            const json = await res.json();
                            alert(json.message);
                        } catch (error) {
                            console.error('Ошибка при сохранении:', error);
                            alert('Ошибка при сохранении изменений');
                        }
                    }
                }
            ]
        }
    };

    return (
        <TableWidget<User>
            config={tableConfig}
            onRowClick={(row) => {
                console.log("Navigate to camera details:", row);
            }}
            renderEmptyState={() => (
                <div className="text-center py-12">
                    <p className="text-[#93979F] text-lg">Пользователей пока нет</p>
                    <p className="text-[#93979F] mt-2">
                        Нажмите + чтобы добавить нового пользователя
                    </p>
                </div>
            )}
            className="bg-white rounded-[24px] shadow-sm"
        />
    );
}
const AddUserDialog = () => {
    const {token} = useUser()

    const formSchema = z.object({
        name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
        login: z.string().min(3, 'Логин должен содержать минимум 3 символа'),
        password: z.string().min(4, 'Пароль должен содержать минимум 6 символов'),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            login: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = await fetch("http://nvision.su/api/v1/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data),
        });
        const json = await res.json();
        alert(json.message)
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
                    <DialogTitle>Добавить пользователя</DialogTitle>
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
                            name="login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Логин"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Пароль"
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

interface UserDialogProps {
    row: User;
    onUpdate: (updatedData: User) => void;
}

const UserDialog: FC<UserDialogProps> = ({ row, onUpdate }) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedData = {
            ...row,
            name: e.target.value
        };
        onUpdate(updatedData);
    };

    return (
        <div className={"flex-1 p-4 divide-y"}>
            <div className={"flex gap-4 pb-[32px]"}>
                <div className={"flex items-center justify-center rounded-[24px] bg-[#F7F7F8] text-[#595F6B] [&>svg]:fill-current w-[96px] h-[96px]"}>
                    <SolarUserRoundedIcon width={64} height={64}/>
                </div>
                <div className={"flex flex-col"}>
                    <p className={"text-[28px] font-heading"}>{row.name}</p>
                </div>
            </div>
            <div className={"border-t-[1px] border-[#595F6B1A]"}>
                <div className={"flex justify-between items-center"}>
                    <div className={"flex flex-col py-[20px]"}>
                        <p className={"font-body text-[16px]"}>Имя пользователя</p>
                        <p className={"font-description text-[#93979F] text-[12px]"}>
                            Используется для отображения имени
                        </p>
                    </div>
                    <input
                        value={row.name}
                        onChange={handleNameChange}
                        id={row.id + "/name"}
                        type="text"
                        placeholder={"Имя пользователя"}
                        className="mt-2 py-[8px] px-[12px] w-1/2 border-[1.5px] border-[#595F6B0A] bg-[#FAFAFB] rounded-[16px]"
                    />
                </div>
            </div>
        </div>
    );
};