import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { SERVICE_ITEMS } from '../../product/constants';
import { ServiceTag } from '../../../components/common';

interface ServiceItem {
  key: string;
  label: string;
  isActive: boolean;
}

interface Props {
  services: ServiceItem[];
}

export const QuoteServiceGrid: React.FC<Props> = ({ services }) => {
  // services의 label→isActive 매핑 생성
  const activeMap = new Map<string, boolean>();
  services.forEach((s) => activeMap.set(s.label, s.isActive));

  return (
    <View style={styles.wrap}>
      <View style={styles.titleRow}>
        <Text style={styles.titleText}>서비스</Text>
      </View>
      <View style={styles.grid}>
        {SERVICE_ITEMS.map((col, colIdx) => (
          <View key={colIdx} style={styles.col}>
            {col.map((srv, idx) => (
              <ServiceTag
                key={idx}
                name={srv.name}
                on={activeMap.get(srv.name) ?? srv.on}
                Icon={srv.Icon}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { marginTop: 20 },
  titleRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.G200,
    paddingBottom: 5,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.G600,
  },
  grid: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
});

