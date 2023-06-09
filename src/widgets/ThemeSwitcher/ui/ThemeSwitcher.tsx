import { classNames } from 'shared/lib/helpers/classNames';
import { Theme, UseTheme } from 'app/providers/ThemeProvider';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import cls from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = UseTheme();

  return (
    <Button
      theme={ ThemeButton.CLEAR }
      className={ classNames(cls.themeSwitcher) }
      onClick={ toggleTheme }
    >
      {
        theme === Theme.Dark
          ? <DarkIcon />
          : <LightIcon />
      }
    </Button>
  );
};

export default ThemeSwitcher;
