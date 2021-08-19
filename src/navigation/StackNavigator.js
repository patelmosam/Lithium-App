import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../page/HomePage';
import SettingsScreen from '../page/SettingsPage';
import GeneralScreen from '../page/GeneralPage';
import GenUpdateScreen from '../page/GenUpdatePage';
import TableAddScreen from '../page/TableAddPage';
import TablesScreen from '../page/TablesPage';
import GenAddScreen from '../page/GenAddPage';
import GenItemScreen from '../page/GenItemPage';
import TableItemScreen from '../page/TableItemPage';
// import TableUpdateScreen from '../page/TableUpdatePage';
import DatabaseScreen from '../page/DatabasePage';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const GeneralStack = createStackNavigator();
const newFieldStack = createStackNavigator();
const DatabaseStack = createStackNavigator();

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

          <GeneralStack.Screen name="GenAddScreen" component={GenAddScreen} options={{
          title:'Add Entry',
          }} />

          <GeneralStack.Screen name="GenUpdateScreen" component={GenUpdateScreen} options={{
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
          <newFieldStack.Screen name="TablesScreen" component={TablesScreen} options={{
            title:'Manage Tables',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
          }} />
          <newFieldStack.Screen name="TableAddScreen" component={TableAddScreen} options={{
            title:'Create New Table',
          }} />
          <newFieldStack.Screen name="TableItemScreem" component={TableItemScreen} options={{
            title:'Table Item',
          }} />
          {/* <newFieldStack.Screen name="TableUpdateScreen" component={TableUpdateScreen} options={{
            title:'Edit Table',
          }} /> */}
    </newFieldStack.Navigator>
);


export const DatabaseStackScreen = ({navigation}) => (
  <DatabaseStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        presentation: 'modal'
    }}>
        <DatabaseStack.Screen name="databaseScreen" component={DatabaseScreen} options={{
          title:'Databases',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button name="add" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
        
  </DatabaseStack.Navigator>
);


