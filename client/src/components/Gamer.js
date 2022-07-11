export default function Gamer({ gamer, className }) {

    return (
        <div className={`grid place-items-center bg-blue-500 text-white w-10 md:w-20 h-2/3 my-auto ${className}`}>
            <div  className="[writing-mode:vertical-lr] [text-orientation:upright]">
                {gamer}
            </div>
        </div>
    );
}
