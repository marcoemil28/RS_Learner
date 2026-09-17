import { createContext, useContext, useState, type ReactNode } from 'react';

export interface NavigationTarget {
  moduleId: string;
  itemId: string;
}

const NavigationContext = createContext<{
  pending: NavigationTarget | null;
  goTo: (target: NavigationTarget) => void;
  clearPending: () => void;
}>({ pending: null, goTo: () => {}, clearPending: () => {} });

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<NavigationTarget | null>(null);

  return (
    <NavigationContext.Provider
      value={{
        pending,
        goTo: (target) => setPending(target),
        clearPending: () => setPending(null),
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
