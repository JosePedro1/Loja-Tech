import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ title }) {
  const insets = useSafeAreaInsets();
  const [online, setOnline] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setOnline(state.isConnected);

      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
      }).start();
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>

        <Animated.View
          style={[
            styles.statusBadge,
            {
              opacity: fadeAnim,
              backgroundColor: online ? '#002B1B' : '#2B0000',
              borderColor: online ? '#00FF7F' : '#FF4444'
            }
          ]}
        >
          <View
            style={[
              styles.dot,
              { backgroundColor: online ? '#00FF7F' : '#FF4444' }
            ]}
          />
          <Text
            style={[
              styles.statusText,
              { color: online ? '#00FF7F' : '#FF4444' }
            ]}
          >
            {online ? 'ONLINE' : 'OFFLINE'}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingBottom: 12
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8A2BE2'
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },

  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5
  }
});
