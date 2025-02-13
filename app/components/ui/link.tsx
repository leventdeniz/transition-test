import { Link as RouterLink, type LinkProps, useNavigate } from 'react-router';
import React, { type MouseEvent } from 'react';
import { useTransitionsContext } from '~/components/transition-context';

export default function Link({ children, to, onClick, viewTransition = true, transitionName, ...props }: LinkProps & { transitionName?: string }) {
  const [activeTransition, setActiveTransition] = React.useState<ViewTransition | null>(null);
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
      // setUseScrollRestorationScroll(true);
      if (isIosDeviceUserAgent) {
        window.scrollTo(0, 0);
      }
      navigate(to);
      return;
    }

    // window.scroll(0, 0);
    if (transitionName) {
      setTransition(transitionName);
    }

    const transition = document.startViewTransition(() => {
      // setUseScrollRestorationScroll(true);
      return navigate(to);
      // return new Promise((resolve) => setTimeout(() => resolve(), 1000));
    });
    setActiveTransition(transition);
    transition.ready.then(() => {
      if (isIosDeviceUserAgent) {
        window.scrollTo(0, 0);
      }
    });
    transition.finished.then(() => {
      setActiveTransition(null);
    });
  };

  return (
    <RouterLink {...props} onClick={handleNavigation} to={to}>
      {activeTransition === null ? children : 'Loading...'}
    </RouterLink>
  );
}
