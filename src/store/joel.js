import React, { createContext, useState } from 'react';

export const Test = createContext();

const JoelProvider = ({ children }) => {
  const [value, setValue] = useState("Hello World");

  return (
    <Test.Provider value={{ value, setValue }}>
      {children}
    </Test.Provider>
  );
};




export default JoelProvider




