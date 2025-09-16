import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // For prototype, accept any credentials
      router.push('/(tabs)/home');
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'A password reset link will be sent to your email address.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#fff',
      paddingTop: insets.top 
    }}>
      <StatusBar style="dark" />
      
      {/* Header with Logo */}
      <View style={{
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
      }}>
        {/* Wing + V Logo */}
        <View style={{
          width: 80,
          height: 80,
          backgroundColor: '#FFD700',
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <Text style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#1E40AF',
          }}>V</Text>
        </View>
        
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#1E40AF',
          marginBottom: 8,
        }}>VERNEX</Text>
        
        <Text style={{
          fontSize: 16,
          color: '#6B7280',
          textAlign: 'center',
        }}>Attendance Management System</Text>
      </View>

      {/* Login Form */}
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: 8,
          }}>Email / Student ID</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              backgroundColor: '#F9FAFB',
            }}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email or student ID"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: 8,
          }}>Password</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                paddingRight: 50,
                fontSize: 16,
                backgroundColor: '#F9FAFB',
              }}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 16,
                top: 12,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isLoading ? '#9CA3AF' : '#1E40AF',
            paddingVertical: 16,
            borderRadius: 8,
            marginBottom: 20,
          }}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center',
          }}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={{
            color: '#FFD700',
            fontSize: 16,
            textAlign: 'center',
            textDecorationLine: 'underline',
          }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}