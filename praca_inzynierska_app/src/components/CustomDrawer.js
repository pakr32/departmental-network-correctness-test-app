import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "./NavigationButton";

import {
    CommonActions,
    DrawerActions,
    DrawerNavigationState,
    ParamListBase,
    useLinkBuilder,
  } from '@react-navigation/native';
  

  
function DrawerElements(props) {
  const { state, navigation, descriptors}= props;
  const buildLink = useLinkBuilder();
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const { drawerActiveTintColor, drawerInactiveTintColor, drawerActiveBackgroundColor, drawerInactiveBackgroundColor, } = focusedOptions;
  return state.routes.map((route, i) => {
      
      const focused = i === state.index;
      const { title, drawerLabel, drawerIcon, drawerLabelStyle, drawerItemStyle, } = descriptors[route.key].options;
      return (

                <MenuButton
                  title={title}
                  iconName={drawerIcon}
                  onPress={() => {
                    navigation.dispatch({
                      ...(focused
                        ? DrawerActions.closeDrawer()
                        : CommonActions.navigate({ name: route.name, merge: true })),
                      target: state.key,
                    });
                  }}
                />

          );
      
  });
}

export default function DrawerContainer(props) {
    return (
        
        <View style={styles.content}>
        <View style={styles.container}>
            <DrawerElements {...props}/>
        </View></View>
    )
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
