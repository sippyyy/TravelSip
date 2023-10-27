import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import useFetchData from '../../hooks/fetchData';
import {
  AppBar,
  HeightSpacer,
  ImageFieldTile,
  InformationTile,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {COLORS, TEXT} from '../../constants/theme';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';

const EditPlaceInfo = ({navigation, route}) => {
  const {id, screen} = route.params;
  const {authState, verifyAuthentication} = useAuth();
  const {output, setLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/${screen}s/${id}/`,
  });
  const [selectedImage, setSelectedImage] = useState(output.imageUrl);
  const handleChooseImage = async () => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    const data = result.assets[0];
    const image = {
      uri: data?.uri,
      type: data?.type,
      name: data?.fileName,
    };
    setSelectedImage(image);
  };
  return output?.title ? (
    <Formik
      initialValues={{
        title: output?.title ?? '',
        description: output?.description ?? '',
        contact: output?.contact ?? '',
        address: output?.location ?? '',
        imageUrl: output?.imageUrl ?? '',
      }}
      onSubmit={async values => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('contact', values.contact);
        formData.append('address', values.address);
        if (selectedImage) {
          formData.append('imageUrl', selectedImage);
        }

        const result = await httpRequest({
          method: 'put',
          endpoint: `api/v1/${screen}s/${id}/`,
          accessToken: authState.accessToken,
          dataInput: formData,
          formData: true,
        });
        const {status, data} = result;
        if (status === 200) {
          navigation.goBack();
        } else if (status === 403) {
          verifyAuthentication();
          console.log('Please try again');
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
            title={`Edit ${screen} information`}
            top={10}
            left={20}
            right={20}
            onPress={() => navigation.goBack()}
          />
          <HeightSpacer height={60} />
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
              onPress={() => handleChooseImage()}
              source={selectedImage?.uri ?? output.imageUrl}
            />
            <WidthSpacer width={10} />
            <TextInput
              style={styles.input}
              placeholder={`Your ${screen} name`}
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={() => setFieldTouched('title', '')}
            />
          </View>
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
            field={`Your ${screen} contact`}
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
            field={`Your ${screen} location`}
            input={true}
            placeholder={`Your ${screen} address`}
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

export default EditPlaceInfo;

const styles = StyleSheet.create({
  input: {
    fontSize: TEXT.medium,
    fontFamily: 'medium',
    borderBottomWidth: 3,
    flex: 1,
    borderBottomColor: COLORS.red,
    paddingVertical: 5,
  },
});
