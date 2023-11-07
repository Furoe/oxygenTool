import { useState } from 'react';
import dark from '@/assets/images/dark.svg';
import light from '@/assets/images/light.svg';
import logoImg from '@/assets/logo-64.svg';

function Navbar() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = (type: string) => {
    if (localStorage.theme) {
      document.documentElement.classList.remove(
        type === 'light' ? 'dark' : 'light'
      );
    }
    document.documentElement.classList.add(type);
    localStorage.theme = type;
    setTheme(type);
  };
  return (
    <>
      <div className="flex justify-between py-4 px-8 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.08] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        <div className="flex items-center">
          <img src={logoImg} width={24} height={24} />
          <p className="font-semibold text-base text-transparent bg-gradient-to-r from-purple to-blue bg-clip-text">
            OxygenTool
          </p>
        </div>
        <div>
          <span
            className={`${theme === 'light' ? '' : 'hidden'}`}
            onClick={() => toggleTheme('dark')}
          >
            <img
              src={light}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </span>
          <span
            className={`${theme === 'dark' ? '' : 'hidden'}`}
            onClick={() => toggleTheme('light')}
          >
            <img
              src={dark}
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default Navbar;
