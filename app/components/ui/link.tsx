import { Link as RouterLink, type LinkProps, useNavigate } from 'react-router';
import type { MouseEvent } from 'react';
import { useTransitionsContext } from '~/components/transition-context';

export default function Link({ children, to, onClick, viewTransition = true, transitionName, reloadDocument = false, ...props }: LinkProps & {transitionName?: string}) {
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

    console.log({ viewTransition, viewTransitionSupported });

    if (!viewTransition || !viewTransitionSupported || !transitionName) {
      if (reloadDocument) {
        if (to == -1 || to === '-1') {
          window.history.back();
        }
        let newUrl = to;
        if (typeof to !== 'string' && !!to.pathname) {
          console.log("test0", to.pathname);
          let url = to.pathname;
          console.log("test");
          if (to.search) {
            url += `?${to.search}`;
          }
          console.log("test2");
          if (to.hash) {
            url += `#${to.hash}`;
          }
          console.log("test3");
          newUrl = url;
        }
        }
      navigate(to);
      return;
    }
    // window.scroll(0, 0);
    if (transitionName) {
      setTransition(transitionName);
    }

    const transition = document.startViewTransition(() => {
      console.log({reloadDocument, to: to === -1});
        if (reloadDocument) {
          if (to == -1|| to === '-1') {
            window.history.back();
          }
          let newUrl = to;
          if (typeof to !== 'string' && !!to.pathname) {
            console.log("test0", to.pathname);
            let url = to.pathname;
            console.log("test");
            if (to.search) {
              url += `?${to.search}`;
            }
            console.log("test2");
            if (to.hash) {
              url += `#${to.hash}`;
            }
            console.log("test3");
            newUrl = url;
          }
          console.log({ newUrl });
          window.location.href = newUrl as string;
        return;
      }
      navigate(to);
      // return new Promise((resolve) => setTimeout(() => resolve(), 1000));
    });
  };

  return <RouterLink {...props} onClick={handleNavigation} to={to}>{children}</RouterLink>;
}
