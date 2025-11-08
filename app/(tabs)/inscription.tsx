// // import { createUserWithEmailAndPassword } from 'firebase/auth';
// // import React, { useState } from 'react';
// // import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// // import { auth } from '../../firebase/kamerun';

// // export default function SignUpScreen() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [firstName, setFirstName] = useState('');
// //   const [lastName, setLastName] = useState('');
// //   const [tribe, setTribe] = useState('');
// //   const [phone, setPhone] = useState('');

// //   const handleSignUp = async () => {
// //     if (password !== confirmPassword) {
// //       Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
// //       return;
// //     }

// //     try {
// //       await createUserWithEmailAndPassword(auth, email, password);
// //       Alert.alert('Succès', 'Compte créé avec succès !');
// //       // Ici tu peux ajouter l'enregistrement des autres infos dans Firestore
// //     } catch (error: any) {
// //       Alert.alert('Erreur', error.message);
// //     }
// //   };

// //   return (
// //     <ImageBackground
// //       source={require('@/assets/images/a.jpg')}
// //       style={styles.background}
// //       resizeMode="cover"
// //     >
// //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// //         <View style={styles.container}>
// //           <Text style={styles.title}>Inscription</Text>

// //           <TextInput placeholder="Nom" value={lastName} onChangeText={setLastName} style={styles.input} />
// //           <TextInput placeholder="Prénom" value={firstName} onChangeText={setFirstName} style={styles.input} />
// //           <TextInput placeholder="Ethnie / Tribu" value={tribe} onChangeText={setTribe} style={styles.input} />
// //           <TextInput
// //             placeholder="Numéro de téléphone"
// //             value={phone}
// //             onChangeText={setPhone}
// //             style={styles.input}
// //             keyboardType="phone-pad"
// //           />

// //           <TextInput
// //             placeholder="Adresse e-mail"
// //             value={email}
// //             onChangeText={setEmail}
// //             style={styles.input}
// //             keyboardType="email-address"
// //           />
// //           <TextInput
// //             placeholder="Mot de passe"
// //             value={password}
// //             onChangeText={setPassword}
// //             style={styles.input}
// //             secureTextEntry
// //           />
// //           <TextInput
// //             placeholder="Confirmer le mot de passe"
// //             value={confirmPassword}
// //             onChangeText={setConfirmPassword}
// //             style={styles.input}
// //             secureTextEntry
// //           />

// //           <TouchableOpacity style={styles.button} onPress={handleSignUp}>
// //             <Text style={styles.buttonText}>S'inscrire</Text>
// //           </TouchableOpacity>

// //           <Text style={styles.link}>
// //             Déjà un compte ? <Text style={styles.linkHighlight}>Se connecter</Text>
// //           </Text>
// //         </View>
// //       </ScrollView>
// //     </ImageBackground>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   background: { flex: 1 },
// //   scrollContainer: { flexGrow: 1 },
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'rgba(255, 255, 240, 0.85)',
// //     margin: 20,
// //     borderRadius: 15,
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: '700',
// //     marginBottom: 25,
// //     color: '#8B0000',
// //     textAlign: 'center',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#8B0000',
// //     borderRadius: 10,
// //     paddingHorizontal: 15,
// //     height: 50,
// //     marginBottom: 15,
// //     backgroundColor: '#FFF8DC',
// //   },
// //   button: {
// //     backgroundColor: '#FF8C00',
// //     paddingVertical: 15,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //     marginTop: 5,
// //   },
// //   buttonText: {
// //     color: '#FFF',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// //   link: {
// //     marginTop: 15,
// //     textAlign: 'center',
// //     fontSize: 14,
// //     color: '#4B0082',
// //   },
// //   linkHighlight: {
// //     fontWeight: '700',
// //     color: '#8B0000',
// //   },
// // });

// // screens/auth/SignUpScreen.js


// // import { useRouter } from 'expo-router'; // ← important
// // import { createUserWithEmailAndPassword } from 'firebase/auth';
// // import { doc, setDoc } from 'firebase/firestore';
// // import React, { useState } from 'react';
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   ImageBackground,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import { auth, db } from '../../firebase/kamerun';

// // export default function SignUpScreen() {
// //   const router = useRouter(); // ← initialise le router

// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [firstName, setFirstName] = useState('');
// //   const [lastName, setLastName] = useState('');
// //   const [tribe, setTribe] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   // const handleSignUp = async () => {
// //   //   if (password !== confirmPassword) {
// //   //     Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
// //   //     return;
// //   //   }

// //   //   if (!email || !firstName || !lastName || !tribe || !phone) {
// //   //     Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
// //   //     return;
// //   //   }

// //   //   setLoading(true);
// //   //   try {
// //   //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //   //     const user = userCredential.user;

// //   //     await setDoc(doc(db, 'users', user.uid), {
// //   //       firstName,
// //   //       lastName,
// //   //       tribe,
// //   //       phone,
// //   //       email,
// //   //       createdAt: new Date(),
// //   //     });

