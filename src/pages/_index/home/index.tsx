import { FC } from "react";
import { Link as Scroll } from "react-scroll";
import TextAnimation from "./TextAnimation";

const Home: FC = () => {
  const headerBtn = ["Home", "Skill", "Portfolio", "Contact"];
  const profileText = `
  はじめまして。坂本大五郎と申します。\n
  SES企業で２年間働いていました。\n
  業務を通してJavascriptの勉強をはじめ、\n
  より専門的な事を学びたいと思い転職を決意\n
  直近ではフロントエンドを中心に勉強中です。\n
  `;
  return (
    <header id="Home" className="relative max-h-screen">
      <div className="fixed z-10 flex w-screen items-center justify-between bg-gray-800 p-4 opacity-50">
        <p className="pl-8 text-xl font-bold text-indigo-400 maxLg:hidden">
          Daigoro Sakamoto
        </p>
        <div className="space-x-4 pr-8 text-white">
          {headerBtn.map((btn) => {
            return (
              <Scroll key={btn} to={btn} smooth={true} duration={600}>
                <button className="rounded p-2 hover:bg-gray-400 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50">
                  {btn}
                </button>
              </Scroll>
            );
          })}
        </div>
      </div>
      <div className="absolute top-1/4 left-1/2 z-10 mx-auto -translate-x-1/2 -translate-y-1/2 transform truncate pr-2 text-5xl text-white">
        <div id="thank" className="flex justify-between">
          <TextAnimation section="thank">
            Thank you for visit Portfolio
          </TextAnimation>
          <p>|</p>
        </div>
      </div>
      <div className="z-20 m-auto flex min-h-screen flex-col items-center justify-center">
        <p className="whitespace-pre-wrap leading-3">{profileText}</p>
      </div>
    </header>
  );
};

export default Home;
