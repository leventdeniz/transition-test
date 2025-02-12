import React, { createContext, useCallback, useMemo, useState } from 'react';

export const ResultsContext = createContext<{ value: Record<string, unknown[]>, setter: (key: string, value: unknown[]) => void }>
({
   value: { },
   setter: () => {},
 });
export const useResultsContext = () => React.useContext(ResultsContext);

const ResultsContextProvider = ({ children }: { children: React.ReactNode} ) => {
  const [globalStateValue, setGlobalStateValue] = useState<Record<string, unknown[]>>({});

  const setter = useCallback((key: string, value: unknown[]) => {
    const newValue = {...globalStateValue};
    newValue[key] = value;
    setGlobalStateValue(newValue);
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
