import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (
	{
		to,
		className,
		children,
		theme = AppLinkTheme.PRIMARY,
		...otherProps
	}
) => {

	return (
		<Link
			to={ to }
			className={ classNames(cls.appLink, {}, [className, cls[theme]]) }
			{ ...otherProps }
		>
			{ children }
		</Link>
	);
};

export default AppLink;