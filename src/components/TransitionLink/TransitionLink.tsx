'use client';

import { useTransition, ComponentProps, MouseEvent } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = ComponentProps<typeof Link>;

export default function TransitionLink({ href, onClick, ...props }: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);

    if (
      props.target === '_blank' ||
      (typeof href === 'string' &&
        (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:')))
    ) {
      return;
    }

    e.preventDefault();

    const hrefStr = typeof href === 'string' ? href : (href.pathname ?? '/');

    startTransition(() => {
      router.push(hrefStr);
    });
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
