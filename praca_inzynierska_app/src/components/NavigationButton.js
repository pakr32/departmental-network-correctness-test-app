import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NavigationButton(props) {
  const { title, onPress, iconName } = props;

  return (
    <TouchableHighlight onPress={onPress} style={styles.btnClickContain} underlayColor="rgba(128, 128, 128, 0.1)">
      <View style={styles.btnContainer}>
      <Icon
                  name={iconName}
                  size={30}
                  style={{ height: 30, width: 30, textAlign: 'center'}}
                />
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

NavigationButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  iconName: PropTypes.string
};
