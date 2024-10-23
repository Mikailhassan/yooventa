export const api = {
  checkSession: async () => {
    const response = await fetch('http://localhost:4000/auth/check-session', {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Session check failed');
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Logout failed');
    return response.json();
  },

  getSchoolData: async (schoolId) => {
    const response = await fetch(`http://localhost:4000/schools/${schoolId}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch school data');
    return response.json();
  }
};