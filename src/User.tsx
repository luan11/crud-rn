import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';

import { userService } from './services/user.service';
import { roleService } from './services/role.service';

type Role = {
  id: number;
  name: string;
  description: string;
};

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
  const [roles, setRoles] = useState<string[]>(params?.roles ?? []);

  const navigation = useNavigation<any>();

  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [isLoadingAvailableRoles, setIsLoadingAvailableRoles] = useState(false);

  const handleChangeField = (fieldName: AllowedFields) => (value: string) =>
    setFields((current) => ({ ...current, [fieldName]: value }));

  const handleChangeRole = (role: string) => (enabled: boolean) =>
    setRoles((current) =>
      enabled
        ? [...current, role]
        : current.filter((currentRole) => currentRole !== role)
    );

  const updateOrSignUp = async () => {
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
          roles,
        });
      } else {
        await userService.register({
          name: fields.name,
          username: fields.username,
          password: fields.password,
          roles,
        });
      }

      navigation.navigate(`Home`, { refetch: true });
    } catch (error) {
      Alert.alert(String(error));
    }
  };

  useEffect(() => {
    const getRoles = async () => {
      setIsLoadingAvailableRoles(true);

      try {
        const data = await roleService.list();

        setAvailableRoles(data);
      } catch (error) {
        Alert.alert(String(error));
      } finally {
        setIsLoadingAvailableRoles(false);
      }
    };

    getRoles();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{!params?.id ? `Create` : `Edit`} user</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeField(`name`)}
            value={fields.name}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeField(`username`)}
            value={fields.username}
            editable={!params?.id}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={handleChangeField(`password`)}
            value={fields.password}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password confirm:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={handleChangeField(`passwordConfirm`)}
            value={fields.passwordConfirm}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Roles:</Text>

          {isLoadingAvailableRoles && <Text>Loading available roles...</Text>}

          {!availableRoles.length && <Text>No roles found</Text>}

          {availableRoles.map((role) => (
            <View key={role.id} style={styles.role}>
              <Switch
                value={roles.includes(role.name)}
                onValueChange={handleChangeRole(role.name)}
              />
              <Text>{role.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.button}>
          <Button
            title={!params?.id ? `Save` : `Update`}
            onPress={updateOrSignUp}
            color="#34d399"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    paddingVertical: 10,
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
  role: {
    display: `flex`,
    flexWrap: `nowrap`,
    flexDirection: `row`,
    alignItems: `center`,
  },
});

export default UserScreen;
