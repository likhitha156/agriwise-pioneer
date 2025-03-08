
import React from 'react';
import FontLoader from './FontLoader';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <>
      <FontLoader />
      {children}
    </>
  );
};

export default AppWrapper;
