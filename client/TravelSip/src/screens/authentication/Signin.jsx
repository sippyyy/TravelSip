import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './signin.style';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS, SIZES} from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';

import {HeightSpacer, ReusableBtn, WidthSpacer} from '../../components';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  email: Yup.string().email('Provide a valid email').required('Required'),
});

const Signin = () => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
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
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View>
                <View
                  style={styles.inputWrapper(
                    touched.email ? COLORS.lightBlue : COLORS.lightGrey,
                  )}>
                  <Icon name={'email'} size={20} color={COLORS.gray} />
                  <WidthSpacer width={10} />
                  <TextInput
                    placeholder="Enter email"
                    onFocus={() => setFieldTouched('email')}
                    onBlur={() => setFieldTouched('email', '')}
                    value={values.email}
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    autoCorrect={false}
                    style={{flex: 1}}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
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
