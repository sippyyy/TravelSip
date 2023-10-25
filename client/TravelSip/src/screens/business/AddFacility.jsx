import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppBar,
  HeightSpacer,
  ReusableBtn,
  ReusableCheckbox,
  ReusableText,
  WidthSpacer,
} from '../../components';
import CheckBox from '@react-native-community/checkbox';
import {COLORS, TEXT} from '../../constants/theme';
import {useRoute} from '@react-navigation/native';
import reusable from '../../components/Reusable/reusable.style';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';
const AddFacility = ({navigation}) => {
  const route = useRoute();
  const {roomId, faciId, hotelId} = route.params;
  const {authState} = useAuth();
  const [values, setValues] = useState({
    air_conditioner: false,
    wifi: false,
    balcony: false,
    window: false,
    private_bathroom: false,
    breakfast: false,
    view: false,
    laundry: false,
    cleaning_room: false,
  });

  useEffect(() => {
    if (faciId) {
      const getFacility = async () => {
        const result = await httpRequest({
          method: 'get-none-auth',
          endpoint: `api/v1/facilities/${faciId}/`,
        });
        if (result.status === 200) {
          setValues(result.data);
        }
      };
      getFacility();
    }
  }, [faciId]);

  const handleSubmit = async () => {
    let method;
    let endpoint;
    if (faciId) {
      method = 'put';
      endpoint = faciId + '/';
    } else {
      method = 'post-auth';
      endpoint = '';
    }
    const data = values;
    data.room = roomId;
    const result = await httpRequest({
      method: method,
      endpoint: `api/v1/facilities/${endpoint}`,
      accessToken: authState.accessToken,
      dataInput: values,
    });
    if (result.status === 200 || result.status === 201) {
      navigation.navigate('EditHotel', hotelId);
    }
  };

  return (
    <View>
      <AppBar
        title={'Add Facilily'}
        left={20}
        right={20}
        top={10}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <View style={{padding: 20}}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: COLORS.white,
            borderRadius: 10,
          }}>
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Air Conditioner"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'air_conditioner'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Wifi"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'wifi'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Balcony"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'balcony'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Window"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'window'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Private Bathroom"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'private_bathroom'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Breakfast"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'breakfast'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="View"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'view'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Laundry"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'laundry'}
          />
          <HeightSpacer height={8} />
          <ReusableCheckbox
            space={'space-between'}
            size={TEXT.small}
            text="Daily Cleaning Room"
            family={'regular'}
            values={values}
            setValues={setValues}
            boxColor={COLORS.green}
            name={'cleaning_room'}
          />
          <HeightSpacer height={8} />

          <HeightSpacer height={20} />
          <View style={reusable.rowWithSpace('flex-end')}>
            <Pressable
              onPress={() => navigation.navigate('EditHotel', {id: hotelId})}>
              <ReusableText
                text={'Maybe later'}
                color={COLORS.green}
                size={TEXT.small}
              />
            </Pressable>
            <WidthSpacer width={10} />
            <ReusableBtn
              onPress={() => handleSubmit()}
              width={100}
              btnText={'Submit'}
              backGroundColor={COLORS.green}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddFacility;

const styles = StyleSheet.create({});
