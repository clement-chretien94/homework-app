import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Homework from '../Homework/Homework';

const HomeworkList = ({data, handleDelete, handleComplete}) => {


    // Slice the data by date by comparing the date of each homework to the date passed as an argument
    const sliceByDate = (date) => {
        return data.filter(work => work.dueDate.getDate() == date.getDate() && work.dueDate.getMonth() == date.getMonth() && work.dueDate.getFullYear() == date.getFullYear()).sort((a, b) => a.dueDate - b.dueDate);
    }

    // Get all the unique dates from the data array and sort them
    const uniqueDates = [];
    data.map(element => element.dueDate).sort((a, b) => a - b).forEach(date => {
        const truncatedDate = new Date(date);
        truncatedDate.setHours(0, 0, 0, 0);
        if (!uniqueDates.some(d => d.getTime() === truncatedDate.getTime())) {
            uniqueDates.push(truncatedDate);
        }
    });

    let workList = [];

    console.log(data.map(element => element.dueDate));

    for (let i = 0; i < uniqueDates.length; i++) {
        sliceByDate(uniqueDates[i]).length > 0 &&
        workList.push (
            <>
                <Text style={styles.date}>{uniqueDates[i].toLocaleDateString("fr")}</Text>
                {sliceByDate(uniqueDates[i]).map(homework => <Homework title={homework.title} description={homework.description} subject={homework.subject} group={homework.group} teacher={homework.teacher} dueDate={homework.dueDate} completed={homework.completed} id={homework._id} handleDelete={handleDelete} handleComplete={handleComplete}/>)}
            </>
        );
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {workList}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    date: {
        color: '#0059C9',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 8,
    }
});

export default HomeworkList;