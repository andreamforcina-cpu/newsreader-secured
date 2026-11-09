/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Classroom demonstration only: real authentication and roles require a server.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (username, password, role = 'regular') => {
    const name = username.trim();
    if (!name || !password.trim() || !['regular', 'admin'].includes(role)) {
      throw new Error('Enter a username, password, and valid demo role.');
    }
    setUser({ username: name, role });
  };
  const logout = () => setUser(null);
  const isAuthenticated = () => user !== null;
  const isAdmin = () => user?.role === 'admin';
  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth requires AuthProvider');
  return context;
}
