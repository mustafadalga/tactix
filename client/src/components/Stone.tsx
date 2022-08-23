interface Props {
    stone: object,
    selectedStone: boolean,
    appendSelectedStone: (params: any) => any;
}

export default function Stone({stone, selectedStone, appendSelectedStone}: Props) {
    let bigCircleClasses: string = "rounded-full grid place-items-center  w-full h-full  border-white border-2 transition-all duration-500 cursor-pointer";
    let smallCircleClasses: string = "rounded-full h-2/6 w-2/6 transition-all duration-300";


    if (selectedStone) {
        bigCircleClasses += " bg-transparent border-4"
        smallCircleClasses += " bg-transparent"
    } else {
        bigCircleClasses += " bg-light-red  hover:border-4"
        smallCircleClasses += " bg-gradient-to-r from-red-500 to-red-900";
    }

    return (
        <div className="grid place-items-center border-white border-2 p-2.5">

            <div
                onClick={() => appendSelectedStone(stone)}
                className={bigCircleClasses}>
                <div className={smallCircleClasses}></div>
            </div>
        </div>
    )
}
