import React, {useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../components/CustomSidebar';

import { HomeStackScreen, newFieldStackScreen, GeneralStackScreen, SettingsStackScreen } from './StackNavigator';
import { useSelector, useDispatch } from 'react-redux'
import { selectFields } from '../reducers/fieldReducer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    const screens = useSelector(selectFields)
    const dispatch = useDispatch()
    
    
    return (
        // <NavigationContainer theme={theme}>
            <Drawer.Navigator initialRouteName="HomeStack"
                drawerContent={(props) => <DrawerContent {...props} />}
            > 
                <Drawer.Screen 
                    name="HomeStack" 
                    component={HomeStackScreen} />
                
                <Drawer.Screen 
                    name="settings" 
                    component={SettingsStackScreen} />

                { screens.map((screen) => (
                    <Drawer.Screen
                        key={screen.id}
                        name={screen.name} 
                        component={GeneralStackScreen} />
                ))}
                
                <Drawer.Screen 
                    name="newFieldStack" 
                    component={newFieldStackScreen} />

            </Drawer.Navigator>
        // </NavigationContainer>
    )
}