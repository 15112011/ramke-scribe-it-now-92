import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Check, 
  X, 
  Eye, 
  Phone, 
  Mail, 
  Calendar,
  CreditCard,
  User,
  MessageSquare,
  Shield,
  Lock,
  Clock,
  Ban
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { subscriptionStorage, SubscriptionRequest } from '@/utils/subscriptionStorage';

export const SubscriptionRequests: React.FC = () => {
  const [requests, setRequests] = useState<SubscriptionRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<SubscriptionRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [accessMonths, setAccessMonths] = useState(1);
  const { toast } = useToast();

  // Load requests on component mount
  useEffect(() => {
    setRequests(subscriptionStorage.getAllRequests());
  }, []);

  const handleApprove = (request: SubscriptionRequest) => {
    setSelectedRequest(request);
    // Use existing password if user set one during subscription
    setPassword(request.password || '');
    setIsApprovalModalOpen(true);
  };

  const handleApprovalConfirm = () => {
    if (!selectedRequest || !password) {
      toast({
        title: "Error",
        description: "Please set a password for the user.",
        variant: "destructive"
      });
      return;
    }

    subscriptionStorage.setUserAccess(selectedRequest.id, password, accessMonths);
    setRequests(subscriptionStorage.getAllRequests());
    setIsApprovalModalOpen(false);
    setPassword('');
    setAccessMonths(1);
    setSelectedRequest(null);
    
    toast({
      title: "Application Approved",
      description: `Access granted for ${accessMonths} month(s). Password set successfully.`,
      variant: "default"
    });
  };

  const handleReject = (requestId: string) => {
    subscriptionStorage.updateRequestStatus(requestId, 'rejected');
    setRequests(subscriptionStorage.getAllRequests());
    
    toast({
      title: "Application Rejected",
      description: "The client has been notified of the decision.",
      variant: "destructive"
    });
  };

  const handleBlock = (requestId: string) => {
    subscriptionStorage.blockUser(requestId);
    setRequests(subscriptionStorage.getAllRequests());
    
    toast({
      title: "User Blocked",
      description: "The user has been blocked from accessing the platform.",
      variant: "destructive"
    });
  };

  const openDetailModal = (request: SubscriptionRequest) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      case 'blocked': return <Ban className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Subscription Requests</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-yellow-50">
            {pendingRequests.length} Pending
          </Badge>
          <Badge variant="outline" className="bg-green-50">
            {processedRequests.filter(r => r.status === 'approved').length} Approved
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {processedRequests.filter(r => r.status === 'blocked').length} Blocked
          </Badge>
        </div>
      </div>

      {/* Empty State */}
      {requests.length === 0 && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Subscription Requests</h3>
            <p className="text-gray-500 text-center">
              Subscription requests will appear here when customers submit applications.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-800">Pending Review</h3>
          <div className="grid gap-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{request.name}</CardTitle>
                        <p className="text-sm text-gray-600">{request.selectedPlan} - {request.planPrice}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{request.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{request.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{new Date(request.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      <span>Payment proof uploaded</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Goals:</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{request.goals}</p>
                      </div>
                    </div>
                  </div>

                  {request.password && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-green-600" />
                        <p className="text-sm text-green-800">
                          User has set their password during subscription
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDetailModal(request)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(request)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(request.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Management</h3>
          <div className="grid gap-3">
            {processedRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-gray-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        request.status === 'approved' ? 'bg-green-100' : 
                        request.status === 'blocked' ? 'bg-gray-100' : 'bg-red-100'
                      }`}>
                        {getStatusIcon(request.status)}
                      </div>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-sm text-gray-600">{request.selectedPlan}</p>
                        <p className="text-xs text-gray-500">{request.phone}</p>
                        {request.accessExpiryDate && (
                          <p className="text-xs text-gray-500">
                            Expires: {new Date(request.accessExpiryDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                      {request.status === 'approved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBlock(request.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="w-4 h-4 mr-1" />
                          Block
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve User Access - {selectedRequest?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {selectedRequest?.password ? 'Update Password' : 'Set Password'}
              </label>
              <Input
                type="password"
                placeholder={selectedRequest?.password ? "Update user password" : "Enter user password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {selectedRequest?.password && (
                <p className="text-xs text-green-600 mt-1">
                  User already set a password during subscription. You can keep it or change it.
                </p>
              )}
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Access Duration (Months)</label>
              <Input
                type="number"
                min="1"
                max="12"
                value={accessMonths}
                onChange={(e) => setAccessMonths(parseInt(e.target.value) || 1)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleApprovalConfirm} className="bg-green-600 hover:bg-green-700">
                <Shield className="w-4 h-4 mr-1" />
                Grant Access
              </Button>
              <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details - {selectedRequest?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> {selectedRequest.email}</p>
                    <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                    <p><strong>Plan:</strong> {selectedRequest.selectedPlan}</p>
                    <p><strong>Price:</strong> {selectedRequest.planPrice}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Application Status</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Status:</strong> 
                      <Badge className={`ml-2 ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </Badge>
                    </p>
                    <p><strong>Submitted:</strong> {new Date(selectedRequest.submittedAt).toLocaleString()}</p>
                    {selectedRequest.password && (
                      <p><strong>Password:</strong> 
                        <span className="ml-2 text-green-600">✓ Set by user</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Fitness Goals</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{selectedRequest.goals}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Payment Proof</h4>
                <div className="border rounded-lg p-4">
                  <img 
                    src={selectedRequest.paymentScreenshot} 
                    alt="Payment screenshot"
                    className="max-w-full h-auto rounded"
                  />
                </div>
              </div>
              
              {selectedRequest.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      handleApprove(selectedRequest);
                      setIsDetailModalOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve Application
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedRequest.id);
                      setIsDetailModalOpen(false);
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject Application
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
