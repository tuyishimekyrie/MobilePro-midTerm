import React, { useState } from "react";
import { View, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("testdb.db");

const SQLiteTestComponent = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to save data to SQLite
  const saveToSQLite = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS TestData (id INTEGER PRIMARY KEY AUTOINCREMENT, input1 TEXT, input2 TEXT);"
        );
        tx.executeSql(
          "INSERT INTO TestData (input1, input2) VALUES (?, ?);",
          [input1, input2],
          (_, result) => {
            console.log("Data saved to SQLite");
          },
          (_, error) => {
            console.error("Error saving data to SQLite: ", error);
          }
        );
      },
      (error) => {
        console.error("Transaction error in SQLite: ", error);
      }
    );
  };

  // Function to retrieve data from SQLite
  const retrieveFromSQLite = () => {
    setIsLoading(true); // Set loading indicator to true while retrieving data
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM TestData;",
          [],
          (_, { rows: { _array } }) => {
            console.log("Data retrieved from SQLite: ", _array);
            setIsLoading(false); // Set loading indicator to false after data retrieval
            if (_array.length > 0) {
              Alert.alert(
                "Data from SQLite",
                `Input 1: ${_array[0].input1}, Input 2: ${_array[0].input2}`
              );
            } else {
              Alert.alert("No data found in SQLite");
            }
          },
          (_, error) => {
            setIsLoading(false); // Set loading indicator to false in case of error
            console.error("Error retrieving data from SQLite: ", error);
          }
        );
      },
      (error) => {
        setIsLoading(false); // Set loading indicator to false in case of transaction error
        console.error("Transaction error in SQLite: ", error);
      }
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Input 1"
        value={input1}
        onChangeText={(text) => setInput1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Input 2"
        value={input2}
        onChangeText={(text) => setInput2(text)}
      />
      <Button title="Save to SQLite" onPress={saveToSQLite} />
      <Button title="Retrieve from SQLite" onPress={retrieveFromSQLite} />
      {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  loader: {
    marginTop: 20,
  },
});

export default SQLiteTestComponent;
