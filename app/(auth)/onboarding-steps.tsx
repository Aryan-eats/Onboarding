import React from 'react';
import { View, Text, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingSteps() {
  const router = useRouter();

  const handleStartNow = () => {
    router.push('/Sections/work');
  };

  const handleProfile = () => {
    router.push('/Sections/profile');
  };

  const handleKit = () => {
    router.push('/Sections/kit');
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold mt-10 mb-2 text-center">Become a delivery partner in 3 easy steps!</Text>
      </View>
      <Pressable onPress={handleStartNow} className="bg-grey rounded-xl p-4 mt-10 mb-4 border border-orange-200 active:bg-primary-50">
        <Text className="text-lg font-semibold mb-2">STEP 1</Text>
        <Text className="text-xl font-bold mb-2">Work Settings</Text>
        <Pressable
          className="bg-orange-500 rounded-lg py-2 px-4 self-start active:bg-primary-50"
          onPress={handleStartNow}
        >
          <Text className="text-white font-semibold">Start now</Text>
        </Pressable>
      </Pressable>
      <Pressable onPress={handleProfile} className="bg-grey rounded-xl p-4 mt-5 mb-4 border border-orange-200 active:bg-primary-50">
        <Text className="text-lg font-semibold mb-2">STEP 2</Text>
        <Text className="text-xl font-bold mb-1">Profile</Text>
        <Text className="text-gray-600">Upload Aadhar, PAN & Bank details</Text>
      </Pressable>
      <Pressable onPress={handleKit} className="bg-grey rounded-xl p-4 mt-5 border border-orange-200 active:bg-primary-50">
        <Text className="text-lg font-semibold mb-2">STEP 3</Text>
        <Text className="text-xl font-bold mb-1">Order Delivery Kit</Text>
      </Pressable>
    </View>
  );
} 