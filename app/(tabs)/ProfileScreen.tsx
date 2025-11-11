import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from '../../firebase/kamerun';

export default function ProfileScreen({ navigation }: any) {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      {/* Photo de profil */}
      <View style={styles.avatarContainer}>
        <Image 
          source={require('@/assets/images/a.jpg')} 
          style={styles.avatar} 
        />
      </View>

      {userData ? (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.value}>{userData.lastName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Prénom :</Text>
            <Text style={styles.value}>{userData.firstName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Téléphone :</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
        </View>
      ) : (
        <Text>Chargement des informations...</Text>
      )}

      {/* Bouton déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF8DC' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, color: '#8B0000' },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFDAB9' },
  infoContainer: { marginBottom: 40 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, paddingHorizontal: 10 },
  label: { fontWeight: '600', color: '#8B0000' },
  value: { fontWeight: '400', color: '#030303ff' },
  logoutButton: { backgroundColor: '#FF4500', padding: 15, borderRadius: 10, alignItems: 'center' },
  logoutText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
