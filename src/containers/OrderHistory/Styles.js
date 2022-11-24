import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  orderEmptyView:{marginTop:30,justifyContent:'center',alignItems:'center'},
  orderEmptyText:{color:Colors.white,}
});

