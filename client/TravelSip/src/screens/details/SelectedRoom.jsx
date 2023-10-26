import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppBar,
  CalendarPicker,
  Counter,
  HeightSpacer,
  NetworkImage,
  ReusableBtn,
  ReusableSpaceText,
  ReusableText,
  WidthSpacer,
} from '../../components';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {useRoute} from '@react-navigation/native';
import reusable from '../../components/Reusable/reusable.style';
import useFetchData from '../../hooks/fetchData';
import Icon from 'react-native-vector-icons/Ionicons';
import {Modal} from 'react-native-paper';
import {httpRequest} from '../../api/services';
import {useAuth} from '../../context/AuthContext';

const SelectedRoom = ({navigation}) => {
  const route = useRoute();
  const id = route.params;
  const [facility, setFacility] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [totalNights, setTotalNights] = useState(0);
  const [person, setPerson] = useState(1);
  const {authState} = useAuth();

  // temporary

  const {output, isLoading, error, refetch} = useFetchData({
    method: 'get',
    endpoint: `api/v1/rooms/${id}/`,
  });

  useEffect(() => {
    if (output?.facilities) {
      setFacility(output.facilities[0]);
    }
  }, [output]);

  useEffect(() => {
    if (selectedEndDate && selectedStartDate) {
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
      const timeDifference = endDate - startDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      setTotalNights(daysDifference);
    } else {
      setTotalNights(0);
    }
  }, [selectedEndDate]);

  const handleSubmit = async () => {
    const dataInput = {
      user: authState.id,
      check_in: selectedStartDate,
      check_out: selectedEndDate,
      room: id,
    };

    const result = await httpRequest({
      method: 'post-auth',
      endpoint: 'api/v1/bookings/',
      dataInput: dataInput,
      accessToken: authState.accessToken,
    });
    if (result.status === 201) {
      navigation.navigate('Successful', result.data);
    }
  };

  return (
    <View>
      <AppBar
        top={10}
        left={20}
        right={20}
        title={output.name}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />
      <HeightSpacer height={60} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 10}}>
        <View style={{backgroundColor: COLORS.lightWhite, borderRadius: 16}}>
          <NetworkImage
            source={output.imageUrl}
            width={'100%'}
            height={250}
            radius={16}
          />

          <HeightSpacer height={20} />
          <View style={{marginHorizontal: 10}}>
            <ReusableText
              text={output.name}
              family="medium"
              size={SIZES.medium}
              color={COLORS.black}
            />
            <HeightSpacer height={20} />
            <View>
              <ReusableText
                text={'Facility:'}
                family="medium"
                size={SIZES.medium}
                color={COLORS.black}
              />
              <HeightSpacer height={10} />
              {facility?.wifi ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="wifi" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Free wifi'} />
                </View>
              ) : null}
              {facility?.air_conditioner ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="snow" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Air conditioner'} />
                </View>
              ) : null}
              {facility?.balcony ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="wifi" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Balcony'} />
                </View>
              ) : null}
              {facility?.window ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="wifi" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Window'} />
                </View>
              ) : null}
              {facility?.breakfast ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="restaurant-outline" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Breakfast'} />
                </View>
              ) : null}
              {facility?.view ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="partly-sunny-outline" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'View'} />
                </View>
              ) : null}
              {facility?.laundry ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="wifi" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Daily laundry'} />
                </View>
              ) : null}
              {facility?.cleaning_room ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="wifi" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Daily cleaning room'} />
                </View>
              ) : null}
              {facility?.private_bathroom ? (
                <View style={reusable.rowWithSpace('flex-start')}>
                  <Icon name="water-outline" size={TEXT.small} />
                  <WidthSpacer width={5} />
                  <ReusableText text={'Private bathroom'} />
                </View>
              ) : null}
            </View>
            <HeightSpacer height={10} />
            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.lightGrey,
                marginVertical: 15,
              }}></View>
            <ReusableText
              text={'Room Requirements'}
              family="regular"
              size={SIZES.medium}
              color={COLORS.black}
            />
            <HeightSpacer height={30} />
            <View>
              <ReusableText
                text={'Select day'}
                family="regular"
                size={SIZES.medium}
                color={COLORS.black}
              />
              <HeightSpacer height={10} />
              <View>
                <View style={reusable.rowWithSpace('space-between')}>
                  <Pressable
                    onPress={() => setOpenCalendar(!openCalendar)}
                    style={{flex: 1}}>
                    <View
                      style={[
                        reusable.rowWithSpace('space-between'),
                        style.calendarBtn,
                      ]}>
                      <ReusableText text="From: " />

                      <WidthSpacer width={10} />
                      <View style={{flex: 1}}>
                        <ReusableText text={selectedStartDate} />
                      </View>
                      <Icon
                        size={TEXT.large}
                        color={COLORS.red}
                        name="calendar-number-outline"
                      />
                    </View>
                  </Pressable>
                  <WidthSpacer width={10} />
                  <Pressable
                    onPress={() => setOpenCalendar(!openCalendar)}
                    style={{flex: 1}}>
                    <View
                      style={[
                        reusable.rowWithSpace('space-between'),
                        style.calendarBtn,
                      ]}>
                      <ReusableText text="To: " />

                      <WidthSpacer width={10} />
                      <View style={{flex: 1}}>
                        <ReusableText text={selectedEndDate} />
                      </View>
                      <Icon
                        size={TEXT.large}
                        color={COLORS.red}
                        name="calendar-number-outline"
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={style.calendarBox}>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={openCalendar}>
                    <CalendarPicker
                      selectedStartDate={selectedStartDate}
                      setSelectedStartDate={setSelectedStartDate}
                      selectedEndDate={selectedEndDate}
                      setSelectedEndDate={setSelectedEndDate}
                      setSelectedDates={setSelectedDates}
                      selectedDates={selectedDates}
                      setOpenCalendar={setOpenCalendar}
                    />
                  </Modal>
                </View>
              </View>
            </View>

            <HeightSpacer height={30} />
            <ReusableSpaceText
              textLeft={'Total night(s) selected'}
              textRight={totalNights > 0 ? totalNights : '-'}
            />
            <HeightSpacer height={15} />
            <View style={reusable.rowWithSpace('space-between')}>
              <ReusableText
                text={'Guest(s)'}
                family="regular"
                size={SIZES.medium}
                color={COLORS.black}
              />
              <Counter
                count={person}
                setCount={setPerson}
                smaller={output.person}
              />
            </View>
            <HeightSpacer height={15} />

            <ReusableSpaceText
              textLeft={'Price per night'}
              textRight={`$${output.price}`}
            />
            <HeightSpacer height={15} />
            <ReusableSpaceText
              textLeft={'Payment Method'}
              textRight={'Visa'}
              image={require('../../assets/images/visa.webp')}
            />
            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.lightGrey,
                marginVertical: 15,
              }}></View>
            <ReusableSpaceText
              textLeft={'Total'}
              textRight={totalNights ? `$${output.price * totalNights}` : '-'}
              size={TEXT.large}
            />
            <HeightSpacer height={5} />
            <ReusableText
              text={
                totalNights
                  ? `Included price for ${person} person(people) in ${totalNights} night(s) `
                  : ''
              }
              family="regular"
              size={TEXT.small}
              color={COLORS.gray}
            />
            <HeightSpacer height={30} />
            <ReusableBtn
              onPress={() => handleSubmit()}
              btnText="Select Room"
              width={SIZES.width - 40}
              backGroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
            <HeightSpacer height={10} />
          </View>
        </View>
        <HeightSpacer height={80} />
      </ScrollView>
    </View>
  );
};

export default SelectedRoom;

const style = StyleSheet.create({
  calendarBtn: {
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  calendarBox: {
    left: 0,
    right: 0,
    bottom: '150%',
    height: 300,
    position: 'absolute',
    zIndex: 1,
  },
});
