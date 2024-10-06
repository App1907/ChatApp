import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundImage from '../../components/backgroundImage';
import CustomInput from '../../components/customInput';
import styles from './styles';

const SignInScreen = () => {
  const navigation = useNavigation();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isAccountLocked, setIsAccountLocked] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [showToast]);

  const handleSignIn = async () => {
    // try {
    //   await AsyncStorage.setItem('isLogin', 'true');
    //   navigation.replace('BottomStack');
    // } catch (error) {
    //   console.error(error);
    // }
    let isValid = true;
    setEmailError(false);
    setPasswordError(false);


    if (!email.includes('@') || email.length < 5) {
      setEmailError(true);
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError(true);
      isValid = false;
    }


    if (isValid) {
      if (password === '123456') {
        try {
          await AsyncStorage.setItem('isLogin', 'true');
          navigation.replace('BottomStack');

        alert('Signed in successfully!');
        setShowToast(false);
        setFailedAttempts(0); 
      } catch (error) {
        console.error('Error saving login state:', error);
      }
     } else {

        setFailedAttempts(failedAttempts + 1);
        if (failedAttempts + 1 >= 3) {
          setIsAccountLocked(true); 
        } else {
          setShowToast(true); 
        }
      }
    }
  };


  const closeModal = () => {
    setIsAccountLocked(false);
    setFailedAttempts(0); 
  };

  return (
    <View style={styles.containerTop}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={240}
    >
        <BackgroundImage>
          {showToast && (
            <View style={styles.toastContainer}>
              <Image source={require('../../assets/icons/error.png')} style={styles.toastImage} />
              <Text style={styles.toastMessage}>Invalid credentials. Please try again</Text>
            </View>
          )}
          <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.signInText}>Sign in</Text>
            <Text style={styles.subText}>with your valid credentials</Text>

            <CustomInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              iconSource={require('../../assets/icons/mail.png')}
              error={emailError}
              keyboardType="email-address"
            />
            {emailError && (
              <View style={styles.errorContainer}>
              <Image source={require('../../assets/icons/error.png')} style={styles.errorImage} />
              <Text style={styles.errorMessage}>Invalid email address entered.</Text>
              </View>
            )}

            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              iconSource={require('../../assets/icons/lock.png')}
              error={passwordError}
              secureTextEntry={!passwordVisible}
            />

            
            {passwordError && (
              <View style={styles.errorContainer}>
              <Image source={require('../../assets/icons/error.png')} style={styles.errorImage} />
              <Text style={styles.errorMessage}>Password must be at least 6 characters long.</Text>
              </View>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={() => {
              handleSignIn();
              //navigation.navigate('HomeScreen');
              }}>

              <Text style={styles.signInButtonText}>Primary</Text>
            </TouchableOpacity>
          </View>
        </View>
        </BackgroundImage>


      <Modal visible={isAccountLocked} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../../assets/icons/lock1.png')} style={styles.lockIcon} />
            <Text style={styles.modalTitle}>Account Locked</Text>
            <Text style={styles.modalMessage}>
              Your account has been locked due to too many failed attempts. Please try again after some time.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
    </View>
  );
};


export default SignInScreen;




{/* <TextInput/>
<Animated.Text style = {transform}></Animated.Text> */}



{/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

</ScrollView> */}