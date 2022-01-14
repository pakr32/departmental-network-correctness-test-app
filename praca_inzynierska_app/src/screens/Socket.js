import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  LogBox
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppStyle from '../styles/AppStyle';
import AppConstants from '../styles/AppConstants';
LogBox.ignoreAllLogs ();

export default class SocketInfo extends React.Component {
  _isMounted = false;
  constructor () {
    super ();
    this.state = {
      socketData: [],
      socketArubaData: '',
      socketMacTable: '',
    };
  }

  fetchSocketData = (selectedBuilding, selectedRoom, selectedSocket) => {
    const options = {};
    const url =
      'http://192.168.100.2:21416/database/building/' +
      selectedBuilding +
      '/room/' +
      selectedRoom +
      '/socketNumber/' +
      selectedSocket +
      '';
    fetch (url, options)
      .then (res => res.json ())
      .then (data => {
        this.state.socketData = data;
        this.setState (prevState => {
          let tmp = Object.assign ({}, prevState);
          return {tmp};
        });
      })
      .catch (e => {
        console.log (e);
      });
  };

  fetchArubaSocketData = value => {
    const url =
      'http://192.168.100.2:21416/aruba/gniazdko/' +
      this.state.socketData[0].nr_gniazdka +
      '/adresip/' +
      this.state.socketData[0].adresip +
      '';
    fetch (url)
      .then (res => res.json ())
      .then (data => {
        this.state.socketArubaData = data;
        this.setState (prevState => {
          let tmp = Object.assign ({}, prevState);
          tmp.socketArubaData = data;
          return {tmp};
        });
      })
      .catch (e => {
        console.log (e);
      });
  };

