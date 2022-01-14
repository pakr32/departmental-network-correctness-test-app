import React from 'react';
import {
    View,
    Button
} from 'react-native';

const Home = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.navigate(('Buildings'))} title="Go to buildings" />
      </View>
    )

}

export default Home;