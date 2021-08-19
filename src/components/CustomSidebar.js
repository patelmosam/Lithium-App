import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import{ ThemeContext } from '../components/context';
import { useSelector, useDispatch } from 'react-redux'
import { selectTables } from '../reducers/tableReducer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function DrawerContent(props) {
    const tables = useSelector(selectTables)
    const dispatch = useDispatch()

    const paperTheme = useTheme();
    const { toggleTheme } = React.useContext(ThemeContext);


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        {/* <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
                            </View>
                        </View> */}

                        <View >
                            <Title style={styles.title}>Lithium</Title>
                            {/* <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View> */}
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('HomeStack')}}
                        />
                    </Drawer.Section>

                        {
                            Object.keys(tables).map((table) => (
                                <Drawer.Section key={table} title={table}>
                               { Object.keys(tables[table]).map((key) => (
                                    <DrawerItem key={key}
                                        icon={({color, size}) => (
                                            <Icon 
                                            name="folder" 
                                            color={color}
                                            size={size}
                                            />
                                        )}
                                        label={key}
                                        onPress={() => {props.navigation.navigate(key, {name:key, dbName:table})}}
                                    />
                                ))}
                                </Drawer.Section>
                            ))
                        }
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="playlist-plus" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Manage Tables"
                            onPress={() => {props.navigation.navigate('newFieldStack')}}
                        /> */}

                        

                    
                    <Drawer.Section title="Preferences">
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cog-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('settings')}}
                        />
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="database-plus" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Database"
                    onPress={() => {props.navigation.navigate('DatabaseStack')}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
