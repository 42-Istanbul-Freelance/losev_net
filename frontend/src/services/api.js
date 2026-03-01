const BASE_URL = '/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: 'Bir hata oluştu.' };
    }

    let message = errorData.message || 'Bir hata oluştu.';
    if (Array.isArray(message)) {
      message = message.join(' ');
    }

    const error = new Error(message);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const api = {
  async get(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers,
    });

    return handleResponse(response);
  },

  async post(endpoint, data, options = {}) {
    const token = getAuthToken();
    const headers = {
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let body;
    if (data instanceof FormData) {
      body = data;
      // Fetch will automatically set Content-Type for FormData
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers,
      body,
    });

    return handleResponse(response);
  },

  async patch(endpoint, data, options = {}) {
    const token = getAuthToken();
    const headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  async delete(endpoint, options = {}) {
    const token = getAuthToken();
    const headers = {
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'DELETE',
      headers,
    });

    return handleResponse(response);
  }
};
