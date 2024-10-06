import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const CustomInput = ({ 
  value, 
  onChangeText, 
  placeholder, 
  iconSource, 
  error, 
  secureTextEntry = false, 
  keyboardType = 'default', 
  autoCapitalize = 'none',
  Animation = true
}) => {
  const [passwordVisible, setPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);


  const placeholderTop = useRef(new Animated.Value(value ? 0 : 20)).current;

  useEffect(() => {
    Animated.timing(placeholderTop, {
      toValue: value ? 0 : 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(placeholderTop, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(placeholderTop, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={[styles.inputContainer, error && styles.errorBorder]}>
      <Image
        source={iconSource}
        style={[styles.icon, error && styles.errorIcon]}
      />


      {Animation && (
        <Animated.Text
          style={[
            styles.placeholder,
            { top: placeholderTop },
            error ? { color: 'red' } : { color: '#60707d' },
          ]}
          pointerEvents="none"
        >
          {placeholder}
        </Animated.Text>
      )}

      <TextInput
        placeholder={Animation ? null : placeholder} 
        style={[styles.input, error && styles.errorText]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!passwordVisible && secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {secureTextEntry && (
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image
            source={require('../assets/icons/eye.png')}
            style={[styles.icon, error && styles.errorIcon]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    //width: 335,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f9fa',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorIcon: {
    tintColor: 'red',
  },
  placeholder: {
    position: 'absolute',
    paddingLeft: 50,
    color: '#60707D',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});

export default CustomInput;










// import React, { useState } from 'react';
// import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { TextInput as PaperTextInput } from 'react-native-paper';

// const CustomInput = ({ 
//   value, 
//   onChangeText, 
//   placeholder, 
//   iconSource, 
//   error, 
//   secureTextEntry = false, 
//   keyboardType = 'default', 
//   autoCapitalize = 'none' 
// }) => {
//   const [passwordVisible, setPasswordVisible] = useState(!secureTextEntry);
//   //const [emailFocused, setEmailFocused] = useState(false);

//   return (
//     <View style={[styles.inputContainer, error && styles.errorBorder]}>
//       <Image
//         source={iconSource}
//         style={[styles.icon, error && styles.errorIcon]}
//       />
//       <TextInput
//         placeholder={placeholder}
//         mode='flat'
//         label={placeholder}
//         underlineColor='transparent'
//         style={[styles.input, error && styles.errorText]}
//         value={value}
//         onChangeText={onChangeText}
//         secureTextEntry={!passwordVisible && secureTextEntry}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//       />
//       {secureTextEntry && (
//         <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
//           <Image
//             source={require('../assets/icons/eye.png')}
//             style={[styles.icon, error && styles.errorIcon]}
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputContainer: {
//     width: 335,
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f7f9fa',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     color: '#000',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   errorBorder: {
//     borderColor: 'red',
//     borderWidth: 1,
//   },
//   errorIcon: {
//     tintColor: 'red',
//   },
//   errorText: {
//     //color: 'red',
//   },
//   errorMessage: {
//     color: 'red',
//     marginTop: 5,
//   },
// });

// export default CustomInput;












// import React from 'react';
// import { View, Animated, TouchableOpacity, Text, Image } from 'react-native';
// import { TextInput as PaperInput } from 'react-native-paper'; 
// import styles from './style';
// import color from '../../themes/color';


// export default class CustomInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isFocused: false,
//     };
//     this.placeholderTop = new Animated.Value(props.value ? 0 : 20);
//   }

  
//   componentDidUpdate(prevProps) {
//     if (prevProps.value !== this.props.value) {
//       this.placeholderTop.setValue(this.props.value ? 0 : 20);
//     }
//   }

//   handleFocus = () => {
//     this.setState({ isFocused: true });
//     this.placeholderTop.setValue(0);
//   };

//   handleBlur = () => {
//     this.setState({ isFocused: false });
//     if (!this.props.value) {
//       this.placeholderTop.setValue(20);
//     }
//   };

//   handleChangeText = (text) => {
//     if (this.props.onChangeText) {
//       this.props.onChangeText(text);
//     }
//   };

//   render() {
//     const { icon, icon2, placeholder, value, error, showError, secureTextEntry, onPressIcon, ...props } = this.props;
//     const { isFocused } = this.state;

//     return (
//       <View style={styles.container}>
//         <View style={[styles.inputContainer, { borderColor: showError ? color.errorRed : color.white }]}>
//           {icon && <Image source={icon} style={styles.icon} />}

//           <PaperInput
//             {...props}
//             label={placeholder}
//             value={value}
//             onFocus={this.handleFocus}
//             onBlur={this.handleBlur}
//             onChangeText={this.handleChangeText}
//             secureTextEntry={secureTextEntry}
//             error={showError}
//             underlineColor="transparent"
//             activeUnderlineColor={showError?color.errorRed:color.black}
//             theme={{
//               colors:{
//                 error:color.errorRed
//               }
//             }}
//             underlineStyle={{
//               display: 'none',
//               }}
//             style={[
//               styles.input,
//               icon && { paddingLeft: 20 },
//               { backgroundColor: 'white',} 
//             ]}
//           />

//           {icon2 && (
//             <TouchableOpacity onPress={onPressIcon}>
//               <Image source={icon2} style={styles.icon2} />
//             </TouchableOpacity>
//           )}
//         </View>
//         {showError && error && (
//           <Text style={styles.validationMessage}>{error}</Text>
//         )}
//       </View>
//     );
//   }
// }