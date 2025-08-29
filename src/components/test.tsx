// // Carousel.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { Draggable } from "gsap/Draggable";
// import { InertiaPlugin } from "gsap/InertiaPlugin";
// import clsx from "clsx";

// gsap.registerPlugin(Draggable, InertiaPlugin);

// const Box = ({ children, isActive = false, onClick, customStyle = "" }) => {
//   return (
//     <div
//       className={clsx(
//         "flex items-center justify-center text-black text-[21px] cursor-pointer flex-shrink-0 overflow-hidden",
//         "box-border",

//         customStyle
//       )}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// };

// const Carousel = () => {
//   const wrapperRef = useRef(null);
//   const boxesRef = useRef([]);
//   const loopRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const items = [
//     {
//       image: `https://picsum.photos/seed/1/800/600`,
//       text: "Bridge",
//     },
//     {
//       image: `https://picsum.photos/seed/2/800/600`,
//       text: "Desk Setup",
//     },
//     {
//       image: `https://picsum.photos/seed/3/800/600`,
//       text: "Waterfall",
//     },
//     {
//       image: `https://picsum.photos/seed/4/800/600`,
//       text: "Strawberries",
//     },
//     {
//       image: `https://picsum.photos/seed/5/800/600`,
//       text: "Deep Diving",
//     },
//     {
//       image: `https://picsum.photos/seed/16/800/600`,
//       text: "Train Track",
//     },
//     {
//       image: `https://picsum.photos/seed/17/800/600`,
//       text: "Santorini",
//     },
//     {
//       image: `https://picsum.photos/seed/8/800/600`,
//       text: "Blurry Lights",
//     },
//   ];

//   useEffect(() => {
//     const boxes = boxesRef.current;

//     loopRef.current = horizontalLoop(boxes, {
//       draggable: true,
//       repeat: -1,
//       center: true,
//       onChange: (_, index) => setActiveIndex(index),
//     });

//     return () => {
//       if (typeof loopRef.current === "function") loopRef.current();
//     };
//   }, []);

//   const goToIndex = (index) => {
//     loopRef.current?.toIndex(index, { duration: 0.8, ease: "power1.inOut" });
//   };

//   return (
//     <div className="relative flex flex-col items-center">
//       <div
//         ref={wrapperRef}
//         className="relative flex items-center gap-7 w-[90%] h-[500px] bg-gray-800 overflow-hidden"
//       >
//         {items.map(({ image, text }, index) => (
//           <div
//             key={index}
//             ref={(el) => (boxesRef.current[index] = el)}
//             className={`gap-4 ${
//               index === 0 ? "ml-10" : index === items.length - 1 ? "mr-10" : ""
//             }`}
//           >
//             <Box
//               isActive={index === activeIndex}
//               onClick={() => goToIndex(index)}
//               customStyle="flex-col w-[350px] h-auto bg-white gap-4 rounded shadow-md "
//             >
//               <img
//                 src={image}
//                 alt={text}
//                 className="w-full h-[400px] object-cover rounded-t gap-0.5"
//               />
//             </Box>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // --------------------------
// // Horizontal Loop Function
// // --------------------------
// function horizontalLoop(items, config) {
//   let timeline;
//   items = gsap.utils.toArray(items);
//   config = config || {};

//   gsap.context(() => {
//     let onChange = config.onChange,
//       lastIndex = 0,
//       tl = gsap.timeline({
//         repeat: config.repeat,
//         onUpdate:
//           onChange &&
//           function () {
//             let i = tl.closestIndex();
//             if (lastIndex !== i) {
//               lastIndex = i;
//               onChange(items[i], i);
//             }
//           },
//         paused: config.paused,
//         defaults: { ease: "none" },
//         onReverseComplete: () =>
//           tl.totalTime(tl.rawTime() + tl.duration() * 100),
//       }),
//       length = items.length,
//       startX = items[0].offsetLeft,
//       times = [],
//       widths = [],
//       spaceBefore = [],
//       xPercents = [],
//       curIndex = 0,
//       indexIsDirty = false,
//       center = config.center,
//       pixelsPerSecond = (config.speed || 1) * 100,
//       snap =
//         config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
//       timeOffset = 0,
//       container =
//         center === true
//           ? items[0].parentNode
//           : gsap.utils.toArray(center)[0] || items[0].parentNode,
//       totalWidth;

