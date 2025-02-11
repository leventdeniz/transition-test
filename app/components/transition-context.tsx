import React, { createContext, useEffect, useState } from 'react';

const TransitionContext = createContext<{
  transition: string;
  setTransition:  React.Dispatch<React.SetStateAction<string>>;
}>({
  transition: '',
  setTransition: () => {},
});

export function TransitionContextProvider({ children }: { children: React.ReactNode}) {
  const [transition, setTransition] = useState('');

  return (
    <TransitionContext.Provider value={{ transition, setTransition }}>
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
