import {FC, ReactNode} from "react";

export interface CardProps {
    icon: ReactNode,
    title: string,
    content: string | ReactNode,
    width?: string
}

const Card: FC<CardProps> = ({
    icon,
    title,
    content,
    width
}) => {
    return (
        <div className={`flex items-center rounded-[24px] bg-[#F7F7F8] p-[16px] gap-[16px] ${width == 'full' && 'col-span-2'}`}>
            <div className={"bg-[#FFFFFF] [&>svg]:fill-current text-[#93979F] rounded-[39px] p-[12px]"}>
                {icon}
            </div>
            <div className={"flex flex-col"}>
                <h4 className={"text-[#93979F] font-body text-[14px]"}>{title}</h4>
                <p className={"font-heading text-[18px]"}>{content}</p>
            </div>
        </div>
    );
}

export { Card }