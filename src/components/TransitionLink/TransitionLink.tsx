'use client';

import { useRouter } from 'next/navigation';
import { ComponentProps, MouseEvent } from 'react';

import Link from 'next/link';

type Props = ComponentProps<typeof Link>;

export default function TransitionLink({ href, onClick, ...props }: Props) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);

    // External links or new tab: let default <Link> behaviour handle
    if (
      props.target === '_blank' ||
      (typeof href === 'string' &&
        (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')))
    ) {
      return;
    }

    // Graceful fallback for browsers without View Transitions API
    if (!('startViewTransition' in document)) {
      return;
    }

    e.preventDefault();

    const hrefStr = typeof href === 'string' ? href : (href.pathname ?? '/');

    (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(
      () => { router.push(hrefStr); }
    );
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
