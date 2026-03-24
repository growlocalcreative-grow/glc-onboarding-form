import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69c1aefe0001cc52eb04'); 

const databases = new Databases(client);

export const submitQuestionnaire = async (data) => {
    try {
        return await databases.createDocument(
            '69c21463003b58b5b871', 
            'submissions',         
            ID.unique(),
            data
        );
    } catch (error) {
        console.error("Appwrite Error:", error);
        throw error};