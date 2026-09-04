import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  description: string;
  beginnerTips?: string;
  videoUrl?: string;
  isCustom?: boolean;
}

export type RootStackParamList = {
  Onboarding: undefined;
  ProfileSetup: undefined;
  Main: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Exercises: NavigatorScreenParams<ExercisesStackParamList>;
  Fuel: NavigatorScreenParams<FuelStackParamList>;
  You: NavigatorScreenParams<YouStackParamList>;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Steps: undefined;
};

export type ExercisesStackParamList = {
  ExerciseList: undefined;
  ExerciseDetail: { item: Exercise };
  Favorites: undefined;
};

export type FuelStackParamList = {
  Nutrition: undefined;
  FoodPicker: undefined;
  ProfileSetup: undefined;
};

export type YouStackParamList = {
  YouHome: undefined;
  Settings: undefined;
  CreateCustomExercise: undefined;
  Plan: undefined;
  ProfileSetup: undefined;
  Steps: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<TabParamList>
  >;

export type ExercisesStackScreenProps<T extends keyof ExercisesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ExercisesStackParamList, T>,
    BottomTabScreenProps<TabParamList>
  >;

export type FuelStackScreenProps<T extends keyof FuelStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FuelStackParamList, T>,
    BottomTabScreenProps<TabParamList>
  >;

export type YouStackScreenProps<T extends keyof YouStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<YouStackParamList, T>,
    BottomTabScreenProps<TabParamList>
  >;
