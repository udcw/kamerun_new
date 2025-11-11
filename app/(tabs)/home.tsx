// @ts-ignore
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../firebase/kamerun';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const newsData = [
  {
    id: '1',
    title: "Nouvelle découverte dans le village Baka",
    description: "Les Baka du sud-est célèbrent un festival culturel exceptionnel...",
    category: "Culture",
    date: "Il y a 2h",
  },
  {
    id: '2',
    title: "Festival des danses traditionnelles à l'Ouest",
    description: "La région de l'Ouest accueille des centaines de visiteurs...",
    category: "Événement",
    date: "Il y a 5h",
  },
  {
    id: '3',
    title: "Les traditions culinaires des tribus du Nord",
    description: "Découvrez les plats typiques et leur histoire...",
    category: "Gastronomie",
    date: "Hier",
  },
  {
    id: '4',
    title: "Cérémonie d'initiation chez les Bamiléké",
    description: "Une cérémonie ancestrale préservée à travers les générations...",
    category: "Tradition",
    date: "Il y a 3 jours",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // Vérifier le statut premium
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsPremium(userDoc.data().isPremium || false);
        }
      } else {
        setIsPremium(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handlePayment = async () => {
    if (!user) {
      Alert.alert(
        "Connexion requise",
        "Veuillez vous connecter pour accéder au contenu premium",
        [
          {
            text: "Annuler",
            style: "cancel"
          },
          { 
            text: "Se connecter", 
            onPress: () => router.push('/login')
          }
        ]
      );
      return;
    }

    Alert.alert(
      "Accès Premium",
      "Voulez-vous payer 1000 FCFA pour accéder à toutes les cultures?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Payer", 
          onPress: async () => {
            try {
              // Mettre à jour le statut premium dans Firestore
              await updateDoc(doc(db, 'users', user.uid), {
                isPremium: true,
                premiumActivatedAt: new Date(),
              });
              setIsPremium(true);
              Alert.alert("Succès", "Paiement effectué avec succès! Redirection...");
              setTimeout(() => {
                router.push('/cultures-premium');
              }, 1500);
            } catch (error) {
              console.error("Erreur lors du paiement: ", error);
              Alert.alert("Erreur", "Une erreur est survenue lors du paiement.");
            }
          }
        }
      ]
    );
  };

  const handlePremiumAccess = () => {
    if (isPremium) {
      router.push('/cultures-premium');
    } else {
      handlePayment();
    }
  };

  const renderItem = ({ item }: { item: { id: string; title: string; description: string; category: string; date: string } }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => alert(item.title)}>
        <View style={styles.cardHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text style={styles.readTime}>2 min de lecture</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Culture': '#E67E22',
      'Événement': '#9B59B6',
      'Gastronomie': '#27AE60',
      'Tradition': '#2980B9',
    };
    return colors[category] || '#34495E';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B0000" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('@/assets/images/a.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.appTitle}>Kamerun News</Text>
            <Text style={styles.subtitle}>Actualités tribales du Cameroun</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="eye" size={20} color="#8B0000" />
                <Text style={styles.statText}>+500 lectures</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="heart" size={20} color="#8B0000" />
                <Text style={styles.statText}>98% aiment</Text>
              </View>
            </View>
            {user && isPremium && (
              <View style={styles.premiumBadgeHeader}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.premiumBadgeText}>Compte Premium</Text>
              </View>
            )}
          </View>
        </View>

        {/* Featured News */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>À la une</Text>
          <View style={styles.featuredCard}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Populaire</Text>
            </View>
            <Text style={styles.featuredTitle}>Le Festival Ngondo 2024</Text>
            <Text style={styles.featuredDescription}>
              La plus grande célébration culturelle Sawa revient avec des traditions ancestrales...
            </Text>
          </View>
        </View>

        {/* Section Paiement Premium */}
        {!isPremium ? (
          <View style={styles.premiumSection}>
            <View style={styles.premiumCard}>
              <View style={styles.premiumBadge}>
                <Ionicons name="lock-closed" size={24} color="#FFD700" />
              </View>
              <Text style={styles.premiumTitle}>Contenu Premium</Text>
              <Text style={styles.premiumDescription}>
                Débloquez l'accès complet à toutes les cultures du Cameroun avec des détails exclusifs, photos et vidéos.
              </Text>
              
              <View style={styles.pricingContainer}>
                <Text style={styles.originalPrice}>2000 FCFA</Text>
                <Text style={styles.discountedPrice}>1000 FCFA</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-50%</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
                <Ionicons name="card" size={20} color="#FFF" />
                <Text style={styles.paymentButtonText}>Payer 1000 FCFA</Text>
              </TouchableOpacity>

              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                  <Text style={styles.featureText}>4 grandes cultures détaillées</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                  <Text style={styles.featureText}>Photos exclusives</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                  <Text style={styles.featureText}>Vidéos traditionnelles</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#27AE60" />
                  <Text style={styles.featureText}>Accès à vie</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.premiumSection}>
            <View style={styles.premiumCard}>
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={24} color="#FFD700" />
              </View>
              <Text style={styles.premiumTitle}>Vous êtes Premium !</Text>
              <Text style={styles.premiumDescription}>
                Profitez de l'accès complet à toutes les cultures du Cameroun.
              </Text>
              <TouchableOpacity style={styles.paymentButton} onPress={() => router.push('/cultures-premium')}>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
                <Text style={styles.paymentButtonText}>Accéder aux cultures</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* News List */}
        <View style={styles.newsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dernières actualités</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Tout voir</Text>
              <Ionicons name="chevron-forward" size={16} color="#8B0000" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={newsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Explorer</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="map" size={24} color="#8B0000" />
              <Text style={styles.actionText}>Cartes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar" size={24} color="#8B0000" />
              <Text style={styles.actionText}>Événements</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="restaurant" size={24} color="#8B0000" />
              <Text style={styles.actionText}>Cuisine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="musical-notes" size={24} color="#8B0000" />
              <Text style={styles.actionText}>Danses</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1,
  },
  scrollContainer: { 
    flexGrow: 1, 
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8B0000',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 240, 0.95)',
    padding: 20,
    borderRadius: 20,
    width: Dimensions.get('window').width - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#8B0000',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  premiumBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 10,
  },
  premiumBadgeText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 5,
  },
  featuredSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#8B0000',
    marginBottom: 15,
  },
  featuredCard: {
    backgroundColor: 'rgba(139, 0, 0, 0.9)',
    borderRadius: 15,
    padding: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  featuredBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B0000',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  premiumSection: {
    marginBottom: 30,
  },
  premiumCard: {
    backgroundColor: 'rgba(255, 255, 240, 0.95)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#8B0000',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  premiumDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#27AE60',
  },
  discountBadge: {
    position: 'absolute',
    right: -50,
    top: -10,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  paymentButton: {
    backgroundColor: '#27AE60',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 10,
  },
  featuresList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    fontWeight: '500',
  },
  newsSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#8B0000',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 240, 0.95)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#8B0000',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#8B0000',
    marginBottom: 8,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  readTime: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  actionsSection: {
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 15,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 240, 0.95)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#8B0000',
    textAlign: 'center',
  },
});