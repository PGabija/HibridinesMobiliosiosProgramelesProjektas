import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../model/MainScreen';
import AddScreen from '../model/AddScreen';
import EditScreen from '../model/EditScreen';
import DeleteScreen from '../model/DeleteScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../model/LoginScreen';
import RegisterScreen from '../model/RegisterScreen';
import WelcomeScreen from '../model/WelcomeScreen';
import useAuth from '../hooks/useAuth';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { user } = useAuth();
  if (user) {
    return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Pagrindinis') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Pridėti') {
          iconName = focused ? 'plus-square' : 'plus-square';
        } else if (route.name === 'Atnaujinti') {
          iconName = focused ? 'edit' : 'edit';
        } else if (route.name === 'Ištrinti') {
          iconName = focused ? 'trash' : 'trash';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
        })}
        tabBarStyle={{
          backgroundColor: '#ecf0f1',
        }}
        tabBarOptions={{
          activeTintColor: '#FBCFCD',
          inactiveTintColor: '#997070',
        }}
        >
          <Tab.Screen
          name="Pagrindinis"
          component={MainScreen}
          options={{
            tabBarLabel: () => null,
          }}
          />
          <Tab.Screen
          name="Pridėti"
          component={AddScreen}
          options={{
            tabBarLabel: () => null,
          }}
          />
          <Tab.Screen
          name="Atnaujinti"
          component={EditScreen}
          options={{
            tabBarLabel: () => null,
          }}
          />
          <Tab.Screen
          name="Ištrinti"
          component={DeleteScreen}
          options={{
            tabBarLabel: () => null,
          }}
          />
    </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Welcome') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Login') {
              iconName = focused ? 'plus-square' : 'plus-square';
            } else if (route.name === 'Register') {
              iconName = focused ? 'edit' : 'edit';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarStyle={{
          backgroundColor: '#ecf0f1',
        }}
        tabBarOptions={{
          activeTintColor: '#FBCFCD',
          inactiveTintColor: '#997070',
        }}
      >
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    );
  }
};

export default BottomTabNavigator;
