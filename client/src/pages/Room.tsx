import SquareBoard from "../components/SquareBoard";
import Gamer from "../components/Gamer";
import Score from "../components/Score";
import IconHand from "../icons/IconHand";
import IconRefresh from "../icons/IconRefresh";

export default function Room() {
    return (
        <div className="w-full h-full grid grid-rows-[15%_85%] bg-indigo-900">

            <section className="w-full flex items-center justify-center p-4">
                <Score />
            </section>

            <section className="grid grid-cols-12">

                <div className="col-span-1 grid">
                    <Gamer gamer="Mustafa Dalğa" className="rounded-tr-3xl rounded-br-3xl bg-light-blue text-white" />
                </div>

                <div className="col-span-10 flex justify-center flex-col items-center gap-4 md:gap-6 2xl:gap-8">
                    <SquareBoard />
                    <div className="flex justify-center items-center gap-6 flex-col sm:flex-row">
                        <button className="flex items-center gap-4 bg-white text-black py-2.5 px-6 rounded-md shadow-md whitespace-nowrap">
                            <IconHand className="h-6" />
                            <span>Get Stones</span>
                        </button>
                        <button className="flex items-center gap-4 bg-white text-black py-2.5 px-6 rounded-md shadow-md whitespace-nowrap">
                            <IconRefresh className="h-6" />
                            <span>New Game</span>
                        </button>
                    </div>
                </div>
                <div className="col-span-1 grid">
                    <Gamer gamer="" className="rounded-tl-3xl rounded-bl-3xl ml-auto bg-cyber-yellow text-black shadow-[0_0px_15px_0px_rgba(0,0,0,0.3)] shadow-white" />
                </div>

            </section>




        </div>
    );
}
