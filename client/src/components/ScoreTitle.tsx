type Props = {
    title: string,
  }

export default function ScoreTitle({title}:Props) {

    return (
        <div className="relative grid place-items-center w-1/2	sm:w-80 md:w-96 xl:w-[30rem] 2xl:w-[40rem] text-white text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-light-blue to-cyber-yellow  h-8 md:h-10 lg:h-12 w-1/4  before:absolute before:top-0	before:w-0 before:h-0 before:border-t-solid before:border-b-solid before:border-r-solid before:border-t-transparent before:border-b-transparent before:border-r-light-blue before:border-t-[16px] before:md:border-t-[20px] before:lg:border-t-[24px] before:border-b-[16px] before:md:border-b-[20px] before:lg:border-b-[24px] before:border-r-[16px] before:md:border-r-[20px] before:lg:border-r-[24px] before:-left-4 before:md:-left-5 before:lg:-left-6 after:absolute after:w-0 after:h-0 after:top-0 after:border-t-solid after:border-b-solid after:border-l-solid after:border-t-transparent after:border-b-transparent after:border-l-cyber-yellow after:border-t-[16px] after:md:border-t-[20px] after:lg:border-t-[24px] after:border-b-[16px] after:md:border-b-[20px] after:lg:border-b-[24px] after:border-l-[16px] after:md:border-l-[20px] after:lg:border-l-[24px] after:-right-4 after:md:-right-5 after:lg:-right-6 ">

            {title}
          
        </div>
    );
}
