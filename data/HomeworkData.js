import * as Crypto from 'expo-crypto';

export const HomeworkData = [
    {
        _id: Crypto.randomUUID(),
        title: "Faire les exercices de Mathématiques",
        description: "Faire les exercices 1 à 10",
        subject: "Mathématiques",
        group: "TD34",
        teacher: "M. Dupont",
        dueDate: new Date(2023, 9, 10, 8, 30),
        completed: false
    },
    {
        _id: Crypto.randomUUID(),
        title: "Faire les exercices de Mathématiques",
        description: "Faire les exercices 1 à 10",
        subject: "Mathématiques",
        group: "TD34",
        teacher: "M. Dupont",
        dueDate: new Date(2023, 9, 10, 10, 30),
        completed: false
    },
    {
        _id: Crypto.randomUUID(),
        title: "Faire les exercices de SQL",
        description: "Faire les exercices 1 à 10",
        subject: "Bases de données",
        group: "TP4",
        teacher: "M. Dupont",
        dueDate: new Date(2023, 9, 15, 8, 30),
        completed: true
    },
    {
        _id: Crypto.randomUUID(),
        title: "Faire les exercices de SQL",
        description: "Faire les exercices 1 à 10",
        subject: "Bases de données",
        group: "TP4",
        teacher: "M. Dupont",
        dueDate: new Date(2023, 9, 15, 10, 30),
        completed: true
    }
]