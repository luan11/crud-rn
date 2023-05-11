import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

type Fields = {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

type AllowedFields = `name` | `username` | `password` | `passwordConfirm`;

const SignUp = () => {
  const [fields, setFields] = useState<Fields>({
    name: ``,
    username: ``,
    password: ``,
    passwordConfirm: ``,
  });

  const handleOnChangeField = (fieldName: AllowedFields) => (value: string) =>
    setFields((current) => ({ ...current, [fieldName]: value }));

  const signUp = () => {
    const fieldsValues = Object.values(fields);

    if (fieldsValues.some((fieldValue) => !fieldValue)) {
      return Alert.alert(`A mandatory field hasn't filled.`);
    }

    if (fields.password !== fields.passwordConfirm) {
      return Alert.alert(`The passwords aren't equals!`);
    }

    return Alert.alert(`Succesfully created!`);
  };

  return (
    <View style={styles.container}>
      <Text>Sing up page</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleOnChangeField(`name`)}
          value={fields.name}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleOnChangeField(`username`)}
          value={fields.username}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={handleOnChangeField(`password`)}
          value={fields.password}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password confirm:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={handleOnChangeField(`passwordConfirm`)}
          value={fields.passwordConfirm}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save" onPress={signUp} color="#34d399" />
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

export default SignUp;
