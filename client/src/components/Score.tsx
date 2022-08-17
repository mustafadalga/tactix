import ScoreNumber from "./ScoreNumber";
import ScoreTitle from "./ScoreTitle";

interface Props {
    playerLeft: number,
    playerRight: number
}

export default function Score(props: Props) {

    return (
        <div className="flex items-center justify-center gap-8 sm:gap-10 w-full">
            <ScoreNumber number={props.playerLeft} className="bg-light-blue text-white"/>
            <ScoreTitle title="Score"/>
            <ScoreNumber number={props.playerRight} className="bg-cyber-yellow text-black"/>
        </div>
    );
}
