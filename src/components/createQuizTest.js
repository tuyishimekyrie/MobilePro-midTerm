import React, { useEffect, useState,useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
// import * as SQLite from 'expo-sqlite';

const dbSQLite = SQLite.openDatabase("myDatabase.db");

export default function CreateQuizTest() {
  //   const [sqliteData, setSQLiteData] = useState([]);
  const [quizData, setQuizData] = useState([]);

  //   useEffect(() => {
  //     retrieveFromSQLite();
  //     console.log("sqliteData",sqliteData)
  //   }, []);

  //   const retrieveFromSQLite = () => {
  //     dbSQLite.transaction(
  //       (tx) => {
  //         tx.executeSql(
  //           "SELECT * FROM Quiz",
  //           [],
  //           (_, { rows: { _array } }) => {
  //             console.log("Data retrieved from SQLite: ", _array);
  //             setSQLiteData(_array);
  //           },
  //           (_, error) => {
  //             console.error("Error retrieving data from SQLite: ", error);
  //           }
  //         );
  //       },
  //       (error) => {
  //         console.error("Transaction error in SQLite: ", error);
  //       }
  //     );
  //   };
  //   const fetchQuizData = async () => {
  //     try {
  //       // Fetch quiz data from Firestore
  //       const querySnapshot = await getDocs(collection(db, "quizzes"));
  //       const fetchedQuizData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       // Set state with fetched data
  //       setQuizData(fetchedQuizData);
  //       console.log(quizData)

  //       // Insert fetched data into SQLite
  //       dbSQLite.transaction((tx) => {
  //         fetchedQuizData.forEach((quiz) => {
  //           tx.executeSql(
  //             `
  //                   INSERT INTO Quiz (id, quizTitle, numberOfQuestions, questions) VALUES (?, ?, ?, ?);
  //             `,
  //             [
  //               quiz.id,
  //               quiz.quizTitle,
  //               quiz.numberOfQuestions,
  //               JSON.stringify(quiz.questions),
  //             ],
  //             (_, result) => {
  //               console.log("Quiz data inserted into SQLite");
  //             },
  //             (_, error) => {
  //               console.error("Error inserting quiz data into SQLite:", error);
  //               return true; // Return true to rollback the transaction
  //             }
  //           );
  //         });
  //       });
  //     } catch (error) {
  //       console.error("Error fetching quiz data:", error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchQuizData();
  //   }, []);
  //   console.log("quizData : ", quizData);
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         // Fetch quiz data from Firestore
//         const querySnapshot = await getDocs(collection(db, "quizzes"));
//         const fetchedQuizData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         // Set state with fetched data
//         setQuizData(fetchedQuizData);
//         // console.log("fetchQuizData", fetchedQuizData);

//         // Insert fetched data into SQLite
//         dbSQLite.transaction((tx) => {
//           fetchedQuizData.forEach((quiz) => {
//             tx.executeSql(
//               `
//               INSERT INTO Quiz (id, quizTitle, numberOfQuestions, questions) VALUES (?, ?, ?, ?);
//             `,
//               [
//                 quiz.id,
//                 quiz.quizTitle,
//                 quiz.numberOfQuestions,
//                 JSON.stringify(quiz.questions),
//               ],
//               (_, result) => {
//                 console.log("Quiz data inserted into SQLite");
//                 // After inserting data, retrieve from SQLite
//                 retrieveFromSQLite();
//               },
//               (_, error) => {
//                 console.error("Error inserting quiz data into SQLite:", error);
//                 return true; // Return true to rollback the transaction
//               }
//             );
//           });
//         });
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//       }
//     };

//     fetchQuizData();
//   }, []);

//   useEffect(() => {
//     const retrieveFromSQLite = () => {
//       dbSQLite.transaction(
//         (tx) => {
//           tx.executeSql(
//             "SELECT * FROM Quiz",
//             [],
//             (_, { rows: { _array } }) => {
//               console.log("Data retrieved from SQLite : ", _array);
//               //   console.log(_array);
//             },
//             (_, error) => {
//               console.error("Error retrieving data from SQLite: ", error);
//             }
//           );
//         },
//         (error) => {
//           console.error("Transaction error in SQLite : ", error);
//         }
//       );
//     };

//     retrieveFromSQLite();
//   }, []);

// useLayoutEffect(() => {
//     const retrieveFromSQLite = () => {
//       dbSQLite.transaction(
//         (tx) => {
//           tx.executeSql(
//             "SELECT * FROM Quiz",
//             [],
//             (_, { rows: { _array } }) => {
//               console.log("Data retrieved from SQLite : ", _array);
//             },
//             (_, error) => {
//               console.error("Error retrieving data from SQLite: ", error);
//             }
//           );
//         },
//         (error) => {
//           console.error("Transaction error in SQLite : ", error);
//         }
//       );
//     };
  
//     retrieveFromSQLite();
//   }, []);
  

  useEffect(() => {
    console.log("quizData : ");
 
      
    // dbSQLite.transaction(
    //   (tx) => {
    //     tx.executeSql(
    //       'DROP TABLE IF EXISTS Quiz',
    //       [],
    //       (_, result) => {
    //         console.log('Table deleted successfully');
    //       },
    //       (_, error) => {
    //         console.error('Error deleting table:');
    //       }
    //     );
    //   }
    // );
  }, [quizData]); // Log quizData whenever it changes
  return (
    <View style={styles.container}>
      <Text>Data from SQLite : </Text>
      {/* {sqliteData.map((item, index) => (
        <View key={index}>
          <Text>{item.input1}</Text>
          <Text>{item.input2}</Text>
        </View>
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
