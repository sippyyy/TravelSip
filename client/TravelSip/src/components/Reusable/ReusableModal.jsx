import {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';

const ReusableModal = ({children}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}>
          <TouchableOpacity style={styles.modal} activeOpacity={1}>
            {children}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 155,
    height: 300,
  },
});

export default ReusableModal;
