import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

const newsData = [
  {
    id: '1',
    title: "Nouvelle découverte dans le village Baka",
    description: "Les Baka du sud-est célèbrent un festival culturel exceptionnel...",
  },
  {
    id: '2',
    title: "Festival des danses traditionnelles à l'Ouest",
    description: "La région de l'Ouest accueille des centaines de visiteurs...",
  },
  {
    id: '3',
    title: "Les traditions culinaires des tribus du Nord",
    description: "Découvrez les plats typiques et leur histoire...",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: { id: string; title: string; description: string } }) => {
    return (
      
      <TouchableOpacity style={styles.card} onPress={() => alert(item.title)}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <ImageBackground
      source={require('@/assets/images/a.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>Kamerun News</Text>
          <Text style={styles.subtitle}>Actualités tribales du Cameroun</Text>
        </View>

        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: 15 },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#8B0000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4B0082',
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 240, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B0000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
  },
});

// import React from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';

// export default function HomeScreen({ navigation }: any) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bienvenue sur la Home Page</Text>
//       <Button title="Ouvrir le menu" onPress={() => navigation.openDrawer()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 22, fontWeight: '700' },
// });
