import { MovieCard } from "@/components/movie-card";
import { useMovies } from "@/context/MoviesContext";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
  const { savedMovies, toggleSave } = useMovies();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Saved Movies</Text>

      {savedMovies.length === 0 ? (
        <Text style={styles.empty}>No saved movies yet!</Text>
      ) : (
        <FlatList
          data={savedMovies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <MovieCard movie={item} onToggleSave={() => toggleSave(item.id)} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f3f5f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#111827",
  },
  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 17,
    color: "#888",
  },
});
