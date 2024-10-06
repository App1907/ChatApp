import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Modal, Alert, Platform, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { request, PERMISSIONS, openSettings } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import CountryPicker from 'react-native-country-picker-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Ankit Kumar');
  const [username, setUsername] = useState('Matthew_13');
  const [birthday, setBirthday] = useState('10/10/1998');
  const [gender, setGender] = useState('Male');
  const [phoneNumber, setPhoneNumber] = useState('7888 955 435');
  const [email, setEmail] = useState('hcankit7@gmail.com');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [countryCode, setCountryCode] = useState('IN'); // Set default country code to 'IN' for India
  const [callingCode, setCallingCode] = useState('91'); // Default calling code for India
  const [showCountryPicker, setShowCountryPicker] = useState(false); // Control for country picker modal

  const handleUpdate = () => {
    if (!name || !username || !birthday || !phoneNumber || !email) {
      alert('Please fill out all the fields');
      return;
    }
    alert('Profile Updated');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeExitModal = () => {
    setIsModalVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toLocaleDateString();
    setBirthday(formattedDate);
    hideDatePicker();
  };

  // Function to handle selecting an image from the gallery
  const openGallery = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
          : await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

      if (permission === 'granted') {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        })
          .then(image => {
            setProfileImage({ uri: image.path });
            closeExitModal();
          })
          .catch(error => {
            Alert.alert('Error', 'Unable to open gallery');
          });
      } else {
        Alert.alert('Permission Denied', 'Please enable gallery access from settings.');
        openSettings();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request permission.');
    }
  };

  // Function to handle opening the camera
  const openCamera = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.CAMERA)
          : await request(PERMISSIONS.ANDROID.CAMERA);

      if (permission === 'granted') {
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
        })
          .then(image => {
            setProfileImage({ uri: image.path });
            closeExitModal();
          })
          .catch(error => {
            Alert.alert('Error', 'Unable to open camera');
          });
      } else {
        Alert.alert('Permission Denied', 'Please enable camera access from settings.');
        openSettings();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to request permission.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.header}>Edit Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.personConatiner}>
            {profileImage ? (
              <Image style={styles.profileImage} source={profileImage} />
            ) : (
              <Image style={styles.profileImage} source={require('../../assets/images/profile.png')} />
            )}
          </View>

          <View style={styles.profileTextContainer}>
            <Text style={styles.label}>Profile Picture</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            label={'Name'}
            mode={'outlined'}
            outlineColor={'#E7EBF3'}
            theme={{ colors: { primary: "#7F879A" } }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            label={'Username'}
            mode={'outlined'}
            outlineColor={'#E7EBF3'}
            theme={{ colors: { primary: "#7F879A" } }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={showDatePicker} style={styles.birthdayContainer}>
            <TextInput
              style={styles.inputWithIcon}
              value={birthday}
              onChangeText={setBirthday}
              label={'Birthday'}
              mode={'outlined'}
              outlineColor={'#E7EBF3'}
              editable={true}
              theme={{ colors: { primary: "#7F879A" } }}
            />
            <Image source={require('../../assets/images/calendar.png')} style={styles.inputIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setGender(value)}
              value={gender}
              items={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
              style={pickerSelectStyles}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.phoneContainer}>
            {/* Country picker and phone number input */}
            <TouchableOpacity onPress={() => setShowCountryPicker(true)} style={styles.countryCodeContainer}>
              <CountryPicker
                withCallingCodeButton
                withFlag
                countryCode={countryCode}
                withFilter
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCallingCode(country.callingCode[0]);
                }}
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
              />
              <Text style={styles.countryCode}>+{callingCode}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              label={'Phone Number'}
              mode={'outlined'}
              outlineColor={'#E7EBF3'}
              theme={{ colors: { primary: "#7F879A" } }}
            />
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.inputWithButton}
              value={email}
              onChangeText={setEmail}
              label={'Email ID'}
              mode={'outlined'}
              outlineColor={'#E7EBF3'}
              theme={{ colors: { primary: "#7F879A" } }}
            />
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Profile Photo</Text>
              <View style={styles.line} />
              <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
                <Image source={require('../../assets/images/gallery.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Upload from Gallery</Text>
                <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={openCamera}>
                <Image source={require('../../assets/images/camera.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Use Camera</Text>
                <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption} onPress={closeExitModal}>
                <Image source={require('../../assets/images/avatar.png')} style={styles.modalIcon} />
                <Text style={styles.modalOptionText}>Select an Avatar</Text>
                <Image source={require('../../assets/images/arrow-right.png')} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    height: windowHeight * 0.06322444678,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    color: 'black',
  },
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 48,
    height: 48,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 80,
    color: '#0B152D',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  personConatiner: {
    backgroundColor: '#E1EBFE',
    borderRadius: 100,
    width: 120,
    height: 120,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginRight: 20,
  },
  profileTextContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '450',
    color: '#4B5879',
    marginLeft: 20,
    marginBottom: 5,
  },
  changePhotoText: {
    color: '#FF00B8',
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: windowHeight * 0.06322444678,
    marginBottom: windowHeight * 0.01028977871,
    borderRadius: 16,
    borderColor: '#E7EBF3',
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 16,
    height: windowHeight * 0.06322444678,
    borderColor: '##E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingRight: 45,
  },
  birthdayContainer: {
    justifyContent: 'center',
  },
  inputIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    height: windowHeight * 0.06322444678,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    borderColor: '#E7EBF3',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    height: windowHeight * 0.06322444678,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    paddingRight: 70,
  },
  changeButton: {
    justifyContent: 'center',
  },
  changeText: {
    color: '#FF00B8',
    fontWeight: 'bold',
    position: 'absolute',
    right: 15,
  },
  inputWithButton: {
    flex: 1,
    fontSize: 16,
    height: windowHeight * 0.06322444678,
    borderColor: '#E7EBF3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingRight: 70,
  },
  verifyButton: {
    justifyContent: 'center',
  },
  verifyText: {
    color: '#FF00B8',
    fontWeight: 'bold',
    position: 'absolute',
    right: 15,
  },
  updateButton: {
    backgroundColor: '#000080',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: windowWidth,
    height: windowHeight * 0.44151738672,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30.36,
    marginTop: 10,
  },
  line: {
    width: windowWidth * 0.88785046729,
    height: 1,
    backgroundColor: '#E6E9F3',
    marginTop: windowHeight * 0.02107481559,
    marginBottom: windowHeight * 0.02107481559,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#F6F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    marginBottom: 15,
  },
  modalIcon: {
    width: 30,
    height: 30,
    marginLeft: 14,
    marginRight: 20,
  },
  modalOptionText: {
    fontSize: 16,
    flex: 1,
  },
  arrowIcon: {
    width: 4,
    height: 8,
    marginRight: 18,
  },
});

