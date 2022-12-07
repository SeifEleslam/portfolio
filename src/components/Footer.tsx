import "animate.css";
import { useState } from "react";

interface FooterProps {
  handleState: (newVal: string) => void;
  linkState: string;
}

export default function Footer(props: FooterProps) {
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState("");
  const showDes = (title: string) => {
    setHover(title);
    const el = document.getElementById("des");
    el!.style.visibility = "visible";
    el!.style.opacity = "1";
    el!.style.left = "0";
  };
  const hideDes = () => {
    const el = document.getElementById("des");
    el!.style.visibility = "hidden";
    el!.style.opacity = "0";
    el!.style.left = "-10px";
  };

  return (
    <div className="lg:w-fit fixed flex z-50 mt-[2vh] lg:left-0 left-[.5vw] lg:right-auto right-0 mx-auto lg:top-10 bottom-0 lg:my-auto duration-200 rounded-full">
      <button
        onClick={() => {
          setClicked(true);
        }}
        className={
          (clicked
            ? ""
            : "animate__animated animate__heartBeat animate__infinite") +
          " text-[3vh] lg:text-[3vw] lg:rotate-0 -rotate-90 lg:left-0 lg:right-0 lg:mx-auto w-fit h-fit absolute mx-[1vw] my-[1vh] bottom-0 bottom-0 right-10 lg:top-10 duration-[600ms] p-1 text-shadow rounded text-[#aaa] hover:text-[#edc769]"
        }
      >
        &#x279C;
      </button>
      <p
        id="des"
        className="border-y-[.5vh] absolute mx-[1vw] my-[1vh] bottom-0 left-0  lg:bottom-10 border-[#edc769] opacity-0 invisible duration-[600ms] p-1 text-shadow rounded text-[#aaa]"
      >
        {hover}
      </p>

      <div className="lg:flex-col flex lg:my-auto mx-auto z-[1000] lg:top-0 lg:left-auto lg:right-auto left-0 right-0 bottom-0 h-fit w-fit py-2 duration-[600ms] overflow-hidden">
        <div
          onMouseEnter={() => {
            showDes("Dramatic Entrance");
          }}
          onMouseLeave={() => {
            hideDes();
          }}
          className={
            (props.linkState === "drama"
              ? "w-[7vw] bg-[#edc769]"
              : "w-[4vw] bg-[#aaa]") +
            " my-[2vh] mx-[1vw] cursor-pointer duration-[600ms] hover:w-[7vw] h-[1vh] rounded-full"
          }
          onClick={() => {
            props.handleState("drama");
            document
              .getElementById("drama")!
              .scrollIntoView({ behavior: "smooth" });
          }}
        ></div>

        <div
          onMouseEnter={() => {
            showDes("About Me");
          }}
          onMouseLeave={() => {
            hideDes();
          }}
          className={
            (props.linkState === "about"
              ? "w-[7vw] bg-[#edc769]"
              : "w-[4vw] bg-[#aaa]") +
            " my-[2vh] mx-[1vw] cursor-pointer duration-[600ms] hover:w-[7vw] h-[1vh] rounded-full"
          }
          onClick={() => {
            props.handleState("about");
            document
              .getElementById("about")!
              .scrollIntoView({ behavior: "smooth" });
          }}
        ></div>
      </div>
    </div>
  );
}
