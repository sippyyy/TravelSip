import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import useFetchData from '../../hooks/fetchData';
import {
  AppBar,
  HeightSpacer,
  InformationTile,
  ReusableBtn,
  WidthSpacer,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS} from '../../constants/theme';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';

const EditHotelInfo = ({navigation, route}) => {
  const id = route.params;
  const {authState} = useAuth();
  const {output, setLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/hotels/${id}/`,
  });
  return output?.title ? (
    <Formik
      initialValues={{
        title: output?.title ?? '',
        description: output?.description ?? '',
        contact: output?.contact ?? '',
        address: output?.location ?? '',
      }}
      onSubmit={async values => {
        const result = await httpRequest({
          method: 'put',
          endpoint: `api/v1/hotels/${id}/`,
          accessToken: authState.accessToken,
          dataInput: values,
        });
        if (result.status === 200) {
          navigation.goBack();
        }
      }}>
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
          <AppBar
            title={'Edit Hotel Information'}
            top={10}
            left={20}
            right={20}
            onPress={() => navigation.goBack()}
          />
          <HeightSpacer height={60} />
          <InformationTile
            field={'Accommodation Name'}
            input={true}
            placeholder="Your accommodation name"
            valueInput={values.title}
            fieldname={'title'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            error={errors.title}
          />
          <HeightSpacer height={8} />
          <InformationTile
            field={'Description'}
            input={true}
            placeholder="Your description"
            valueInput={values.description}
            fieldname={'description'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            error={errors.description}
          />
          <HeightSpacer height={8} />
          <InformationTile
            field={'Accommodation Contact'}
            input={true}
            placeholder="Your contact number"
            valueInput={values.contact}
            fieldname={'contact'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            error={errors.contact}
          />
          <HeightSpacer height={8} />
          <InformationTile
            field={'Accommodation Location'}
            input={true}
            placeholder="Accommodation's address"
            valueInput={values.address}
            fieldname={'address'}
            handleChange={handleChange}
            setFieldTouched={setFieldTouched}
            error={errors.address}
          />
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
        </View>
      )}
    </Formik>
  ) : null;
};

export default EditHotelInfo;

const styles = StyleSheet.create({});
