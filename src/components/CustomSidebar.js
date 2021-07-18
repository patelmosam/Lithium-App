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
import { selectFields } from '../reducers/fieldReducer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function DrawerContent(props) {
    const screens = useSelector(selectFields)
    const dispatch = useDispatch()

    const paperTheme = useTheme();
    const { toggleTheme } = React.useContext(ThemeContext);

    // const screens = ['screen1', 'screen2', 'screen3'];
    // const screens = [{  screen:null,
    //     name:'screen1',
    //     key: 1 }, 
    // {   screen:null,
    //     name:'screen2',
    //     key: 2 },
    // {   screen:null,
    //     name:'screen3',
    //     key: 3 },
    // {   screen:null,
    //     name:'screen4',
    //     key: 4 },];

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
                       
                       
                        {
                            screens.map((screen) => (
                            <DrawerItem key={screen.key}
                                icon={({color, size}) => (
                                    <Icon 
                                    name="cog-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label={screen.screenName}
                                onPress={() => {props.navigation.navigate(screen.screenName, {name:screen.screenName})}}
                            />
                            ))
                        }

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Create New Field"
                            onPress={() => {props.navigation.navigate('newFieldStack')}}
                        />

                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
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
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Database"
                    onPress={() => {console.log('Database CLicked')}}
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