export default EditProfileScreen;










// import { Animated, Dimensions, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import Modal from 'react-native-modal'
// import React, { useRef, useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import {image} from '../../assets/icon/index'
// import CustomizeButton from '../../component/CustomizeButton'
// import CustomInput from '../../component/CustomizeInput'
// import RBSheet from 'react-native-raw-bottom-sheet'
// import DataPicker from 'react-native-modern-datepicker' 
// import {getToday , getFormatedDate} from 'react-native-modern-datepicker' 
// import CustomizeList from '../../component/CustomizeList'
// import CountryPicker from 'react-native-country-picker-modal';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const EditScreen = () => {
//     const today = new Date();
//     const dob = new Date('YYYY-MM-DD');

//     const startDate = getFormatedDate(dob.setDate(dob.getDate()+1),'YYYY/MM/DD')
//     const [name,setname] = useState('')
//     const [username,setusername] = useState('')
//     const [birthday,setbirthday] = useState('')
//     const [gender,setgender] = useState('')
//     const [open,setopen] = useState(false)
//     const [email,setemail] = useState('')
//     const [countryCode,setcountryCode] = useState('US')
//     const [callingCode,setcallingCode] = useState('1')
//     const [phone,setphone] = useState('')
//     const [flag,setflag] = useState(false)
//     const [date,setdate] = useState('')
//     const [picture,setpicture] = useState('')


//     // const placeholderAnimation = useRef();
//     const placeholderAnimation =new Animated.Value(0)
  


//     function handleOnPress () {
//         setopen(!open)
//     }

//     function handleChange({propDate}){
//         console.log(propDate)
//         setdate(propDate)
//         handleOnPress()
//     }

