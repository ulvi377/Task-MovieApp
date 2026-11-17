import { MovieCard } from "@/components/movie-card";
import { useMovies } from "@/context/MoviesContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { movies } = useMovies();

  const [searchVisible, setSearchVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Movies</Text>

        <TouchableOpacity
          onPress={() => {
            setSearchVisible(!searchVisible);
            setSearch("");
          }}
        >
          <Ionicons
            name={searchVisible ? "close" : "search"}
            size={26}
            color="#111827"
          />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <TextInput
          style={styles.search}
          placeholder="Search movies..."
          value={search}
          onChangeText={setSearch}
          autoFocus
        />
      )}

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.empty}>No movies found!</Text>}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f3f5f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 17,
    color: "#888",
  },
});
