import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Dummy check: accept any non-empty email and password
    return new Promise((resolve, reject) => {
      if (email && password) {
        setUser({ email });
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  };

  const signup = (email, password) => {
    // Simulate signup same as login
    return login(email, password);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
