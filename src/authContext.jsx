import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load from localStorage on first render
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      if (email && password) {
        const userData = { email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  };

  const signup = (email, password) => {
    return login(email, password); // reuse login logic
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
