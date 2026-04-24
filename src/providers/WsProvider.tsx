import React from 'react';
import { useWsConnection } from '../hooks/useWsConnection';

interface WsProviderProps {
  children: React.ReactNode;
}

const WsConnector: React.FC = () => {
  useWsConnection();
  return null;
};

export const WsProvider: React.FC<WsProviderProps> = ({ children }) => (
  <>
    <WsConnector />
    {children}
  </>
);
