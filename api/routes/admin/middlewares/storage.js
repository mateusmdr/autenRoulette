import path from 'path';
import crypto from 'crypto';

import multer from 'multer';
import sharp from 'sharp';

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
        if(!['image/jpeg','image/png'].includes(file.mimetype))
            return cb(new multer.MulterError({code: 'INVALID_FILE_TYPE', msg: "A imagem deve estar no formato jpg/png."}), false);

        cb(null,true);
    }
}).single('image');

const defaultSize = {width: 312, height: 60};

export const resize = async (req, res, next) => {
    const filePath = req.file?.path;
    if(!filePath) next();
    let buffer = await sharp(filePath).resize(defaultSize).toBuffer(); //Resize and save on memory

    sharp(buffer).toFile(filePath); //Overwrite previously uploaded file

    next();
};