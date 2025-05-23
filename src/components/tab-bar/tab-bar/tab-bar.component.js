import { View } from 'react-native';
import styles from './tab-bar.styles';
import TabItem from './tab-item/tab-item.component';

const TabBar = ({ state, descriptors, navigation }) => (
  <View style={styles.container}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];

      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

      const selected = state.index === index;

      const onPress = () => {
        if (!selected) {
          navigation.navigate({ name: route.name, merge: true });
        }
      };

      // Nếu có tabBarIcon (custom icon component), render nó với props phù hợp
      const icon =
        typeof options.tabBarIcon === 'function'
          ? options.tabBarIcon({
              focused: selected,
              color: selected ? '#8F7D5E' : '#495257',
              size: 30,
            })
          : null;

      return (
        <TabItem
          key={route.key}
          selected={selected}
          icon={icon}
          label={label}
          onPress={onPress}
        />
      );
    })}
  </View>
);

export default TabBar;
