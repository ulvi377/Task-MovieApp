import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.userBox}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={50} color="#4f46e5" />
        </View>

        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.subtitle}>Movie Lover 🎬</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.navigate("/saved")}
        >
          <Ionicons name="heart-outline" size={22} color="#111827" />
          <Text style={styles.menuText}>My Saved Movies</Text>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            Alert.alert("About App", "Movie App v1.0.0\nBuilt with Expo Router.")
          }
        >
          <Ionicons name="information-circle-outline" size={22} color="#111827" />
          <Text style={styles.menuText}>About App</Text>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert("Settings", "Settings are coming soon.")}
        >
          <Ionicons name="settings-outline" size={22} color="#111827" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.lastItem]}
          onPress={() => Alert.alert("Logout", "You have been logged out.")}
        >
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text style={[styles.menuText, styles.logout]}>Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
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
  userBox: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#777",
    marginTop: 4,
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eef0f4",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  logout: {
    color: "#ef4444",
  },
});