//     const handleCountrySelect = country => {
//         setcallingCode(country.callingCode[0])
//         setcountryCode(country.cca2)
//       };

//       const HandleGallery = async () =>{
//         launchImageLibrary(
//             {mediaType: 'photo'},
//             (response) => {
//               console.log('ptr 2 ---->>>>', response)
//               if(response.didCancel){
//                 console.log('cancelled');
//               }else if(response.error){
//                 console.log('ImagePicker Error: ',response.error);
//               }else{
//                 console.log('Selected assets: ',response.assets[0].uri);
//                 console.log(response.assets[0].uri)
//                 setpicture(response.assets[0].uri)
//               }
//             }
//         );

//         console.log('ptr resp ->>> ',)

//       }

//        const handleupUseCamera = async() =>{
//         launchCamera({mediaType: 'photo'},response =>{
//           console.log(response)
//             if(response.didCancel){
//                 console.log('User cancelled Camera');
//             }
//             else if (response.error) {
//                 console.log('Camera error:', response.error);
//             }
//             else{
//                 console.log('Camera Image URI:',response.assets[0].uri)
//                 setpicture(response.assets[0].uri)
//             }
//         }
    
//         )
//       }

//       const handleFocus = () => {
//         Animated.timing(placeholderAnimation, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: false,
//         }).start();
//       };
    
//       const handleBlur = () => {
//         if (phone.trim()) {
//           Animated.timing(placeholderAnimation, {
//             toValue: 1,
//             duration: 200,
//             useNativeDriver: false,
//           }).start();
//         }
//       };

//       const placeholderStyle = {
//         backgroundColor:'white',
//         paddingHorizontal:5,
//           position: 'absolute',
//         //   left: 10,
//           top: placeholderAnimation.interpolate({
//             inputRange: [0, 1],
//             outputRange: [-8, 0],
//           }),
//           fontSize: placeholderAnimation.interpolate({
//             inputRange: [0, 1],
//             outputRange: [14, 14],
//           }),
//           color:  '#7F879A',
          
//         };

//     const refRBSheet = useRef();

//   return (
    
//    <SafeAreaView style={Styles.safeareaview}>

//     <View style={Styles.Container1}>
//         <View style={Styles.Container2}>

//         <Text style={Styles.Title}>Edit Profile</Text>
//         </View>
//         <View style={Styles.backarrowContainer}>
//             <Image 
//             source={image.backarrow}
//             style={Styles.backarrow}
//             /> 
//         </View>
//     </View>
//     <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
//     <View style={Styles.Container3}>
//         <View style={Styles.PersonConatiner}>
//         <Image 
//         source={picture ?{ uri :picture}: image.person}
//         style={Styles.person}
//         />
//         </View>
//         <View style={Styles.Container4}>
//             <Text style={Styles.text}>Profile Picture</Text>
//             <CustomizeButton 
//             title='Change Photo'
//             onPress={() => refRBSheet.current.open()}
//             />
//         </View>
//     </View>
//     <CustomInput
//     placeholder = 'Name'
//     text = {name}
//     onChangeText = {(text)=>{setname(text)}}
//     />
//      <CustomInput
//     placeholder = 'Username'
//     text = {username}
//     onChangeText = {(text)=>{setusername(text)}}
//     />

//      <CustomInput
//     placeholder = 'Birthday'
//     text = {date}
//     onChangeText = {()=>{setbirthday(date)}}
//     icon='true'
//     image={image.dop}
//     style = {{height: 20,width: 20}}
//     onPress={handleOnPress}
//     />
//       <CustomInput
//     placeholder = 'Gender'
//     text = {gender}
//     onChangeText = {(text)=>{setgender(text)}}
//     icon='true'
//     image={image.downarrow}
//     style = {{height: 10,width: 16}}
//     />


//     <View style={Styles.containerThree}>
 
