import React from "react";

const Marquee = () => {
  return (
    <>
      {/* Inline keyframes */}
      <style>
        {`
          @keyframes marquee-right-left {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      <div className="w-full overflow-hidden border-y-2 border-[#caa85c] bg-gradient-to-b from-[#0b1d3a] to-[#142d5a] py-2">
        <div
          className="flex w-max items-center whitespace-nowrap"
          style={{
            animation: "marquee-right-left 18s linear infinite",
          }}
        >
          {[...Array(17)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-4 text-sm font-semibold tracking-widest text-[#f5e6b0]">
                NEW ARRIVALS
              </span>

              {/* vertical divider */}
              <span className="h-4 w-px bg-[#caa85c] opacity-80" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Marquee;
