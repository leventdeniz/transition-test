import React, { createContext, useCallback, useMemo, useState } from 'react';

export const ResultsContext = createContext<{ value: unknown[], setter: (value: unknown[]) => void }>
({
   value: [],
   setter: () => {},
 });
export const useResultsContext = () => React.useContext(ResultsContext);

const ResultsContextProvider = ({ children }: { children: React.ReactNode} ) => {
  const [globalStateValue, setGlobalStateValue] = useState<unknown[]>([]);

  const setter = useCallback((value: unknown[]) => {
    setGlobalStateValue(value);
  }, [setGlobalStateValue]);

  const value = useMemo(() => ({
    value: globalStateValue,
    setter,
  }), [setter, globalStateValue]);

  return (
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsContextProvider;
