import CoolCircle from "./CoolCircle";

export default function About() {
  return (
    <div id="about" className="overflow-hidden w-full h-full">
      <div className="absolute w-full h-full md:pl-[50vw] z-[0] "></div>
      <div className="mt-[12vh] ml-[20vw] lg:ml-auto absolute w-full h-full lg:pl-[50vw] z-[-1] ">
        <CoolCircle />
      </div>
      <div className="z-[100] mt-[12vh] mx-auto md:ml-[10vw] md:w-2/3 w-full md:h-2/3 h-[80%] p-[1vw] duration-1000">
        {/* <h1 className="text-white">About Section</h1> */}
        <div className="backdrop-blur w-full h-full text-[#aaa] flex rounded">
          <div className="bg-[#aaa]/50 h-full rounded items-center justify-center w-[4vw] min-w-[2rem]">
            <div className="text-black w-full h-1/3">
              <button className="rounded duration-1000 hover:bg-[#edc769] rotated-text my-auto w-full h-full">
                Charges
              </button>
            </div>
            <div className="text-black w-full h-1/3">
              <button className="rounded duration-1000 hover:bg-[#edc769] rotated-text my-auto w-full h-full">
                Crime Weapon
              </button>
            </div>
            <div className="text-black w-full h-1/3">
              <button className="rounded duration-1000 hover:bg-[#edc769] rotated-text my-auto w-full h-full">
                Charges
              </button>
            </div>
          </div>
          <div className="p-[1vw] text-left w-full">
            <p className="text-[#aaa] text-[4vh]  ">
              Hello,
              <br />
              This is SEIFELESLAM
              <br />I am a passionate web designer, who seeks perfection and
              give a lot of attention to details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