//     const getTotalWidth = () =>
//       items[length - 1].offsetLeft +
//       (xPercents[length - 1] / 100) * widths[length - 1] -
//       startX +
//       spaceBefore[0] +
//       items[length - 1].offsetWidth *
//         gsap.getProperty(items[length - 1], "scaleX");

//     const populateWidths = () => {
//       let b1 = container.getBoundingClientRect(),
//         b2;
//       items.forEach((el, i) => {
//         widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
//         xPercents[i] =
//           snap(
//             (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
//               gsap.getProperty(el, "xPercent")
//           ) || 0;
//         b2 = el.getBoundingClientRect();
//         spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
//         b1 = b2;
//       });
//       gsap.set(items, {
//         xPercent: (i) => xPercents[i],
//       });
//       totalWidth = getTotalWidth();
//     };

//     let timeWrap,
//       populateOffsets = () => {
//         timeOffset = center
//           ? (tl.duration() * container.offsetWidth) / 2 / totalWidth
//           : 0;
//         center &&
//           times.forEach((t, i) => {
//             times[i] = timeWrap(
//               tl.labels["label" + i] +
//                 (tl.duration() * widths[i]) / 2 / totalWidth -
//                 timeOffset
//             );
//           });
//       };

//     const getClosest = (values, value, wrap) => {
//       let i = values.length,
//         closest = 1e10,
//         index = 0,
//         d;
//       while (i--) {
//         d = Math.abs(values[i] - value);
//         if (d > wrap / 2) d = wrap - d;
//         if (d < closest) {
//           closest = d;
//           index = i;
//         }
//       }
//       return index;
//     };

//     const populateTimeline = () => {
//       let i, item, curX, distanceToStart, distanceToLoop;
//       tl.clear();
//       for (i = 0; i < length; i++) {
//         item = items[i];
//         curX = (xPercents[i] / 100) * widths[i];
//         distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
//         distanceToLoop =
//           distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

//         tl.to(
//           item,
//           {
//             xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
//             duration: distanceToLoop / pixelsPerSecond,
//           },
//           0
//         )
//           .fromTo(
//             item,
//             {
//               xPercent: snap(
//                 ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
//               ),
//             },
//             {
//               xPercent: xPercents[i],
//               duration:
//                 (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
//               immediateRender: false,
//             },
//             distanceToLoop / pixelsPerSecond
//           )
//           .add("label" + i, distanceToStart / pixelsPerSecond);
//         times[i] = distanceToStart / pixelsPerSecond;
//       }
//       timeWrap = gsap.utils.wrap(0, tl.duration());
//     };

//     const refresh = (deep) => {
//       let progress = tl.progress();
//       tl.progress(0, true);
//       populateWidths();
//       if (deep) populateTimeline();
//       populateOffsets();
//       if (deep && tl.draggable) {
//         tl.time(times[curIndex], true);
//       } else {
//         tl.progress(progress, true);
//       }
//     };

//     const onResize = () => refresh(true);
//     let proxy;

//     gsap.set(items, { x: 0 });
//     populateWidths();
//     populateTimeline();
//     populateOffsets();
//     window.addEventListener("resize", onResize);

//     function toIndex(index, vars) {
//       vars = vars || {};
//       if (Math.abs(index - curIndex) > length / 2) {
//         index += index > curIndex ? -length : length;
//       }
//       let newIndex = gsap.utils.wrap(0, length, index),
//         time = times[newIndex];