// //   //     Alert.alert('Succès', 'Compte créé avec succès !');
// //   //     router.push('/login'); // ← redirection avec Expo Router
// //   //   } catch (error) {
// //   //     Alert.alert('Erreur error.message');
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   const handleSignUp = async () => {
// //   if (password !== confirmPassword) {
// //     Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
// //     return;
// //   }

// //   setLoading(true);
// //   try {
// //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //     const user = userCredential.user;

// //     await setDoc(doc(db, 'users', user.uid), {
// //       firstName,
// //       lastName,
// //       tribe,
// //       phone,
// //       email,
// //       createdAt: new Date(),
// //     });

// //     // Ici on peut passer un param pour afficher l'alerte sur login
// //     router.push({
// //       pathname: '/(auth)/login',
// //       params: { registered: 'true' },
// //     });
// //   } catch (error: any) {
// //     Alert.alert('Erreur', error.message);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   return (
// //     <ImageBackground
// //       source={require('@/assets/images/a.jpg')}
// //       style={styles.background}
// //       resizeMode="cover"
// //     >
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
// //         style={{ flex: 1 }}
// //       >
// //         <ScrollView contentContainerStyle={styles.scrollContainer}>
// //           <View style={styles.container}>
// //             <Text style={styles.title}>Inscription</Text>

// //             <TextInput
// //               placeholder="Nom"
// //               value={lastName}
// //               onChangeText={setLastName}
// //               style={styles.input}
// //             />
// //             <TextInput
// //               placeholder="Prénom"
// //               value={firstName}
// //               onChangeText={setFirstName}
// //               style={styles.input}
// //             />
// //             <TextInput
// //               placeholder="Ethnie / Tribu"
// //               value={tribe}
// //               onChangeText={setTribe}
// //               style={styles.input}
// //             />
// //             <TextInput
// //               placeholder="Numéro de téléphone"
// //               value={phone}
// //               onChangeText={setPhone}
// //               style={styles.input}
// //               keyboardType="phone-pad"
// //             />
// //             <TextInput
// //               placeholder="Adresse e-mail"
// //               value={email}
// //               onChangeText={setEmail}
// //               style={styles.input}
// //               keyboardType="email-address"
// //             />
// //             <TextInput
// //               placeholder="Mot de passe"
// //               value={password}
// //               onChangeText={setPassword}
// //               style={styles.input}
// //               secureTextEntry
// //             />
// //             <TextInput
// //               placeholder="Confirmer le mot de passe"
// //               value={confirmPassword}
// //               onChangeText={setConfirmPassword}
// //               style={styles.input}
// //               secureTextEntry
// //             />

// //             <TouchableOpacity
// //               style={[styles.button, loading && { backgroundColor: '#aaa' }]}
// //               onPress={handleSignUp}
// //               disabled={loading}
// //             >
// //               {loading ? (
// //                 <ActivityIndicator color="#FFF" />
// //               ) : (
// //                 <Text style={styles.buttonText}>S'inscrire</Text>
// //               )}
// //             </TouchableOpacity>

// //             <Text style={styles.link}>
// //               Déjà un compte ?{' '}
// //               <Text style={styles.linkHighlight} onPress={() => router.push('/login')}>
// //                 Se connecter
// //               </Text>
// //             </Text>
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </ImageBackground>
// //   );
// // }

// // // → Garde ton style actuel, inchangé
// // const styles = StyleSheet.create({
// //   background: { flex: 1 },
// //   scrollContainer: { flexGrow: 1 },
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'rgba(255, 255, 240, 0.85)',
// //     margin: 20,
// //     borderRadius: 15,
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: '700',
// //     marginBottom: 25,
// //     color: '#8B0000',
// //     textAlign: 'center',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#8B0000',
// //     borderRadius: 10,
// //     paddingHorizontal: 15,
// //     height: 50,
// //     marginBottom: 15,
// //     backgroundColor: '#FFF8DC',
// //   },
// //   button: {
// //     backgroundColor: '#FF8C00',
// //     paddingVertical: 15,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //     marginTop: 5,
// //   },
// //   buttonText: {
// //     color: '#FFF',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// //   link: {
// //     marginTop: 15,
// //     textAlign: 'center',
// //     fontSize: 14,
// //     color: '#4B0082',
// //   },
// //   linkHighlight: {
// //     fontWeight: '700',
// //     color: '#8B0000',
// //   },
// // });


// // import { Tabs } from 'expo-router';
// // import React from 'react';

// // import { HapticTab } from '@/components/haptic-tab';
// // import { IconSymbol } from '@/components/ui/icon-symbol';
// // import { Colors } from '@/constants/theme';
// // import { useColorScheme } from '@/hooks/use-color-scheme';

// // export default function TabLayout() {
// //   const colorScheme = useColorScheme();

// //   return (
// //     <Tabs
// //       screenOptions={{
// //         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
// //         headerShown: false,
// //         tabBarButton: HapticTab,
// //       }}>
// //       <Tabs.Screen
// //         name="index"
// //         options={{
// //           title: 'Home',
// //           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
// //         }}
// //       />
// //       <Tabs.Screen
// //         name="explore"
// //         options={{
// //           title: 'Explore',
// //           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
// //         }}
// //       />
// //     </Tabs>
// //   );
// // }


// import { useRouter } from 'expo-router';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import React, { useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   ImageBackground,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { auth, db } from '../../firebase/kamerun';

// export default function SignUpScreen() {
//   const router = useRouter();

//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [firstName, setFirstName] = useState<string>('');
//   const [lastName, setLastName] = useState<string>('');
//   const [tribe, setTribe] = useState<string>('');
//   const [phone, setPhone] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSignUp = async () => {
//     if (!email || !password || !confirmPassword || !firstName || !lastName || !tribe || !phone) {
//       Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Création du compte Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Enregistrement des infos supplémentaires dans Firestore
//       await setDoc(doc(db, 'users', user.uid), {
//         firstName,
//         lastName,
//         tribe,
//         phone,
//         email,
//         createdAt: new Date(),
//       });
      

//       // Redirection vers login avec param pour alerte
//       router.push({
//         pathname: '/login',
//         params: { registered: 'true' },
//       });
//     } catch (error: any) {
//       Alert.alert('Erreur', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('@/assets/images/a.jpg')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={{ flex: 1 }}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.container}>
//             <Text style={styles.title}>Inscription</Text>

//             <TextInput
//               placeholder="Nom"
//               value={lastName}
//               onChangeText={setLastName}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Prénom"
//               value={firstName}
//               onChangeText={setFirstName}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Ethnie / Tribu"
//               value={tribe}
//               onChangeText={setTribe}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Numéro de téléphone"
//               value={phone}
//               onChangeText={setPhone}
//               style={styles.input}
//               keyboardType="phone-pad"
//             />
//             <TextInput
//               placeholder="Adresse e-mail"
//               value={email}
//               onChangeText={setEmail}
//               style={styles.input}
//               keyboardType="email-address"
//             />
//             <TextInput
//               placeholder="Mot de passe"
//               value={password}
//               onChangeText={setPassword}
//               style={styles.input}
//               secureTextEntry
//             />
//             <TextInput
//               placeholder="Confirmer le mot de passe"
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               style={styles.input}
//               secureTextEntry
//             />

//             <TouchableOpacity
//               style={[styles.button, loading && { backgroundColor: '#aaa' }]}
//               onPress={handleSignUp}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#FFF" />
//               ) : (
//                 <Text style={styles.buttonText}>S'inscrire</Text>
//               )}
//             </TouchableOpacity>

//             <Text style={styles.link}>
//               Déjà un compte ?{' '}
//               <Text style={styles.linkHighlight} onPress={() => router.push('/login')}>
//                 Se connecter
//               </Text>
//             </Text>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   scrollContainer: { flexGrow: 1 },
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 255, 240, 0.85)',
//     margin: 20,
//     borderRadius: 15,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 25,
//     color: '#8B0000',
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#8B0000',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     height: 50,
//     marginBottom: 15,
//     backgroundColor: '#FFF8DC',
//   },
//   button: {
//     backgroundColor: '#FF8C00',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   link: {
//     marginTop: 15,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#4B0082',
//   },
//   linkHighlight: {
//     fontWeight: '700',
//     color: '#8B0000',
//   },
// });

