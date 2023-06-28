import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { userService } from './services/user.service';
import { UserListItem } from './components/UserListItem';

type User = {
  id: number;
  name: string;
  username: string;
  roles: string[];
};

export default function HomeScreen({ route: { params } }: any) {
  const navigation = useNavigation<any>();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [refetchController, setRefetchController] = useState(0);

  const refetch = useCallback(
    () => setRefetchController((current) => current + 1),
    []
  );

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);

      try {
        const data = await userService.list();

        setUsers(data);
      } catch (error) {
        Alert.alert(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, [refetchController]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
      headerRight: () => (
        <View style={styles.buttonGroup}>
          <Icon.Button
            name="person-add"
            backgroundColor="#4ade80"
            onPress={() => navigation.navigate(`User`)}
            iconStyle={{ marginRight: 0 }}
          />

          <Icon.Button
            name="vpn-key"
            backgroundColor="#fbbf24"
            onPress={() => navigation.navigate(`Roles`)}
            iconStyle={{ marginRight: 0 }}
          />

          <Icon.Button
            name="logout"
            backgroundColor="#f87171"
            onPress={() => navigation.goBack()}
            iconStyle={{ marginRight: 0 }}
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    if (params?.refetch) {
      setRefetchController((current) => current + 1);
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Users list</Text>

      {isLoading ? (
        <Text>Getting users...</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={({ item: user }) => (
            <UserListItem
              {...user}
              canDelete={users.length > 1}
              refetch={refetch}
            />
          )}
        />
      )}
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
