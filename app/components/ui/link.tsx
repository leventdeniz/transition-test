import { Link as RouterLink, type LinkProps, useNavigate } from 'react-router';
import type { MouseEvent } from 'react';
import { useTransitionsContext } from '~/components/transition-context';

export default function Link({ children, to, onClick, viewTransition = true, transitionName, ...props }: LinkProps & {transitionName?: string}) {
  const navigate = useNavigate();
  const { setTransition } = useTransitionsContext();

  if (to === '-1') {
    // @ts-ignore
    to = -1;
  }

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (typeof onClick === 'function') {
      onClick(event);
    }
    const viewTransitionSupported = Boolean(document.startViewTransition);

    if (!viewTransition || !viewTransitionSupported || !transitionName) {
      navigate(to);
      return;
    }
    // window.scroll(0, 0);
    if (transitionName) {
      setTransition(transitionName);
    }

    const transition = document.startViewTransition(() => {
      navigate(to);
      // return new Promise((resolve) => setTimeout(() => resolve(), 1000));
    });
  };

  return <RouterLink {...props} onClick={handleNavigation} to={to}>{children}</RouterLink>;
}
