import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';
import { classNames } from "shared/lib/helpers/classNames";

export enum ThemeButton  {
	CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (
	{
		className,
		theme,
		children,
		...otherProps
	}
) => {

	return (
		<button
			className={ classNames(cls.button, {}, [className, cls[theme]]) }
			{ ...otherProps }
		>
			{ children }
		</button>
	);
};

export default Button;
