import express from "express";
const route = express.Router();

/**API routes */
route.get('/', (req,res) => {
    res.send('Admin Home Page');
});
/***/

export default route;