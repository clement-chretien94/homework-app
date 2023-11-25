import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { HomeworkData } from './data/HomeworkData';
import HomeworkList from './components/HomeworkList/HomeworkList';
import AddButton from './components/AddButton/AddButton';

export default function App() {
  const db = SQLite.openDatabase('homework.db');
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  // This is for the database creation
  useEffect(() => {
    console.log('useEffect');
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS homeworks (id TEXT NOT NULL, title TEXT NOT NULL, description TEXT, subject TEXT NOT NULL, schoolGroup TEXT NOT NULL, teacher TEXT NOT NULL, dueDate INTEGER NOT NULL, completed INTEGER NOT NULL, CONSTRAINT pk_homeworks PRIMARY KEY(id), CONSTRAINT c_homeworks_completed CHECK(completed IN (0,1)));');
    });

    // This code delete the table | Only for development
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DROP TABLE IF EXISTS homeworks;',
    //     [],
    //     (txtObj, resultSet) => console.log("Table dropped"),
    //     (txtObj, error) => console.log(error)
    //   );
    // });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM homeworks;', null,
        (txtObj, resultSet) => {
          const dataWithDates = resultSet.rows._array.map((item) => {
            return {
              ...item,
              dueDate: new Date(item.dueDate)
            };
          });
          setData(dataWithDates);
        },
        (txtObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  const handleAdd = (homeWorkToAdd) => {
    console.log(homeWorkToAdd);
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO homeworks (id, title, description, subject, schoolGroup, teacher, dueDate, completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [homeWorkToAdd.id, homeWorkToAdd.title, homeWorkToAdd.description, homeWorkToAdd.subject, homeWorkToAdd.schoolGroup, homeWorkToAdd.teacher, homeWorkToAdd.dueDate.getTime(), homeWorkToAdd.completed],
        () => {
          console.log("data added");
          setData(prevData => [...prevData, homeWorkToAdd]);
        },
        (txtObj, error) => console.log(error)
      );
    });
  }

  const handleDelete = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM homeworks WHERE id = ?;',
        [id],
        () => {
          setData(data.filter((item) => item.id != id));
        },
        (txtObj, error) => console.log(error)
      );
    });
  }
  
  const handleComplete = (id) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE homeworks SET completed = NOT completed WHERE id = ?;',
        [id],
        () => {
          setData(data.map((item) => {
            if (item.id == id) {
              item.completed = !item.completed;
            }
            return item;
          }));
        },
        (txtObj, error) => console.log(error)
      );
    });
  }

  console.log(data.length);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <HomeworkList data={data} handleDelete={handleDelete} handleComplete={handleComplete}/>
        <AddButton handleAdd={handleAdd}/>
      </SafeAreaView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    // marginTop: StatusBar.currentHeight,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});