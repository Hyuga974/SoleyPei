import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';

export default function SearchScreen() {
  return (
    <LinearGradient
      colors={ ['#907bb4', '#0f056b', '#0d0217']}
      style={styles.container}
    >
      <View style={styles.container}>
      
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
