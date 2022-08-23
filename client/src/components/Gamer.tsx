interface Props {
    gamer: string,
    className: string
}
export default function Gamer({ gamer, className }: Props) {

    return (
        <div className={`grid place-items-center bg-dodger-blue text-white w-10 sm:w-14 lg:w-20 h-3/5 my-auto text-sm md:text-base lg:text-xl transition-all duration-500	${className}`}>
            <div  className="[writing-mode:vertical-lr] [text-orientation:upright]">
                {gamer}
            </div>
        </div>
    );
}
