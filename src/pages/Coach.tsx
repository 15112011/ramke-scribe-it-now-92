import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Shield, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar,
  FileText,
  Play,
  Plus,
  Edit,
  Trash2,
  Ban,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  Lock,
  Unlock
} from 'lucide-react';

interface SubscriptionRequest {
  _id: string;
  email: string;
  name: string;
  phone: string;
  subscription: {
    plan: string;
    status: string;
    startDate?: string;
    endDate?: string;
    accessDays?: number;
  };
  goals: string;
  paymentProof?: {
    cloudinaryUrl: string;
    uploadedAt: string;
  };
  resources: {
    videos: Array<{ title: string; url: string; assignedAt: string }>;
    documents: Array<{ title: string; url: string; type: string; assignedAt: string }>;
  };
  createdAt: string;
  isBlocked: boolean;
}

interface DashboardStats {
  totalUsers: number;
  pendingRequests: number;
  activeSubscriptions: number;
  blockedUsers: number;
}

const Coach: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [requests, setRequests] = useState<SubscriptionRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    pendingRequests: 0,
    activeSubscriptions: 0,
    blockedUsers: 0
  });
  const [selectedRequest, setSelectedRequest] = useState<SubscriptionRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [approvalData, setApprovalData] = useState({ accessDays: 30, customPassword: '' });
  const [resourceData, setResourceData] = useState({
    videos: [{ title: '', url: '' }],
    documents: [{ title: '', url: '', type: 'training' }]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();
  const { language } = useLanguage();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('coachToken');
    if (token) {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/coach-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('coachToken', data.token);
        setIsAuthenticated(true);
        loadDashboardData();
        toast({
          title: "Login Successful",
          description: "Welcome to the coach dashboard",
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Failed to connect to server",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('coachToken');
      
      // Load subscription requests
      const requestsResponse = await fetch('/api/coach/requests', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        setRequests(requestsData.requests);
      }

      // Load dashboard stats
      const statsResponse = await fetch('/api/coach/dashboard-stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem('coachToken');
      const response = await fetch(`/api/coach/approve/${selectedRequest._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(approvalData)
      });

      if (response.ok) {
        toast({
          title: "Request Approved",
          description: `${selectedRequest.name} has been granted access for ${approvalData.accessDays} days`,
        });
        setIsApprovalModalOpen(false);
        loadDashboardData();
      } else {
        const error = await response.json();
        toast({
          title: "Approval Failed",
          description: error.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleReject = async (userId: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('coachToken');
      const response = await fetch(`/api/coach/reject/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: 'Coach decision' })
      });

      if (response.ok) {
        toast({
          title: "Request Rejected",
          description: "The subscription request has been rejected",
        });
        loadDashboardData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject request",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleAssignResources = async () => {
    if (!selectedRequest) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem('coachToken');
      const response = await fetch(`/api/coach/assign-resources/${selectedRequest._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(resourceData)
      });

      if (response.ok) {
        toast({
          title: "Resources Assigned",
          description: `Resources have been assigned to ${selectedRequest.name}`,
        });
        setIsResourceModalOpen(false);
        loadDashboardData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign resources",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('coachToken');
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  const addVideoField = () => {
    setResourceData(prev => ({
      ...prev,
      videos: [...prev.videos, { title: '', url: '' }]
    }));
  };

  const addDocumentField = () => {
    setResourceData(prev => ({
      ...prev,
      documents: [...prev.documents, { title: '', url: '', type: 'training' }]
    }));
  };

  const removeVideoField = (index: number) => {
    setResourceData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const removeDocumentField = (index: number) => {
    setResourceData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Coach Dashboard</CardTitle>
            <p className="text-gray-300">Secure access for fitness coaches</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-200">Username</Label>
              <Input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Enter coach username"
              />
            </div>
            
            <div>
              <Label className="text-gray-200">Password</Label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Enter coach password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              disabled={isLoading || !credentials.username || !credentials.password}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Access Dashboard
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coach Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage subscriptions and resources</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Active Users
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pending Requests</p>
                      <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Active Subscriptions</p>
                      <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Ban className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Blocked Users</p>
                      <p className="text-2xl font-bold">{stats.blockedUsers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Subscription Requests</h2>
              <Button onClick={loadDashboardData} variant="outline">
                Refresh
              </Button>
            </div>

            <div className="grid gap-4">
              {requests.filter(req => req.subscription.status === 'pending').map((request) => (
                <Card key={request._id} className="border-l-4 border-l-yellow-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{request.name}</h3>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {request.subscription.plan}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-1">{request.email}</p>
                        <p className="text-gray-600 mb-2">{request.phone}</p>
                        <p className="text-sm text-gray-500">
                          Submitted: {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setIsDetailModalOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setIsApprovalModalOpen(true);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(request._id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Active Users</h2>
              <Button onClick={loadDashboardData} variant="outline">
                Refresh
              </Button>
            </div>

            <div className="grid gap-4">
              {requests.filter(req => req.subscription.status === 'active').map((user) => (
                <Card key={user._id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <Badge className="bg-green-100 text-green-800">
                            {user.subscription.plan}
                          </Badge>
                          {user.subscription.endDate && (
                            <Badge variant="outline">
                              Expires: {new Date(user.subscription.endDate).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">{user.email}</p>
                        <p className="text-sm text-gray-500">
                          Videos: {user.resources.videos.length} | Documents: {user.resources.documents.length}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(user);
                            setIsResourceModalOpen(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Assign Resources
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Resource Management</h3>
              <p className="text-gray-600">Global resource management features coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Details - {selectedRequest?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Email:</strong> {selectedRequest.email}</p>
                    <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                    <p><strong>Plan:</strong> {selectedRequest.subscription.plan}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  <Badge className={
                    selectedRequest.subscription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedRequest.subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {selectedRequest.subscription.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Fitness Goals</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{selectedRequest.goals}</p>
                </div>
              </div>
              
              {selectedRequest.paymentProof && (
                <div>
                  <h4 className="font-semibold mb-2">Payment Proof</h4>
                  <div className="border rounded-lg p-4">
                    <img 
                      src={selectedRequest.paymentProof.cloudinaryUrl} 
                      alt="Payment proof"
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Subscription - {selectedRequest?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Access Duration (Days)</Label>
              <Input
                type="number"
                min="1"
                max="365"
                value={approvalData.accessDays}
                onChange={(e) => setApprovalData({
                  ...approvalData,
                  accessDays: parseInt(e.target.value) || 30
                })}
              />
            </div>
            
            <div>
              <Label>Custom Password (Optional)</Label>
              <Input
                type="password"
                placeholder="Leave empty to keep user's password"
                value={approvalData.customPassword}
                onChange={(e) => setApprovalData({
                  ...approvalData,
                  customPassword: e.target.value
                })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={isLoading}>
              <Unlock className="w-4 h-4 mr-2" />
              Grant Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resource Assignment Modal */}
      <Dialog open={isResourceModalOpen} onOpenChange={setIsResourceModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Resources - {selectedRequest?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Videos Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Play className="w-5 h-5 text-red-500" />
                  Video Resources
                </h4>
                <Button size="sm" onClick={addVideoField}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Video
                </Button>
              </div>
              
              {resourceData.videos.map((video, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg mb-4">
                  <div>
                    <Label>Video Title</Label>
                    <Input
                      value={video.title}
                      onChange={(e) => {
                        const newVideos = [...resourceData.videos];
                        newVideos[index].title = e.target.value;
                        setResourceData({...resourceData, videos: newVideos});
                      }}
                      placeholder="e.g., Chest Workout Routine"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>YouTube URL</Label>
                      <Input
                        value={video.url}
                        onChange={(e) => {
                          const newVideos = [...resourceData.videos];
                          newVideos[index].url = e.target.value;
                          setResourceData({...resourceData, videos: newVideos});
                        }}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeVideoField(index)}
                      className="mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Document Resources
                </h4>
                <Button size="sm" onClick={addDocumentField}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Document
                </Button>
              </div>
              
              {resourceData.documents.map((doc, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg mb-4">
                  <div>
                    <Label>Document Title</Label>
                    <Input
                      value={doc.title}
                      onChange={(e) => {
                        const newDocs = [...resourceData.documents];
                        newDocs[index].title = e.target.value;
                        setResourceData({...resourceData, documents: newDocs});
                      }}
                      placeholder="e.g., Beginner Training Plan"
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <select 
                      className="w-full p-2 border rounded"
                      value={doc.type}
                      onChange={(e) => {
                        const newDocs = [...resourceData.documents];
                        newDocs[index].type = e.target.value;
                        setResourceData({...resourceData, documents: newDocs});
                      }}
                    >
                      <option value="training">Training</option>
                      <option value="diet">Diet Plan</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>Drive/PDF URL</Label>
                      <Input
                        value={doc.url}
                        onChange={(e) => {
                          const newDocs = [...resourceData.documents];
                          newDocs[index].url = e.target.value;
                          setResourceData({...resourceData, documents: newDocs});
                        }}
                        placeholder="https://drive.google.com/..."
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeDocumentField(index)}
                      className="mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResourceModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignResources} disabled={isLoading}>
              <Plus className="w-4 h-4 mr-2" />
              Assign Resources
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Coach;