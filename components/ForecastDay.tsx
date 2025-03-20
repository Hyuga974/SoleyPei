import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { format, parse } from 'date-fns';
import { weatherIcons } from '@/constants/icons';
import { ForecastData } from '@/models/weatherData';

interface ForecastDayProps {
  data: ForecastData;
}

const ForecastDay: React.FC<ForecastDayProps> = ({ data }) => {
  let temp : Number
  if (data.main.temp >  200){
    console.log("Temp:", data.main.temp)
    temp = parseFloat((data.main.temp - 273.15).toFixed(1))
    console.log("Temp:", temp)
  }else{
    temp = parseFloat((data.main.temp).toFixed(1))
  }
  return (
    <View style={styles.hourlyItem}>
      <Text style={styles.hourlyTime}>
        {format(parse(data.dt_txt, 'yyyy-MM-dd HH:mm:ss', new Date()), 'EEEE HH:mm')}
      </Text>
      <Image
        source={weatherIcons[data.weather[0].icon] || weatherIcons['01d']}
        style={styles.hourlyIcon}
      />
      <Text style={styles.hourlyTemperature}>
        {temp.toString()}°C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hourlyItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  hourlyTime: {
    fontSize: 16,
    color: '#fff',
  },
  hourlyIcon: {
    height: 100,
    width: 100,
    maxWidth: 100,
    maxHeight: 100,
  },
  hourlyTemperature: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ForecastDay;
