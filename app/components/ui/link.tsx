import { Link as RouterLink, type LinkProps, useNavigate } from 'react-router';
import type { MouseEvent } from 'react';
import { useTransitionsContext } from '~/components/transition-context';

export default function Link({ children, to, onClick, viewTransition = true, transitionName, ...props }: LinkProps & { transitionName?: string }) {
  const navigate = useNavigate();
  const { setTransition, setUseScrollRestorationScroll } = useTransitionsContext();
  const isIosDeviceUserAgent = /iPad|iPhone|iPod/.test(navigator.userAgent);

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
      setUseScrollRestorationScroll(true);
      navigate(to);
      return;
    }

    // window.scroll(0, 0);
    if (transitionName) {
      setTransition(transitionName);
    }
    if (isIosDeviceUserAgent) {
      // window.scrollTo(0, 0);
    }

    const transition = document.startViewTransition(() => {
      setUseScrollRestorationScroll(true);
      return navigate(to);
      // return new Promise((resolve) => setTimeout(() => resolve(), 1000));
    });
  };

  return <RouterLink {...props} onClick={handleNavigation} to={to}>{children}</RouterLink>;
}
