/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Utility delay function
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const processWithRandomDelay = onRequest(async (req, res) => {
    logger.info("Hello logs!", {structuredData: true});
    const minDelay = 30000; // 30 seconds
    const maxDelay = 60000; // 60 seconds
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    console.log(`Delaying for ${randomDelay} ms...`);

    await delay(randomDelay);

    res.status(200).json({
        status: 'success',
        message: `Processed after ${randomDelay / 1000} seconds`
    });
});
