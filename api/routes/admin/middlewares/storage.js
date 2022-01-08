import path from 'path';
import crypto from 'crypto';

import multer from 'multer';
import sharp from 'sharp';

sharp.cache(false);

const uniqueName = () => Date.now().toString() + crypto.randomBytes(16).toString('hex');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {       
        const assetPath = path.join(path.resolve(),'./assets/'); 
        cb(null, assetPath);
    },
    filename: function (req, file, cb) {        
        const ext = path.extname(file.originalname);
        cb(null, uniqueName() + ext)
    }
})

export const upload = multer({
    storage,
    limits: {
        fileSize: 20480000 //Limit size to 20MB
    },
    fileFilter: (req, file, cb) => {
        console.log(file);
        if(!['image/jpeg','image/png'].includes(file.mimetype))
            return cb(new multer.MulterError({code: 'INVALID_FILE_TYPE', message: "Must be a jpg/png image"}), false);

        cb(null,true);
    }
}).single('image');

const defaultSize = {width: 312, height: 60};

export const resize = async (req, res, next) => {
    console.log(req.file);
    const filePath = req.file.path;
    let buffer = await sharp(filePath).resize(defaultSize).toBuffer(); //Resize and save on memory

    sharp(buffer).toFile(filePath); //Overwrite previously uploaded file

    next();
};