//               <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderRadius:15,borderColor:'#E7EBF3',paddingHorizontal:10,paddingVertical:10}}>
//                 <TouchableOpacity style={Styles.country}>
//                   <CountryPicker
//                     countryCode={countryCode}
//                     withFilter
//                     withFlag
//                     withCallingCode
//                     // withCallingCodeButton
//                     onSelect={handleCountrySelect}
//                   />
//                 </TouchableOpacity>
//                 <Text style={Styles.text3}>+{callingCode}</Text>
//               </View>
//               <CustomInput
//     placeholder = 'Phone Number'
//     text = {phone}
//     onChangeText = {(text)=>{setphone(text)}}
//     button='true'
//     title='Change'
//     Error= {true}
//     style = {{height: 10,width: 16}}
//     />
//               {/* <View style={Styles.container3}>
//                 <View style={{ flex: 1 }}>
//                 <Animated.Text style={placeholderStyle}>
//                   Phone Number
//                 </Animated.Text>
//                 <TextInput
//                   value={phone}
//                   keyboardType="number-pad"
//                   onChangeText={(text) => {
//                     setphone(text)
                    
//                     if (text) handleFocus();
//                     else handleBlur();
                  
//                   }}
//                   placeholder=""
//                   style={Styles.inputText}
//                   onFocus={() => {
//                     setflag('false')
//                     handleFocus();
//                   }}
//                   onBlur={() => {
//                     setflag('false')
//                     handleBlur();
//                   }}
//                 />
//               </View>
                
//               </View> */}
//               </View>
          
           
          




//       <CustomInput
//     placeholder = 'Email ID'
//     text = {email}
//     onChangeText = {(text)=>{setemail(text)}}
//     button='true'
//     title='Verify'
//     style = {{height: 10,width: 16}}
//     />
//     <Pressable style={Styles.buttonContainer}>
//         <Text style={Styles.button}>Update</Text>
//     </Pressable>


//     <RBSheet
//         ref={refRBSheet}
//         height= {Dimensions.get('window').height / 2}
//         useNativeDriver={false}
//         dragOnContent={true}
//         style={{overflow: 'hidden'}}
        
        
        
//         customStyles={{
//             container: {
//                 borderRadius: 30,
//               },
//             wrapper: {
//                 backgroundColor: 'rgba(0,0,0,0.5)',
//             },
//             draggableIcon: {
//                 backgroundColor: '#000',
//             },
//         }}
//         customModalProps={{
//             animationType: 'slide',
//             statusBarTranslucent: true,
//         }}
//         customAvoidingViewProps={{
//             enabled: false,
//         }}>
//         <View style={Styles.RBContainer}>
//             <View style={Styles.RBContainer2}>
//                 <Text style={Styles.RBtext}>Profile Photo</Text>
//             </View>
//             <CustomizeList
//             icon = {image.gallery}
//             text = 'Upload from Gallery'
//             onPress={HandleGallery}
//             />
//              <CustomizeList
//             icon = {image.camera}
//             text = 'Use Camera'
//             onPress={handleupUseCamera}
//             />
//              <CustomizeList
//             icon = {image.avtar}
//             text = 'Select an Avatar'
//             />
//         </View>
//       </RBSheet>
      


//         <Modal
            
//             backdropOpacity={0.5}
//             isVisible = {open}
            
//             // onBackdropPress={()=>setopen(false)}
            
//             >

//                 <View style={Styles.centeredView}>
//                     <View style={Styles.modalView}>
//                         {/* <DataPicker
//                             mode = 'calendar'
//                             minimumDate={startDate}
//                             selected = {date}
//                             onDateChange={handleChange}
//                             /> */}

//                     </View>
//                 </View>
//                 </Modal>
     
//     </ScrollView>
//    </SafeAreaView>
//   )
// }

// export default EditScreen

// const Styles = StyleSheet.create({
//     safeareaview:{
//         backgroundColor:'#FFFFFF',
//         flex:1,
//     },
//     Container1:{
//         marginHorizontal:20,
//         marginVertical:16,
//         flexDirection:'row',
//         alignItems:'center',
        
//     },
//     containerThree: {
//         flexDirection: 'row',
//         // borderWidth:1,
//         marginHorizontal:20,
//         // paddingHorizontal:20,
//         // paddingVertical:10,
//         borderRadius:16,
//         borderColor:'#E7EBF3',
//         alignItems:'center',
//         // marginVertical:13,
        
