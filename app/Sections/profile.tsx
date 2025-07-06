import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import InputField from '@/components/InputField';

export default function ProfileSection() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [panNumber, setPanNumber] = useState('');
  // const [selfieImage, setSelfieImage] = useState<string | null>(null); // Temporarily disabled

  // Image picker functions temporarily disabled to avoid navigation issues
  /*
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Please grant camera permission to take a selfie.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleTakeSelfie = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Disable editing to avoid navigation issues
        quality: 0.8,
        cameraType: ImagePicker.CameraType.front,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelfieImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert(
        'Camera Error', 
        'Unable to open camera. Please make sure you have granted camera permissions and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Gallery Permission Required',
        'Please grant gallery permission to select a photo.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Disable editing to avoid navigation issues
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelfieImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert(
        'Gallery Error', 
        'Unable to access photo gallery. Please make sure you have granted gallery permissions and try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const showPhotoOptions = () => {
    Alert.alert(
      'Add Selfie Photo',
      'Choose how you would like to add your photo',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: handleTakeSelfie },
        { text: 'Choose from Gallery', onPress: handleChooseFromGallery },
      ]
    );
  };
  */

  const handleNext = () => {
    if (!gender) {
      Alert.alert('Error', 'Please select your gender');
      return;
    }
    if (!panNumber) {
      Alert.alert('Error', 'Please enter your PAN number');
      return;
    }
    // Selfie validation removed since section is commented out
    // if (!selfieImage) {
    //   Alert.alert('Error', 'Please take a selfie photo');
    //   return;
    // }
    
    // Validate PAN number format (basic validation)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber.toUpperCase())) {
      Alert.alert('Error', 'Please enter a valid PAN number (e.g., ABCDE1234F)');
      return;
    }

    // Navigate to overview screen
    router.push('/Sections/overview');
  };

  const isFormValid = gender && panNumber; // Selfie validation removed since section is commented out

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 mt-10 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-JakartaBold text-secondary-800 mb-2">
            Complete Your Profile
          </Text>
          <Text className="text-base font-JakartaMedium text-secondary-600">
            Please provide the following information to continue
          </Text>
        </View>

        {/* Gender Selection */}
        <View className="mb-6">
          <Text className="mb-2 text-secondary-800 font-JakartaSemiBold text-base">
            Gender *
          </Text>
          <View className="border-2 border-primary-200 rounded-xl bg-white shadow-sm">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{ 
                height: 50, 
                fontFamily: 'PlusJakartaSans-Medium',
                color: '#1F2937'
              }}
            >
              <Picker.Item label="Select your gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
              <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
            </Picker>
          </View>
        </View>

        {/* PAN Number Input */}
        <View className="mb-6">
          <InputField
            label="PAN Number *"
            placeholder="Enter your PAN number (e.g., ABCDE1234F)"
            value={panNumber}
            onChangeText={setPanNumber}
            autoCapitalize="characters"
            maxLength={10}
            icon="card"
          />
          <Text className="text-xs text-secondary-500 mt-1 font-JakartaMedium">
            Format: ABCDE1234F (5 letters + 4 numbers + 1 letter)
          </Text>
        </View>

        {/* Selfie Photo Section - Temporarily Disabled */}
        {/* 
        <View className="mb-8">
          <Text className="mb-2 text-secondary-800 font-JakartaSemiBold text-base">
            Selfie Photo *
          </Text>
          
          {selfieImage ? (
            <View className="items-center">
              <Image 
                source={{ uri: selfieImage }} 
                className="w-48 h-48 rounded-2xl mb-4"
                resizeMode="cover"
              />
              <View className="flex-row space-x-3">
                <TouchableOpacity 
                  onPress={showPhotoOptions}
                  className="flex-row items-center bg-primary-500 px-4 py-2 rounded-xl"
                >
                  <Ionicons name="camera" size={18} color="white" style={{ marginRight: 6 }} />
                  <Text className="text-white font-JakartaSemiBold text-sm">Change Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setSelfieImage(null)}
                  className="flex-row items-center bg-red-500 px-4 py-2 rounded-xl"
                >
                  <Ionicons name="trash" size={18} color="white" style={{ marginRight: 6 }} />
                  <Text className="text-white font-JakartaSemiBold text-sm">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              onPress={showPhotoOptions}
              className="border-2 border-dashed border-primary-300 rounded-2xl p-8 items-center bg-grey"
            >
              <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="camera" size={32} color="white" />
              </View>
              <Text className="text-primary-600 font-JakartaSemiBold text-lg mb-2">
                Add Selfie Photo
              </Text>
              <Text className="text-secondary-500 font-JakartaMedium text-center mb-3">
                Take a photo or choose from gallery
              </Text>
              <View className="flex-row space-x-2">
                <View className="flex-row items-center bg-primary-100 px-3 py-1 rounded-full">
                  <Ionicons name="camera" size={14} color="#FF6600" style={{ marginRight: 4 }} />
                  <Text className="text-primary-600 font-JakartaMedium text-xs">Camera</Text>
                </View>
                <View className="flex-row items-center bg-primary-100 px-3 py-1 rounded-full">
                  <Ionicons name="images" size={14} color="#FF6600" style={{ marginRight: 4 }} />
                  <Text className="text-primary-600 font-JakartaMedium text-xs">Gallery</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
        */}

        {/* Next Button */}
        <TouchableOpacity 
          onPress={handleNext}
          className={`py-4 rounded-xl items-center ${
            isFormValid 
              ? 'bg-primary-500 shadow-lg shadow-primary-500/30' 
              : 'bg-gray-300'
          }`}
          disabled={!isFormValid}
        >
          <Text className={`font-JakartaSemiBold text-lg ${
            isFormValid ? 'text-white' : 'text-gray-500'
          }`}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
