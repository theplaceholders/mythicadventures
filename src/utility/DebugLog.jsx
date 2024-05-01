import React, { useState, useEffect } from 'react';

// DebugContext to provide and consume the log messages anywhere in the app
const DebugContext = React.createContext({
  logs: [],
  addLog: () => {}
});
export const DebugProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  // Function to add new log messages
  const addLog = async (message, response) => {
    let formattedResponse = '';
  
    if (response instanceof Response) {
      try {
        // Try to parse as JSON first, then as text if that fails.
        formattedResponse = await response.clone().json().then(JSON.stringify, () => response.text());
      } catch (error) {
        // If both JSON and text parsing fail, log an error message.
        formattedResponse = `Response could not be parsed: ${error}`;
      }
    } else if (typeof response === 'object') {
      // Fallback for any other object types.
      formattedResponse = JSON.stringify(response, null, 2);
    } else {
      // Handle non-object responses (strings, numbers, etc.).
      formattedResponse = response;
    }
  
    const combinedMessage = `${message} ${formattedResponse}`;
    setLogs(prevLogs => [...prevLogs, { message: combinedMessage, timestamp: new Date().toISOString() }]);
  };

  return (
    <DebugContext.Provider value={{ logs, addLog }}>
  {children}
</DebugContext.Provider>
  );
};

// Custom hook to use the debug log function
export const useDebugLog = () => {
  const context = React.useContext(DebugContext);
  if (!context) {
    throw new Error('useDebugLog must be used within a DebugProvider');
  }
  return context.addLog;
};

// DebugLogWindow component to display the logs
export const DebugLogWindow = () => {
  const { logs } = React.useContext(DebugContext);
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 0, 
      right: 0, 
      width: '300px', 
      height: '200px', 
      overflowY: 'scroll', 
      background: 'black', // Changed this line to black
      color: 'white', // Added for white text
      border: '1px solid #ccc'
    }}>
      {logs.map((log, index) => (
        <div key={index} style={{ 
          padding: '10px', 
          borderBottom: '1px solid #ddd', 
          color: 'white' // Ensure the text is visible on black background
        }}>
          <strong>{log.timestamp}</strong>: {log.message}
        </div>
      ))}
    </div>
  );
};

export default DebugLogWindow;
