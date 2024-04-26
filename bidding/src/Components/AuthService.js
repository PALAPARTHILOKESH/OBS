import axios from 'axios';

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await axios.post("/login", credentials);
      const userData = response.data;
      localStorage.setItem('userDetails', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('userDetails');
    // Perform any other cleanup tasks
  },

  getUserDetails: () => {
    return JSON.parse(localStorage.getItem('userDetails'));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('userDetails');
  }
};

export default AuthService;