//       },
//     backarrowContainer:{
//         position:'absolute',
//         backgroundColor:'#F6F6F6',
//         paddingHorizontal:20,
//         paddingVertical:15,
//         borderRadius:10,
//         justifyContent:'flex-start'
//     },
//     backarrow:{
//         height:10,
//         width:5,
        
//     },
//     Title:{
//        fontWeight:'500',
//        fontSize:20
       
//     },
//     Container2:{
//         flex:1,
//         alignItems:'center'
//     },
//     Container3:{
//         flexDirection:'row',
//         marginVertical:20,
//         padding:12,
//         marginHorizontal:20,
//         alignItems:'center'
//     },
//     PersonConatiner:{
//         backgroundColor:'#E1EBFE',
//         borderRadius:100,
//     },
//     person:{
//         height:150,
//         width:150,
//         borderRadius:100
//     },
//     Container4:{
//         marginLeft:20,
//     },
//     text:{
//         marginBottom:10,
//         fontSize:14,
//         fontWeight:'400',
//         color:'#4B5879'
        
//     },
//     buttonContainer:{
//         borderWidth:1,
//         marginHorizontal:20,
//         marginVertical:20,
//         borderRadius:10,
//         paddingVertical:20,
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor:'#000080',
//         shadowOpacity:0.5,
//         shadowColor:'#000',
//         shadowOffset:{
//           width:0,
//           height:2
//         },
//         shadowRadius:4
      

//     },
//     button:{
//         color:'#FFFFFF',
//         fontWeight:'700',
//         fontSize:16,
//     },
//     centeredView:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         marginTop:22,
        
//     },
//     modalView:{
//         margin:20,
//         backgroundColor:'white',
//         borderRadius:20,
//         width:'100%',
//         // padding:35,
//         alignItems:'center',
//         shadowColor:'#000',
//         shadowOffset:{
//             width:0,
//             height:2,
        
//         },
//         shadowOpacity:0.25,
//         shadowRadius:4,
//         elevation:5,
//     },
//     RBContainer:{
//         paddingHorizontal:24,
//         borderRadius:30,
//         paddingTop:20,
//         flex:1
//     },
//     RBContainer2:{
//         borderBottomWidth:1,
//         paddingVertical:25,
//         borderBottomColor:'#E6E9EE'
        
//     },
//     RBtext:{
//         fontSize:24,
//         fontWeight:'700',
//     },
//     container: {
//         paddingHorizontal: 30,
//         // backgroundColor:'red',
//         // marginTop:30,
//         flex:1,
        
//         // backgroundColor:'white'
//     },
//     country: {
//         flexDirection: 'row',
//         borderRadius: 10,
//         backgroundColor:'#FFFFFF',
//         // paddingHorizontal:10,
//         // paddingVertical:10,
//     },
   
//     container3:{
//         flexDirection:'row',
//         marginLeft: 10,
//         justifyContent:'flex-start',
//         alignItems:'center',
//         width:Dimensions.get('window').width-120,
//         borderRadius:10,
//         backgroundColor: '#FFFFFF'
//     },
//     phone: {
//         flex:1,
//        paddingHorizontal:10,
//     //    backgroundColor:'blue'
//     },
//     text3:{
        
//         // paddingHorizontal:15,
//         justifyContent:'center',
//         alignItems:'center',
//         // backgroundColor:'red'
//     },
//     // button: {
//     //     marginTop: 40,
//     //     marginBottom:10,
//     //     borderWidth: 1,
//     //     justifyContent: 'center',
//     //     alignItems: 'center',
//     //     backgroundColor: 'royalblue',
//     //     borderColor: 'white',
//     //     height: 50,
//     //     padding: 5,
//     //     borderRadius: 10,
//     // },
//     buttonPressable:{flex: 1, justifyContent: 'flex-end',marginVertical:30},
//     safeareaContainer:{
//         flex: 1, 
//         backgroundColor: '#E6EDF3'
//     },
//     // backarrow:{
//     //     backgroundColor: '#FFFFFFB2',
//     //     alignSelf: 'flex-start',
//     //     padding: 15,
//     //     borderRadius: 10,
//     //   },
//       text1:{
//         // marginTop: 60,
//          fontSize: 26, 
//          fontWeight: '700',
//         },
//         text2:{
//             marginTop: 10, 
//             fontSize: 15, 
//             color: '#4F5F72'
//         },
    
     


// })