import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../firebase/kamerun';

export default function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [tribe, setTribe] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    // Vérification des champs obligatoires
    if (!email || !password || !confirmPassword || !firstName || !lastName || !tribe || !phone) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      // Création du compte Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('UID créé:', user.uid);

      // Enregistrement des infos supplémentaires dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        tribe: tribe.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        createdAt: new Date(),
      });

      Alert.alert('Succès', 'Compte créé avec succès !');

      // Redirection vers login
      router.push('/login');

    } catch (error: any) {
      console.error('Erreur création compte:', error);
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/a.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>

            <TextInput placeholder="Nom" value={lastName} onChangeText={setLastName} style={styles.input} />
            <TextInput placeholder="Prénom" value={firstName} onChangeText={setFirstName} style={styles.input} />
            <TextInput placeholder="Ethnie / Tribu" value={tribe} onChangeText={setTribe} style={styles.input} />
            <TextInput
              placeholder="Numéro de téléphone"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Adresse e-mail"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.button, loading && { backgroundColor: '#aaa' }]}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>S'inscrire</Text>}
            </TouchableOpacity>

            <Text style={styles.link}>
              Déjà un compte ?{' '}
              <Text style={styles.linkHighlight} onPress={() => router.push('/login')}>
                Se connecter
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 240, 0.85)',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    color: '#8B0000',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    backgroundColor: '#FFF8DC',
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#4B0082',
  },
  linkHighlight: {
    fontWeight: '700',
    color: '#8B0000',
  },
});
