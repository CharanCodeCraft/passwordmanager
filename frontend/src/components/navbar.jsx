import React from "react";

const navbar = () => {
  return (
    <>
      <nav className="mx-auto bg-[#2E5077] flex justify-around items-center p-4 h-20 text-xl">
        <div className="logo font-bold text-4xl font-mono">
          <span className="text-[#79D7BE]">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-[#79D7BE]">Op/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-8 font-mono text-2xl text-white bg-[#85e3ca7e] p-2 rounded-full">
            <a href="https://github.com/CharanCodeCraft" target="_blank">
              <div className="git flex items-center gap-4">
                <span className="invert">
                  <img width={35} src="/icons/github.svg" alt="" />
                </span>
                <p className="text-xl font-mono">Github</p>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default navbar;
