import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OverviewSection() {
  const router = useRouter();

  // Mock data - in a real app, this would come from a state management system or API
  const userData = {
    // From Sign Up
    name: 'John Doe',
    phone: '+91 98765 43210',
    vehicleType: 'Petrol',
    aadhar: '1234 5678 9012',
    accountNumber: '1234567890',
    accountHolder: 'John Doe',
    ifsc: 'SBIN0001234',
    
    // From Work Section
    workArea: 'Greater Noida',
    distance: '10 km',
    joiningBonus: '₹6300',
    weeklyEarnings: 'Upto ₹13,000 weekly earnings',
    workTime: 'Full Time',
    
    // From Profile Section
    gender: 'Male',
    panNumber: 'ABCDE1234F',
    selfieImage: 'https://via.placeholder.com/200x200/FF6600/FFFFFF?text=Selfie'
  };

  const handleConfirm = () => {
    Alert.alert(
      'Registration Complete!',
      'Your application has been submitted successfully. We will review your information and get back to you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to success screen or dashboard
            router.push('/');
          }
        }
      ]
    );
  };

  const handleEdit = (section: string) => {
    Alert.alert('Edit Information', `Edit ${section} information`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Edit', onPress: () => {
        // Navigate to respective section for editing
        switch(section) {
          case 'Personal':
            router.push('/auth/sign-up');
            break;
          case 'Work':
            router.push('/Sections/work');
            break;
          case 'Profile':
            router.push('/Sections/profile');
            break;
        }
      }}
    ]);
  };

  const InfoCard = ({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) => (
    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-JakartaSemiBold text-secondary-800">{title}</Text>
        {onEdit && (
          <TouchableOpacity onPress={onEdit} className="flex-row items-center">
            <Ionicons name="pencil" size={16} color="#FF6600" />
            <Text className="text-primary-500 font-JakartaMedium text-sm ml-1">Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );

  const InfoRow = ({ label, value, icon }: { label: string; value: string; icon?: string }) => (
    <View className="flex-row items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
      <View className="flex-row items-center flex-1">
        {icon && (
          <Ionicons name={icon as any} size={16} color="#6B7280" style={{ marginRight: 8 }} />
        )}
        <Text className="text-secondary-600 font-JakartaMedium flex-1">{label}</Text>
      </View>
      <Text className="text-secondary-800 font-JakartaSemiBold text-right">{value}</Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 mt-10 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-JakartaBold text-secondary-800 mb-2">
            Review Your Information
          </Text>
          <Text className="text-base font-JakartaMedium text-secondary-600">
            Please review all the information before submitting your application
          </Text>
        </View>

        {/* Personal Information */}
        <InfoCard title="Personal Information" onEdit={() => handleEdit('Personal')}>
          <InfoRow label="Full Name" value={userData.name} icon="person" />
          <InfoRow label="Phone Number" value={userData.phone} icon="call" />
          <InfoRow label="Vehicle Type" value={userData.vehicleType} icon="car" />
          <InfoRow label="Gender" value={userData.gender} icon="person-circle" />
        </InfoCard>

        {/* Verification Documents */}
        <InfoCard title="Verification Documents" onEdit={() => handleEdit('Profile')}>
          <InfoRow label="Aadhar Number" value={userData.aadhar} icon="card" />
          <InfoRow label="PAN Number" value={userData.panNumber} icon="card-outline" />
          
          {/* Selfie Photo */}
          <View className="flex-row items-center justify-between py-2 border-b border-gray-50">
            <View className="flex-row items-center flex-1">
              <Ionicons name="camera" size={16} color="#6B7280" style={{ marginRight: 8 }} />
              <Text className="text-secondary-600 font-JakartaMedium">Selfie Photo</Text>
            </View>
            <View className="w-12 h-12 rounded-lg overflow-hidden">
              <Image 
                source={{ uri: userData.selfieImage }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>
        </InfoCard>

        {/* Banking Information */}
        <InfoCard title="Banking Information" onEdit={() => handleEdit('Personal')}>
          <InfoRow label="Account Number" value={userData.accountNumber} icon="card" />
          <InfoRow label="Account Holder" value={userData.accountHolder} icon="person" />
          <InfoRow label="IFSC Code" value={userData.ifsc} icon="business" />
        </InfoCard>

        {/* Work Information */}
        <InfoCard title="Work Information" onEdit={() => handleEdit('Work')}>
          <InfoRow label="Work Area" value={userData.workArea} icon="location" />
          <InfoRow label="Distance" value={userData.distance} icon="navigate" />
          <InfoRow label="Work Time" value={userData.workTime} icon="time" />
          
          {/* Earnings Info */}
          <View className="mt-3 p-3 bg-green-50 rounded-lg">
            <View className="flex-row items-center justify-between">
              <Text className="text-green-700 font-JakartaSemiBold">Joining Bonus</Text>
              <Text className="text-green-700 font-JakartaBold">{userData.joiningBonus}</Text>
            </View>
            <Text className="text-green-600 font-JakartaMedium text-sm mt-1">
              {userData.weeklyEarnings}
            </Text>
          </View>
        </InfoCard>

        {/* Summary Stats */}
        <View className="bg-primary-50 rounded-2xl p-6 mb-6">
          <Text className="text-primary-800 font-JakartaSemiBold text-lg mb-3 text-center">
            Application Summary
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-JakartaBold text-primary-600">3</Text>
              <Text className="text-primary-700 font-JakartaMedium text-sm">Sections</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-JakartaBold text-primary-600">✓</Text>
              <Text className="text-primary-700 font-JakartaMedium text-sm">Complete</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-JakartaBold text-primary-600">📋</Text>
              <Text className="text-primary-700 font-JakartaMedium text-sm">Ready</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3">
          <TouchableOpacity 
            onPress={handleConfirm}
            className="bg-primary-500 py-4 rounded-xl items-center shadow-lg shadow-primary-500/30"
          >
            <Text className="text-white font-JakartaSemiBold text-lg">Download the Rider App</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-gray-200 py-3 rounded-xl items-center"
          >
            <Text className="text-gray-700 font-JakartaSemiBold">Back to Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Progress indicator
        <View className="flex-row justify-center mt-6">
          <View className="w-2 h-2 bg-primary-500 rounded-full mx-1"></View>
          <View className="w-2 h-2 bg-primary-500 rounded-full mx-1"></View>
          <View className="w-2 h-2 bg-primary-500 rounded-full mx-1"></View>
          <View className="w-2 h-2 bg-primary-500 rounded-full mx-1"></View>
        </View> */}
      </View>
    </ScrollView>
  );
} 