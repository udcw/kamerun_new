import { Ionicons } from '@expo/vector-icons';
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

  // Visibilité des mots de passe
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^237\d{9}$/.test(phone);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName || !tribe || !phone) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erreur', "L'adresse e-mail n'est pas valide.");
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert('Erreur', 'Le numéro doit commencer par 237 et contenir 12 chiffres au total.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        tribe: tribe.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        isPremium: false,
        createdAt: new Date(),
      });

      Alert.alert('Succès', 'Compte créé avec succès !');
      router.push('/login');
    } catch (error: any) {
      console.error('Erreur création compte:', error);
      let errorMessage = "Une erreur s'est produite lors de la création du compte.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Cette adresse email est déjà utilisée.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Le mot de passe est trop faible.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "L'adresse email n'est pas valide.";
      }
      
      Alert.alert('Erreur', errorMessage);
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.subtitle}>Rejoignez la communauté Kamerun News</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom</Text>
              <TextInput 
                placeholder="Votre nom" 
                value={lastName} 
                onChangeText={setLastName} 
                style={styles.input} 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Prénom</Text>
              <TextInput 
                placeholder="Votre prénom" 
                value={firstName} 
                onChangeText={setFirstName} 
                style={styles.input} 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ethnie / Tribu</Text>
              <TextInput 
                placeholder="Votre ethnie ou tribu" 
                value={tribe} 
                onChangeText={setTribe} 
                style={styles.input} 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Numéro de téléphone</Text>
              <TextInput
                placeholder="2376XXXXXXXX"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Adresse e-mail</Text>
              <TextInput
                placeholder="votre@email.com"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Champ mot de passe avec icône */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Minimum 6 caractères"
                  value={password}
                  onChangeText={setPassword}
                  style={[styles.input, { flex: 1, marginBottom: 0, borderWidth: 0 }]}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#8B0000" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Champ confirmation mot de passe avec icône */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Confirmez votre mot de passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={[styles.input, { flex: 1, marginBottom: 0, borderWidth: 0 }]}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#8B0000" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { backgroundColor: '#aaa' }]}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Ionicons name="person-add" size={20} color="#FFF" />
                  <Text style={styles.buttonText}>Créer mon compte</Text>
                </>
              )}
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
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  container: {
    backgroundColor: 'rgba(255, 255, 240, 0.95)',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    color: '#8B0000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B0000',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#FFF8DC',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 12,
    backgroundColor: '#FFF8DC',
    height: 50,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 10,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    color: '#4B0082',
  },
  linkHighlight: {
    fontWeight: '700',
    color: '#8B0000',
  },
});