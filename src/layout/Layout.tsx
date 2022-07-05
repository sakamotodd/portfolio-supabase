import { useRef, useState, FC } from 'react';
import { LayoutDTO } from '../interface/types';
import { Header } from './Header';
import { SideBar } from './SideBar.tsx';

export const Layout: FC<LayoutDTO> = ({ children, title }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [listFlag, setListFlag] = useState(false);
  const listClickRef = useRef<HTMLButtonElement>(null!);

  return (
    <div className="maxLg:relative w-screen h-screen font-serif font-light text-black dark:text-white bg-white dark:bg-darkBody">
      <Header
        title={title}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        listFlag={listFlag}
        setListFlag={setListFlag}
        listClickRef={listClickRef}
      />
      <SideBar
        styles="h-full"
        listFlag={listFlag}
        setListFlag={setListFlag}
        listClickRef={listClickRef}
      >
        {children}
      </SideBar>
    </div>
  );
};
