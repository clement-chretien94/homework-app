import { useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { HomeworkData } from './data/HomeworkData';
import HomeworkList from './components/HomeworkList/HomeworkList';
import AddButton from './components/AddButton/AddButton';

export default function App() {

  const [data, setData] = useState(HomeworkData);

  const handleAdd = (homeWorkToAdd) => {
    setData([...data, homeWorkToAdd]);
  }

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id != id));
  }

  const handleComplete = (id) => {
    setData(data.map((item) => {
      if (item._id == id) {
        item.completed = !item.completed;
      }
      return item;
    }));
  }

  console.log(data.length);

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