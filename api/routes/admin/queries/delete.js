import fs from 'fs';
import path from 'path';

import { db } from "../../../utils/db.js";

export const deleteAd = async ({id}) => {
    const {imgfilename} = await db.one('SELECT imgfilename FROM ads WHERE id=$1',id);
    const res = await db.none('DELETE FROM ads WHERE id=$1',id);

    if(!res) {
        fs.unlinkSync(path.join(path.resolve(),'./assets/',imgfilename)); // Remove imageFile from assets
    }
}