import { db } from "../../../utils/db.js";

export const deleteAd = async ({id}) => {
    await db.query('DELETE FROM ads WHERE id=$1',id);
}