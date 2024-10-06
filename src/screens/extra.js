import {
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Images from '../../assets';
import React, { Component } from 'react';
import GetStartedModal from '../../components/customModal/getStartedModal';

const windowWidth = Dimensions.get('screen').width;

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      benefits: [{ id: '1', title: 'Create\nCompaign', img: Images.f1 },
      { id: '2', title: 'One Time\nTrigger', img: Images.f2 },
      { id: '3', title: 'Create\nCompaign', img: Images.f1 },
      { id: '4', title: 'One Time\nTrigger', img: Images.f2 }],

      data: [{ id: 1, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 2, img: Images.flatlistIcon, title1: 'Created a campaign Holiday Special', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 3, img: Images.flatlistIcon, title1: 'You ended the campaign Holiday Special', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 4, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 5, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 6, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 7, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 8, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 9, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      { id: 10, img: Images.flatlistIcon, title1: 'Successfully configured POS for sites', title2: 'Jun 3, 2023 | 12:30 PM' },
      ]
    };
  }

  callModal = () => {
    this.setState({ showModal: true })
  }

  getStarted = () => {
    const { navigation } = this.props;
    this.setState({ showModal: false });
    setTimeout(() => {
      navigation.navigate('AddPhone');
    }, 800);
    console.log('getStarted');
  };

  renderItem = ({ item }) => (
    <View style={styles.unload}>
      <View style={styles.imgView}>
        <Image source={item.img} />
      </View>
      <Text style={styles.frequentText}>{item.title}</Text>
    </View>
  );

  renderItemVertical = ({ item }) => (
    <View style={styles.unloadVertical}>
      <View style={styles.imgViewVertical}>
        <Image source={item.img} />
      </View>
      <View>
        <Text style={styles.frequentTextV1}>{item.title1}</Text>
        <Text style={styles.frequentTextV2}>{item.title2}</Text>
      </View>
    </View>
  );

  handleRebuild = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'SplashScreen' }],
    });
  };

  handleLogout = () => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'SigninScreen' }],
    });
  };

  seperate = () => {
    return (
      <View style={{
        borderBottomWidth: 1,
        marginHorizontal: 16,
        borderColor: 'lightgrey'
      }} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <GetStartedModal
          visible={this.state.showModal}
          onPress={this.getStarted}
          heading={'Secure your Account ?'}
          description={
            'Setup two-factor authentication to secure your account in just two steps.'
          }
          img={Images.img_modal}
        />
        <View style={styles.upper}>

          <View style={styles.topTextCont}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.Kevin}>Kevin</Text>
          </View>

          <View style={styles.topImagecont}>
            <View style={[styles.topimgbox]}>
              <TouchableOpacity onPress={this.callModal}>
                <Image source={Images.chat} />
              </TouchableOpacity>
            </View>
            <View style={[styles.topimgbox]}>
              <Image source={Images.bell} />
            </View>
          </View>

        </View>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>


          <View style={styles.setupCont}>
            <View style={styles.setupimgBox}>
              <Image source={Images.setupImg} />
            </View>
            <View>
              <Text style={styles.head}>Complete your account setup</Text>
              <Text style={styles.descr}>Tap to continue</Text>
            </View>

          </View>

          <Text style={styles.frequently}>FREQUENTLY USED</Text>
          <View style={styles.flatCont}>
            <FlatList
              bounces={false}
              horizontal
              data={this.state.benefits}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.recent}>
            <Text style={styles.recent1}>RECENT ACTIVITIES</Text>
            <TouchableOpacity><Text style={styles.recent2}>All Product ▼</Text></TouchableOpacity>
          </View>
          <View style={styles.secondBoxCont}>
            <FlatList
              bounces={false}
              data={this.state.data}
              renderItem={this.renderItemVertical}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.seperate}
            />
          </View>
        </ScrollView>

        <View style={styles.navBottom}>
          <TouchableOpacity>
            <Image source={Images.lock} style={styles.bottomIcon} />
            <Text style={styles.navText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleRebuild}>
            <Image source={Images.lock} style={styles.bottomIcon} />
            <Text style={styles.navText}>Rebuild</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleLogout}>
            <Image source={Images.lock} style={styles.bottomIcon} />
            <Text style={styles.navText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.lock} style={styles.bottomIcon} />
            <Text style={styles.navText}>ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7edf3'
  },
  upper: {
    backgroundColor: '#2A7BBB',
    height: windowWidth > 400 ? 123 : 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  sub: {
    flexDirection: 'row',
  },
  topTextCont: {
    marginLeft: 24,
    marginBottom: 15,
  },
  welcome: {
    color: 'white',
    fontSize: 18,
    fontFamily:'Montserrat-Bold'
  },
  Kevin: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  topImagecont: {
    flexDirection: 'row',
    marginRight: 12,
  },
  topimgbox: {
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
    height: windowWidth > 400 ? 45 : 40,
    width: windowWidth > 400 ? 45 : 40,
    borderRadius: 8,
    marginLeft: 8,
    marginBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setupCont: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#d9e2ee',
    padding: 20,
  },
  head: {
    fontWeight: '700',
    fontSize: 15,
    color: '#164061',
  },
  descr: {
    fontWeight: '500',
    fontSize: 13,
    color: '#60707D'
  },
  setupimgBox: {
    marginRight: 16,
  },
  frequently: {
    marginLeft: 16,
    marginTop: 32,
    color: '#525454',
    fontSize: 12,
    fontWeight: '600',
  },
  flatCont: {
    marginVertical: 16,
  },


  imgView: {
    backgroundColor: '#46A4BA',
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  imgViewVertical: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  recent1: {
    color: '#525454',
    fontWeight: '600',
    fontSize: 12,
  },
  recent2: {
    color: '#23679D',
    fontSize: 13,
    fontWeight: '600',
  },
  frequentTextV1: {
    color: '#0E1F2C',
    fontWeight: '600',
  },
  frequentTextV2: {
    color: '#85929C',
    fontSize: 12,
    fontWeight: '500',
  },


  unload: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 16,
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    padding: 12,
    paddingRight: 16,
    alignItems: 'center',
  },
  unloadVertical: {
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    padding: 18,
  },
  secondBoxCont: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F9F9'
  },




  navBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  navText: {
    fontWeight: '500',
    color: '#8A91A5',
    marginBottom: 12,
  },
  bottomIcon: {
    height: 22,
    width: 22,
    alignSelf: 'center',
    marginBottom: 10,
  },

});

