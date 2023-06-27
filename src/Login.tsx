import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { authService } from './services/auth.service';

const LoginScreen = () => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);

  const navigation = useNavigation<any>();

  const handleOnChangeUsername = (text: string) => setUsername(text);

  const handleOnChangePassword = (pass: string) => setPassword(pass);

  const signIn = () => {
    authService
      .login(username, password)
      .then((logged) => {
        if (logged) {
          navigation.navigate(`Home`);
        } else {
          Alert.alert(`Username and/or password incorrect!`);
        }
      })
      .catch(() => {
        Alert.alert(`Username and/or password incorrect!`);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Access page</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleOnChangeUsername}
          value={username}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={handleOnChangePassword}
          value={password}
        />
      </View>

      <View style={styles.button}>
        <Icon.Button
          name="login"
          onPress={signIn}
          backgroundColor="#4ade80"
          style={{
            justifyContent: `center`,
          }}
        >
          Enter
        </Icon.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
  },
  inputGroup: {
    width: Dimensions.get(`screen`).width - 40,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 10,
    padding: 10,
  },
  label: {
    marginTop: 20,
    marginBottom: 4,
  },
  button: {
    width: Dimensions.get(`screen`).width - 40,
    marginTop: 32,
  },
});

export default LoginScreen;
