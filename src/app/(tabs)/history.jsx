import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Filter, Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react-native';

export default function HistoryScreen() {
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const insets = useSafeAreaInsets();

  const filters = ['All', 'Present', 'Absent', 'Late'];

  // Mock attendance history data
  const attendanceHistory = [
    {
      id: 1,
      date: 'Sep 15, 2025',
      day: 'Monday',
      checkIn: '8:45 AM',
      checkOut: '--',
      status: 'Present',
      location: 'Main Building - Room 101',
      qrReference: 'QR-20250915-001',
      duration: 'In Progress'
    },
    {
      id: 2,
      date: 'Sep 14, 2025',
      day: 'Sunday',
      checkIn: '--',
      checkOut: '--',
      status: 'Absent',
      location: '--',
      qrReference: '--',
      duration: '--'
    },
    {
      id: 3,
      date: 'Sep 13, 2025',
      day: 'Friday',
      checkIn: '8:50 AM',
      checkOut: '5:25 PM',
      status: 'Present',
      location: 'Main Building - Room 101',
      qrReference: 'QR-20250913-001',
      duration: '8h 35m'
    },
    {
      id: 4,
      date: 'Sep 12, 2025',
      day: 'Thursday',
      checkIn: '9:15 AM',
      checkOut: '5:35 PM',
      status: 'Late',
      location: 'Main Building - Room 101',
      qrReference: 'QR-20250912-001',
      duration: '8h 20m'
    },
    {
      id: 5,
      date: 'Sep 11, 2025',
      day: 'Wednesday',
      checkIn: '8:55 AM',
      checkOut: '5:20 PM',
      status: 'Present',
      location: 'Main Building - Room 101',
      qrReference: 'QR-20250911-001',
      duration: '8h 25m'
    },
    {
      id: 6,
      date: 'Sep 10, 2025',
      day: 'Tuesday',
      checkIn: '8:40 AM',
      checkOut: '5:30 PM',
      status: 'Present',
      location: 'Main Building - Room 101',
      qrReference: 'QR-20250910-001',
      duration: '8h 50m'
    },
    {
      id: 7,
      date: 'Sep 9, 2025',
      day: 'Monday',
      checkIn: '8:45 AM',
      checkOut: '5:15 PM',
      status: 'Present',
      location: 'Main Building - Room 101',
      qrReference: 'QR-20250909-001',
      duration: '8h 30m'
    },
    {
      id: 8,
      date: 'Sep 8, 2025',
      day: 'Sunday',
      checkIn: '--',
      checkOut: '--',
      status: 'Absent',
      location: '--',
      qrReference: '--',
      duration: '--'
    }
  ];

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

  const filteredHistory = attendanceHistory.filter(record => {
    const matchesSearch = record.date.toLowerCase().includes(searchText.toLowerCase()) ||
                         record.status.toLowerCase().includes(searchText.toLowerCase()) ||
                         record.location.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All' || record.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

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
          marginBottom: 16,
        }}>Attendance History</Text>
        
        {/* Search Bar */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#D1D5DB',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          marginBottom: 12,
        }}>
          <Search size={16} color="#6B7280" />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingHorizontal: 8,
              fontSize: 16,
            }}
            placeholder="Search by date, status, or location"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filter Bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              {filters.map((filter, index) => (
                <TouchableOpacity
                  key={filter}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: selectedFilter === filter ? '#1E40AF' : '#F3F4F6',
                    marginRight: 8,
                  }}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: selectedFilter === filter ? '#fff' : '#6B7280',
                  }}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          <TouchableOpacity
            style={{
              width: 40,
              height: 32,
              backgroundColor: '#F3F4F6',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 8,
            }}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* History List */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={{
            fontSize: 16,
            color: '#6B7280',
            marginBottom: 16,
          }}>Showing {filteredHistory.length} records</Text>

          {filteredHistory.map((record, index) => {
            const StatusIcon = getStatusIcon(record.status);
            const statusColor = getStatusColor(record.status);

            return (
              <View
                key={record.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  overflow: 'hidden',
                }}
              >
                {/* Date Header */}
                <View style={{
                  backgroundColor: '#F8FAFC',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E5E7EB',
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Calendar size={16} color="#6B7280" />
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#1F2937',
                        marginLeft: 8,
                      }}>{record.date}</Text>
                      <Text style={{
                        fontSize: 14,
                        color: '#6B7280',
                        marginLeft: 8,
                      }}>({record.day})</Text>
                    </View>
                    
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
                </View>

                {/* Record Details */}
                <View style={{ padding: 16 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                    <View style={{ flex: 1, marginRight: 16 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={{
                          fontSize: 14,
                          color: '#6B7280',
                          marginLeft: 6,
                        }}>Check In: {record.checkIn}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={{
                          fontSize: 14,
                          color: '#6B7280',
                          marginLeft: 6,
                        }}>Check Out: {record.checkOut}</Text>
                      </View>
                    </View>
                    
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#1F2937',
                        marginBottom: 4,
                      }}>Duration</Text>
                      <Text style={{
                        fontSize: 14,
                        color: '#6B7280',
                      }}>{record.duration}</Text>
                    </View>
                  </View>

                  {record.location !== '--' && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={{
                        fontSize: 14,
                        color: '#6B7280',
                        marginLeft: 6,
                        flex: 1,
                      }}>{record.location}</Text>
                    </View>
                  )}

                  {record.qrReference !== '--' && (
                    <View style={{
                      backgroundColor: '#F3F4F6',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 6,
                      marginTop: 8,
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: '#6B7280',
                        textAlign: 'center',
                      }}>QR Reference: {record.qrReference}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}

          {filteredHistory.length === 0 && (
            <View style={{
              alignItems: 'center',
              paddingVertical: 40,
            }}>
              <Search size={48} color="#D1D5DB" />
              <Text style={{
                fontSize: 16,
                color: '#6B7280',
                marginTop: 16,
                textAlign: 'center',
              }}>No records found matching your search</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}