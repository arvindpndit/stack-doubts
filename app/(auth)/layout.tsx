import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center mt-20 sm:mt-28">
      {children}
    </div>
  );
};

export default AuthLayout;

