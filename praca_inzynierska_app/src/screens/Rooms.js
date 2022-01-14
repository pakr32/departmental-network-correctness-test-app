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

export default class Rooms extends React.Component {
  _isMounted = false;

  constructor () {
    super ();
    this.state = {
      rooms: null,
      filteredRooms: [],
      selectedRoom: null,
      selectedRoom: '',
      selectedItem: null,
      search: '',
    };
  }

  fetchRooms = event => {
    const options = {};
    const url =
      'http://192.168.100.2:21416/database/building/' +
      this.props.route.params.selectedBuilding +
      '';
    fetch (url, options)
      .then (res => res.json ())
      .then (data => {
        data.sort ((a, b) => {
          return b.pokoj - a.pokoj;
        });
        this.state.rooms = data;
        this.state.filteredRooms = data;
        this.setState (prevState => {
          let tmp = Object.assign ({}, prevState);
          tmp.rooms = data;
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
      this.fetchRooms ();
    } catch (e) {}
  }

  async componentWillUnmount () {
    this._isMounted = false;
  }

  handleSelection = id => {
    var selectedRoom = this.state.selectedRoom;
    this.state.selectedRoom = id;
    if (selectedRoom === id)
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
      const newData = this.state.rooms.filter (item => {
        const roomData = item.pokoj
          ? item.pokoj.toUpperCase ()
          : ''.toUpperCase ();
        const textData = text.toUpperCase ();
        return roomData.startsWith (textData);
      });
      this.setState ({
        filteredRooms: newData,
      });
    } else {
      this.setState ({
        filteredRooms: this.state.rooms,
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
          this.props.navigation.navigate ('Sockets', {
            selectedBuilding: this.props.route.params.selectedBuilding,
            selectedRoom: item.pokoj,
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
          <Text style={AppStyle.text}> {item.pokoj} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  listEmptyComponent = () => {
    if (!this.state.rooms) {
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
              data={this.state.filteredRooms}
              extraData={this.state.selectedRoom}
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
