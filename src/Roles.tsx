import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { RoleListItem } from './components/RoleListItem';
import { roleService } from './services/role.service';

type Role = {
  id: number;
  name: string;
  description: string;
};

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

const RolesScreen = ({ route: { params } }: any) => {
  const navigation = useNavigation<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [refetchController, setRefetchController] = useState(0);

  const refetch = useCallback(
    () => setRefetchController((current) => current + 1),
    []
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
      headerRight: () => (
        <Icon.Button
          name="add"
          backgroundColor="#4ade80"
          onPress={() => navigation.navigate(`Role`, {})}
          iconStyle={{ marginRight: 0 }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (params?.refetch) {
      setRefetchController((current) => current + 1);
    }
  }, [params]);

  useEffect(() => {
    const getRoles = async () => {
      setIsLoading(true);

      try {
        const data = await roleService.list();

        setRoles(data);
      } catch (error) {
        Alert.alert(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    getRoles();
  }, [refetchController]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Roles list</Text>

      {isLoading ? (
        <Text>Getting roles...</Text>
      ) : (
        <FlatList
          data={roles}
          renderItem={({ item: role }) => (
            <RoleListItem
              {...role}
              canDelete={roles.length > 1}
              refetch={refetch}
            />
          )}
        />
      )}
    </View>
  );
};

export default RolesScreen;
