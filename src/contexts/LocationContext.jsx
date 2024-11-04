import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(localStorage.getItem('location') || 'hanoi');

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('location', newLocation);
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
} 