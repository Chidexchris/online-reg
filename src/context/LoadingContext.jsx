import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const triggerLoading = (duration = 1000) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, duration);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, triggerLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
