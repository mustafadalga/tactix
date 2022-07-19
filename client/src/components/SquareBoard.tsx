import Stone from "./Stone"
export default function Board() {

    return (
        <div className="grid grid-rows-4 grid-cols-4 w-60 h-60 2xs:w-64 2xs:h-64  xs:w-[25rem] xs:h-[25rem] sm:w-[30rem] sm:h-[30rem] md:w-[36rem] md:h-[36rem]  shadow-[0_0px_6px_-1px_rgba(0,0,0,0.3)]  shadow-white">
            {[...Array(16)].map((_, stoneIndex) =>
                <Stone key={stoneIndex} />
            )}
        </div>
    );
}
