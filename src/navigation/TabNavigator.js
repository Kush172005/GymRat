import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme';
import { fontFamily } from '../theme/typography';

import { HomeScreen } from '../screens/home/HomeScreen';
import { StepTrackerScreen } from '../screens/activity/StepTrackerScreen';
import { ExerciseListScreen } from '../screens/exercises/ExerciseListScreen'; // also mounted in YouStack, see below
import { ExerciseDetailScreen } from '../screens/exercises/ExerciseDetailScreen';
import { FavoritesScreen } from '../screens/exercises/FavoritesScreen';
import { NutritionScreen } from '../screens/fuel/NutritionScreen';
import { FoodPickerScreen } from '../screens/fuel/FoodPickerScreen';
import { YouHomeScreen } from '../screens/you/YouHomeScreen';
import { SettingsScreen } from '../screens/you/SettingsScreen';
import { CreateCustomExerciseScreen } from '../screens/you/CreateCustomExerciseScreen';
import { PlanScreen } from '../screens/you/PlanScreen';
import { ProfileSetupScreen } from '../screens/you/ProfileSetupScreen';
import { ActiveWorkoutScreen } from '../screens/workout/ActiveWorkoutScreen';
import { WorkoutSummaryScreen } from '../screens/workout/WorkoutSummaryScreen';
import { WorkoutHistoryScreen } from '../screens/workout/WorkoutHistoryScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ExStack = createNativeStackNavigator();
const FuelStack = createNativeStackNavigator();
const YouStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Steps" component={StepTrackerScreen} />
    </HomeStack.Navigator>
  );
}

function ExercisesNavigator() {
  return (
    <ExStack.Navigator screenOptions={{ headerShown: false }}>
      <ExStack.Screen name="ExerciseList" component={ExerciseListScreen} />
      <ExStack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <ExStack.Screen name="Favorites" component={FavoritesScreen} />
    </ExStack.Navigator>
  );
}

function FuelNavigator() {
  return (
    <FuelStack.Navigator screenOptions={{ headerShown: false }}>
      <FuelStack.Screen name="Nutrition" component={NutritionScreen} />
      <FuelStack.Screen name="FoodPicker" component={FoodPickerScreen} />
      <FuelStack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </FuelStack.Navigator>
  );
}

function YouNavigator() {
  return (
    <YouStack.Navigator screenOptions={{ headerShown: false }}>
      <YouStack.Screen name="YouHome" component={YouHomeScreen} />
      <YouStack.Screen name="Settings" component={SettingsScreen} />
      <YouStack.Screen name="CreateCustomExercise" component={CreateCustomExerciseScreen} />
      <YouStack.Screen name="Plan" component={PlanScreen} />
      <YouStack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <YouStack.Screen name="Steps" component={StepTrackerScreen} />
      <YouStack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
      <YouStack.Screen name="WorkoutSummary" component={WorkoutSummaryScreen} />
      <YouStack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} />
      <YouStack.Screen name="ExerciseList" component={ExerciseListScreen} />
    </YouStack.Navigator>
  );
}

const TAB_ICONS = {
  Home: { active: 'home', inactive: 'home-outline' },
  Exercises: { active: 'barbell', inactive: 'barbell-outline' },
  Fuel: { active: 'nutrition', inactive: 'nutrition-outline' },
  You: { active: 'person-circle', inactive: 'person-circle-outline' },
};

export function TabNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          return (
            <Ionicons name={focused ? icons.active : icons.inactive} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: 54 + insets.bottom,
          paddingBottom: insets.bottom + 4,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.body.semiBold,
          fontSize: 11,
          marginTop: -2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Exercises" component={ExercisesNavigator} />
      <Tab.Screen name="Fuel" component={FuelNavigator} />
      <Tab.Screen name="You" component={YouNavigator} />
    </Tab.Navigator>
  );
}
