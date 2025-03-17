import { ImageSourcePropType } from "react-native";

type WeatherIcons = {
    [key: string]: ImageSourcePropType;
  };
  
export const weatherIcons : WeatherIcons = {
    '01d': require('@/assets/icons/icon-01d.png'),
    '01n': require('@/assets/icons/icon-01n.png'),
    '02d': require('@/assets/icons/icon-02d.png'),
    '02n': require('@/assets/icons/icon-02n.png'),
    '03d': require('@/assets/icons/icon-03d.png'),
    '03n': require('@/assets/icons/icon-03n.png'),
    '04d': require('@/assets/icons/icon-04d.png'),
    '04n': require('@/assets/icons/icon-04n.png'),
    '09d': require('@/assets/icons/icon-09d.png'),
    '09n': require('@/assets/icons/icon-09n.png'),
    '10d': require('@/assets/icons/icon-10d.png'),
    '10n': require('@/assets/icons/icon-10n.png'),
    '11d': require('@/assets/icons/icon-11d.png'),
    '11n': require('@/assets/icons/icon-11n.png'),
    '13d': require('@/assets/icons/icon-13d.png'),
    '13n': require('@/assets/icons/icon-13n.png'),
    '50d': require('@/assets/icons/icon-50d.png'),
    '50n': require('@/assets/icons/icon-50n.png'),
  };