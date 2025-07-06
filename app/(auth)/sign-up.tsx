import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import InputField from '../../components/InputField';

export default function SignUp() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [aadharVerified, setAadharVerified] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicleType: 'Petrol',
    aadhar: '',
    accountNumber: '',
    accountHolder: '',
    ifsc: ''
  });

  const handleNext = () => {
    if (!form.name || !form.phone || !form.vehicleType) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    setStep(2);
  };

  const handleAadharVerify = () => {
    if (!form.aadhar) {
      Alert.alert('Error', 'Please enter your Aadhar number to verify.');
      return;
    }
    // Simulate verification
    setAadharVerified(true);
    Alert.alert('Success', 'Aadhar verified!');
  };

  const handleSignUp = () => {
    if (!form.aadhar || !aadharVerified || !form.accountNumber || !form.accountHolder || !form.ifsc) {
      Alert.alert('Error', 'Please fill all fields and verify Aadhar.');
      return;
    }
    // Here you would handle actual sign up logic (API call etc.)
    router.replace('/auth/onboarding-steps');
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-primary-100 to-general-500 px-6 pt-8 pb-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {/* Header Section - More Compact */}
      <View className="items-center mb-3">
        <View className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-500 rounded-full items-center justify-center mb-2 shadow-lg">
          <Text className="text-white text-xl font-JakartaBold">🚗</Text>
        </View>
        <Text className="text-primary-50 text-xl font-JakartaExtraBold text-center mb-1">
          Join Our Fleet
        </Text>
        <Text className="text-secondary-700 text-xs font-JakartaMedium text-center">
          {step === 1 ? 'Step 1 of 2: Basic Information' : 'Step 2 of 2: Verification & Banking'}
        </Text>
      </View>

      {/* Progress Indicator */}
      <View className="flex-row items-center mb-4">
        <View className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-primary-50' : 'bg-secondary-200'}`} />
        <View className={`w-3 h-3 rounded-full mx-2 ${step >= 1 ? 'bg-primary-50' : 'bg-secondary-300'}`} />
        <View className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-primary-50' : 'bg-secondary-200'}`} />
        <View className={`w-3 h-3 rounded-full mx-2 ${step >= 2 ? 'bg-primary-50' : 'bg-secondary-300'}`} />
      </View>

      {step === 1 ? (
        <View className="space-y-4">
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            icon="person"
            value={form.name}
            onChangeText={(val) => setForm({ ...form, name: val })}
            className="mb-1"
          />
          <InputField
            label="Phone Number"
            placeholder="Enter your phone number"
            icon="call"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(val) => setForm({ ...form, phone: val })}
            className="mb-1"
          />
          
          {/* Vehicle Type Selection */}
          <View className="mb-4">
            <Text className="mb-2 text-secondary-800 font-JakartaSemiBold text-base">Vehicle Type</Text>
            <View className="border-2 border-primary-200 rounded-xl bg-white shadow-sm">
              <Picker
                selectedValue={form.vehicleType}
                onValueChange={(val) => setForm({ ...form, vehicleType: val })}
                style={{ fontFamily: 'PlusJakartaSans-Medium' }}
              >
                <Picker.Item label="🚗 Petrol Vehicle" value="Petrol" />
                <Picker.Item label="⚡ Electric Vehicle" value="Electric" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            className="bg-primary-50 from-primary-500 to-primary-500 rounded-xl py-4 items-center shadow-lg shadow-primary-200"
            onPress={handleNext}
          >
            <Text className="text-white font-JakartaBold text-lg">Continue to Verification</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="space-y-2">
          {/* Aadhar Verification Section */}
          <View className="bg-primary-100 rounded-xl p-2 mb-2 border border-primary-200">
            <Text className="text-primary-800 font-JakartaSemiBold text-sm mb-1">📋 Aadhar Verification</Text>
            <View className="flex-row items-center">
              <InputField
                label=""
                placeholder="Enter your Aadhar number"
                icon="card"
                keyboardType="numeric"
                value={form.aadhar}
                onChangeText={(val) => { 
                  setForm({ ...form, aadhar: val }); 
                  setAadharVerified(false); 
                }}
                editable={!aadharVerified}
                className="flex-1 mr-2"
              />
              <TouchableOpacity
                className={`px-3 py-2 rounded-lg ${aadharVerified ? 'bg-success-500' : 'bg-primary-500'}`}
                onPress={handleAadharVerify}
                disabled={aadharVerified}
              >
                <Text className="text-white font-JakartaSemiBold text-xs">
                  {aadharVerified ? '✅' : 'Verify'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Banking Information Section */}
          <View className="bg-success-100 rounded-xl p-2 mb-2 border border-success-200">
            <Text className="text-success-800 font-JakartaSemiBold text-sm mb-1">🏦 Banking Information</Text>
            <InputField
              label="Bank Account Number"
              placeholder="Enter your account number"
              icon="card-outline"
              keyboardType="numeric"
              value={form.accountNumber}
              onChangeText={(val) => setForm({ ...form, accountNumber: val })}
              className="mb-1"
            />
            <InputField
              label="Account Holder's Name"
              placeholder="Enter account holder's name"
              icon="person-outline"
              value={form.accountHolder}
              onChangeText={(val) => setForm({ ...form, accountHolder: val })}
              className="mb-1"
            />
            <InputField
              label="IFSC Code"
              placeholder="Enter IFSC code"
              icon="business"
              autoCapitalize="characters"
              value={form.ifsc}
              onChangeText={(val) => setForm({ ...form, ifsc: val })}
              className="mb-1"
            />
          </View>

          <TouchableOpacity
            className="bg-primary-50 from-success-500 to-success-600 rounded-xl py-3 items-center shadow-lg shadow-success-200 mb-2"
            onPress={handleSignUp}
          >
            <Text className="text-white font-JakartaBold text-base">Complete Registration</Text>
          </TouchableOpacity>
          
          {/* Fixed Back Button with better contrast */}
          <TouchableOpacity
            className="bg-secondary-100 border-2 border-secondary-300 rounded-xl py-2 px-4 items-center shadow-lg"
            onPress={() => setStep(1)}
          >
            <Text className="text-secondary-800 font-JakartaSemiBold text-sm">← Back to Step 1</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}