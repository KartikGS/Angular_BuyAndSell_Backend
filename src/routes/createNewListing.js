import {v4 as uuid} from 'uuid'
import { db } from '../database'
import * as admin from 'firebase-admin'

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        const id = uuid();
        const { name = '', description = '', price = 0} = req.payload;
        const views = 0;
        const token = req.headers.authtoken;
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.uid;

        await db.query(`
            INSERT INTO listings (id, name, description, price, user_id, views)
                VALUES (?,?,?,?,?, ?);
            `,
            [id, name, description, price, userId, views]
        );

        return { id, name, description, price, user_id:userId, views};
    }
}