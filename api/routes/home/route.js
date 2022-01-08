import express from "express";
import path from 'path';
const route = express.Router();

/**Home route */
route.get('/',(req, res) => {
    res.sendStatus(200);
});
/***/

route.get('/assets/:filename', (req, res) => {
    if(req.params.filename.match(/(\.\.)|(\\)|(\/)/g))
        return res.status(404).send({error: 'Not Found'});

    console.log(req.params.filename);
    const assetPath = path.join(path.resolve(),'./assets/',req.params.filename);
    res.sendFile(assetPath);
});

export default route;