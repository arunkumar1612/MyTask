import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2017/11/09/08/43/business-tasks-2932687_960_720.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to MyApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default SplashScreen;
