import { useMovies } from "@/context/MoviesContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { getMovie, toggleSave } = useMovies();

  const movie = getMovie(id);

  if (!movie) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.notFound}>Movie not found!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={movie.imageUrl ? { uri: movie.imageUrl } : undefined}
        style={styles.poster}
        imageStyle={styles.posterImage}
      >
        <View style={styles.overlay}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{movie.name}</Text>

            <TouchableOpacity onPress={() => toggleSave(movie.id)}>
              <Ionicons
                name={movie.saved ? "bookmark" : "bookmark-outline"}
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tags}>
            {movie.tags.map((tag) => (
              <Text key={tag} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <View style={styles.statValue}>
              <Ionicons name="star" size={20} color="#f59e0b" />
              <Text style={styles.statText}>{movie.imdbRating}</Text>
            </View>
            <Text style={styles.statLabel}>IMDb</Text>
          </View>

          <View style={styles.stat}>
            <View style={styles.statValue}>
              <Text style={styles.statEmoji}>🍅</Text>
              <Text style={styles.statText}>{movie.rotten}</Text>
            </View>
            <Text style={styles.statLabel}>Rotten</Text>
          </View>

          <View style={styles.stat}>
            <View style={styles.statValue}>
              <Ionicons name="time-outline" size={20} color="#fff" />
              <Text style={styles.statText}>{movie.duration}</Text>
            </View>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Genre</Text>
        <View style={styles.genres}>
          {movie.genre.map((item) => (
            <Text key={item} style={styles.genre}>
              {item}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{movie.description}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleSave(movie.id)}
        >
          <Ionicons
            name={movie.saved ? "bookmark" : "bookmark-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {movie.saved ? "Unsave" : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  notFound: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  poster: {
    height: 380,
    justifyContent: "flex-end",
    backgroundColor: "#1e293b",
  },
  posterImage: {
    resizeMode: "cover",
  },
  overlay: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#334155",
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statEmoji: {
    fontSize: 18,
  },
  statText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 13,
  },
  sectionTitle: {
    color: "#cbd5e1",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 22,
  },
  genre: {
    borderWidth: 1,
    borderColor: "#475569",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    overflow: "hidden",
  },
  description: {
    color: "#e2e8f0",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
