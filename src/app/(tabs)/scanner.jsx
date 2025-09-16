import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, CheckCircle, QrCode, Flashlight, FlashlightOff } from 'lucide-react-native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState('off');
  const [showSuccess, setShowSuccess] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarcodeScanned = ({ type, data }) => {
    if (scanned) return;
    
    setScanned(true);
    
    // Simulate attendance recording
    const timestamp = new Date();
    const attendanceRecord = {
      qrCode: data,
      timestamp: timestamp.toLocaleString(),
      status: 'Present',
      location: 'Main Building - Room 101',
    };
    
    setAttendanceData(attendanceRecord);
    setShowSuccess(true);
    
    // Reset scanner after 3 seconds
    setTimeout(() => {
      setScanned(false);
    }, 3000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    router.push('/(tabs)/home');
  };

  if (!permission) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: insets.top 
      }}>
        <StatusBar style="dark" />
        <Text>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: insets.top 
      }}>
        <StatusBar style="dark" />
        <QrCode size={64} color="#6B7280" />
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#1F2937',
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 12,
        }}>Camera Permission Required</Text>
        <Text style={{
          fontSize: 14,
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: 30,
        }}>We need access to your camera to scan QR codes for attendance</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#1E40AF',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
          onPress={requestPermission}
        >
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={{
        position: 'absolute',
        top: insets.top,
        left: 0,
        right: 0,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
      }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => router.back()}
        >
          <X size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#fff',
        }}>Scan QR Code</Text>
        
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}
        >
          {flash === 'off' ? (
            <Flashlight size={24} color="#fff" />
          ) : (
            <FlashlightOff size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Camera */}
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        flash={flash}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
      >
        {/* Scanning Overlay */}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            width: 250,
            height: 250,
            borderWidth: 2,
            borderColor: '#FFD700',
            borderRadius: 20,
            backgroundColor: 'transparent',
          }}>
            {/* Corner indicators */}
            <View style={{
              position: 'absolute',
              top: -2,
              left: -2,
              width: 30,
              height: 30,
              borderTopWidth: 4,
              borderLeftWidth: 4,
              borderColor: '#FFD700',
              borderTopLeftRadius: 20,
            }} />
            <View style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 30,
              height: 30,
              borderTopWidth: 4,
              borderRightWidth: 4,
              borderColor: '#FFD700',
              borderTopRightRadius: 20,
            }} />
            <View style={{
              position: 'absolute',
              bottom: -2,
              left: -2,
              width: 30,
              height: 30,
              borderBottomWidth: 4,
              borderLeftWidth: 4,
              borderColor: '#FFD700',
              borderBottomLeftRadius: 20,
            }} />
            <View style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 30,
              height: 30,
              borderBottomWidth: 4,
              borderRightWidth: 4,
              borderColor: '#FFD700',
              borderBottomRightRadius: 20,
            }} />
          </View>
        </View>
      </CameraView>

      {/* Bottom Instructions */}
      <View style={{
        position: 'absolute',
        bottom: insets.bottom + 40,
        left: 20,
        right: 20,
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 25,
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 16,
            textAlign: 'center',
          }}>Position QR code within the frame</Text>
        </View>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent={true}
        animationType="fade"
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingHorizontal: 30,
            paddingVertical: 40,
            alignItems: 'center',
            maxWidth: 300,
            width: '100%',
          }}>
            <CheckCircle size={64} color="#10B981" />
            
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
              marginTop: 20,
              marginBottom: 12,
            }}>Attendance Recorded!</Text>
            
            {attendanceData && (
              <View style={{ alignItems: 'center', marginBottom: 24 }}>
                <Text style={{
                  fontSize: 14,
                  color: '#6B7280',
                  marginBottom: 8,
                }}>{attendanceData.timestamp}</Text>
                <Text style={{
                  fontSize: 14,
                  color: '#6B7280',
                  marginBottom: 8,
                }}>{attendanceData.location}</Text>
                <View style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: '#F0FDF4',
                  borderRadius: 12,
                }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#059669',
                  }}>Status: {attendanceData.status}</Text>
                </View>
              </View>
            )}
            
            <TouchableOpacity
              style={{
                backgroundColor: '#1E40AF',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                width: '100%',
              }}
              onPress={handleCloseSuccess}
            >
              <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}