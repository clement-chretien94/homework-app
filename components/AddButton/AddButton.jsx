import {useState} from 'react';
import * as Crypto from 'expo-crypto';
import {TouchableOpacity, View, Text, TextInput, Button, Modal, StyleSheet} from 'react-native';
import AddLogo from '../../assets/AddLogo.svg';

const AddButton = ({handleAdd}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [titleValue, onChangeTextTitle] = useState('');
    const [descriptionValue, onChangeTextDescription] = useState('');
    const [subjectValue, onChangeTextSubject] = useState('');
    const [schoolGroupValue, onChangeTextschoolGroup] = useState('');
    const [teacherValue, onChangeTextTeacher] = useState('');
    const [dueDateValue, onChangeDueDate] = useState();

    const formattedDate = (dateString) => {
        // From "DD/MM/YYYY HH:MM" to "YYYY-MM-DDTHH:MM:00.000Z"
        let day = dateString.slice(0, 2);
        let month = dateString.slice(3, 5);
        let year = dateString.slice(6, 10);
        let hours = dateString.slice(11, 13);
        let minutes = dateString.slice(14, 16);

        return `${year}-${month}-${day}T${hours-2}:${minutes}:00.000Z`;
    }

    function isDateValid(dateStr) {
        return !isNaN(new Date(dateStr));
    }

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                <AddLogo width={16} height={16}/>
            </TouchableOpacity>
            <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{backgroundColor: 'white', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5}}>
                        
                        <Text>What is the title of your homework?</Text>
                        <TextInput style={{borderBottomWidth: 1, borderBottomColor: '#0059C9', width: 200, marginVertical: 16}} placeholder="Lorem ipsum dolor" value={titleValue} onChangeText={text => onChangeTextTitle(text)}/>

                        <Text>What is the description of your homework?</Text>
                        <TextInput style={{borderBottomWidth: 1, borderBottomColor: '#0059C9', width: 200, marginVertical: 16}} placeholder="Lorem ipsum dolor" value={descriptionValue} onChangeText={text => onChangeTextDescription(text)}/>

                        <Text>What is the subject of your homework?</Text>
                        <TextInput style={{borderBottomWidth: 1, borderBottomColor: '#0059C9', width: 200, marginVertical: 16}} placeholder="Lorem ipsum dolor" value={subjectValue} onChangeText={text => onChangeTextSubject(text)}/>

                        <Text>What is the group of your homework?</Text>
                        <TextInput style={{borderBottomWidth: 1, borderBottomColor: '#0059C9', width: 200, marginVertical: 16}} placeholder="Lorem ipsum dolor" value={schoolGroupValue} onChangeText={text => onChangeTextschoolGroup(text)}/>

                        <Text>What is the teacher of your homework?</Text>
                        <TextInput style={{borderBottomWidth: 1, borderBottomColor: '#0059C9', width: 200, marginVertical: 16}} placeholder="Lorem ipsum dolor" value={teacherValue} onChangeText={text => onChangeTextTeacher(text)}/>

                        <Text>What is the due date of your homework?</Text>
                        <TextInput style={{borderBottomWidth: 1, borderBottomColor: '#0059C9', width: 200, marginVertical: 16}} placeholder="Lorem ipsum dolor" value={dueDateValue} onChangeText={text => onChangeDueDate(text)}/>

                        <Button title="Create" onPress={ () => {
                            if (isDateValid(formattedDate(dueDateValue)))
                            {
                                handleAdd({id: Crypto.randomUUID(), title: titleValue, description: descriptionValue, subject: subjectValue, schoolGroup: schoolGroupValue, teacher: teacherValue, dueDate: new Date(formattedDate(dueDateValue)), completed: false});
                                setModalVisible(!modalVisible);
                            }
                            else
                            {
                                alert('Invalid date');
                            }
                        }}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0059C9',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 16,
        bottom: 16,
        right: 16
    },
});

export default AddButton;