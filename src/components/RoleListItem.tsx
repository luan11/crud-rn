import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { roleService } from '../services/role.service';

type RoleListItemProps = {
  id: number;
  name: string;
  description: string;
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
  dataDescription: {
    fontSize: 12,
    color: `#5a5a5a`,
  },
  deleteButton: {
    maxWidth: `30%`,
  },
});

export const RoleListItem = ({
  id,
  name,
  description,
  canDelete,
  refetch,
}: RoleListItemProps) => {
  const navigation = useNavigation<any>();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigation.navigate(`Role`, { id, name, description });
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await roleService.remove(id);

      refetch();
    } catch (error) {
      Alert.alert(String(error));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handleEdit}>
      <View style={styles.data}>
        <Text style={styles.dataId}>#{id}</Text>
        <Text style={styles.dataName}>{name}</Text>
        <Text style={styles.dataDescription}>{description}</Text>
      </View>

      {canDelete && (
        <View style={styles.deleteButton}>
          <Icon.Button
            name="delete"
            backgroundColor="#f87171"
            disabled={isDeleting}
            onPress={handleDelete}
            iconStyle={{ marginRight: 0 }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
