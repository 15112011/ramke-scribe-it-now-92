
export interface SubscriptionRequest {
  id: string;
  email: string;
  name: string;
  phone: string;
  selectedPlan: string;
  goals: string;
  paymentScreenshot: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  planPrice: string;
}

export const subscriptionStorage = {
  // Get all subscription requests
  getAllRequests: (): SubscriptionRequest[] => {
    const stored = localStorage.getItem('subscriptionRequests');
    return stored ? JSON.parse(stored) : [];
  },

  // Add a new subscription request
  addRequest: (request: Omit<SubscriptionRequest, 'id' | 'submittedAt' | 'status'>): SubscriptionRequest => {
    const requests = subscriptionStorage.getAllRequests();
    const newRequest: SubscriptionRequest = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    requests.push(newRequest);
    localStorage.setItem('subscriptionRequests', JSON.stringify(requests));
    return newRequest;
  },

  // Update request status
  updateRequestStatus: (id: string, status: 'pending' | 'approved' | 'rejected'): void => {
    const requests = subscriptionStorage.getAllRequests();
    const updatedRequests = requests.map(req => 
      req.id === id ? { ...req, status } : req
    );
    localStorage.setItem('subscriptionRequests', JSON.stringify(updatedRequests));
  },

  // Get approved users (for member access)
  getApprovedUsers: (): string[] => {
    const requests = subscriptionStorage.getAllRequests();
    return requests
      .filter(req => req.status === 'approved')
      .map(req => req.email);
  }
};
