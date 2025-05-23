import { Pressable, Text } from 'react-native';
import styles from './tab-item.styles';

export default function TabItem({ selected, icon, label, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon}
      <Text style={[styles.label, selected && styles.labelHighlight]}>
        {label}
      </Text>
    </Pressable>
  );
}
