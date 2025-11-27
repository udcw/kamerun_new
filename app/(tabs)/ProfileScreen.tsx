import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Erreur récupération profil:', error);
        } else {
          setUserData(profile);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Erreur', 'Erreur lors de la déconnexion');
    } else {
      router.replace('/login');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      {/* Photo de profil */}
      <View style={styles.avatarContainer}>
        <Image 
          source={require('@/assets/images/a.jpg')} 
          style={styles.avatar} 
        />
        {userData?.is_premium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>

      {userData ? (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nom :</Text>
            <Text style={styles.value}>{userData.last_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Prénom :</Text>
            <Text style={styles.value}>{userData.first_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Téléphone :</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ethnie/Tribu :</Text>
            <Text style={styles.value}>{userData.tribe}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Statut :</Text>
            <Text style={[styles.value, userData.is_premium ? styles.premiumValue : styles.freeValue]}>
              {userData.is_premium ? 'Premium' : 'Gratuit'}
            </Text>
          </View>
          {userData.is_premium && userData.premium_activated_at && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Premium depuis :</Text>
              <Text style={styles.value}>
                {new Date(userData.premium_activated_at).toLocaleDateString('fr-FR')}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <Text>Chargement des informations...</Text>
      )}

      {/* Bouton déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FFF" />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#FFF8DC' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    marginBottom: 20, 
    color: '#8B0000',
    textAlign: 'center'
  },
  avatarContainer: { 
    alignItems: 'center', 
    marginBottom: 20,
    position: 'relative'
  },
  avatar: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    backgroundColor: '#FFDAB9',
    borderWidth: 3,
    borderColor: '#8B0000'
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 0,
    right: '30%',
    backgroundColor: '#8B0000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700'
  },
  premiumText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 4
  },
  infoContainer: { 
    marginBottom: 40,
    backgroundColor: 'rgba(255, 255, 240, 0.8)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 12, 
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  label: { 
    fontWeight: '600', 
    color: '#8B0000',
    fontSize: 16
  },
  value: { 
    fontWeight: '400', 
    color: '#030303',
    fontSize: 16,
    textAlign: 'right',
    flex: 1,
    marginLeft: 10
  },
  premiumValue: {
    color: '#27AE60',
    fontWeight: '700'
  },
  freeValue: {
    color: '#666',
    fontWeight: '500'
  },
  logoutButton: { 
    backgroundColor: '#FF4500', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutText: { 
    color: '#FFF', 
    fontWeight: '700', 
    fontSize: 16,
    marginLeft: 10
  },
});