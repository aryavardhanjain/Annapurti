import React from "react";

function HomeBase() {
  return (
    <div>
      <div>
        <figure>
          <img
            src="/ngoAnnapurti.jpg"
            alt="Slider"
            className="brightness-75 h-80%"
          />
        </figure>
      </div>
      <div className="absolute text-center">
        <h1 className="absolute left-[550px] top-[-240px] text-5xl font-bold text-[#ecb159]">
          ANNAPURTI
        </h1>
        <span className="text-white text-lg w-80 top-[-180px] left-[530px] font-bold absolute">
          Nourishing Communities One Meal At a Time
        </span>
      </div>
    </div>
  );
}

export default HomeBase;
