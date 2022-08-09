interface Props {
    stone: object,
    selectedStone: boolean,
    appendSelectedStone: (params: any) => any;
}

export default function Stone({stone, selectedStone, appendSelectedStone}: Props) {
    let bigCircleClasses: string = "rounded-full grid place-items-center  w-full h-full  shadow-[0_0px_3px_0px] shadow-red-100 transition-all duration-500 cursor-pointer";
    let smallCircleClasses: string = "rounded-full h-1/4 w-1/4 transition-all duration-300";


    if (selectedStone) {
        bigCircleClasses += " bg-transparent"
        smallCircleClasses += " bg-transparent"
    } else {
        bigCircleClasses += " bg-red-500/[.60]"
        smallCircleClasses += " bg-gradient-to-r from-red-500 to-red-900";
    }

    return (
        <div className="grid place-items-center shadow-[0_0px_6px_-1px_rgba(0,0,0,0.3)] shadow-white p-2.5">

            <div
                onClick={() => appendSelectedStone(stone)}
                className={bigCircleClasses}>
                <div className={smallCircleClasses}></div>
            </div>
        </div>
    )
}
