import { Client, Databases, ID } from 'appwrite';

// 1. Initialize the SDK
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('69c1aefe0001cc52eb04'); 

// 2. Initialize the Database service
const databases = new Databases(client);

// 3. Export the submission function
export const submitQuestionnaire = async (data) => {
    try {
        return await databases.createDocument(
            '69c21463003b58b5b871', // Database ID
            'submissions',          // Collection ID
            ID.unique(),
            data
        );
    } catch (error) {
        console.error("Appwrite Error:", error);
        throw error;
    }
};