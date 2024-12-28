import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomCount, setRoomCount] = useState('1');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roomType, setRoomType] = useState('Thường');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const calculateTotal = () => {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const basePrice = roomType === 'VIP' ? 1000000 : 1500000;
    return basePrice * days;
  };

  const handleBooking = () => {
    Alert.alert(
      "Xác nhận đặt phòng",
      "Bạn có chắc chắn muốn đặt phòng không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { 
          text: "Đồng ý", 
          onPress: () => {
            Alert.alert("Thành công", "Đã đặt phòng thành công!");
            // Here you would typically send the booking data to your backend
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đặt phòng</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Tên người đặt"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Số lượng phòng"
        value={roomCount}
        onChangeText={setRoomCount}
        keyboardType="numeric"
      />
      
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.datePickerText}>
          Thời gian bắt đầu: {startDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}
      
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.datePickerText}>
          Thời gian kết thúc: {endDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}
      
      <Picker
        selectedValue={roomType}
        onValueChange={(itemValue) => setRoomType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Thường" value="Thường" />
        <Picker.Item label="VIP" value="VIP" />
        <Picker.Item label="VVIP" value="VVIP" />
      </Picker>
      
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>
          Giá phòng {roomType}: {roomType === 'VIP' ? '1.000.000 đ' : '1.500.000 đ'}
        </Text>
        <Text style={styles.totalText}>
          Tổng tiền: {calculateTotal().toLocaleString()} đ
        </Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Đặt phòng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  datePickerText: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    marginBottom: 10,
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});