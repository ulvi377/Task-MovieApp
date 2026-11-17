import { useMovies } from "@/context/MoviesContext";
import { ALL_GENRES, ALL_TAGS, MovieTag } from "@/data/movies";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddMovieScreen() {
  const { addMovie } = useMovies();

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<MovieTag[]>(["2D"]);
  const [genre, setGenre] = useState<string[]>([]);
  const [genreOpen, setGenreOpen] = useState(false);
  const [imdbRating, setImdbRating] = useState("");
  const [rotten, setRotten] = useState("");
  const [duration, setDuration] = useState("");

  const toggleTag = (tag: MovieTag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  };

  const toggleGenre = (item: string) => {
    setGenre((prev) =>
      prev.includes(item) ? prev.filter((g) => g !== item) : [...prev, item],
    );
  };

  const resetForm = () => {
    setImageUrl("");
    setName("");
    setDescription("");
    setTags(["2D"]);
    setGenre([]);
    setGenreOpen(false);
    setImdbRating("");
    setRotten("");
    setDuration("");
  };

  const handleSubmit = () => {
    const rating = Number(imdbRating.replace(",", "."));

    if (
      !name.trim() ||
      !description.trim() ||
      !rotten.trim() ||
      !duration.trim() ||
      tags.length === 0 ||
      genre.length === 0
    ) {
      Alert.alert("Error", "Please fill in all required fields!");
      return;
    }

    if (isNaN(rating) || rating < 0 || rating > 10) {
      Alert.alert("Error", "IMDb rating must be a number from 0 to 10!");
      return;
    }

    addMovie({
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      tags,
      genre,
      imdbRating: rating,
      rotten: rotten.trim(),
      duration: duration.trim(),
    });

    resetForm();
    Alert.alert("Success", "Movie added successfully!");
    router.navigate("/");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text style={styles.title}>Add Movie</Text>

        <View style={styles.imageRow}>
          {imageUrl.trim() ? (
            <Image source={{ uri: imageUrl.trim() }} style={styles.preview} />
          ) : (
            <View style={[styles.preview, styles.previewEmpty]}>
              <Ionicons name="image-outline" size={32} color="#9ca3af" />
            </View>
          )}

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              placeholder="https://..."
              value={imageUrl}
              onChangeText={setImageUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>
        </View>

        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Movie name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Movie description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Tags *</Text>
        <View style={styles.tagsRow}>
          {ALL_TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.checkbox}
              onPress={() => toggleTag(tag)}
            >
              <Ionicons
                name={tags.includes(tag) ? "checkbox" : "square-outline"}
                size={24}
                color="#4f46e5"
              />
              <Text style={styles.checkboxText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Genre *</Text>
        <TouchableOpacity
          style={[styles.input, styles.select]}
          onPress={() => setGenreOpen(!genreOpen)}
        >
          <Text style={genre.length === 0 ? styles.placeholder : undefined}>
            {genre.length === 0 ? "Select genres" : genre.join(", ")}
          </Text>
          <Ionicons
            name={genreOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>

        {genreOpen && (
          <View style={styles.genreBox}>
            {ALL_GENRES.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.genreChip,
                  genre.includes(item) && styles.genreChipActive,
                ]}
                onPress={() => toggleGenre(item)}
              >
                <Text
                  style={[
                    styles.genreText,
                    genre.includes(item) && styles.genreTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.twoColumns}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>IMDb Rating *</Text>
            <TextInput
              style={styles.input}
              placeholder="8.6"
              value={imdbRating}
              onChangeText={setImdbRating}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Rotten *</Text>
            <TextInput
              style={styles.input}
              placeholder="72%"
              value={rotten}
              onChangeText={setRotten}
            />
          </View>
        </View>

        <Text style={styles.label}>Duration *</Text>
        <TextInput
          style={styles.input}
          placeholder="2h 49m"
          value={duration}
          onChangeText={setDuration}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Movie</Text>
        </TouchableOpacity>
      </ScrollView>
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
  imageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 14,
  },
  preview: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 2,
  },
  previewEmpty: {
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
    color: "#111827",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  tagsRow: {
    flexDirection: "row",
    gap: 18,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  checkboxText: {
    fontWeight: "500",
  },
  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: {
    color: "#999",
  },
  genreBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  genreChip: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  genreChipActive: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  genreText: {
    color: "#111827",
  },
  genreTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  twoColumns: {
    flexDirection: "row",
    gap: 14,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 26,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
