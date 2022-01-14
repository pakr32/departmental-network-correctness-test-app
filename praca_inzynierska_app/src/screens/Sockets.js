import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import AppStyle from '../styles/AppStyle';
import AppConstants from '../styles/AppConstants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Sockets extends React.Component {
  _isMounted = false;

  constructor () {
    super ();
    this.state = {
      sockets: null,
      filteredSockets: [],
      selectedSocket: '',
    };
  }

  fetchSockets = (selectedBuilding, selectedRoom) => {
    const options = {};
    const url =
      'http://192.168.100.2:21416/database/building/' +
      selectedBuilding +
      '/room/' +
      selectedRoom +
      '';
    fetch (url, options)
      .then (res => res.json ())
      .then (data => {
        data.sort ((a, b) => {
          return b.nr_gniazdka - a.nr_gniazdka;
        });
        this.state.sockets = data;
        this.state.filteredSockets = data;
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
    try {
      this.fetchSockets (
        this.props.route.params.selectedBuilding,
        this.props.route.params.selectedRoom
      );
      this.openModal;
    } catch (e) {}
  }

  async componentWillUnmount () {
    this._isMounted = false;
  }

  handleSelection = id => {
    var selectedSocket = this.state.selectedSocket;
    this.state.selectedSocket = id;
    if (selectedSocket === id)
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
      const newData = this.state.sockets.filter (item => {
        const socketData = item.nr_gniazdka
          ? item.nr_gniazdka.toUpperCase ()
          : ''.toUpperCase ();
        const textData = text.toUpperCase ();
        return socketData.startsWith (textData);
      });
      this.setState ({
        filteredSockets: newData,
      });
    } else {
      this.setState ({
        filteredSockets: this.state.sockets,
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
          this.props.navigation.navigate ('Socket', {
            selectedBuilding: this.props.route.params.selectedBuilding,
            selectedRoom: this.props.route.params.selectedRoom,
            selectedSocket: item.nr_gniazdka,
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
          <Text style={AppStyle.text}> {item.nr_gniazdka} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  listEmptyComponent = () => {
    if (!this.state.sockets) {
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
              data={this.state.filteredSockets}
              extraData={this.state.selectedSocket}
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
