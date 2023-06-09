import { classNames } from 'shared/lib/helpers/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar = (
  {
    className,
  }: SidebarProps,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={ classNames(cls.sidebar, { [cls.open]: isOpen }, [className]) }
    >
      <button onClick={ onToggle }>
        TOGGLE
      </button>
      <div className={ classNames(cls.switchers) }>
        <ThemeSwitcher />
        <LangSwitcher className={ cls.lang } />
      </div>
    </div>
  );
};

export default Sidebar;
