import React from 'react';
import {StyleSheet} from 'react-native';
import AppConstants from './AppConstants';

const AppStyle = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppConstants.COLORS.primary[100],
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  defaultContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  selectedValues: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: AppConstants.COLORS.important.default,
  },
  centered: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: AppConstants.COLORS.primary[50],
  },
  menuBarIconDefault: {
    color: AppConstants.COLORS.secondary[200],
  },
  menuBarIconFocused: {
    color: AppConstants.COLORS.secondary[600],
  },
  menuBarTextDefault: {
    fontFamily: AppConstants.FONTS.body4.fontFamily,
    fontSize: AppConstants.FONTS.body4.fontSize,
    color: AppConstants.COLORS.basics.font,
  },
  menuBarTextFocused: {
    fontFamily: AppConstants.FONTS.body4.fontFamily,
    fontSize: AppConstants.FONTS.body4.fontSize,
    color: AppConstants.COLORS.basics.fontFocused,
  },
  flatListItemTextSelected: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: AppConstants.FONTS.body1.fontFamily,
    fontSize: AppConstants.FONTS.body1.fontSize,
    color: AppConstants.COLORS.tertiary[600],
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: AppConstants.SIZES.padding,
    margin: AppConstants.SIZES.margin,
    paddingHorizontal: AppConstants.SIZES.padding,
    borderRadius: AppConstants.SIZES.borderRadius,
    elevation: AppConstants.SIZES.elevation,
    backgroundColor: AppConstants.COLORS.secondary[400],
  },
  buttonDisabled: {
    flex: 1,
    alignItems: 'center',
    margin: AppConstants.SIZES.margin,
    paddingVertical: AppConstants.SIZES.padding,
    paddingHorizontal: AppConstants.SIZES.padding,
    borderRadius: AppConstants.SIZES.borderRadius,
    elevation: AppConstants.SIZES.elevation,
    backgroundColor: AppConstants.COLORS.secondary[50],
  },
  searchContainer: {
    height: 50,
    paddingHorizontal: 15,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppConstants.COLORS.secondary[50],
  },
  searchInputContainer: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {},
  flatList: {},
  flatListContainer: {
    flex: 11,
  },
  textInput: {
    flex: 1,
  },
  text: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  marginLeft: {
    marginLeft: 5,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  flatListItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  boldText: {
    fontWeight: 'bold',
  },
  contentContainerStyle: {
    paddingBottom: 200,
  },
  contentContainerStyle2: {
    paddingBottom: 100,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
  },
  itemMac: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    margin: 8,
  },
  flatListItem: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },

  flatListItemTextDefault: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },

  number: {
    fontSize: 14,
    color: 'blue',
  },

  separator: {
    backgroundColor: 'thistle',
    height: 4,
  },
  listEmpty: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default AppStyle;
