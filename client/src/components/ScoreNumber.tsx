interface Props {
  number: number,
  className?: string,
}

export default function ScoreNumber({ number, className }: Props) {
  return (
    <div className={`grid place-items-center bg-dodger-blue text-white w-10 md:w-12 lg:w-16 h-10 md:h-12 lg:h-16 rounded-full text-white text-base md:text-lg lg:text-xl shadow-xl ${className}`}>
      {number}
    </div>
  );
}
