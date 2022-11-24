import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {Colors, Fonts} from '../../theme';
import {useState} from 'react';
import util from '../../util';
import styles from './styles';
import {strings} from '../../constants';
import TextInput from '../TextInput';

export default function WeightWithUnitShippo(props) {
  const {
    massUnit,
    weight,
    setWeight,
    setMassUnit,
    error,
    isFromMainShipment,
    item,
    setSizebyindexShippoWeight,
    index,
    setWeightShipmentError,
    setSizebyindexShippoMassUnit,
  } = props;
  const [selectedUnit, setSelectedUnit] = useState(() =>
    !util.isEmptyValue(massUnit) ? massUnit : 'g',
  );

  const [weightError, setWeightError] = useState('');
  const [maxLength, setMaxlenght] = useState(6);
  const [weightCurrent, setWeightCurrent] = useState(weight ? weight : '');
  const unitData = [{unit: 'G'}, {unit: 'OZ'}, {unit: 'LB'}, {unit: 'KG'}];

  const onPress = itemMass => {
    setWeightError('');
    setWeight('');
    setWeightCurrent('');
    setSelectedUnit(itemMass?.unit.toLowerCase());
    if (isFromMainShipment) {
      setMassUnit(itemMass?.unit.toLowerCase());
    } else {
      setSizebyindexShippoMassUnit(index, item, itemMass?.unit?.toLowerCase());
    }
  };

  const renderWeightUnit = () => {
    return (
      <FlatList
        data={unitData}
        style={{paddingBottom: 40, marginTop: 10}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{marginLeft: -7}}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[
                {
                  backgroundColor: Colors.transparent,
                  borderWidth: 1,
                  borderColor: Colors.white,
                  margin: 10,
                  paddingHorizontal: 20,
                  width: 70,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                },
                util.areValuesEqual(selectedUnit, item.unit?.toLowerCase()) && {
                  backgroundColor: '#7234F9',
                  borderWidth: 0,
                  borderColor: Colors.transparent,
                },
              ]}
              onPress={() => onPress(item)}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: Fonts.size.xSmall,
                  fontFamily: Fonts.type.italic,
                  fontWeight: '700',
                }}>
                {item.unit}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index}
      />
    );
  };
  function OnChangeWeight(val) {
    if (isFromMainShipment) {
      setWeight(val);
      setWeightShipmentError('');
    } else {
      setSizebyindexShippoWeight(index, item, val);
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 15}}>
        <TextInput
          label={strings.WEIGHT}
          placeholder={strings.WEIGHT}
          labelStyle={styles.labelStyle}
          returnKeyType=""
          keyboardType="numeric"
          value={weightCurrent}
          maxLength={maxLength}
          onChangeText={val => {
            if (util.areValuesEqual(selectedUnit, 'g')) {
              if (val <= 32000) {
                OnChangeWeight(val);
                setWeightError('');
                if (util.includesValue(val, '.')) {
                  const splittedArrByDecimal = val.split('.');
                  const valueBeforeDecimalZero = splittedArrByDecimal[0];
                  let len = valueBeforeDecimalZero.length + 3;
                  setMaxlenght(len);
                } else {
                  setMaxlenght(6);
                }

                setWeightCurrent(val);
              } else {
                setWeightError(`weight should be less than 32000 Gram`);
              }
            }
            if (util.areValuesEqual(selectedUnit, 'oz')) {
              if (val <= 1128) {
                OnChangeWeight(val);
                setWeightError('');
                if (util.includesValue(val, '.')) {
                  const splittedArrByDecimal = val.split('.');
                  const valueBeforeDecimalZero = splittedArrByDecimal[0];
                  let len = valueBeforeDecimalZero.length + 3;
                  setMaxlenght(len);
                } else {
                  setMaxlenght(5);
                }
                setWeightCurrent(val);
              } else {
                setWeightError(`weight should be less than 1128 Ounce`);
              }
            }
            if (util.areValuesEqual(selectedUnit, 'lb')) {
              if (val <= 70) {
                OnChangeWeight(val);

                setMaxlenght();
                if (util.includesValue(val, '.')) {
                  const splittedArrByDecimal = val.split('.');
                  const valueBeforeDecimalZero = splittedArrByDecimal[0];
                  let len = valueBeforeDecimalZero.length + 3;
                  setMaxlenght(len);
                } else {
                  setMaxlenght(2);
                }
                setWeightCurrent(val);
              } else {
                setWeightError(`weight should be less than 70 LB`);
              }
            }
            if (util.areValuesEqual(selectedUnit, 'kg')) {
              if (val <= 32) {
                OnChangeWeight(val);
                setWeightError('');

                if (util.includesValue(val, '.')) {
                  const splittedArrByDecimal = val.split('.');
                  const valueBeforeDecimalZero = splittedArrByDecimal[0];
                  let len = valueBeforeDecimalZero.length + 3;
                  setMaxlenght(len);
                } else {
                  setMaxlenght(2);
                }
                setWeightCurrent(val);
              } else {
                setWeightError(`weight should be less than 32 KG`);
              }
            }
          }}
          error={error ? error : weightError}
        />
      </View>
      {renderWeightUnit()}
    </View>
  );
}
