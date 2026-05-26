import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LayoutDashboard, FileText, FolderClosed, Bell } from 'lucide-react-native';
import Header from './Header';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const icons = {
    Dashboard: LayoutDashboard,
    Editais: FileText,
    Documentos: FolderClosed,
    Alertas: Bell,
  };

  const labels = {
    Dashboard: 'Dashboard',
    Editais: 'Editais',
    Documentos: 'Documentos',
    Alertas: 'Alertas',
  };

  return (
    <View style={styles.topNavContainer}>
      <Header />
      <View style={styles.tabBarWrapper}>
        <View style={styles.tabBarPill}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const label = labels[route.name] || route.name;
            const IconComponent = icons[route.name] || FileText;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.tabButton,
                  isFocused ? styles.tabButtonActive : null
                ]}
              >
                <View style={styles.tabContent}>
                  <IconComponent 
                    size={15} 
                    color={isFocused ? '#1e293b' : '#64748b'} 
                  />
                  <Text style={[
                    styles.tabLabel,
                    isFocused ? styles.tabLabelActive : null
                  ]}>
                    {label}
                  </Text>
                  
                  {route.name === 'Alertas' && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>3</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topNavContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tabBarWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  tabBarPill: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 30,
    padding: 3,
    width: '100%',
    maxWidth: 500,
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 6,
  },
  tabLabelActive: {
    color: '#1e293b',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: '#ef4444',
    borderRadius: 9,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
