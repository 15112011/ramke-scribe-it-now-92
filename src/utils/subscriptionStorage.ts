
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

export interface DailyUsage {
  email: string;
  date: string;
  trainingsAccessed: number;
  videosAccessed: number;
}

export interface TrainingResource {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  pdfUrl: string;
  type: 'training' | 'diet';
  enabled: boolean;
}

export interface VideoResource {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  videoUrl: string;
  enabled: boolean;
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
  },

  // Daily usage tracking
  getDailyUsage: (email: string): DailyUsage => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyUsage');
    const allUsage: DailyUsage[] = stored ? JSON.parse(stored) : [];
    
    return allUsage.find(u => u.email === email && u.date === today) || {
      email,
      date: today,
      trainingsAccessed: 0,
      videosAccessed: 0
    };
  },

  updateDailyUsage: (email: string, type: 'training' | 'video'): void => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyUsage');
    const allUsage: DailyUsage[] = stored ? JSON.parse(stored) : [];
    
    const existingIndex = allUsage.findIndex(u => u.email === email && u.date === today);
    
    if (existingIndex >= 0) {
      if (type === 'training') {
        allUsage[existingIndex].trainingsAccessed++;
      } else {
        allUsage[existingIndex].videosAccessed++;
      }
    } else {
      allUsage.push({
        email,
        date: today,
        trainingsAccessed: type === 'training' ? 1 : 0,
        videosAccessed: type === 'video' ? 1 : 0
      });
    }
    
    localStorage.setItem('dailyUsage', JSON.stringify(allUsage));
  },

  // Training resources management
  getTrainingResources: (): TrainingResource[] => {
    const stored = localStorage.getItem('trainingResources');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default training resources
    const defaultResources: TrainingResource[] = [
      {
        id: '1',
        title: { en: 'Beginner Training Program', ar: 'برنامج التدريب للمبتدئين' },
        description: { en: 'A comprehensive 4-week training program for beginners', ar: 'برنامج تدريبي شامل لمدة 4 أسابيع للمبتدئين' },
        pdfUrl: '/training-pdfs/beginner-program.pdf',
        type: 'training',
        enabled: true
      },
      {
        id: '2',
        title: { en: 'Fat Loss Diet Plan', ar: 'خطة النظام الغذائي لحرق الدهون' },
        description: { en: 'Effective diet plan for fat loss and muscle preservation', ar: 'خطة نظام غذائي فعال لحرق الدهون والحفاظ على العضلات' },
        pdfUrl: '/diet-pdfs/fat-loss-diet.pdf',
        type: 'diet',
        enabled: true
      }
    ];
    
    localStorage.setItem('trainingResources', JSON.stringify(defaultResources));
    return defaultResources;
  },

  updateTrainingResources: (resources: TrainingResource[]): void => {
    localStorage.setItem('trainingResources', JSON.stringify(resources));
  },

  // Video resources management
  getVideoResources: (): VideoResource[] => {
    const stored = localStorage.getItem('videoResources');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default video resources
    const defaultVideos: VideoResource[] = [
      {
        id: '1',
        title: { en: 'Proper Form Techniques', ar: 'تقنيات الأداء الصحيح' },
        description: { en: 'Learn the correct form for basic exercises', ar: 'تعلم الشكل الصحيح للتمارين الأساسية' },
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        enabled: true
      }
    ];
    
    localStorage.setItem('videoResources', JSON.stringify(defaultVideos));
    return defaultVideos;
  },

  updateVideoResources: (videos: VideoResource[]): void => {
    localStorage.setItem('videoResources', JSON.stringify(videos));
  }
};
