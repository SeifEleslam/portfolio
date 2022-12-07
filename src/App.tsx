import { useState, useEffect, useRef } from "react";
import useSmoothScroll from "react-smooth-scroll-hook";

import "./App.css";
import Header from "./components/Header";
import Drama from "./components/Drama";
import "animate.css";
import Footer from "./components/Footer";
import About from "./components/About";

var Scroll = require("react-scroll");
export var Element = Scroll.Element;
export var scroller = Scroll.scroller;

function App() {
  const [state, setState] = useState("drama");
  const [curr, setCurr] = useState(0);
  const appTable = ["drama", "about", "evidence"];
  const ref = useRef(null);
  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 35,
    direction: "y",
  });

  const slideData = useRef<{
    scrollings: number[];
    prev: number;
    last: number;
  }>({
    scrollings: [],
    prev: 0,
    last: 0,
  });
  function slide(e: any) {
    // figuring out if the scrolling is by hardware or user
    // taken from fullpage open source:
    // https://github.com/alvarotrigo/fullPage.js/

    if (new Date().getTime() - slideData.current.last > 200) {
      slideData.current.scrollings = [];
    }
    slideData.current.last = new Date().getTime();

    // callculate delta for various events
    // add the value to scrolling
    const delta = e.deltaY;
    if (slideData.current.scrollings.length > 120) {
      slideData.current.scrollings.shift();
      slideData.current.scrollings.push(Math.abs(delta));
    } else slideData.current.scrollings.push(Math.abs(delta));

    if (slideData.current.last - slideData.current.prev < 1000) return;

    // calculate average for end and for most of the scrolling orders
    // to be able to notice new orders

    const averageEnd = average(slideData.current.scrollings, 10);
    const averageAll = average(slideData.current.scrollings, 70);
    const isAccelrating = averageEnd >= averageAll;

    if (isAccelrating) {
      if (delta > 0) {
        slideDown();
      } else if (delta < 0) {
        slideUp();
      }
    }
  }

  function average(arr: number[], num: number) {
    let sum: number = 0;
    arr = arr.slice(num > arr.length ? 0 : -num);
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return Math.ceil(sum / num);
  }

  const ts = useRef(0);
  function touchStart(e: any) {
    ts.current = e.touches[0].clientY;
  }

  const [touchSlide, setTouchSlide] = useState(true);
  let timeout: string | number | NodeJS.Timeout | undefined;
  function touchMove(e: any) {
    setTouchSlide(false);
    var te = e.changedTouches[0].clientY;
    console.log(ts.current - te);
    if (ts.current > te) {
      slideDown();
    } else if (ts.current < te) {
      slideUp();
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setTouchSlide(true);
    }, 1000);
  }

  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  // const prevThrotte = useRef(0);
  // const throttle = (func: any, delay: number) => {
  //   return (...args: any) => {
  //     console.log(now, new Date().getTime());
  //     const farEnough = new Date().getTime() - now > 200;
  //     now = new Date().getTime();
  //     if (now - prevThrotte.current > delay && farEnough) return func(...args);
  //     else {
  //       console.log("ignore");
  //     }
  //   };
  // };

  const slideDown = (val: "one" | "all" = "one") => {
    if (curr < appTable.length - 1 && val === "one") {
      slideData.current.prev = slideData.current.last;
      setState(appTable[curr + 1]);
    } else if (curr !== appTable.length - 1 && val === "all") {
      setState(appTable[appTable.length - 1]);
    } else {
      return;
    }
  };
  const slideUp = (val: "one" | "all" = "one") => {
    if (curr > 0 && val === "one") {
      slideData.current.prev = slideData.current.last;
      setState(appTable[curr - 1]);
    } else if (curr !== 0 && val === "all") {
      setState(appTable[0]);
    } else {
      return;
    }
  };

  useEffect(() => {
    //prevThrotte.current = new Date().getTime();
    scrollTo("#" + state);
    setCurr(appTable.indexOf(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    document.getElementById(state)!.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleState = (newVal: string) => {
    setState(newVal);
  };

  // window.addEventListener(
  //   "mousemove",
  //   debounce((e) => {
  //     const els = document.getElementsByClassName(
  //       "motion"
  //     ) as HTMLCollectionOf<HTMLElement>;
  //     for (let i = 0; i < els.length; i++) {
  //       els[i]!.style.transform =
  //         "translate3d(" +
  //         Math.floor(-e.pageX / 16) +
  //         "px, " +
  //         Math.floor(-e.pageY / 16) +
  //         "px, 0px)";
  //     }
  //   }, 700)
  // );
  useEffect(() => {
    console.log("useListener");
    window.addEventListener("wheel", slide);
    return () => {
      window.removeEventListener("wheel", slide);
    };
  });

  useEffect(() => {
    if (touchSlide) {
      console.log("Iam sliding");
      window.addEventListener("touchstart", touchStart);
      window.addEventListener("touchmove", touchMove);
    }
    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
    };
  }, [touchSlide]);

  // window.addEventListener("mousewheel", throttle(slide, 1000));

  window.addEventListener(
    "resize",
    debounce(() => {
      document.getElementById(state)!.scrollIntoView();
    }, 10)
  );

  window.addEventListener("keyup", (e) => {
    if (["ArrowUp", "PageUp"].indexOf(e.code) > -1) {
      slideUp();
    } else if (["ArrowDown", "PageDown", "Space"].indexOf(e.code) > -1) {
      slideDown();
    } else if (e.code === "End") {
      slideDown("all");
    } else if (e.code === "Home") {
      slideUp("all");
    }
  });

  return (
    <div
      ref={ref}
      id="App"
      className="App absolute overflow-hidden w-full h-full"
    >
      <Header />
      <Drama handleState={handleState} state={state} />
      <About />
      <div id="evidence" className="text-white overflow-hidden w-full h-full">
        <h1>ev</h1>
        <h2>My Story</h2>
        itis doloribus praesentium.
      </div>

      <Footer linkState={state} handleState={handleState} />
    </div>
  );
}

export default App;
