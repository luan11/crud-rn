import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
      headerRight: () => (
        <View style={styles.buttonGroup}>
          <Button
            title="Register"
            onPress={() => navigation.navigate(`User`)}
            color="#22d3ee"
          />
          <Button
            title="Exit"
            onPress={() => navigation.goBack()}
            color="#f87171"
          />
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Users list</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    display: `flex`,
    flexWrap: `nowrap`,
    flexDirection: `row`,
    gap: 4,
  },
});