//       if (time > tl.time() !== index > curIndex && index !== curIndex) {
//         time += tl.duration() * (index > curIndex ? 1 : -1);
//       }
//       if (time < 0 || time > tl.duration()) {
//         vars.modifiers = { time: timeWrap };
//       }
//       curIndex = newIndex;
//       vars.overwrite = true;
//       gsap.killTweensOf(proxy);
//       return vars.duration === 0
//         ? tl.time(timeWrap(time))
//         : tl.tweenTo(time, vars);
//     }

//     tl.toIndex = (index, vars) => toIndex(index, vars);
//     tl.closestIndex = (setCurrent) => {
//       let index = getClosest(times, tl.time(), tl.duration());
//       if (setCurrent) {
//         curIndex = index;
//         indexIsDirty = false;
//       }
//       return index;
//     };
//     tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
//     tl.next = (vars) => toIndex(tl.current() + 1, vars);
//     tl.previous = (vars) => toIndex(tl.current() - 1, vars);
//     tl.times = times;

//     tl.progress(1, true).progress(0, true);
//     if (config.reversed) {
//       tl.vars.onReverseComplete();
//       tl.reverse();
//     }

//     if (config.draggable && typeof Draggable === "function") {
//       proxy = document.createElement("div");
//       let wrap = gsap.utils.wrap(0, 1),
//         ratio,
//         startProgress,
//         draggable,
//         dragSnap,
//         lastSnap,
//         initChangeX,
//         wasPlaying,
//         align = () =>
//           tl.progress(
//             wrap(startProgress + (draggable.startX - draggable.x) * ratio)
//           ),
//         syncIndex = () => tl.closestIndex(true);

//       draggable = Draggable.create(proxy, {
//         trigger: items[0].parentNode,
//         type: "x",
//         onPressInit() {
//           gsap.killTweensOf(tl);
//           wasPlaying = !tl.paused();
//           tl.pause();
//           startProgress = tl.progress();
//           refresh();
//           ratio = 1 / totalWidth;
//           initChangeX = startProgress / -ratio - this.x;
//           gsap.set(proxy, { x: startProgress / -ratio });
//         },
//         onDrag: align,
//         onThrowUpdate: align,
//         overshootTolerance: 0,
//         inertia: true,
//         snap(value) {
//           if (Math.abs(startProgress / -ratio - this.x) < 10) {
//             return lastSnap + initChangeX;
//           }
//           let time = -value * ratio * tl.duration(),
//             wrappedTime = timeWrap(time),
//             snapTime = times[getClosest(times, wrappedTime, tl.duration())],
//             dif = snapTime - wrappedTime;
//           if (Math.abs(dif) > tl.duration() / 2) {
//             dif += dif < 0 ? tl.duration() : -tl.duration();
//           }
//           lastSnap = (time + dif) / tl.duration() / -ratio;
//           return lastSnap;
//         },
//         onRelease() {
//           syncIndex();
//           if (draggable.isThrowing) {
//             indexIsDirty = true;
//           } else {
//             // ✅ resume autoplay immediately if not throwing
//             tl.play();
//           }
//         },
//         onThrowComplete: () => {
//           syncIndex();
//           // ✅ always resume autoplay after throw
//           tl.play();
//         },
//       })[0];

//       tl.draggable = draggable;
//     }

//     tl.closestIndex(true);
//     lastIndex = curIndex;
//     onChange && onChange(items[curIndex], curIndex);
//     timeline = tl;

//     return () => window.removeEventListener("resize", onResize);
//   });

//   return timeline;
// }

// export default Carousel;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import clsx from "clsx";

// If TypeScript complains about the Draggable/InertiaPlugin imports,
// add a `global.d.ts` with:
// declare module "gsap/Draggable";
// declare module "gsap/InertiaPlugin";

gsap.registerPlugin((Draggable as any) || {}, (InertiaPlugin as any) || {});

// --------------------------
// Box Component
// --------------------------
interface BoxProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  customStyle?: string;
}

