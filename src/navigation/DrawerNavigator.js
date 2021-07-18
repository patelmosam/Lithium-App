import React, {useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../components/CustomSidebar';

import { HomeStackScreen, newFieldStackScreen, GeneralStackScreen } from './StackNavigator';
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

                { screens.map((screen) => (
                    <Drawer.Screen
                        key={screen.key}
                        name={screen.screenName} 
                        component={GeneralStackScreen} />
                ))}
                
                <Drawer.Screen 
                    name="newFieldStack" 
                    component={newFieldStackScreen} />

            </Drawer.Navigator>
        // </NavigationContainer>
    )
}