export default HomeScreen;









// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import BackgroundImage from '../components/backgroundImage';

// const SignInScreen = () => {
//   const navigation = useNavigation();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [failedAttempts, setFailedAttempts] = useState(0);
//   const [isAccountLocked, setIsAccountLocked] = useState(false);

//   useEffect(() => {
//     if (showToast) {
//       const timer = setTimeout(() => {
//         setShowToast(false);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showToast]);

//   const handleSignIn = () => {
//     let isValid = true;

//     setEmailError(false);
//     setPasswordError(false);

//     if (!email.includes('@') || email.length < 5) {
//       setEmailError(true);
//       isValid = false;
//     }

//     if (password.length < 6) {
//       setPasswordError(true);
//       isValid = false;
//     }

//     if (isValid) {
//       if (password === '123456') {
//         navigation.navigate('HomeScreen');
//         alert('Signed in successfully!');
//         setShowToast(false);
//         setFailedAttempts(0);
//       } else {
//         setFailedAttempts(failedAttempts + 1);
//         if (failedAttempts + 1 >= 3) {
//           setIsAccountLocked(true);
//         } else {
//           setShowToast(true);
//         }
//       }
//     }
//   };

//   const closeModal = () => {
//     setIsAccountLocked(false);
//     setFailedAttempts(0);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <BackgroundImage>

//           {showToast && (
//             <View style={styles.toastContainer}>
//               <Image source={require('../assets/icons/error.png')} style={styles.toastImage} />
//               <Text style={styles.toastMessage}>Invalid credentials. Please try again</Text>
//             </View>
//           )}
//           <View style={styles.container}>
//             <View style={styles.formContainer}>
//               <Text style={styles.signInText}>Sign in</Text>
//               <Text style={styles.subText}>with your valid credentials</Text>

//               {/* Email Input with Floating Label */}
//               <View style={styles.inputWrapper}>
//                 <Text style={[
//                   styles.label, 
//                   (emailFocused || email) && styles.labelFocused
//                 ]}>
//                   Email Address
//                 </Text>
//                 <TextInput
//                   style={styles.input}
//                   value={email}
//                   onChangeText={setEmail}
//                   onFocus={() => setEmailFocused(true)}
//                   onBlur={() => setEmailFocused(false)}
//                   keyboardType="email-address"
//                 />
//               </View>
//               {emailError && (
//                 <View style={styles.errorContainer}>
//                   <Image source={require('../assets/icons/error.png')} style={styles.errorImage} />
//                   <Text style={styles.errorMessage}>Invalid email address entered.</Text>
//                 </View>
//               )}

//               {/* Password Input with Floating Label */}
//               <View style={styles.inputWrapper}>
//                 <Text style={[
//                   styles.label,
//                   (passwordFocused || password) && styles.labelFocused
//                 ]}>
//                   Password
//                 </Text>
//                 <View style={styles.passwordContainer}>
//                   <TextInput
//                     style={styles.input}
//                     value={password}
//                     onChangeText={setPassword}
//                     onFocus={() => setPasswordFocused(true)}
//                     onBlur={() => setPasswordFocused(false)}
//                     secureTextEntry={!passwordVisible}
//                   />
//                   <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
//                     <Image source={require('../assets/icons/eye.png')} style={styles.icon} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               {passwordError && (
//                 <View style={styles.errorContainer}>
//                   <Image source={require('../assets/icons/error.png')} style={styles.errorImage} />
//                   <Text style={styles.errorMessage}>Password must be at least 6 characters long.</Text>
//                 </View>
//               )}

//               <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.forgotPassword}>
//                 <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
//                 <Text style={styles.signInButtonText}>Primary</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </BackgroundImage>
//       </ScrollView>

//       <Modal visible={isAccountLocked} animationType="slide" transparent={true}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Image source={require('../assets/icons/lock1.png')} style={styles.lockIcon} />
//             <Text style={styles.modalTitle}>Account Locked</Text>
//             <Text style={styles.modalMessage}>
//               Your account has been locked due to too many failed attempts. Please try again after some time.
//             </Text>
//             <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
//               <Text style={styles.modalButtonText}>Okay</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   inputWrapper: {
//     marginBottom: 20,
//   },
//   label: {
//     position: 'absolute',
//     left: 10,
//     top: 18,
//     color: '#9E9E9E',
//     fontSize: 16,
//     zIndex: 1,
//     transition: 'all 0.2s ease-in-out',
//   },
//   labelFocused: {
//     top: -10,
//     left: 10,
//     color: 'red',
//     fontSize: 12,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'red',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     color: '#000',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   // Other styles remain the same
// });

// export default SignInScreen;
