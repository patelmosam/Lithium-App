import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const AppBar = ({nav, title}) => {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={styles.headerStyle}>
      <Appbar.Action icon={"menu"} onPress={() => {nav.openDrawer()}} />
      <Appbar.Content title={title} style={styles.fontStyle} subtitle="" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "black",
    
  },
  fontStyle: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontWeight: '400',
  }
})