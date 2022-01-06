import express from "express";
const route = express.Router();

/**Home route */
route.get('/',(req, res) => {
    res.sendStatus(200);
});
/***/

export default route;