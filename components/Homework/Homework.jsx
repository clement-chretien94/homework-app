import { useState } from 'react';
import { TouchableOpacity, Modal, View, Button, Text, StyleSheet } from 'react-native';

const Homework = ({...props}) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={[styles.container, props.completed ? styles.finished : 0]} onPress={() => props.handleComplete(props.id)} onLongPress={() => setModalVisible(true)}>
          <Text>Titre : {props.title}</Text>
          <Text>Description : {props.description}</Text>
          <Text>Matière : {props.subject}</Text>
          <Text>Groupe : {props.schoolGroup}</Text>
          <Text>Professeur : {props.teacher}</Text>
          <Text>Heure : {props.dueDate.getHours()}:{props.dueDate.getMinutes()}</Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{backgroundColor: 'white', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5}}>    
              <Text>Are you sure you want to delete with this homework?</Text>
              <Button title="Yes" onPress={() => {
                  props.handleDelete(props.id)
                  setModalVisible(!modalVisible)
                }}
              />
            </View>
          </View>
        </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,

    width: 296,
    
    padding: 8,
    margin: 8,
  },
  finished : {
    backgroundColor: '#1cc741',
  }
});

export default Homework;