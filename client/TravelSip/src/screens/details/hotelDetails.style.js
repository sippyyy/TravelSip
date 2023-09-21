import {COLORS} from '../../constants/theme';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginHorizontal: 20,
  },
  titleContainer: {
    margin: 15,
    backgroundColor: COLORS.lightWhite,
    height: 120,
    borderRadius: 20,
    marginTop: -60,
  },
  titleColumn: {
    padding: 15,
  },
});

export default styles;
