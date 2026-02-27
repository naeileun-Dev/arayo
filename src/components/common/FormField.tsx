import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../styles/colors';

interface FormFieldProps {
  label: string;
  required?: boolean;
  rightComponent?: React.ReactNode;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  rightComponent,
  children,
  style,
}) => {
  const hasRight = !!rightComponent;

  return (
    <View style={[styles.container, style]}>
      <View style={hasRight ? styles.headerRow : undefined}>
        <Text style={[styles.label, hasRight && styles.labelNoMargin]}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        {rightComponent}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },
  labelNoMargin: {
    marginBottom: 0,
  },
  required: {
    color: colors.redDark,
  },
});

export default FormField;
