import React from 'react';
import {View, Text} from 'react-native';
import AppConstants from '../styles/AppConstants';

const Help = ({navigation}) => {
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
          W celu znalezienia gniazdka sieciowego wybierz budynek i pokój w którym ono się znajduje.
          {' '}
          {'\n'}
        </Text>
        <Text style={{fontSize: 20}}>
          W przypadku kiedy internet nie działa, a podłączona usługa to internet pobierz dane z API Aruby oraz sprawdź informację czy port działa.
          {'\n'}
        </Text>
        <Text style={{fontSize: 20}}>
          Jeśli port działa, sprawdź czy Twojego urządzenia nie ma wśród listy adresów MAC.
          {'\n'}
        </Text>
        <Text style={{fontSize: 20}}>
          Skontaktuj się z administratorem sieci.
        </Text>
      </View>
    </View>
  );
};

export default Help;
