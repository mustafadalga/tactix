import ScoreNumber from "./ScoreNumber";
import ScoreTitle from "./ScoreTitle";

export default function Score() {

    return (
        <div className="flex items-center justify-center gap-8 sm:gap-10 w-full">
            <ScoreNumber number={33} className="bg-light-blue text-white"/>
            <ScoreTitle title="Score"/>
            <ScoreNumber number={22} className="bg-cyber-yellow text-black"/>
        </div>
    );
}
