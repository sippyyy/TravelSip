import {Button, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppBar,
  HeightSpacer,
  ImageFieldTile,
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
import {launchImageLibrary} from 'react-native-image-picker';

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
        imageUrl: output?.imageUrl ?? '',
        backgroundUrl: output?.backgroundUrl ?? '',
      }}
      onSubmit={async values => {
        let method = '';
        let endpoint = '';
        if (dataIn) {
          method = 'put';
          endpoint = `api/v1/user_profiles/${authState.id}/`;
        } else {
          method = 'post';
          endpoint = `api/v1/user_profiles/`;
        }

        const formData = new FormData();
        formData.append('bio', values.bio);
        formData.append('nickname', values.nickname);
        formData.append('dob', values.dob);
        formData.append('mobile', values.mobile);
        formData.append('gender', values.gender);
        if (values.imageUrl?.uri) {
          formData.append('imageUrl', values.imageUrl);
        }
        if (values.backgroundUrl?.uri) {
          formData.append('backgroundUrl', values.backgroundUrl);
        }
        const result = await httpRequest({
          method,
          endpoint,
          dataInput: formData,
          accessToken: authState.accessToken,
          formData: true,
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
  errors,
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
    const date_formatted = date.toISOString().split('T')[0];
    setFieldValue('dob', date_formatted);
    setDatePickerVisibility(false);
  };

  const handleChooseImage = async type => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    if (!result.didCancel) {
      const data = result.assets[0];
      const image = {
        uri: data?.uri,
        type: data?.type,
        name: data?.fileName,
      };
      if (type === 'bg') {
        setFieldValue('backgroundUrl', image);
      } else if (type === 'img') {
        setFieldValue('imageUrl', image);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <AppBar
        onPress={() => navigation.goBack()}
        top={10}
        right={20}
        left={20}
        title={'Profile Information'}
      />
      <HeightSpacer height={80} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{paddingHorizontal: 20}}>
            <ReusableText
              text={'NAME & IMAGES'}
              size={TEXT.medium}
              color={COLORS.black}
              family={'medium'}
            />
          </View>
          <HeightSpacer height={8} />
          <View style={{marginHorizontal: 20}}>
            <ImageFieldTile
              source={values?.backgroundUrl?.uri ?? values?.backgroundUrl ?? ''}
              onPress={() => handleChooseImage('bg')}
              width={'100%'}
              height={140}
              radius={10}
            />
          </View>
          <HeightSpacer height={8} />

          <View
            style={[
              reusable.rowWithSpace('flex-start'),
              {
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: COLORS.white,
              },
            ]}>
            <ImageFieldTile
              onPress={() => handleChooseImage('img')}
              source={values?.imageUrl?.uri ?? values?.imageUrl ?? ''}
            />
            <WidthSpacer width={10} />
            <View style={styles.input}>
              <ReusableText
                text={output?.user?.username ?? output?.username ?? ''}
                size={TEXT.medium}
                color={COLORS.black}
              />
            </View>
          </View>
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
      </ScrollView>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  input: {
    fontSize: TEXT.medium,
    fontFamily: 'medium',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.red,
    paddingVertical: 5,
    flex: 1,
  },
});
