"use client";

// auth.ts
const validUsers = [
  {
    username: 'technology@kameleonlabs.ai',
    password: '#4nrsHSre1#@uPC$3ZR8',
    name: 'Admin User'
  }  
];

export const login = (username: string, password: string) => {
  const user = validUsers.find(u => 
    u.username === username && u.password === password
  );

  if (!user) return null;

  const token = Buffer.from(JSON.stringify(user)).toString('base64');
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token);
  }

  return user;
};

export const getSession = () => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('auth-token');
  if (!token) return null;

  try {
    return JSON.parse(Buffer.from(token, 'base64').toString());
  } catch {
    return null;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    window.location.href = '/auth/login';
  }
};