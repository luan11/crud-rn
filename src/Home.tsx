import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';

import { userService } from './services/user.service';
import { UserListItem } from './components/UserListItem';

type User = {
  id: number;
  name: string;
  username: string;
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [users, setUsers] = useState<User[]>([]);
  const [refetchController, setRefetchController] = useState(0);

  const refetch = useCallback(
    () => setRefetchController((current) => current + 1),
    []
  );

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await userService.list();

        setUsers(data);
      } catch (error) {
        Alert.alert(String(error));
      }
    };

    getUsers();
  }, [refetchController]);

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
