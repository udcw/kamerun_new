import { USE_FIREBASE, getStorageUrl, getVillageSubcollection } from "@/firebase/kamerun";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
<<<<<<< HEAD
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/lib/supabase";

interface Histoire {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  audio_url: string | null;
=======
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Données statiques
const STATIC_STORIES = [
  {
    id: "1",
    title: "Le roi et le léopard",
    summary: "Un récit ancien parlant d'un roi dont la bravoure fut testée...",
    full: `Dans un village reculé vivait un roi dont la bravoure faisait trembler même les esprits de la forêt. 
Un jour, un léopard sacré apparut près du palais... (texte complet ici)`,
    image: "https://i.imgur.com/sCEZzQF.jpeg"
  },
  {
    id: "2",
    title: "L'enfant du tambour",
    summary: "Une histoire initiatique sur la force de la musique...",
    full: `On raconte qu'un enfant, né durant la saison des pluies, possédait un don unique : chaque fois qu'il frappait le tambour...`,
    image: "https://i.imgur.com/Wu35J0h.jpeg"
  },
  {
    id: "3",
    title: "L'arbre interdit",
    summary: "Légende expliquant un rite sacré lié aux ancêtres...",
    full: `Au centre du village se dressait un arbre millénaire. Nul n'avait le droit de le toucher, car on disait qu'il abritait la voix des ancêtres...`,
    image: "https://i.imgur.com/YkYoJqP.jpeg"
  }
];

interface Story {
  id: string;
  title: string;
  summary: string;
  full: string;
  image: string;
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
}

export default function HistoirePage() {
  const { village } = useLocalSearchParams();
  let data: { id: any; name: any; } | null = null;

  try {
    data = JSON.parse(village as string);
  } catch (e) {
    console.warn("⚠️ Paramètre 'village' invalide :", village);
<<<<<<< HEAD
    data = { id: null, name: "Village inconnu" };
  }

  const router = useRouter();

  const [histoires, setHistoires] = useState<Histoire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState<Histoire | null>(null);
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Charger les histoires depuis Supabase
  useEffect(() => {
    if (!data?.id) {
      setError("ID du village non fourni");
      setLoading(false);
      return;
    }

    loadHistoires();

    // Cleanup du son lors du démontage
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, [data?.id]);

  const loadHistoires = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: histoiresData, error: histoiresError } = await supabase
        .from("histoires")
        .select("*")
        .eq("village_id", data?.id)
        .order("title", { ascending: true });

      if (histoiresError) throw histoiresError;

      setHistoires(histoiresData || []);
    } catch (err: any) {
      console.error("Erreur chargement histoires:", err);
      setError(err.message || "Erreur lors du chargement des histoires");
=======
    data = { name: "Village inconnu", id: "" };
  }

