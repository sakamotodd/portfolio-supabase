import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import Image from "next/image";
import { FC } from "react";

export const Lan_skills: FC = () => {
  return (
    <div className="z-10 grid grid-cols-2 rounded-md bg-gray-100 shadow-md lg:h-[calc(100vh-16rem)] lg:grid-cols-4 lg:grid-rows-2">
      {/* HTML5 */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={70}
          size={170}
          colorSlice="#e44b23"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #e44b23",
          }}
        />
        <div className="mt-4 flex justify-center xl:mr-8">
          <Image src="/icons/html.png" alt="html" width={55} height={45} />
        </div>
      </div>
      {/* css */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={70}
          size={170}
          colorSlice="#3555FF"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #3555FF",
          }}
        />
        <div className="mt-4 flex justify-center xl:mr-8">
          <Image src="/icons/css.png" alt="css" width={48} height={45} />
        </div>
      </div>

      {/* javascript */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={70}
          size={170}
          colorSlice="#f1e05a"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #f1e05a",
          }}
        />
        <div className="mt-2 flex justify-center xl:mr-8">
          <Image src="/icons/javascript.png" alt="javascript" width={60} height={60} />
        </div>
      </div>

      {/* React */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={60}
          size={170}
          colorSlice="#04dcfc"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #04dcfc",
          }}
        />
        <div className="mt-2 flex justify-center">
          <Image src="/icons/reactjs_icon.png" alt="react" width={130} height={60} />
        </div>
      </div>

      {/* nextjs */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={80}
          size={170}
          colorSlice="#463D48"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #463D48",
          }}
        />
        <div className="mt-2 flex justify-center xl:mr-8">
          <Image src="/icons/nextjs.png" alt="nextjs" width={100} height={55} />
        </div>
      </div>

      {/* typescript */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={60}
          size={170}
          colorSlice="#4F5D95"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #4F5D95",
          }}
        />
        <div className="mt-4 flex justify-center xl:mr-8">
          <Image src="/icons/typescript.png" alt="typescript" width={45} height={45} />
        </div>
      </div>

      {/* java */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={20}
          size={170}
          colorSlice="#144434"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #144434",
          }}
        />
        <div className="mt-4 flex justify-center xl:mr-8">
          <Image src="/icons/java.png" alt="java" width={45} height={45} />
        </div>
      </div>

      {/* C# */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={30}
          size={170}
          colorSlice="#5C4D80"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: "50%",
            boxShadow: "inset 0 0 25px 10px #5C4D80",
          }}
        />
        <div className="mt-4 flex justify-center xl:mr-8">
          <Image src="/icons/cLogo.png" alt="C#" width={45} height={45} />
        </div>
      </div>
    </div>
  );
};
