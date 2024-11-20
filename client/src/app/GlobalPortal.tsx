'use client';

import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const PortalContext = createContext<HTMLElement | null>(null);

const PortalProvider = ({ children }: PropsWithChildren) => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  return (
    <PortalContext.Provider value={portalContainer}>
      {children}
      <div
        ref={(ref) => {
          if (ref && !portalContainer) {
            setPortalContainer(ref);
          }
        }}
        id="global-portal-container"
      />
    </PortalContext.Provider>
  );
};

const PortalConsumer = ({ children }: PropsWithChildren) => {
  const portalContainer = useContext(PortalContext);

  if (!portalContainer) return null;

  return createPortal(children, portalContainer);
};

const GlobalPortal = Object.assign(PortalProvider, {
  Consumer: PortalConsumer,
});

export default GlobalPortal;
