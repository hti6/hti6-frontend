import {FC} from "react";
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
import {Button, FunctionButton} from "@/shared/ui/button";

export const AdminPage: FC = () => {
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
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="bg-[#E22E65] hover:bg-[#E22E65]/75 text-white rounded-[16px] w-12 h-12 flex items-center justify-center shadow-md transition-colors duration-200">
                        <AddLarge fill={"#fff"} className="w-5 h-5"/>
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить пользователя</DialogTitle>
                        <DialogDescription>Описание</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                        <img src="/check-illustration.png" width={"240px"} height={"240px"} alt=""/>
                    </div>
                    <div className="flex-1">
                        // TODO: Добавить инпуты
                    </div>
                    <DialogFooter>
                        <Button>Добавить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        ),
        dialog: {
            title: () => ({
                label: "НЕЙРО",
                highlight: `ПОЛЬЗОВАТЕЛЬ`
            }),
            content: (row: User) => ({
                sections: [
                    {
                        content: (
                            <div className={"flex-1 p-4 divide-y"}>
                                <div className={"flex gap-4 pb-[32px]"}>
                                    <div
                                        className={"flex items-center justify-center rounded-[24px] bg-[#F7F7F8] text-[#595F6B] [&>svg]:fill-current w-[96px] h-[96px]"}>
                                        <SolarUserRoundedIcon width={64} height={64}/>
                                    </div>
                                    <div className={"flex flex-col"}>
                                        <p className={"text-[28px] font-heading"}>{row.name}</p>
                                    </div>
                                </div>
                                <div className={"border-t-[1px] border-[#595F6B1A]"}>
                                    <div className={"flex flex-col py-[20px]"}>
                                        <p className={"font-body text-[16px]"}>Ваше имя</p>
                                        <p className={"font-description text-[#93979F] text-[12px]"}>Используется для
                                            входа по логину</p>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                ]
            }),
            actions: (row: User) => [
                {
                    variant: 'primary',
                    label: "Удалить пользователя",
                    onClick: () => {
                        console.log("Открыть чат с ИИ для камеры:", row.id); // TODO: Удалить пользователя
                    }
                },
                {
                    variant: 'secondary',
                    label: "Сохранить",
                    onClick: () => {
                        console.log("Открыть карту с камерой:", row.id); // TODO: Обновить пользователя
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