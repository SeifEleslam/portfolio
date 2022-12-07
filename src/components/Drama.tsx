import { useEffect, useState } from "react";
import TargetSVG from "./TargetSVG";
import SuitSVG from "./SuitSVG";
import { Element } from "../App";

export default function Drama(props: {
  state: string;
  handleState: (val: string) => void;
}) {
  return (
    <div id="drama" className="overflow-hidden w-full h-full">
      <Element name="drama"></Element>
      <div
        className={
          (props.state === "drama"
            ? "animate__animated animate__fadeInLeft"
            : "") +
          " bg-[#111]/25 backdrop-blur anime-delay-500 lg:ml-[12vw]  mt-[15vh] lg:w-[40%] w-auto z-10 relative duration-[1000ms]"
        }
      >
        <div className="my-[2vh] bg-[#d8b15d] shadow h-[1vh] rounded-full"></div>
        <p className="leading-[8vh] Alumni text-[#aaa] text-shadow">Manners</p>
        <p className="leading-[8vh] Alumni text-[#aaa] text-shadow">Maketh</p>
        <p className="leading-[8vh] Alumni text-[#aaa] text-shadow">Man</p>
        <div className="my-[2vh] bg-[#d8b15d] shadow h-[1vh] rounded-full"></div>
      </div>
      <div
        className={
          (props.state === "drama"
            ? "animate__animated animate__slideInRight delay-[300ms] "
            : "") +
          " md:pl-[50%] duration-1000 pl-0 h-full w-full absolute inset-0 z-[0] text-right"
        }
      >
        <TargetSVG />
      </div>
      <div
        className={
          (props.state === "drama"
            ? "animate__animated animate__slideInRight"
            : "") +
          " md:pl-[50%] pl-0  h-full w-full absolute inset-0 z-[0] text-right "
        }
      >
        <SuitSVG />
      </div>
      <div
        className={
          (props.state === "drama"
            ? "animate__animated animate__fadeInLeft"
            : "") +
          " mx-auto w-[90vw] left-0 right-0 lg:ml-[12vw] overflow-hidden absolute md:bottom-[5vh] bottom-[3vh] py-[10vh] mx-auto md:relative z-[10]"
        }
      >
        <p className={" text-shadow text-[5vh] text-[#aaa]"}>
          Are we gonna stand here all day or you gonna
        </p>
        <button
          onClick={() => {
            document
              .getElementById("about")!
              .scrollIntoView({ behavior: "smooth" });
            props.handleState("about");
          }}
          className="  mt-[3vh] rotate-90 text-[#e0bd88] text-[5vh] pl-[1vh] duration-[400ms] hover:translate-y-[1vh] text-shadow"
        >
          Scroll?
        </button>
      </div>
    </div>
  );
}
