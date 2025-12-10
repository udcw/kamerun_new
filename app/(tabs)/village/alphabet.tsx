<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
=======
import { USE_FIREBASE, getVillageSubcollection } from "@/firebase/kamerun";
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
<<<<<<< HEAD
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "@/lib/supabase";

interface AlphabetEntry {
  id: string;
  french: string;
  local: string;
  audio_url: string | null;
=======
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Données statiques
const STATIC_ALPHABET = [
  { fr: "A", local: "A" },
  { fr: "B", local: "Ɓ" },
  { fr: "C", local: "Ch" },
  { fr: "D", local: "D" },
  { fr: "E", local: "Ɛ" },
  { fr: "F", local: "F" },
  { fr: "G", local: "G" },
  { fr: "H", local: "H" },
  { fr: "I", local: "I" },
  { fr: "J", local: "Dz" },
  { fr: "K", local: "K" },
  { fr: "L", local: "L" },
  { fr: "M", local: "M" },
  { fr: "N", local: "Ŋ" },
  { fr: "O", local: "Ɔ" },
  { fr: "P", local: "P" },
  { fr: "Q", local: "-" },
  { fr: "R", local: "R" },
  { fr: "S", local: "S" },
  { fr: "T", local: "T" },
  { fr: "U", local: "U" },
  { fr: "V", local: "V" },
  { fr: "W", local: "W" },
  { fr: "X", local: "-" },
  { fr: "Y", local: "Y" },
  { fr: "Z", local: "Z" },
];

interface AlphabetItem {
  fr: string;
  local: string;
  audio?: string | null;
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
}

export default function AlphabetPage() {
  const { village } = useLocalSearchParams();
  let data: { id: any; name: any; } | null = null;

  try {
    data = JSON.parse(village as string);
  } catch (e) {
    console.warn("⚠️ Paramètre 'village' invalide :", village);
<<<<<<< HEAD
    data = { id: null, name: "Village inconnu" };
=======
    data = { name: "Village inconnu", id: "" };
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
  }

  const router = useRouter();
  const [alphabetData, setAlphabetData] = useState<AlphabetItem[]>(STATIC_ALPHABET);
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  const [alphabetData, setAlphabetData] = useState<AlphabetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);

  // Charger l'alphabet depuis Supabase
  useEffect(() => {
    if (!data?.id) {
      setError("ID du village non fourni");
      setLoading(false);
      return;
    }

    loadAlphabet();

    // Cleanup du son lors du démontage
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, [data?.id]);

  const loadAlphabet = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: alphabetDataResult, error: alphabetError } = await supabase
        .from("alphabet")
        .select("*")
        .eq("village_id", data?.id)
        .order("french", { ascending: true });

      if (alphabetError) throw alphabetError;

      setAlphabetData(alphabetDataResult || []);
    } catch (err: any) {
      console.error("Erreur chargement alphabet:", err);
      setError(err.message || "Erreur lors du chargement de l'alphabet");
=======
  // AUDIO STATE
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  // Détruit le son quand on quitte la page
  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  useEffect(() => {
    if (USE_FIREBASE && data?.id) {
      loadFirebaseData();
    } else {
      setAlphabetData(STATIC_ALPHABET);
    }
  }, []);

  const loadFirebaseData = async () => {
    setLoading(true);
    try {
      const docs = await getVillageSubcollection(
        data?.name?.toLowerCase(),
        "alphabet"
      );

      const formattedData = docs.map((doc: any) => ({
        fr: doc.french || "",
        local: doc.local || "",
        audio: doc.audioUrl || null,
      }));

      formattedData.sort((a: { fr: string; }, b: { fr: any; }) => a.fr.localeCompare(b.fr));

      setAlphabetData(formattedData);
    } catch (error) {
      console.error("Erreur chargement alphabet:", error);
      setAlphabetData(STATIC_ALPHABET);
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // Lecture audio
  const playSound = async (audioUrl: string | null) => {
    try {
      // Arrêter le son précédent s'il existe
      if (currentSound) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        setCurrentSound(null);
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

      // Libérer la ressource après lecture
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          setCurrentSound(null);
        }
      });
    } catch (err) {
      console.error("Erreur lecture audio:", err);
    }
  };

  // Affichage du chargement
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Alphabet de {data?.name}</Text>
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
        <Text style={styles.title}>Alphabet de {data?.name}</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0A84FF" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadAlphabet} style={styles.retryButton}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
=======
  // PLAY AUDIO
  const playAudio = async (url: string) => {
    try {
      // si déjà en lecture → stop
      if (sound && currentAudio === url) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setCurrentAudio(null);
        return;
      }

      // Stop autre son
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );

      setSound(newSound);
      setCurrentAudio(url);
    } catch (error) {
      console.error("Erreur audio:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0A84FF" style={{ marginTop: 50 }} />
        <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
          Chargement de l'alphabet...
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

      <Text style={styles.title}>Alphabet de {data?.name}</Text>
      <Text style={styles.subtitle}>
        {alphabetData.length} {alphabetData.length > 1 ? "lettres" : "lettre"}
      </Text>

      {alphabetData.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="text-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Aucune donnée d'alphabet disponible</Text>
        </View>
      ) : (
        <>
          <View style={styles.headerRow}>
            <Text style={[styles.headerText, { flex: 1 }]}>Français</Text>
            <Text style={[styles.headerText, { flex: 1.5 }]}>
              {data?.name} — Alphabet
            </Text>
            <View style={{ width: 40 }} />
=======
      <Text style={styles.title}>Alphabet de {data?.name}</Text>

      <Text style={styles.modeIndicator}>
        Mode: {USE_FIREBASE ? "Firebase" : "Statique"}
      </Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <Text style={[styles.headerText, { flex: 1 }]}>Français</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>{data?.name}</Text>
        <Text style={[styles.headerText, { width: 80 }]}>Audio</Text>
      </View>

      <FlatList
        data={alphabetData}
        keyExtractor={(item) => item.fr}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 1 }]}>{item.fr}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.local}</Text>

            {/* 🎧 Bouton audio */}
            {item.audio ? (
              <TouchableOpacity
                onPress={() => playAudio(item.audio!)}
                style={styles.audioButton}
              >
                <Text style={styles.audioText}>
                  {currentAudio === item.audio ? "⏸" : "🔊"}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={[styles.audioText, { opacity: 0.3 }]}>—</Text>
            )}
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
          </View>

          <FlatList
            data={alphabetData}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={[styles.cell, { flex: 1 }]}>{item.french}</Text>
                <Text style={[styles.cell, { flex: 1.5 }]}>{item.local}</Text>

                {item.audio_url ? (
                  <TouchableOpacity
                    onPress={() => playSound(item.audio_url)}
                    style={styles.audioButton}
                  >
                    <Ionicons
                      name="volume-high-outline"
                      size={24}
                      color="#0A84FF"
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.audioButton}>
                    <Ionicons
                      name="volume-mute-outline"
                      size={24}
                      color="#ccc"
                    />
                  </View>
                )}
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
    color: "#222",
  },
<<<<<<< HEAD
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
=======
  audioButton: {
    width: 60,
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  audioText: {
    fontSize: 20,
  },
  modeIndicator: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    fontStyle: "italic",
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    color: "#0A84FF",
    fontSize: 16,
  },
>>>>>>> 0d6338c (Préparation du projet a recevoir les données dynamiques depuis la base de données de Firebase)
  headerRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    marginBottom: 8,
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#444",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  cell: {
    fontSize: 18,
    color: "#333",
  },
  audioButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
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