  const router = useRouter();
  const [stories, setStories] = useState<Story[]>(STATIC_STORIES);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (USE_FIREBASE && data?.id) {
      loadFirebaseData();
    } else {
      setStories(STATIC_STORIES);
    }
  }, []);

  const loadFirebaseData = async () => {
    setLoading(true);
    try {
      const docs = await getVillageSubcollection(data?.name?.toLowerCase(), 'histoires');
      
      const formattedData = await Promise.all(
        docs.map(async (doc: any) => {
          let imageUrl = "";
          if (doc.imageUrl) {
            imageUrl = await getStorageUrl(doc.imageUrl);
          }
          
          return {
            id: doc.id,
            title: doc.title || "",
            summary: doc.content ? doc.content.substring(0, 100) + "..." : "",
            full: doc.content || "",
            image: imageUrl || "https://placehold.co/600x400/png",
          };
        })
      );
      
      setStories(formattedData);
    } catch (error) {
      console.error("Erreur chargement histoires:", error);
      setStories(STATIC_STORIES);
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // Filtrer les résultats
  const filtered = histoires.filter((story) =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  // Lecture audio
  const playAudio = async (audioUrl: string | null) => {
    try {
      // Si déjà en lecture, arrêter
      if (currentSound && isPlaying) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        setCurrentSound(null);
        setIsPlaying(false);
        return;
      }

      // Nettoyer le son précédent
      if (currentSound) {
        await currentSound.unloadAsync();
      }

      if (!audioUrl) {
        console.warn("Pas d'URL audio disponible");
        return;
      }

      // Créer et jouer le nouveau son
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );

      setCurrentSound(sound);
      setIsPlaying(true);

      // Gérer la fin de lecture
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          setCurrentSound(null);
          setIsPlaying(false);
        }
      });
    } catch (err) {
      console.error("Erreur lecture audio:", err);
      setIsPlaying(false);
    }
  };

  // Fermer la modal et arrêter l'audio
  const closeModal = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setCurrentSound(null);
      setIsPlaying(false);
    }
    setSelectedStory(null);
  };

  // Affichage du chargement
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Histoires de {data?.name}</Text>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0A84FF" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Affichage des erreurs
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Histoires de {data?.name}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0A84FF" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadHistoires} style={styles.retryButton}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
=======
  const filtered = stories.filter(story =>
    story.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0A84FF" style={{ marginTop: 50 }} />
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
          Chargement des histoires...
        </Text>
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0A84FF" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Histoires de {data?.name}</Text>
      <Text style={styles.subtitle}>
        Récits, légendes et contes traditionnels
      </Text>

      {/* Barre de recherche */}
=======
      <Text style={styles.title}>Histoires de {data?.name}</Text>
      <Text style={styles.subtitle}>Récits, légendes et contes traditionnels</Text>
      
      <Text style={styles.modeIndicator}>
        Mode: {USE_FIREBASE ? 'Firebase' : 'Statique'}
      </Text>
      
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Rechercher une histoire..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="book-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>
            {search ? "Aucun résultat trouvé" : "Aucune histoire disponible"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedStory(item)}
            >
              {item.image_url ? (
                <Image
                  source={{ uri: item.image_url }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.image, styles.imagePlaceholder]}>
                  <Ionicons name="book" size={32} color="#ccc" />
                </View>
              )}

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.content && (
                  <Text style={styles.cardSummary} numberOfLines={2}>
                    {item.content.substring(0, 100)}...
                  </Text>
                )}
              </View>

              <Ionicons name="chevron-forward" size={26} color="#888" />
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal de lecture */}
      <Modal visible={!!selectedStory} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                <Ionicons name="close" size={28} color="#444" />
              </TouchableOpacity>

              {selectedStory?.audio_url && (
                <TouchableOpacity
                  onPress={() => playAudio(selectedStory.audio_url)}
                  style={styles.audioBtn}
                >
                  <Ionicons
                    name={isPlaying ? "pause-circle" : "play-circle"}
                    size={32}
                    color="#0A84FF"
                  />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedStory && (
                <>
                  {selectedStory.image_url ? (
                    <Image
                      source={{ uri: selectedStory.image_url }}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.modalImage, styles.imagePlaceholder]}>
                      <Ionicons name="book" size={48} color="#ccc" />
                    </View>
                  )}

                  <Text style={styles.modalTitle}>{selectedStory.title}</Text>

                  {selectedStory.content ? (
                    <Text style={styles.modalText}>{selectedStory.content}</Text>
                  ) : (
                    <Text style={styles.noContentText}>
                      Contenu non disponible
                    </Text>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backText: {
    fontSize: 16,
    color: "#0A84FF",
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
<<<<<<< HEAD

  searchInput: {
    flex: 1,
    fontSize: 16,
  },
=======
  modeIndicator: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    fontStyle: "italic",
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: "#0A84FF",
    fontSize: 16,
  },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  imagePlaceholder: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSummary: {
    fontSize: 14,
    color: "#666",
  },

  // Styles modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    height: "85%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  closeBtn: {
    padding: 4,
  },

  audioBtn: {
    padding: 4,
  },

  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 14,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 20,
  },
  noContentText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },

  // États
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0A84FF",
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});