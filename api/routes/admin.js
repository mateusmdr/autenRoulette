import express from "express";
const router = express.Router();

/**API routes */
router.get('/', (req,res) => {
    res.send('Admin Home Page');
});
/***/

export default router;