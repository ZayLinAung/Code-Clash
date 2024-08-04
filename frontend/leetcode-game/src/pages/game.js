import "./styles.css";
import React from "react";


const game = () => {
  return (
    <div className="flex flex-row p-[110px]">
      <div className="flex-1 flex flex-col gap-[90px]">
        <div className="font-[Poppins] leading-[84px] text-[64px] font-[800]">
          Welcome to the coding <span className="text-[red]">battle!</span>
        </div>
        <div className="font-[Work-Sans] leading-[34px] font-[400] text-[24px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
          libero risus semper habitant arcu eget. Et integer facilisi eget diam.
        </div>
        <div>
          <button className = "font-[Work-Sans] text-[18px] leading-[20px] border-2 border-black rounded-3xl p-[15px] text-[white] bg-[black]">Get Started</button>
        </div>
      </div>
      <div className="flex-1">
      <iframe className = "w-[100%] h-[100%]" src="https://lottie.host/embed/a01eecde-e637-490e-a575-cff1017240cb/T4NEIqt2PM.json"></iframe>
      </div>
    </div>
  );
};

export default game;
