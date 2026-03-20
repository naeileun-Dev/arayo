import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fontFamily } from '../../styles/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POPUP_WIDTH = SCREEN_WIDTH - 40;

interface MainPopupModalProps {
  visible: boolean;
  onClose: () => void;
  onDismissToday: () => void;
}

export const MainPopupModal: React.FC<MainPopupModalProps> = ({
  visible,
  onClose,
  onDismissToday,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <Image
                source={require('../../assets/images/main_popup_image.png')}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.dismissButton}
                  onPress={onDismissToday}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dismissText}>오늘 그만보기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.closeText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: POPUP_WIDTH,
    borderRadius: 0,
    overflow: 'hidden',
  },
  image: {
    width: POPUP_WIDTH,
    height: POPUP_WIDTH,
  },
  buttonRow: {
    flexDirection: 'row',
    height: 52,
  },
  dismissButton: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  closeButton: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: colors.white,
  },
});
