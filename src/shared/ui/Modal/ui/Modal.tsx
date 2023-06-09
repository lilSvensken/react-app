import React, {
  FC, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames';
import { Portal } from 'shared/ui/Portal';
import useTheme from 'app/providers/ThemeProvider/lib/UseTheme';
import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 200;

export const Modal: FC<ModalProps> = (
  {
    className,
    children,
    isOpen,
    onClose,
    lazy,
  },
) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const { theme } = useTheme();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  // не рендерить модалку, если стоит флаг ленивой загрузки она не открыта
  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={ classNames(cls.modal, mods, [className, theme]) }>
        <div className={ classNames(cls.overlay) } onClick={ closeHandler }>
          <div className={ classNames(cls.content) } onClick={ onContentClick }>
            { children }
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
