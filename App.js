import React, {useState} from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { ThemeContext } from './src/components/context';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      NavigationContainer,
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const themeContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <ThemeContext.Provider value={themeContext}>
            <NavigationContainer theme={theme}>
              <DrawerNavigator />
            </NavigationContainer>
          </ThemeContext.Provider>
        </PaperProvider>
      </Provider>
  );
}