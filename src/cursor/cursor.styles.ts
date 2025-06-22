import { tv, type VariantProps } from 'tailwind-variants';

export const cursorStyles = tv({
  slots: {
    cursor: `
      fixed top-0 left-0 pointer-events-none z-50 will-change-transform
    `,
    cursorCore: `
      fixed top-0 left-0 pointer-events-none z-50 will-change-transform
      rounded-full size-[var(--cursor-core-size)] 
      bg-[rgba(var(--cursor-color))] 
    `,
    cursorBorder: `
      fixed top-0 left-0 pointer-events-none z-50 will-change-transform
      rounded-full size-[var(--cursor-border-size)]
      bg-[rgba(var(--cursor-color))] opacity-20
    `,
  },
});

export type CursorStyles = VariantProps<typeof cursorStyles>;
