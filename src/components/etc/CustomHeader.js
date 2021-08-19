import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppBar from './AppBar';

export default function Header({ navigation, title }) {
    return (
        <AppBar nav={navigation} title={"Home"} />
        
        // <View style={styles.header}>
        //     <Icon name="bars" size={25} onPress={ () => navigation.openDrawer()} style={styles.icon}/>
        //     <View>
        //         <Text style={styles.headerText}> {title} </Text>
        //     </View>
        // </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: 'red',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 10,
        color: "#fff",
        
    }
});