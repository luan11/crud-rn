import { useNavigation } from '@react-navigation/native';
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

import { userService } from './services/user.service';

type Fields = {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

type AllowedFields = `name` | `username` | `password` | `passwordConfirm`;

const UserScreen = ({ route: { params } }: any) => {
  const [fields, setFields] = useState<Fields>({
    name: params?.name ?? ``,
    username: params?.username ?? ``,
    password: ``,
    passwordConfirm: ``,
  });

  const navigation = useNavigation<any>();

  const handleOnChangeField = (fieldName: AllowedFields) => (value: string) =>
    setFields((current) => ({ ...current, [fieldName]: value }));

  const signUp = async () => {
    const fieldsValues = Object.values(fields);

    if (fieldsValues.some((fieldValue) => !fieldValue)) {
      return Alert.alert(`A mandatory field hasn't filled.`);
    }

    if (fields.password !== fields.passwordConfirm) {
      return Alert.alert(`The passwords aren't equals!`);
    }

    try {
      if (params?.id) {
        await userService.update(params.id, {
          name: fields.name,
          username: fields.username,
          password: fields.password,
        });
      } else {
        await userService.register({
          name: fields.name,
          username: fields.username,
          password: fields.password,
        });
      }

      navigation.navigate(`Home`, { refetch: true });
    } catch (error) {
      Alert.alert(String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text>{!params?.id ? `Create` : `Edit`} user</Text>

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
          editable={!params?.id}
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
        <Button
          title={!params?.id ? `Save` : `Update`}
          onPress={signUp}
          color="#34d399"
        />
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

export default UserScreen;
