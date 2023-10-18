import {Button, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppBar,
  HeightSpacer,
  InformationTile,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {COLORS, TEXT} from '../../constants/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation, useRoute} from '@react-navigation/native';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';
import reusable from '../../components/Reusable/reusable.style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const validationSchema = Yup.object().shape({
  // bio: Yup.string().min(8, 'Password must be at least 8 characters'),
  // nickname: Yup.string().min(9, 'Username must be at least 3 characters'),
});

const Info = ({navigation}) => {
  const {authState} = useAuth();
  const route = useRoute();
  const [output, setOutput] = useState(null);
  const dataIn = route.params;
  useEffect(() => {
    if (dataIn) {
      setOutput(dataIn);
    } else {
      const getData = async () => {
        const result = await httpRequest({
          method: 'get',
          endpoint: `api/v1/user/${authState.id}`,
        });
        setOutput(result);
      };
      getData();
    }
  }, [dataIn]);
  return output ? (
    <Formik
      initialValues={{
        bio: output?.bio ?? '',
        nickname: output?.nickname ?? '',
        dob: output?.dob ?? '',
        mobile: output?.mobile ?? '',
        gender: output?.gender ?? '',
      }}
      onSubmit={async value => {
        let method = '';
        let endpoint = '';
        if (dataIn) {
          method = 'put';
          endpoint = `api/v1/user_profiles/${authState.id}/`;
        } else {
          method = 'post';
          endpoint = `api/v1/user_profiles/`;
        }
        const result = await httpRequest({
          method,
          endpoint,
          dataInput: value,
          accessToken: authState.accessToken,
        });
        if (result.status === 200) {
          if (dataIn) {
            navigation.goBack();
          } else {
            navigation.navigate('Profile');
          }
        }
      }}
      validationSchema={validationSchema}>
      {props => <Form output={output} {...props} />}
    </Formik>
  ) : null;
};

const Form = ({
  values,
  setFieldTouched,
  output,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const date_formatted = date.toISOString().split('T')[0];;
    setFieldValue('dob', date_formatted);
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <AppBar
        onPress={() => navigation.goBack()}
        top={10}
        right={20}
        left={20}
        title={'Profile Information'}
      />
      <HeightSpacer height={80} />
      <View>
        <View>
          <View style={{paddingHorizontal: 20}}>
            <ReusableText
              text={'NAME'}
              size={TEXT.medium}
              color={COLORS.black}
              family={'medium'}
            />
          </View>
          <HeightSpacer height={8} />
          <InformationTile
            field={'Username'}
            value={output?.user?.username ?? output?.username ?? ''}
          />
          <HeightSpacer height={5} />
          <InformationTile
            field={'Nickname'}
            input={true}
            valueInput={values.nickname}
            setFieldTouched={setFieldTouched}
            placeholder="Type your nickname"
            handleChange={handleChange}
            fieldname={'nickname'}
          />
        </View>
        <HeightSpacer height={8} />

        <View>
          <View style={{paddingHorizontal: 20}}>
            <ReusableText
              text={'Email Address'}
              size={TEXT.medium}
              color={COLORS.black}
              family={'medium'}
            />
          </View>
          <HeightSpacer height={8} />
          <InformationTile
            field={'Email'}
            value={output?.user?.email ?? output?.email ?? ''}
          />
        </View>
        <HeightSpacer height={8} />

        <View>
          <View style={{paddingHorizontal: 20}}>
            <ReusableText
              text={'Details'}
              size={TEXT.medium}
              color={COLORS.black}
              family={'medium'}
            />
          </View>
          <HeightSpacer height={8} />
          <InformationTile
            field={'Mobile Number'}
            input={true}
            setFieldTouched={setFieldTouched}
            valueInput={values.mobile}
            handleChange={handleChange}
            fieldname={'mobile'}
          />
          <HeightSpacer height={5} />
          <InformationTile
            field={'Bio'}
            input={true}
            setFieldTouched={setFieldTouched}
            valueInput={values.bio}
            handleChange={handleChange}
            fieldname={'bio'}
          />
          <HeightSpacer height={5} />
          <InformationTile
            field={'Gender'}
            input={true}
            setFieldTouched={setFieldTouched}
            valueInput={values.gender}
            handleChange={handleChange}
            fieldname={'gender'}
          />
          <HeightSpacer height={5} />
          <InformationTile
            field={'Date Of Birth'}
            press={() => showDatePicker()}
            value={values?.dob ?? ''}
          />
        </View>
        <HeightSpacer height={8} />
        <View
          style={[
            reusable.rowWithSpace('space-between'),
            {
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: COLORS.white,
            },
          ]}>
          <ReusableBtn
            btnText={'Cancel'}
            backGroundColor={COLORS.red}
            textColor={COLORS.white}
            flex={1}
            onPress={() => navigation.goBack()}
          />
          <WidthSpacer width={5} />
          <ReusableBtn
            btnText={'Submit'}
            backGroundColor={COLORS.green}
            textColor={COLORS.white}
            flex={1}
            onPress={handleSubmit}
          />
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
    </View>
  );
};

export default Info;
