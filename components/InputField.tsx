import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  className?: string;
}

export default function InputField({ 
  label, 
  icon, 
  className = "", 
  ...textInputProps 
}: InputFieldProps) {
  return (
    <View className={className}>
      {label && (
        <Text className="mb-2 text-secondary-800 font-JakartaSemiBold text-base">
          {label}
        </Text>
      )}
      <View className="flex-row items-center border-2 border-primary-200 rounded-xl px-4 py-3 bg-white shadow-sm">
        {icon && (
          <Ionicons 
            name={icon} 
            size={22} 
            color="#FF6600" 
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 font-JakartaMedium text-base text-secondary-800"
          placeholderTextColor="#AAAAAA"
          {...textInputProps}
        />
      </View>
    </View>
  );
} 