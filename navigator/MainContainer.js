import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";

import {createNoteTable} from '../services/noteService'

// Screens
import TodoScreen from "./screens/Todo";
import DidlineScreen from "./screens/Didline";
import NotesScreen from "./screens/Notes";
import SettingScreen from "./screens/Setting";

//Screen names
const TodoName = "Todo";
const DidlineName = "Didline";
const NotesName = "Notes";
const SettingName = "Setting";

const Tab = createBottomTabNavigator();

function MainContainer() {
  const [initialDB, setInitialDB] = useState(false);
  useEffect(()=>{
    if(!initialDB){
      createNoteTable()
      setInitialDB(true)
    }

  }, [initialDB])
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={TodoName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === TodoName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === DidlineName) {
              iconName = focused ? "stopwatch" : "stopwatch-outline";
            } else if (rn === NotesName) {
              iconName = focused ? "pencil" : "pencil-outline";
            } else if (rn === SettingName) {
              iconName = focused ? "settings" : "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={DidlineName} component={DidlineScreen} />
        <Tab.Screen name={TodoName} component={TodoScreen} />
        <Tab.Screen name={NotesName} component={NotesScreen} />
        <Tab.Screen name={SettingName} component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;