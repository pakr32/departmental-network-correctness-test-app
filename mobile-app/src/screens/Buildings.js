import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import AppStyle from '../styles/AppStyle';
import AppConstants from '../styles/AppConstants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Buildings extends React.Component {
  _isMounted = false;
  index = 0;
  constructor () {
    super ();
    this.state = {
      buildings: null,
      filteredBuildings: [],
      selectedBuilding: '',
    };
  }
  fetchBuildings = () => {
    const options = {};
    const url = 'http://192.168.100.2:21416/database';
    fetch (url, options)
      .then (res => res.json ())
      .then (data => {
        this.state.buildings = data;
        this.state.filteredBuildings = data;
        this.setState (prevState => {
          let tmp = Object.assign ({}, prevState);
          return {tmp};
        });
      })
      .catch (e => {
        console.log (e);
      });
  };

  async componentDidMount () {
    this._isMounted = true;

    this.props.navigation.setOptions ({
      headerTitle: () => (
        <View>
          <TextInput
            value={this.state.search}
            placeholder="Wyszukaj..."
            onChangeText={text => this.searchFilter (text)}
          />
        </View>
      ),
      headerRight: () => <View />,
    });

    try {
      this.fetchBuildings ();
      this.openModal;
    } catch (e) {}
  }

  async componentWillUnmount () {
    this._isMounted = false;
  }

  handleSelection = id => {
    var selectedBuilding = this.state.selectedBuilding;
    this.state.selectedBuilding = id;
    if (selectedBuilding === id)
      this.setState ({
        selectedItem: null,
      });
    else
      this.setState ({
        selectedItem: id,
      });
  };

  searchFilter = text => {
    if (text) {
      const newData = this.state.buildings.filter (item => {
        const buildingsData = item.budynek
          ? item.budynek.toUpperCase ()
          : ''.toUpperCase ();
        const textData = text.toUpperCase ();
        return buildingsData.startsWith (textData);
      });
      this.setState ({
        filteredBuildings: newData,
      });
    } else {
      this.setState ({
        filteredBuildings: this.state.buildings,
      });
    }
    this.setState ({
      search: text,
    });
  };

  renderItem = ({item, index}) => {
    this.index = 0 + index;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate ('Rooms', {
            selectedBuilding: item.budynek,
          })}
      >
        <View style={AppStyle.item}>
          <View style={AppStyle.marginLeft}>
            <Icon
              name="times"
              size={20}
              style={{
                height: 20,
                width: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            />
          </View>
          <Text style={AppStyle.text}> {item.budynek} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  listEmptyComponent = () => {
    if (!this.state.buildings) {
      return (
        <View>
          <ActivityIndicator
            size={AppConstants.SIZES.bigIcon}
            color={AppConstants.COLORS.tertiary[100]}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>Brak wyników</Text>
        </View>
      );
    }
  };

  render () {
    return (
      <SafeAreaView edges={['bottom', 'left', 'right']} style={{flex: 1}}>
        <View style={AppStyle.container}>
          <View style={AppStyle.searchContainer}>
            <Icon
              name="search"
              size={20}
              style={{height: 20, width: 20, textAlign: 'center'}}
            />
            <View style={AppStyle.searchInputContainer}>
              <TextInput
                value={this.state.search}
                style={AppStyle.textInput}
                placeholder="Wyszukaj..."
                onChangeText={text => this.searchFilter (text)}
              />
              <Pressable onPress={() => this.searchFilter ('')}>
                <Icon
                  name="times"
                  size={20}
                  style={{height: 20, width: 20, textAlign: 'center'}}
                />
              </Pressable>

            </View>

          </View>
          <View style={AppStyle.flatListContainer}>
            <FlatList
              style={AppStyle.flatList}
              data={this.state.filteredBuildings}
              extraData={this.state.selectedBuilding}
              keyExtractor={(_, i) => String (i)}
              renderItem={this.renderItem}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={this.listEmptyComponent}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
