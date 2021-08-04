import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../page/HomePage';
import SettingsScreen from '../page/SettingsPage';
// import AppBar from '../components/AppBar';
import GeneralScreen from '../page/GeneralPage';
// import AddEntryScreen from '../page/AddEntryPage';
// import ContactScreen from '../page/ContactPage';
import UpdateEntryScreen from '../page/updateEntryPage';
import newFieldScreen from '../page/newFieldPage';
import manageFieldsScreen from '../page/manageFields';
import GenAddEntryScreen from '../page/GenAddPage';
import GenItemScreen from '../page/GenItemPage';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const GeneralStack = createStackNavigator();
const newFieldStack = createStackNavigator();

export const HomeStackScreen = ({navigation}) => (

    <HomeStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{
          title:'Home',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
          {/* <HomeStack.Screen name="ContactScreen" component={ContactScreen} options={{
          title:'Contact',
          }} /> */}
          {/* <HomeStack.Screen name="AddEntryScreen" component={AddEntryScreen} options={{
          title:'Add Entry',
          }} /> */}
          {/* <HomeStack.Screen name="UpdateEntryScreen" component={UpdateEntryScreen} options={{
          title:'Update Entry',
          }} /> */}
    </HomeStack.Navigator>
  );

export const SettingsStackScreen = ({navigation}) => (
      <SettingsStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
      </SettingsStack.Navigator>
  );

export function GeneralStackScreen({navigation, route}){
    const {name} = route.params;

    return (
    <GeneralStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <GeneralStack.Screen name={name} component={GeneralScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />

          <GeneralStack.Screen name="GenItemScreen" component={GenItemScreen} options={{
          title:'Item',
          }} />

          <GeneralStack.Screen name="GenAddEntryScreen" component={GenAddEntryScreen} options={{
          title:'Add Entry',
          }} />

          <GeneralStack.Screen name="UpdateEntryScreen" component={UpdateEntryScreen} options={{
          title:'Update Entry',
          }} />
    </GeneralStack.Navigator>
    );
};

export const newFieldStackScreen = ({navigation}) => (
    <newFieldStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <newFieldStack.Screen name="manageFieldsScreen" component={manageFieldsScreen} options={{
            title:'Manage Fields',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
          }} />
          <newFieldStack.Screen name="newFieldScreen" component={newFieldScreen} options={{
            title:'Create New Field',
          }} />
    </newFieldStack.Navigator>
);

