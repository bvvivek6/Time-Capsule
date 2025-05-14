import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/util";

export const BoxesCore = ({ className, ...rest }) => {
  const rows = new Array(30).fill(1);
  const cols = new Array(20).fill(1);

  let colors = [
    "#f9a8d4",
    "#93c5fd",
    "#86efac",
    "#fdba74",
    "#a5b4fc",
    "#fcd34d",
    "#fb7185",
    "#c4b5fd",
    "#7dd3fc",
    "#fbbf24",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div key={`row` + i} className="relative h-35 w-70 ">
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="relative h-35 w-70 border-1  border-[#131313dd] "
            ></motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
