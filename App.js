import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [taps, setTaps] = useState(0);
  return (
    <View style={styles.container}>
      <Pressable testID="tap-me" style={styles.button} onPress={() => setTaps((n) => n + 1)}>
        <Text style={styles.label}>Tap me</Text>
      </Pressable>
      <Text>Taps: {taps}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 16 },
  button: { paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12, backgroundColor: '#222' },
  label: { color: '#fff', fontSize: 18 },
});
