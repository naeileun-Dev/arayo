import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { typography } from '../../../styles/typography';
import { spacing } from '../../../styles/spacing';

interface NotificationItemProps {
  id: string;
  subject: string;
  message: string;
  date: string;
  isChecked: boolean;
  onToggleCheck: (id: string) => void;
}

const CheckIcon = ({ color, size = 14 }: { color: string; size?: number }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.6,
        height: size * 0.35,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '-45deg' }, { translateY: -1 }],
      }}
    />
  </View>
);

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  subject,
  message,
  date,
  isChecked,
  onToggleCheck,
}) => (
  <View style={styles.item}>
    <TouchableOpacity
      style={[styles.checkboxWrap, isChecked && styles.checkboxWrapChecked]}
      onPress={() => onToggleCheck(id)}
      activeOpacity={0.8}
    >
      {isChecked && <CheckIcon color={colors.white} />}
    </TouchableOpacity>

    <View style={styles.thumb}>
      <Image source={require('../../../assets/images/profileImg.png')} style={styles.thumbImage} />
    </View>

    <View style={styles.con}>
      <Text style={styles.subject}>{subject}</Text>
      <Text style={styles.msg} numberOfLines={1} ellipsizeMode="tail">
        {message}
      </Text>
    </View>

    <View style={styles.dateWrap}>
      <Text style={styles.date}>{date}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  checkboxWrap: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: colors.white,
  },
  checkboxWrapChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  thumb: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  con: {
    flex: 1,
    justifyContent: 'center',
  },
  subject: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.black,
    marginBottom: 6,
  },
  msg: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  dateWrap: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  date: {
    fontSize: 11,
    color: colors.textTertiary,
  },
});

export default NotificationItem;
