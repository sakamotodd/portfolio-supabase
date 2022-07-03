import { CircularProgressBar } from '@tomik23/react-circular-progress-bar';
import Image from 'next/image';
import React, { VFC } from 'react';

export const OtherSkills: VFC = () => {
  return (
    <div className="grid z-10 grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:h-[calc(100vh-16rem)] bg-gray-100 rounded-md shadow-md">
      {/* github */}
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
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #463D48',
          }}
        />
        <div className="flex justify-center mt-4 xl:mr-8">
          <Image src="/icons/github.png" alt="github" width={45} height={45} />
        </div>
      </div>

      {/* taiga */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={60}
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
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #144434',
          }}
        />
        <div className="flex justify-center mt-4 xl:mr-8">
          <Image src="/icons/taiga.png" alt="taiga" width={45} height={45} />
        </div>
      </div>

      {/* figma */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={40}
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
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #4F5D95',
          }}
        />
        <div className="flex justify-center mt-4 xl:mr-8">
          <Image src="/icons/figma.png" alt="figma" width={45} height={45} />
        </div>
      </div>

      {/* redux */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={60}
          size={170}
          colorSlice="#f4543c"
          colorCircle="#eeeeee"
          fontColor="#8c8c8c"
          fontSize="1rem"
          fontWeight={500}
          rotation={144}
          cut={30}
          round={true}
          styles={{
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #f4543c',
          }}
        />
        <div className="flex justify-center mt-4 xl:mr-8">
          <Image src="/icons/redux.png" alt="redux" width={45} height={45} />
        </div>
      </div>

      {/* firebase */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={60}
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
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #f1e05a',
          }}
        />
        <div className="flex justify-center mt-2 xl:mr-8">
          <Image src="/icons/firebase.png" alt="firebase" width={55} height={55} />
        </div>
      </div>

      {/* mySQL */}
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
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #04dcfc',
          }}
        />
        <div className="flex justify-center mt-2 xl:mr-8">
          <Image src="/icons/mysql.png" alt="mySQL" width={60} height={60} />
        </div>
      </div>

      {/* graphQL */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={60}
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
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #e44b23',
          }}
        />
        <div className="flex justify-center mt-4 xl:mr-8">
          <Image src="/icons/graphQL.png" alt="graphQL" width={40} height={40} />
        </div>
      </div>

      {/* jest */}
      <div className="flex-col items-center py-3 px-7">
        <CircularProgressBar
          percent={50}
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
            borderRadius: '50%',
            boxShadow: 'inset 0 0 25px 10px #3555FF',
          }}
        />
        <div className="flex justify-center mt-4 xl:mr-8">
          <Image src="/icons/jest.png" alt="jest" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};
