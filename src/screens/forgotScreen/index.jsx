import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false); 

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [showToast]);

  const handleSendLink = () => {
    if (email !== 'ay@gmail.com') {
      setEmailError(true);
      setShowToast(true);
    } else {
      setEmailError(false);
      setShowToast(false);
      setIsLinkSent(true); 
    }
  };

  const closeModal = () => {
    setIsLinkSent(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      //keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>

          {showToast && (
            <View style={styles.toastContainer}>
                <Image source={require('../../assets/icons/error.png')} style={styles.toastImage} />
              <Text style={styles.toastMessage}>Email not found. Contact admin.</Text>
            </View>
          )}

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('../../assets/icons/back.png')} style={styles.backIcon} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Forgot Password</Text>
          <Text style={styles.subText}>Reset your password with just a few clicks</Text>

          <View style={[styles.inputContainer, emailError && styles.errorBorder]}>
            <Image source={require('../../assets/icons/mail.png')} style={styles.icon} />
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {/* {emailError && (
            <Text style={styles.errorMessage}>Invalid email address entered.</Text>
          )} */}

          <TouchableOpacity style={styles.sendLinkButton} onPress={handleSendLink}>
            <Text style={styles.sendLinkText}>Send Link</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


      <Modal visible={isLinkSent} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../../assets/icons/link-sent.png')} style={styles.linkIcon} />
            <Text style={styles.modalTitle}>Link Sent!</Text>
            <Text style={styles.modalMessage}>
              The link to reset your password has been sent to your email address.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => { 
                closeModal();
                navigation.navigate('ResetPasswordScreen');
                }} >
              <Text style={styles.modalButtonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};



export default ForgotPasswordScreen;
