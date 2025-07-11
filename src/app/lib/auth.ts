"use client"; // Necesario para usar hooks y localStorage

// Usuarios válidos (en producción usa DB o servicio externo)
const validUsers = [
  {
    username: 'technology@kameleonlabs.ai',
    password: '#4nrsHSre1#@uPC$3ZR8',   
  }  
];

export async function login(username: string, password: string) {
  const user = validUsers.find(u => 
    u.username === username && u.password === password
  );

  if (!user) return null;

  // Simulamos token JWT (en producción genera uno real)
  const token = Buffer.from(JSON.stringify(user)).toString('base64');
  
  // Guardamos en localStorage (solo cliente)
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token);
  }

  return user;
}

export async function getSession() {
  if (typeof window === 'undefined') return null; // No disponible en SSR

  const token = localStorage.getItem('auth-token');
  if (!token) return null;

  try {
    return JSON.parse(Buffer.from(token, 'base64').toString());
  } catch {
    return null;
  }
}

export async function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    window.location.href = '/login'; // Redirección del cliente
  }
}