import React, { useState, VFC } from 'react';
import { Lan_skills } from './LanguageSkill';
import { OtherSkills } from './otherSkill';

const Skill: VFC = () => {
  const [openFlag, setOpenFlag] = useState(false);

  return (
    <div id="Skill" className="flex flex-col justify-center items-center h-full lg:min-h-screen">
      <div className="mt-24 lg:mt-4 lg:w-2/3">
        <div className="flex">
          <button
            onClick={() => setOpenFlag(true)}
            className="flex justify-center items-center p-2 my-4 w-1/2 text-white bg-green-300 rounded-md shadow-md"
          >
            言語・フレームワーク
          </button>
          <button
            onClick={() => setOpenFlag(false)}
            className="flex justify-center items-center p-2 my-4 w-1/2 text-black bg-white rounded-md shadow-md"
          >
            その他
          </button>
        </div>
        {openFlag ? <Lan_skills /> : <OtherSkills />}
      </div>
    </div>
  );
};

export default Skill;
