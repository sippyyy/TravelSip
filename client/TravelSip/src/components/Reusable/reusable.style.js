import {StyleSheet} from 'react-native';

const reusable = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  rowWithSpace: (justifyContent, direction, alignItems) => ({
    flexDirection: direction ? direction : 'row',
    alignItems: alignItems ? alignItems : 'center',
    justifyContent: justifyContent,
  }),
});

export default reusable;
