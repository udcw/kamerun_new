import { Ionicons } from '@expo/vector-icons'; // 👈 Icônes Expo
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

  // Visibilité des mots de passe 👁️
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
        createdAt: new Date(),
      });

      Alert.alert('Succès', 'Compte créé avec succès !');
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
              placeholder="Numéro de téléphone (ex: 2376XXXXXXXX)"
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

            {/* Champ mot de passe avec icône 👁️ */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#8B0000" />
              </TouchableOpacity>
            </View>

            {/* Champ confirmation mot de passe avec icône 👁️ */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#8B0000" />
              </TouchableOpacity>
            </View>

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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 10,
    backgroundColor: '#FFF8DC',
    height: 50,
    marginBottom: 15,
    paddingRight: 10,
  },
  eyeIcon: {
    padding: 5,
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
