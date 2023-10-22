import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AppBar, HeightSpacer, ImageFieldTile} from '../../components';
import reusable from '../../components/Reusable/reusable.style';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchemas = Yup.object().shape({
  title: Yup.string().required('reqRequireduired'),
  description: Yup.string().required('Required'),
  contact: Yup.string().max(12, 'Less than 12 characters').required('Required'),
  imageUrl: Yup.mixed().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
});

const CreateHotel = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <View>
      <AppBar
        title={'Create Hotel'}
        top={10}
        left={20}
        right={20}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <Formik
        initialValues={{
          title: '',
          description: '',
          contact: '',
          imageUrl: selectedImage,
          address: '',
          city: '',
        }}
        onSubmit={async values => {
          console.log(values);
        }}
        validationSchema={validationSchemas}>
        {props => <Form {...props} />}
      </Formik>
    </View>
  );
};

const Form = ({
  values,
  setFieldTouched,
  output,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  return <View></View>;
};

export default CreateHotel;

const styles = StyleSheet.create({});
