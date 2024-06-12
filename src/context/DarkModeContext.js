import React, { createContext, useState } from 'react';

// Create a context for dark mode
export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    // Initialize the dark mode state as false (light mode by default)
    const [darkMode, setDarkMode] = useState(false);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode); // Toggle the dark mode state
        // Update the body's class based on the new dark mode state
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    };

    // Provide the dark mode state and toggle function to the context consumers
    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
