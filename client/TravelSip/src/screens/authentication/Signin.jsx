import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './signin.style';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS, SIZES} from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';

import {HeightSpacer, ReusableBtn, WidthSpacer} from '../../components';
import {httpRequest} from '../../api/services';
import {setSecureValue} from '../../api/secureValue';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  username: Yup.string().required('Required'),
});

const Signin = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={async value => {
          const result = await httpRequest({
            method: 'post',
            endpoint: 'login/',
            dataInput: value,
            navigation: navigation,
            setIsLoading: setLoader,
          });
          if (result?.data) {
            setSecureValue('access_token', result.data.access);
            setSecureValue('refresh_token', result.data.refresh);
          }
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
            <View style={styles.wrapper}>
              <Text style={styles.label}>Username</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.username ? COLORS.lightBlue : COLORS.lightGrey,
                  )}>
                  <Icon name={'email'} size={20} color={COLORS.gray} />
                  <WidthSpacer width={10} />
                  <TextInput
                    placeholder="Enter username"
                    onFocus={() => setFieldTouched('username')}
                    onBlur={() => setFieldTouched('username', '')}
                    value={values.username}
                    autoCapitalize="none"
                    onChangeText={handleChange('username')}
                    autoCorrect={false}
                    style={{flex: 1}}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={styles.errorMessage}>{errors.username}</Text>
                )}
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.password ? COLORS.lightBlue : COLORS.lightGrey,
                  )}>
                  <Icon name={'key'} size={20} color={COLORS.gray} />
                  <WidthSpacer width={10} />
                  <TextInput
                    secureTextEntry={obsecureText}
                    placeholder="Enter password"
                    onFocus={() => setFieldTouched('password')}
                    onBlur={() => setFieldTouched('password', '')}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex: 1}}
                  />
                  <TouchableOpacity
                    onPress={() => setObsecureText(!obsecureText)}>
                    <Icon1
                      size={20}
                      name={!obsecureText ? 'eye-off-outline' : 'eye-outline'}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>
            </View>
            <HeightSpacer height={20} />
            <ReusableBtn
              onPress={handleSubmit}
              btnText={'SIGN IN'}
              width={SIZES.width - 40}
              backGroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Signin;
