import React from 'react';
import { User, Mail, Phone, MapPin, ShoppingBag, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { items } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  // Mock order history data
  const orderHistory = [
    {
      id: '1',
      date: '2024-01-15',
      total: 485,
      status: 'Delivered',
      items: ['Fresh Organic Bananas', 'Red Apples', 'Organic Milk']
    },
    {
      id: '2',
      date: '2024-01-10',
      total: 320,
      status: 'Delivered',
      items: ['Whole Wheat Bread', 'Farm Fresh Eggs']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">{user.phone}</p>
                  </div>
                </div>
              )}
              
              {user.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-900">{user.address}</p>
                  </div>
                </div>
              )}
            </div>

            <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
              Edit Profile
            </button>
          </div>

          {/* Order History */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
            
            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">₹{order.total}</p>
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Items: {order.items.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No orders yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Cart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Cart</h3>
            {items.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{items.length} items</p>
                <div className="space-y-2">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.product.name}</span>
                      <span className="font-semibold">x{item.quantity}</span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-gray-500">+{items.length - 3} more items</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            )}
          </div>

          {/* Loyalty Status */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="h-5 w-5 text-yellow-300 fill-current" />
              <h3 className="font-semibold">Loyalty Status</h3>
            </div>
            <p className="text-green-100 mb-2">Silver Member</p>
            <p className="text-sm text-green-100">
              You've saved ₹150 this year with ShopSmart discounts!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;