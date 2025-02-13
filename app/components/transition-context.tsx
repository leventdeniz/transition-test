import React, { createContext, useEffect, useState } from 'react';

const TransitionContext = createContext<{
  transition: string;
  setTransition:  React.Dispatch<React.SetStateAction<string>>;
  useScrollRestoration: boolean;
  setUseScrollRestorationScroll: (value: boolean) => void;
}>({
  transition: '',
  setTransition: () => {},
  setUseScrollRestorationScroll: () => {},
  useScrollRestoration: true,
});

export function TransitionContextProvider({ children }: { children: React.ReactNode}) {
  const [transition, setTransition] = useState('');
  const scrollRef = React.useRef(true);
  const useScrollRestoration = scrollRef.current;

  const setUseScrollRestorationScroll = (value: boolean) => {
    scrollRef.current = value;
  };

  useEffect(() => {
    const viewTransitionSupported = Boolean(document.startViewTransition);
    const isIOsVersion18UserAgent = navigator.userAgent.match(/OS (\d+)/)?.[1] ?? null;
  }, []);

  useEffect(() => {
    // todo: das vielleicht wieder einkommentieren?
    // window.history.scrollRestoration = 'auto'
   /* window.addEventListener('popstate', (event) => {
      console.log({ event });
      if (event.hasUAVisualTransition) {
        scrollRef.current = false;
        console.log('hasUAVisualTransition');
      } else {
        scrollRef.current = true;
        console.log('no hasUAVisualTransition');
      }
    });*/
  }, []);

  console.log({ useScrollRestoration });
  return (
    <TransitionContext.Provider value={{ transition, setTransition, useScrollRestoration, setUseScrollRestorationScroll }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransitionsContext = () => React.useContext(TransitionContext);

export default TransitionContextProvider;

export const TransitionStyles = () => {
  const { transition } = useTransitionsContext();
  const TRANSITION_STYLES = {
    'page-default-forward': `
      ::view-transition-old(root) {
        animation: 0.25s ease-in-out both push-move-out-left; 
      }
      ::view-transition-new(root) {
        animation: 0.25s ease-in-out both push-move-in-from-right;
      }
    `,
    'page-default-backward': `
      ::view-transition-old(root) {
        animation: 0.25s ease-in-out both pop-move-out-right;
        z-index: 2;
      }
      ::view-transition-new(root) {
        animation: 0.25s ease-in-out both pop-move-in-from-left;
        z-index: 1;
      }
    `,
  };

  const transitionStyles = TRANSITION_STYLES[transition] || '';

  return <style>{transitionStyles}</style>;
};
