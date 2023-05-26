import { Dimensions, StyleSheet, Text, View } from 'react-native';

type UserListItemProps = {
  id: number;
  name: string;
  username: string;
};

const styles = StyleSheet.create({
  usersListItem: {
    padding: 10,
    borderBottomWidth: 1,
    width: Dimensions.get(`screen`).width,
    borderColor: `#cecece`,
  },
});

export const UserListItem = ({ id, name, username }: UserListItemProps) => (
  <View style={styles.usersListItem}>
    <Text>
      [#{id}] {name} | @{username}
    </Text>
  </View>
);
