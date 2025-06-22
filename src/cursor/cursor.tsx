import { forwardRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import type { CursorProps } from './cursor.props';
import { cursorStyles } from './cursor.styles';
import { cn } from './cursor.utils';

gsap.registerPlugin(useGSAP);

export const Cursor = forwardRef<HTMLDivElement, CursorProps>(function Cursor(
  { className, ...rest },
  ref,
) {
  const styles = cursorStyles();

  useGSAP(() => {
    if ('ontouchstart' in window) return;

    gsap.defaults({ ease: 'power1.out', duration: 0.01 });

    let angle = 0;
    let scale = 0;
    let distance = { x: 0, y: 0 };
    let cursorPos = { x: 0, y: 0 };
    let cursorCenter = { x: 0, y: 0 };

    const cursor = document?.querySelector('.cursor');
    const cursorCore = cursor?.querySelector('.cursor-core');
    const cursorBorder = cursor?.querySelector('.cursor-border');

    if (!cursor || !cursorBorder || !cursorCore) return;

    gsap.ticker.add(() => {
      const { left, top, width, height } = cursorBorder.getBoundingClientRect();

      cursorCenter = { x: left + width / 2, y: top + height / 2 };
      distance = { x: cursorPos.x - cursorCenter.x, y: cursorPos.y - cursorCenter.y };
      angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI);
      scale = 1 + (Math.abs(distance.x) + Math.abs(distance.y)) / 60;

      if (scale > 3) scale = 3;

      const translateX = `calc(${cursorCenter.x + distance.x * 0.6}px - 50%)`;
      const translateY = `calc(${cursorCenter.y + distance.y * 0.6}px - 50%)`;
      const translateCore = `translate3d(calc(${cursorPos.x}px - 50%), calc(${cursorPos.y}px - 50%), 0)`;
      const translateBorder = `translate3d(${translateX}, ${translateY}, 0) rotate(${angle}deg) scaleX(${scale})`;

      gsap.to(cursorCore, { transform: translateCore });
      gsap.to(cursorBorder, { transform: translateBorder });
    });

    const onMouseMove = (e: MouseEvent) => (cursorPos = { x: e.pageX, y: e.pageY });

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  return (
    <div ref={ref} className={styles.cursor({ className: cn('cursor', className) })} {...rest}>
      <div className={styles.cursorCore({ className: cn('cursor-core') })} />
      <div className={styles.cursorBorder({ className: cn('cursor-border') })} />
    </div>
  );
});
