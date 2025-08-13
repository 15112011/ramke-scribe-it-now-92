const API_BASE_URL = 'http://localhost:3001/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('authToken') || localStorage.getItem('coachToken');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      this.token = data.token;
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  }

  async coachLogin(username: string, password: string) {
    const data = await this.request('/auth/coach-login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (data.token) {
      this.token = data.token;
      localStorage.setItem('coachToken', data.token);
    }
    
    return data;
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Subscription methods
  async submitSubscription(formData: FormData) {
    return this.request('/subscriptions/submit', {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  async getMyResources() {
    return this.request('/subscriptions/my-resources');
  }

  async accessResource(resourceType: 'training' | 'video') {
    return this.request('/subscriptions/access-resource', {
      method: 'POST',
      body: JSON.stringify({ resourceType }),
    });
  }

  // Coach methods
  async getSubscriptionRequests(status = 'all', page = 1) {
    return this.request(`/coach/requests?status=${status}&page=${page}`);
  }

  async approveRequest(userId: string, accessDays: number, customPassword?: string) {
    return this.request(`/coach/approve/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ accessDays, customPassword }),
    });
  }

  async rejectRequest(userId: string, reason?: string) {
    return this.request(`/coach/reject/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async assignResources(userId: string, resources: any) {
    return this.request(`/coach/assign-resources/${userId}`, {
      method: 'POST',
      body: JSON.stringify(resources),
    });
  }

  async getDashboardStats() {
    return this.request('/coach/dashboard-stats');
  }

  // Upload methods
  async uploadPaymentProof(userId: string, file: File) {
    const formData = new FormData();
    formData.append('paymentProof', file);

    return this.request(`/upload/payment-proof/${userId}`, {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }
}

export const apiClient = new ApiClient();