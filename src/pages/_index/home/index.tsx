import Image from 'next/image';
import React, { VFC } from 'react';
import { Link as Scroll } from 'react-scroll';
import TextAnimation from './TextAnimation';

const Home: VFC = () => {
  const headerBtn = ['Home', 'Skill', 'Portfolio', 'Contact'];
  const profileText = `
  はじめまして。坂本大五郎と申します。\n
  SES企業で２年間働いていました。\n
  業務を通してJavascriptの勉強をはじめ、\n
  より専門的な事を学びたいと思い転職を決意\n
  直近ではフロントエンドを中心に勉強中です。\n
  `;
  return (
    <header id="Home" className="relative max-h-screen">
      <div className="flex fixed z-10 justify-between items-center p-4 w-screen bg-gray-800 opacity-50">
        <p className="maxLg:hidden pl-8 text-xl font-bold text-indigo-400">Daigoro Sakamoto</p>
        <div className="pr-8 space-x-4 text-white">
          {headerBtn.map((btn) => {
            return (
              <Scroll key={btn} to={btn} smooth={true} duration={600}>
                <button className="p-2 hover:bg-gray-400 focus:bg-gray-300 rounded focus:ring-2 focus:ring-opacity-50 focus:outline-none">
                  {btn}
                </button>
              </Scroll>
            );
          })}
        </div>
      </div>
      <div className="absolute top-1/4 left-1/2 z-10 pr-2 mx-auto text-5xl text-white truncate transform -translate-x-1/2 -translate-y-1/2">
        <div id="thank" className="flex justify-between">
          <TextAnimation section="thank">Thank you for visit Portfolio</TextAnimation>
          <p>|</p>
        </div>
      </div>
      <div className="flex z-20 flex-col justify-center items-center m-auto min-h-screen">
        <p className="leading-3 whitespace-pre-wrap">{profileText}</p>
      </div>
    </header>
  );
};

export default Home;
