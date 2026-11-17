import { Movie } from "@/data/movies";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MovieCardProps = {
  movie: Movie;
  onToggleSave?: () => void;
};

export function MovieCard({ movie, onToggleSave }: MovieCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: "/movie/[id]",
          params: { id: movie.id },
        });
      }}
    >
      {movie.imageUrl ? (
        <Image source={{ uri: movie.imageUrl }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.posterEmpty]}>
          <Ionicons name="image-outline" size={30} color="#9ca3af" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {movie.name}
        </Text>
        <Text style={styles.genre} numberOfLines={1}>
          {movie.genre.join(", ")}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="star" size={16} color="#f59e0b" />
          <Text style={styles.rating}>{movie.imdbRating}</Text>
          <Ionicons name="time-outline" size={16} color="#555" />
          <Text style={styles.duration}>{movie.duration}</Text>
        </View>

        <View style={styles.tags}>
          {movie.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>

      {onToggleSave ? (
        <TouchableOpacity onPress={onToggleSave} style={styles.action}>
          <Ionicons
            name={movie.saved ? "bookmark" : "bookmark-outline"}
            size={26}
            color="#4f46e5"
          />
        </TouchableOpacity>
      ) : (
        <Ionicons name="chevron-forward" size={22} color="#555" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
    padding: 12,
    gap: 14,
  },
  poster: {
    width: 75,
    height: 105,
    borderRadius: 8,
  },
  posterEmpty: {
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  genre: {
    color: "#777",
    marginTop: 3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  rating: {
    fontWeight: "600",
    marginRight: 10,
  },
  duration: {
    color: "#555",
  },
  tags: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#e0e7ff",
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
  action: {
    padding: 4,
  },
});
