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

import { roleService } from './services/role.service';

type Fields = {
  name: string;
  description: string;
};

type AllowedFields = `name` | `description`;

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

const RoleScreen = ({ route: { params } }: any) => {
  const [fields, setFields] = useState<Fields>({
    name: params?.name ?? ``,
    description: params?.description ?? ``,
  });

  const navigation = useNavigation<any>();

  const handleOnChangeField = (fieldName: AllowedFields) => (value: string) =>
    setFields((current) => ({ ...current, [fieldName]: value }));

  const signUp = async () => {
    const fieldsValues = Object.values(fields);

    if (fieldsValues.some((fieldValue) => !fieldValue)) {
      return Alert.alert(`A mandatory field hasn't filled.`);
    }

    try {
      if (params?.id) {
        await roleService.update(params.id, {
          name: fields.name,
          description: fields.description,
        });
      } else {
        await roleService.register({
          name: fields.name,
          description: fields.description,
        });
      }

      navigation.navigate(`Roles`, { refetch: true });
    } catch (error) {
      Alert.alert(String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text>{!params?.id ? `Create` : `Edit`} role</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleOnChangeField(`name`)}
          value={fields.name}
          editable={!params?.id}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleOnChangeField(`description`)}
          value={fields.description}
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

export default RoleScreen;
