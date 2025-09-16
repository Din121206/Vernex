import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { QrCode, FileText, History, User, Calendar } from 'lucide-react-native';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const quickActions = [
    {
      title: 'Scan QR Code',
      description: 'Mark your attendance',
      icon: QrCode,
      color: '#10B981',
      route: '/scanner',
    },
    {
      title: 'View Reports',
      description: 'Attendance summaries',
      icon: FileText,
      color: '#3B82F6',
      route: '/reports',
    },
    {
      title: 'Check History',
      description: 'Past attendance records',
      icon: History,
      color: '#8B5CF6',
      route: '/history',
    },
  ];

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#fff',
      paddingTop: insets.top 
    }}>
      <StatusBar style="dark" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: '#F8FAFC',
          borderBottomWidth: 1,
          borderBottomColor: '#E2E8F0',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={{
              width: 50,
              height: 50,
              backgroundColor: '#FFD700',
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#1E40AF',
              }}>V</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1E40AF',
              }}>VERNEX</Text>
            </View>
          </View>

          <View style={{
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <User size={20} color="#6B7280" />
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1F2937',
                marginLeft: 8,
              }}>Welcome, John Doe</Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calendar size={16} color="#6B7280" />
              <Text style={{
                fontSize: 14,
                color: '#6B7280',
                marginLeft: 8,
              }}>{getCurrentDate()}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>Quick Actions</Text>

          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 12,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  borderLeftWidth: 4,
                  borderLeftColor: action.color,
                }}
                onPress={() => router.push(action.route)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 48,
                    height: 48,
                    backgroundColor: action.color + '20',
                    borderRadius: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 16,
                  }}>
                    <IconComponent size={24} color={action.color} />
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#1F2937',
                      marginBottom: 4,
                    }}>{action.title}</Text>
                    <Text style={{
                      fontSize: 14,
                      color: '#6B7280',
                    }}>{action.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Today's Summary */}
        <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>Today's Summary</Text>

          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#10B981',
                }}>8:45 AM</Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                }}>Check In</Text>
              </View>
              
              <View style={{
                width: 1,
                backgroundColor: '#E5E7EB',
                marginHorizontal: 16,
              }} />
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#6B7280',
                }}>--:--</Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                }}>Check Out</Text>
              </View>
            </View>
            
            <View style={{
              marginTop: 16,
              padding: 12,
              backgroundColor: '#F0FDF4',
              borderRadius: 8,
            }}>
              <Text style={{
                textAlign: 'center',
                color: '#059669',
                fontSize: 14,
                fontWeight: '500',
              }}>Status: Present</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}