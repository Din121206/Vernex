import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronDown, Calendar, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react-native';

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const insets = useSafeAreaInsets();

  const periods = ['Daily', 'Weekly', 'Monthly'];

  // Mock data
  const reportData = {
    Daily: {
      period: 'Today',
      totalDays: 1,
      present: 1,
      absent: 0,
      late: 0,
      percentage: 100,
      details: [
        { date: 'Sep 15, 2025', status: 'Present', checkIn: '8:45 AM', checkOut: '--' }
      ]
    },
    Weekly: {
      period: 'This Week',
      totalDays: 5,
      present: 4,
      absent: 1,
      late: 0,
      percentage: 80,
      details: [
        { date: 'Sep 15, 2025', status: 'Present', checkIn: '8:45 AM', checkOut: '5:30 PM' },
        { date: 'Sep 14, 2025', status: 'Absent', checkIn: '--', checkOut: '--' },
        { date: 'Sep 13, 2025', status: 'Present', checkIn: '8:50 AM', checkOut: '5:25 PM' },
        { date: 'Sep 12, 2025', status: 'Present', checkIn: '8:40 AM', checkOut: '5:35 PM' },
        { date: 'Sep 11, 2025', status: 'Present', checkIn: '8:55 AM', checkOut: '5:20 PM' },
      ]
    },
    Monthly: {
      period: 'This Month',
      totalDays: 22,
      present: 18,
      absent: 3,
      late: 1,
      percentage: 82,
      details: [
        { date: 'Sep 15, 2025', status: 'Present', checkIn: '8:45 AM', checkOut: '5:30 PM' },
        { date: 'Sep 14, 2025', status: 'Absent', checkIn: '--', checkOut: '--' },
        { date: 'Sep 13, 2025', status: 'Present', checkIn: '8:50 AM', checkOut: '5:25 PM' },
        { date: 'Sep 12, 2025', status: 'Late', checkIn: '9:15 AM', checkOut: '5:35 PM' },
        { date: 'Sep 11, 2025', status: 'Present', checkIn: '8:55 AM', checkOut: '5:20 PM' },
      ]
    }
  };

  const currentData = reportData[selectedPeriod];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return '#10B981';
      case 'Absent': return '#EF4444';
      case 'Late': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return CheckCircle;
      case 'Absent': return XCircle;
      case 'Late': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#fff',
      paddingTop: insets.top 
    }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F8FAFC',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1E40AF',
          marginBottom: 8,
        }}>Attendance Reports</Text>
        
        {/* Period Selector */}
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => setShowPeriodSelector(!showPeriodSelector)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Calendar size={16} color="#6B7280" />
            <Text style={{
              fontSize: 16,
              color: '#1F2937',
              marginLeft: 8,
            }}>{selectedPeriod} Report</Text>
          </View>
          <ChevronDown size={16} color="#6B7280" />
        </TouchableOpacity>

        {/* Period Options */}
        {showPeriodSelector && (
          <View style={{
            backgroundColor: '#fff',
            marginTop: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            {periods.map((period, index) => (
              <TouchableOpacity
                key={period}
                style={{
                  padding: 12,
                  borderBottomWidth: index < periods.length - 1 ? 1 : 0,
                  borderBottomColor: '#E5E7EB',
                }}
                onPress={() => {
                  setSelectedPeriod(period);
                  setShowPeriodSelector(false);
                }}
              >
                <Text style={{
                  fontSize: 16,
                  color: selectedPeriod === period ? '#1E40AF' : '#1F2937',
                  fontWeight: selectedPeriod === period ? '600' : '400',
                }}>{period}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>{currentData.period} Summary</Text>

          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
              marginRight: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1E40AF',
                marginBottom: 4,
              }}>{currentData.percentage}%</Text>
              <Text style={{
                fontSize: 12,
                color: '#6B7280',
                textAlign: 'center',
              }}>Attendance Rate</Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
              marginLeft: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: 4,
              }}>{currentData.totalDays}</Text>
              <Text style={{
                fontSize: 12,
                color: '#6B7280',
                textAlign: 'center',
              }}>Total Days</Text>
            </View>
          </View>

          {/* Status Breakdown */}
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1F2937',
              marginBottom: 16,
            }}>Breakdown</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#F0FDF4',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                  <CheckCircle size={20} color="#10B981" />
                </View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#10B981',
                }}>{currentData.present}</Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                }}>Present</Text>
              </View>

              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FEF2F2',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                  <XCircle size={20} color="#EF4444" />
                </View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#EF4444',
                }}>{currentData.absent}</Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                }}>Absent</Text>
              </View>

              <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FFFBEB',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                  <AlertCircle size={20} color="#F59E0B" />
                </View>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#F59E0B',
                }}>{currentData.late}</Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                }}>Late</Text>
              </View>
            </View>
          </View>

          {/* Detailed Records */}
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 16,
          }}>Recent Records</Text>

          {currentData.details.map((record, index) => {
            const StatusIcon = getStatusIcon(record.status);
            const statusColor = getStatusColor(record.status);

            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#fff',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#1F2937',
                      marginBottom: 4,
                    }}>{record.date}</Text>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <StatusIcon size={16} color={statusColor} />
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: statusColor,
                        marginLeft: 4,
                      }}>{record.status}</Text>
                    </View>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{
                      fontSize: 14,
                      color: '#6B7280',
                      marginBottom: 2,
                    }}>In: {record.checkIn}</Text>
                    <Text style={{
                      fontSize: 14,
                      color: '#6B7280',
                    }}>Out: {record.checkOut}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}