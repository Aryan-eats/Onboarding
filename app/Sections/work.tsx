import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';

// Accept vehicleType as a prop
export default function WorkSection({ vehicleType = 'Bike' }) {
  const [step, setStep] = useState(1);
  const [workTime, setWorkTime] = useState('');

  // Placeholder values
  const area = 'Greater Noida';
  const distance = '10 km';
  const joiningBonus = '₹6300';
  const weeklyEarnings = 'Upto ₹13,000 weekly earnings';

  const handleStartDelivery = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.deliveryapp'); // Replace with actual app link
  };

  // Step 1: Area selection
  if (step === 1) {
    return (
      <View className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-6 mt-10 pt-8">
            <Text className="text-xl font-bold text-gray-900">Select the area you want to work in</Text>
            <Text className="text-sm text-gray-500 mt-1 mb-6">
              Select area on the basis of earnings and distance from your location.
            </Text>
            <View className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm bg-white">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-gray-900">{area}</Text>
                <Text className="text-xs text-gray-500">{distance}</Text>
              </View>
              <View className="flex-row items-center mt-2">
                <Text className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold mr-2">
                  {joiningBonus}
                </Text>
                <Text className="text-xs text-green-700 font-medium">Joining bonus</Text>
              </View>
              <Text className="text-xs text-gray-600 mt-2">{weeklyEarnings}</Text>
            </View>
          </View>
        </ScrollView>
        <View className="px-6 pb-8">
          <TouchableOpacity className="bg-orange-500 rounded-full py-3 items-center" onPress={() => setStep(2)}>
            <Text className="text-white text-base font-bold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Step 2: Preferred Work Time
  if (step === 2) {
    return (
      <View className="flex-1 bg-white">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-6 mt-10 pt-8">
            <Text className="text-xl font-bold text-gray-900 mb-6">Preferred Work Time</Text>
            <View className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm bg-white">
              <Text className="text-lg font-semibold text-gray-900 mb-3">Choose your preferred work time</Text>
              <View className="flex-row space-x-4">
                <TouchableOpacity
                  className={`flex-1 border rounded-lg py-2 items-center justify-center ${workTime === 'Full Time' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                  onPress={() => setWorkTime('Full Time')}
                >
                  <Text className="text-base text-gray-800">Full Time</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`flex-1 border rounded-lg py-2 items-center justify-center ${workTime === 'Weekends' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}`}
                  onPress={() => setWorkTime('Weekends')}
                >
                  <Text className="text-base text-gray-800">Weekends</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="px-6 pb-8">
          <TouchableOpacity
            className={`bg-orange-500 rounded-full py-3 items-center ${!workTime ? 'opacity-50' : ''}`}
            disabled={!workTime}
            onPress={() => setStep(3)}
          >
            <Text className="text-white text-base font-bold">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Step 3: Summary
  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-6 pt-8">
          <Text className="text-xl font-bold text-gray-900 mt-10 mb-6">Work Information Summary</Text>
          <View className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm bg-white">
            <Text className="text-lg font-semibold text-gray-900 mb-2">Area</Text>
            <Text className="text-base text-gray-700 mb-2">{area} ({distance})</Text>
            <Text className="text-xs text-gray-600 mb-2">{weeklyEarnings}</Text>
            <Text className="text-xs text-green-700 mb-2">{joiningBonus} Joining bonus</Text>
          </View>
          <View className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm bg-white">
            <Text className="text-lg font-semibold text-gray-900 mb-2">Preferred Work Time</Text>
            <Text className="text-base text-gray-700">{workTime}</Text>
          </View>
          <View className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm bg-white">
            <Text className="text-lg font-semibold text-gray-900 mb-2">Vehicle Type</Text>
            <Text className="text-base text-gray-700">{vehicleType}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="px-6 pb-8">
        <TouchableOpacity className="bg-orange-500 rounded-full py-3 items-center" onPress={handleStartDelivery}>
          <Text className="text-white text-base font-bold">Start Delivery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
