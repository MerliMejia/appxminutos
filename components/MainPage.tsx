import { Button, Text } from "@rneui/themed";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";

export const MainPage = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.title}>Welcome to the Main Page</Text>
        <Button
          title="Sign Out"
          onPress={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) Alert.alert(error.message);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  mt20: {
    marginTop: 20,
  },
});
