import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, VFC } from 'react';
import { useIconData } from '../useIconData';
//bg-gradient-to-r from-black to-gray-900 text-white
const Portfolio: VFC = () => {
  const { tableContent } = useIconData();
  const router = useRouter();
  return (
    <div
      id="Portfolio"
      className="flex flex-col justify-center items-center w-screen min-h-screen text-white"
    >
      <section>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <button
              className="px-12 md:px-4 mr-auto ml-auto w-10/12 md:w-6/12 lg:w-4/12 hover:opacity-80"
              onClick={() => router.push('/login/signIn')}
            >
              <div className="flex flex-col mb-6 w-full min-w-0 break-words bg-white rounded-lg shadow-2xl">
                <Image
                  alt="..."
                  src="/icons/markdown.png"
                  width={300}
                  height={240}
                  className=" rounded-t-lg"
                />
                <blockquote className="p-8 mb-4">
                  <h4 className="text-xl font-bold text-black">Create Markdown edit</h4>
                  <p className="mt-2 font-hiragino text-sm font-light text-black">
                    勉強の一環として、Markdownエディタを作成しました。
                    GraphQLの勉強を兼ねて、HasuraのGraphQL Serverをたててデータ間のやりとりをreact
                    Queryで実装しました。
                    フロントエンドは主にNext.js+Typescript+tailwindcssで実施しました。
                    認証機能は、firebaseのAuthenticationで実装しています。
                  </p>
                </blockquote>
              </div>
            </button>
            <div className="px-4 w-full md:w-6/12">
              <div className="flex flex-wrap">
                <Image
                  alt="..."
                  src="/icons/application.dio.svg"
                  width={500}
                  height={340}
                  className=" rounded-t-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-2">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap justify-center md:justify-between items-center">
              <div className="px-4 mx-auto w-full md:w-6/12 text-center">
                <div className="py-1 text-sm">Made with by TweetApp</div>
                <div className="flex justify-center items-center">
                  <Link href="https://github.com/sakamotodd/Portfolio">
                    <a className="mt-4 mr-2 hover:opacity-80">
                      <Image src="/icons/github.png" alt="github" width={28} height={28} />
                    </a>
                  </Link>
                  <Link href="https://www.figma.com/file/AWliYgGRqP34IrEkx6PcLk/Portfolio?node-id=0%3A1">
                    <a className="mt-4 mr-2 hover:opacity-80">
                      <Image src="/icons/figma.png" alt="figma" width={28} height={28} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};
export default Portfolio;
