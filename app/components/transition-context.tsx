import React, { createContext, useState } from 'react';

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
