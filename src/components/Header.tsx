import { useState } from "react";
import LightSVG from "./LightSVG";

export default function Header() {
  const [navHead, setNavHead] = useState("home");
  onmousemove = (event) => {};

  return (
    <div className="w-full fixed z-50">
      <nav className="z-[100] relative flex items-center px-[10vw] bg-transparent mb-3">
        <div className="mx-auto flex w-full items-center py-[2vh]">
          <div className="h-full w-[50%] relative lg:text-left block flex items-center">
            <button className="h-[10vh]">
              <LightSVG />
            </button>
          </div>
          <div
            className="items-center flex text-right w-[50%] h-[10vh]"
            id="example-navbar-danger"
          >
            {navHead === "home" && (
              <p className="mx-auto durarion-600 px-5 text-right lg:text-[2vh] text-[3vh]  text-[#f6d094]">
                SEIFELELAM GOUDA
              </p>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
