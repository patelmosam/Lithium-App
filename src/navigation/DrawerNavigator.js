import React, {useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../components/CustomSidebar';
import DatabaseScreen from '../page/DatabasePage';
// import GeneralScreen from '../page/GeneralPage';

import { HomeStackScreen, SettingsStackScreen, GeneralStackScreen } from './StackNavigator';
import { useSelector, useDispatch } from 'react-redux'
import { selectFields } from '../reducers/fieldReducer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    const screens = useSelector(selectFields)
    const dispatch = useDispatch()
    // const screens = [{  screen:SettingsStackScreen,
    //                     name:'screen1',
    //                     key: 1 }, 
    //                 {   screen:DatabaseScreen,
    //                     name:'screen2',
    //                     key: 2 },
    //                 {   screen:DatabaseScreen,
    //                     name:'screen3',
    //                     key: 3 }];
    
    return (
        // <NavigationContainer theme={theme}>
            <Drawer.Navigator initialRouteName="HomeStack"
                drawerContent={(props) => <DrawerContent {...props} />}
            > 
                <Drawer.Screen 
                    name="HomeStack" 
                    component={HomeStackScreen} />

                { screens.map((screen) => (
                    <Drawer.Screen
                        key={screen.key}
                        name={screen.screenName} 
                        component={GeneralStackScreen} />
                ))}
                
            </Drawer.Navigator>
        // </NavigationContainer>
    )
}