import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';

// const FABGroup = ({navigation}) => {
//   const [state, setState] = React.useState({ open: false });

//   const onStateChange = ({ open }) => setState({ open });

//   const { open } = state;

//   return (
//     <Provider>
//       <Portal>
//         <FAB.Group
//           open={open}
          
//           icon={open ? 'calendar-today' : 'plus'}
//           actions={[
//             {
//               icon: 'star',
//               label: 'Add Entry',
//               onPress: () => navigation.navigate('AddEntryScreen'),
//             },
  
//           ]}
//           onStateChange={onStateChange}
//           onPress={() => {
//             if (open) {
//               // do something if the speed dial is open
//             }
//           }}
//         />
//       </Portal>
//     </Provider>
//   );
// };

// export default FABGroup;


export default function MyFAB({navigation, screenName, tableName, dbName}){
  
  return (<FAB
    style={styles.fab}
    icon="plus"
    onPress={() => navigation.navigate(screenName, {tableName:tableName, dbName:dbName})}
  />);
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})