import { Button, Input, Text } from "@rneui/themed";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useState } from "react";

export const MainPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const addItem = async () => {
    const { data: userResponse } = await supabase.auth.getUser();
    const user = userResponse.user;

    const now = new Date();

    if (!user) {
      Alert.alert("You must be signed in to add an item");
      return;
    }

    const { data, error } = await supabase.from("items").insert([
      {
        title: title,
        desc: desc,
        user_id: user.id,
        updated_at: now.toISOString(),
      },
    ]);
    if (error) Alert.alert(error.message);
    else {
      setTitle("");
      setDesc("");
      Alert.alert("Item Added Successfully");
    }
  };

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
      <View
        style={{
          alignSelf: "stretch",
        }}
      >
        <Input
          placeholder="Title"
          value={title}
          onChangeText={(e) => setTitle(e)}
        />
        <Input
          placeholder="Description"
          multiline
          numberOfLines={10}
          value={desc}
          onChangeText={(e) => setDesc(e)}
        />
        <Button title="Add" onPress={addItem} />
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  mt20: {
    marginTop: 20,
  },
});
