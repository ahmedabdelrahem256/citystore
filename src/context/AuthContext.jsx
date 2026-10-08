import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Load saved session from localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rawaa_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Persist user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('rawaa_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('rawaa_auth_user');
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, [user]);

  // Login handler
  const login = async (email, password) => {
    // Simulating authentication
    const cleanEmail = email.trim().toLowerCase();
    
    // Check saved registered users in mock db
    let registeredUsers = [];
    try {
      const savedUsers = localStorage.getItem('rawaa_mock_users');
      registeredUsers = savedUsers ? JSON.parse(savedUsers) : [];
    } catch (e) {
      registeredUsers = [];
    }

    const matchedUser = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);

    let loggedInUser;
    if (matchedUser) {
      loggedInUser = matchedUser;
    } else {
      // Default mock login
      const nameFromEmail = cleanEmail.split('@')[0];
      loggedInUser = {
        id: 'usr_' + Date.now(),
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        email: cleanEmail,
        phone: '0501234567',
        role: 'buyer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        joinedAt: new Date().toLocaleDateString('ar-SA')
      };
    }

    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    return { success: true, user: loggedInUser };
  };

  // Register handler
  const register = async ({ name, email, password, phone, role = 'buyer' }) => {
    const cleanEmail = email.trim().toLowerCase();
    
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      phone: phone || '05XXXXXXXX',
      role: role, // 'buyer' | 'seller'
      avatar: role === 'seller'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      joinedAt: new Date().toLocaleDateString('ar-SA')
    };

    // Save into mock db
    try {
      const savedUsers = localStorage.getItem('rawaa_mock_users');
      const registeredUsers = savedUsers ? JSON.parse(savedUsers) : [];
      registeredUsers.push(newUser);
      localStorage.setItem('rawaa_mock_users', JSON.stringify(registeredUsers));
    } catch (e) {
      // Ignore
    }

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  // Quick Demo Logins
  const loginAsDemo = (type = 'buyer') => {
    if (type === 'seller') {
      const demoSeller = {
        id: 'usr_seller_demo',
        name: 'م. سلطان العتيبي',
        email: 'sultan.seller@rawaa.com',
        phone: '0555123456',
        role: 'seller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        joinedAt: 'منذ شهر'
      };
      setUser(demoSeller);
    } else {
      const demoBuyer = {
        id: 'usr_buyer_demo',
        name: 'سارة القحطاني',
        email: 'sara.buyer@rawaa.com',
        phone: '0544987654',
        role: 'buyer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        joinedAt: 'منذ 3 أشهر'
      };
      setUser(demoBuyer);
    }
    setIsAuthModalOpen(false);
  };

  // Logout handler
  const logout = () => {
    setUser(null);
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAuthModalOpen,
    authMode,
    setAuthMode,
    openLogin,
    openRegister,
    closeAuthModal,
    login,
    register,
    loginAsDemo,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