const Box: React.FC<BoxProps> = ({
  children,
  isActive = false,
  onClick,
  customStyle = "",
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center text-black text-[21px] cursor-pointer flex-shrink-0 overflow-hidden box-border",
        customStyle,
        isActive && "ring-2 ring-blue-500"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// --------------------------
// Types for horizontalLoop
// --------------------------
interface HorizontalLoopConfig {
  draggable?: boolean;
  repeat?: number;
  center?: boolean | Element;
  onChange?: (el: Element, index: number) => void;
  speed?: number;
  snap?: boolean | number;
  paused?: boolean;
  reversed?: boolean;
}

interface HorizontalLoopMethods {
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween | void;
  closestIndex: (setCurrent?: boolean) => number;
  current: () => number;
  next: (vars?: gsap.TweenVars) => gsap.core.Tween | void;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween | void;
  times: number[];
  draggable?: any;
  kill?: () => void;
}

// --------------------------
// Carousel Component
// --------------------------
const Carousel: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const boxesRef = useRef<Array<HTMLDivElement | null>>([]);
  const loopRef = useRef<(gsap.core.Timeline & HorizontalLoopMethods) | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items = [
    { image: `https://picsum.photos/seed/1/800/600`, text: "Bridge" },
    { image: `https://picsum.photos/seed/2/800/600`, text: "Desk Setup" },
    { image: `https://picsum.photos/seed/3/800/600`, text: "Waterfall" },
    { image: `https://picsum.photos/seed/4/800/600`, text: "Strawberries" },
    { image: `https://picsum.photos/seed/5/800/600`, text: "Deep Diving" },
    { image: `https://picsum.photos/seed/16/800/600`, text: "Train Track" },
    { image: `https://picsum.photos/seed/17/800/600`, text: "Santorini" },
    { image: `https://picsum.photos/seed/8/800/600`, text: "Blurry Lights" },
  ];

  useEffect(() => {
    // filter out any nulls (refs may be null during mount)
    const boxes = boxesRef.current.filter(Boolean) as HTMLDivElement[];

    if (!boxes.length) return;

    const tl = horizontalLoop(boxes, {
      draggable: true,
      repeat: -1,
      center: true,
      onChange: (_el, index) => setActiveIndex(index),
    });

    loopRef.current = tl;

    return () => {
      // Proper cleanup: kill timeline and revert GSAP context
      try {
        loopRef.current?.kill?.();
        const ctx = (loopRef.current as any)?.__gsapContext;
        ctx?.revert?.();
      } catch (e) {
        // swallow
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToIndex = (index: number) => {
    loopRef.current?.toIndex(index, { duration: 0.8, ease: "power1.inOut" });
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={wrapperRef}
        className="relative flex items-center gap-7 w-[90%] h-[500px] bg-gray-800 overflow-hidden"
      >
        {items.map(({ image, text }, index) => (
          <div
            key={index}
            ref={(el) => (boxesRef.current[index] = el)}
            className={`gap-4 ${
              index === 0 ? "ml-10" : index === items.length - 1 ? "mr-10" : ""
            }`}
          >
            <Box
              isActive={index === activeIndex}
              onClick={() => goToIndex(index)}
              customStyle="flex-col w-[350px] h-auto bg-white gap-4 rounded shadow-md"
            >
              <img
                src={image}
                alt={text}
                className="w-full h-[400px] object-cover rounded-t"
                // when images load, trigger a resize event so the loop recalculates widths
                onLoad={() => window.dispatchEvent(new Event("resize"))}
              />
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

// --------------------------
// Horizontal Loop Function
// (converted from your original JS logic)
// --------------------------
function horizontalLoop(
  els: Element[] | NodeListOf<Element>,
  config: HorizontalLoopConfig = {}
): gsap.core.Timeline & HorizontalLoopMethods {
  let timeline: gsap.core.Timeline & Partial<HorizontalLoopMethods>;
  const items = gsap.utils.toArray(els) as HTMLElement[];

  // create a GSAP context so we can revert on unmount
  const ctx = gsap.context(() => {
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = (tl as any).closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times: number[] = [],
      widths: number[] = [],
      spaceBefore: number[] = [],
      xPercents: number[] = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false
          ? (v: number) => v
          : (gsap.utils.snap(config.snap || 1) as (v: number) => number),
      timeOffset = 0,
      container =
        center === true
          ? (items[0].parentNode as HTMLElement)
          : (gsap.utils.toArray(center)[0] as HTMLElement) || (items[0].parentNode as HTMLElement),
      totalWidth = 0;

    const getTotalWidth = () =>
      items[length - 1].offsetLeft + (xPercents[length - 1] / 100) * widths[length - 1] - startX + spaceBefore[0] + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX");

    const populateWidths = () => {
      let b1 = container.getBoundingClientRect(),
        b2: DOMRect | undefined;
      items.forEach((el, i) => {
        widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string) || el.offsetWidth;
        xPercents[i] =
          snap(
            (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) * 100 + gsap.getProperty(el, "xPercent")
          ) || 0;
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, {
        xPercent: (i: number) => xPercents[i],
      });
      totalWidth = getTotalWidth();
    };

    let timeWrap: (t: number) => number,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * container.offsetWidth) / 2 / totalWidth
          : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] + (tl.duration() * widths[i]) / 2 / totalWidth - timeOffset
            );
          });
      };

    const getClosest = (values: number[], value: number, wrap: number) => {
      let i = values.length,
        closest = 1e10,
        index = 0,
        d: number;
      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) d = wrap - d;
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    };

    const populateTimeline = () => {
      let i: number, item: HTMLElement, curX: number, distanceToStart: number, distanceToLoop: number;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
            },
            {
              xPercent: xPercents[i],
              duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    };

    const refresh = (deep?: boolean) => {
      let progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      if (deep && (tl as any).draggable) {
        tl.time(times[curIndex], true);
      } else {
        tl.progress(progress, true);
      }
    };

    const onResize = () => refresh(true);

    let proxy: HTMLElement | null = null;

    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);

    function toIndex(index: number, vars?: gsap.TweenVars) {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];

      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        (vars as any).modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      (vars as any).overwrite = true;
      gsap.killTweensOf(proxy);
      return (vars as any).duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }

    tl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    tl.closestIndex = (setCurrent?: boolean) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? (tl as any).closestIndex(true) : curIndex);
    tl.next = (vars?: gsap.TweenVars) => toIndex((tl as any).current() + 1, vars);
    tl.previous = (vars?: gsap.TweenVars) => toIndex((tl as any).current() - 1, vars);
    (tl as any).times = times;

    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }

    if (config.draggable && typeof (Draggable as any) === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio: number,
        startProgress: number,
        draggable: any,
        dragSnap: any,
        lastSnap: number,
        initChangeX: number,
        wasPlaying: boolean,
        align = () =>
          tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => (tl as any).closestIndex(true);

      draggable = (Draggable as any).create(proxy, {
        trigger: (items[0].parentNode as HTMLElement),
        type: "x",
        onPressInit() {
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - this.x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value: number) {
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          let time = -value * ratio * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          if (Math.abs(dif) > tl.duration() / 2) {
            dif += dif < 0 ? tl.duration() : -tl.duration();
          }
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          if (draggable.isThrowing) {
            indexIsDirty = true;
          } else {
            // resume autoplay immediately if not throwing
            tl.play();
          }
        },
        onThrowComplete: () => {
          syncIndex();
          // always resume autoplay after throw
          tl.play();
        },
      })[0];

      (tl as any).draggable = draggable;
    }

    (tl as any).closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
  });

  // attach context so caller can revert
  (timeline as any).__gsapContext = ctx;

  return (timeline as unknown) as gsap.core.Timeline & HorizontalLoopMethods;
}

export default Carousel;
