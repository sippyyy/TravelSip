import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppBar,
  HeightSpacer,
  InformationTile,
  ReusableText,
} from '../../components';
import {COLORS, TEXT} from '../../constants/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useFetchData from '../../hooks/fetchData';
import {useRoute} from '@react-navigation/native';
import {exampleUsage, getSecureValue} from '../../api/secureValue';
import {httpRequest} from '../../api/services';
import jwt_decode from 'jwt-decode';
import {useAuth} from '../../context/AuthContext';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Required'),
  email: Yup.string().email('Provide a valid email').required('Required'),
});

const Info = ({navigation}) => {
  const {authState} = useAuth();
  const {output, isLoading, error, reFetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/user_profiles/${authState.id}/`,
  });

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
      {output ? (
        <Formik
          initialValues={{
            bio: output?.bio ?? '',
            nickname: output?.nickname ?? '',
            dob: output?.dob ?? '',
            mobile: output?.mobile ?? '',
            gender: output?.gender ?? '',
          }}
          onSubmit={value => {
            console.log(value);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
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
                  value={output?.user?.username ?? ''}
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
                <InformationTile field={'Email'} value={output?.user?.email} />
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
                  input={true}
                  setFieldTouched={setFieldTouched}
                  valueInput={values.dob}
                  handleChange={handleChange}
                  fieldname={'dob'}
                />
              </View>
            </View>
          )}
        </Formik>
      ) : null}
    </View>
  );
};

export default Info;
