import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SearchUser, setUsername } from '../redux/features/LoginSlice';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const {userName,isLoading}=useSelector((state:RootState)=>state.login)
  // const userName = useSelector((state: RootState) => state.login.userName);

  const [error, setError] = useState('');

  const handleInputChange = (text: string) => {
    const regex = /^[A-Za-z\s]*$/; // Allows only letters and spaces
    if (regex.test(text)) {
      dispatch(setUsername(text));
      setError('');
    } else {
      setError('Only letters are allowed.');
    }
  };

  const handleLogin = async () => {
    if (!userName.trim()) {
      setError('Username cannot be empty.');
      return;
    }

    if (error) {
      return; // Prevent submission if there's an error
    }

    // Proceed with login logic
    await dispatch(SearchUser());
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '900' }}>Login</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TextInput
          value={userName}
          onChangeText={handleInputChange}
          placeholder="Enter your username"
          style={styles.input}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity onPress={handleLogin} style={styles.touchable}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 10,
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  touchable: {
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
