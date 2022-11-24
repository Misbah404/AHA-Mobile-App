import React from 'react';
import {
  FlatList, Image, Text,
  TextInput, TouchableOpacity, View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CustomNavbar } from '../../components';
import { strings } from '../../constants';
import { AppStyles, Colors, Images } from '../../theme';
import styles from './SearchStyles';

export default function SearchView(props) {
  const {array, searchList, setList, selectedIDs} = props;

  return (
    <>
      <CustomNavbar
        title={strings.SEARCH}
        hasBack
        titleStyle={[styles.navbarText, AppStyles.titleStyleForLeft]}
      />
      <View style={styles.container}>
        <View style={styles.textInputView}>
          <Image source={Images.searchTabIcon} style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder={strings.SEARCH}
            placeholderTextColor={Colors.text.white}
            selectionColor={Colors.white}
          />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={array}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => {
            const isFirstItem = index === 0;
            let active = selectedIDs.includes(item.id);

            return (
              <TouchableOpacity
                style={styles.listView}
                onPress={() => setList(item.id)}>
                <Text
                  style={[
                    styles.defualtDataText,
                    isFirstItem && AppStyles.mTop20,
                  ]}>
                  {item.title}
                </Text>
                {active && <Image source={Images.checkRightIcon} />}
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => Actions.pop()}>
          <Text style={styles.button}>{strings.DONE}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
