import React, { createContext, useState } from 'react';

const RequestIdContext = createContext();

const RequestIdProvider = ({ children }) => {
  const [requestId, setRequestId] = useState(null);

  const value = { requestId, setRequestId };

  return (
    <RequestIdContext.Provider value={value}>
      {children}
    </RequestIdContext.Provider>
  );
};

export { RequestIdContext, RequestIdProvider };
