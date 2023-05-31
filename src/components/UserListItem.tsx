import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { userService } from '../services/user.service';

type UserListItemProps = {
  id: number;
  name: string;
  username: string;
  canDelete: boolean;
  refetch: () => void;
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    width: Dimensions.get(`screen`).width,
    borderColor: `#cecece`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  data: {
    width: `60%`,
  },
  dataId: {
    fontWeight: `900`,
    fontSize: 12,
  },
  dataName: {
    fontSize: 16,
  },
  dataUsername: {
    fontSize: 12,
    color: `#5a5a5a`,
  },
  deleteButton: {
    width: `30%`,
  },
});

export const UserListItem = ({
  id,
  name,
  username,
  canDelete,
  refetch,
}: UserListItemProps) => {
  const navigation = useNavigation<any>();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigation.navigate(`User`, { id });
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await userService.remove(id);

      refetch();
    } catch (error) {
      Alert.alert(String(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <View style={styles.item} onTouchEnd={handleEdit}>
      <View style={styles.data}>
        <Text style={styles.dataId}>#{id}</Text>
        <Text style={styles.dataName}>{name}</Text>
        <Text style={styles.dataUsername}>@{username}</Text>
      </View>

      {canDelete && (
        <View style={styles.deleteButton}>
          <Button
            title="Delete"
            color="#f87171"
            disabled={isDeleting}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};
