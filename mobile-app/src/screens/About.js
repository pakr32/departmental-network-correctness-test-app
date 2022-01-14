import React from 'react';
import {View, Text} from 'react-native';
import AppConstants from '../styles/AppConstants';

const About = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppConstants.COLORS.primary[100],
      }}
    >

      <View
        style={{
          backgroundColor: AppConstants.COLORS.primary[100],
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{fontSize: 20}}>
          Aplikacja powstała w ramach pracy dyplomowej. {'\n'}
        </Text>
        <Text style={{fontSize: 20}}>
          WFiIS, Informatyka Stosowana, AGH 2022 r. {'\n'}

        </Text>
      </View>
    </View>
  );
};

export default About;