  fetchMacTable = value => {
    const url =
      'http://192.168.100.2:21416/aruba/mac/gniazdko/' +
      this.state.socketData[0].nr_gniazdka +
      '/adresip/' +
      this.state.socketData[0].adresip +
      '';
    fetch (url)
      .then (res => res.json ())
      .then (data => {
        this.state.socketMacTable = data;
        this.setState (prevState => {
          let tmp = Object.assign ({}, prevState);
          tmp.socketMacTable = data;
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
      this.fetchSocketData (
        this.props.route.params.selectedBuilding,
        this.props.route.params.selectedRoom,
        this.props.route.params.selectedSocket
      );
      this.openModal;
    } catch (e) {}
  }

  async componentWillUnmount () {
    this._isMounted = false;
  }

  renderItem = item => {
    return (
      <View style={AppStyle.itemMac}>
        <Text style={AppStyle.text}>mac_address: {item.mac_address} </Text>
        <Text style={AppStyle.text}>port_id: {item.port_id} </Text>
        <Text style={AppStyle.text}>vlan_id: {item.vlan_id} </Text>
      </View>
    );
  };

  renderArubaData () {
    if (this.state.socketArubaData == '') {
      return (
        <Button
          title="Pobierz dane z Aruby"
          onPress={() => this.fetchArubaSocketData ()}
        />
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text style={AppStyle.defaultContainer}>
            uri: {this.state.socketArubaData.uri}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            id: {this.state.socketArubaData.id}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            nazwa: {this.state.socketArubaData.name}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            Port podłączony?:
            {' '}
            {this.state.socketArubaData.is_port_enabled === 'true'
              ? 'tak'
              : 'nie'}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            Port działa?:
            {' '}
            {this.state.socketArubaData.is_port_up === 'true' ? 'tak' : 'nie'}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            Config mode:{this.state.socketArubaData.config_mode}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            trunk mode: {this.state.socketArubaData.trunk_mode}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            lacp status: {this.state.socketArubaData.lacp_status}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            trunk group: {this.state.socketArubaData.trunk_group}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            flow control włączony?:
            {' '}
            {this.state.socketArubaData.is_flow_control_enabled === 'true'
              ? 'tak'
              : 'nie'}
          </Text>
          <Text style={AppStyle.defaultContainer}>
            port dsnoop zaufany?:
            {' '}
            {this.state.socketArubaData.is_dsnoop_port_trusted === 'true'
              ? 'tak'
              : 'nie'}
          </Text>
        </View>
      );
    }
  }

  renderSocketData () {
    if (this.state.socketData == '') {
      return (
      <View>
        <ActivityIndicator
          size={AppConstants.SIZES.bigIcon}
          color={AppConstants.COLORS.tertiary[100]}
        />
      </View>
      )
    } else {
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
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: AppConstants.COLORS.primary[100],
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <Text style={AppStyle.defaultContainer}>Numer gniazdka: </Text>
              <Text style={AppStyle.defaultContainer}>Patch Panel: </Text>
              <Text style={AppStyle.defaultContainer}>Numer Patch Panel: </Text>
              <Text style={AppStyle.defaultContainer}>Switch: </Text>
              <Text style={AppStyle.defaultContainer}>Port na Switch: </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: AppConstants.COLORS.primary[100],
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <View>
                <Text style={AppStyle.defaultContainer}>
                  {this.state.socketData[0].nr_gniazdka}
                </Text>
                <Text style={AppStyle.defaultContainer}>
                  {this.state.socketData[0].patch_panel}
                </Text>
                <Text style={AppStyle.defaultContainer}>
                  {this.state.socketData[0].nr_patch_panel}
                </Text>
                <Text style={AppStyle.defaultContainer}>
                  {this.state.socketData[0].nr_switch}
                </Text>
                <Text style={AppStyle.defaultContainer}>
                  {this.state.socketData[0].port_na_switchu}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: AppConstants.COLORS.primary[100],
              margin: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{fontSize: 20}}>
              Podłączono: {this.state.socketData[0].typ}
            </Text>

          </View>
          <View
            style={{
              margin: 15,
              backgroundColor: AppConstants.COLORS.primary[100],
            }}
          >
            {this.renderArubaData ()}
          </View>
          <View
            style={{
              margin: 15,
              backgroundColor: AppConstants.COLORS.primary[100],
            }}
          >
            {this.renderMacTable ()}
          </View>
        </View>
      );
    }
  }

  renderMacTable () {
    if (this.state.socketMacTable == '') {
      return (
        <Button
          title="Pobierz tablice mac"
          onPress={() => this.fetchMacTable ()}
        />
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text style={AppStyle.defaultContainer}>
            Znaleziono
            {' '}
            {this.state.socketMacTable.collection_result.total_elements_count}
            :
          </Text>
          <View>
            {this.state.socketMacTable.mac_table_entry_element.map (
              (element, index) => this.renderItem (element)
            )}
          </View>
        </View>
      );
    }
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          height: AppConstants.SIZES.height
          / 6,
          backgroundColor: AppConstants.COLORS.primary[100],
        }}
      >
        <ScrollView>
          <View>
            <View
              style={{
                flex: 1,
                height: AppConstants.SIZES.height
                / 6,
              }}
            >
              <Text style={AppStyle.header}>Wybrano:</Text>

              <View style={AppStyle.infoContainer}>
                <Icon
                  name="office-building"
                  size={20}
                  style={{
                    height: 20,
                    width: 20,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                />
                <Text style={AppStyle.selectedValues}>
                  {this.props.route.params.selectedBuilding}
                </Text>
                <Icon
                  name="door"
                  size={20}
                  style={{
                    height: 20,
                    width: 20,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                />
                <Text style={AppStyle.selectedValues}>
                  {this.props.route.params.selectedRoom}
                </Text>
                <Icon
                  name="ethernet"
                  size={20}
                  style={{
                    height: 20,
                    width: 20,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                />
                <Text style={AppStyle.selectedValues}>
                  {this.props.route.params.selectedSocket}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: AppConstants.COLORS.primary[100],
              }}
            >
              {this.renderSocketData ()}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}