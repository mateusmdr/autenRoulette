"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const admin_1 = require("./routes/admin");
// import 'dotenv/config';
/**API setup */
const api = (0, express_1.default)();
api.use((0, cors_1.default)());
api.use(express_1.default.json());
api.use(express_1.default.urlencoded({ extended: true }));
api.disable('x-powered-by'); //Remove X-Powered-By header
api.use('/admin', admin_1.default);
api.listen(3000, () => {
    console.log(`The API is now listening to port ${3000}!`);
});
/**API routes */
api.get('/', (req, res) => {
    res.sendStatus(200);
});
// api.route('/admin')
//     .get((req,res) => res.sendStatus(200))
//     .
/***/
/**API routes */
// api.get(process.env.API_URL, async(req,res) => {
//     res.sendStatus(200);
// });
// api.post(process.env.API_URL + ':action', async (req,res) => {
//     try{
//         const body = req.body;
//         if(!body.credentials || !req.params.action) return res.sendStatus(400);
//         if(!body.credentials.email || !body.credentials.password) return res.sendStatus(400);
//         // The server could not understand the request due to invalid syntax.
//         if(req.params.action === 'login') {
//             return res.json(await read.login(body.credentials));
//         }
//         const login = await read.login(body.credentials);
//         if(!login.authorized) return res.sendStatus(403);
//         // The client does not have access rights to the content.
//         switch(req.params.action) {
//             case 'isAdmin':
//                 return res.json(login.isAdmin);
//             case 'getIncidentTypes':
//                 return res.json(await read.getIncidentTypes());
//             case 'getActivePlayers':
//                 return res.json(await read.getActivePlayers());
//             case 'getActiveIncidents':
//                 if(!body.playerid) return res.sendStatus(400);
//                 return res.json(await read.getActiveIncidents(Number(body.playerid)));
//         }
//         //Admin-Only requests
//         if(login.isAdmin) {
//             switch(req.params.action) {
//                 case 'existsUser':
//                     if(!body.name) return res.sendStatus(400);
//                     return res.json(await read.existsUser(body.name.trim()));
//                 case 'existsPlayer':
//                     if(!body.nickname) return res.sendStatus(400);
//                     return res.json(await read.existsPlayer(body.nickname.trim()));
//                 case 'getActiveUsers':
//                     return res.json(await read.getActiveUsers());
//                 case 'getRegisterRequests':
//                     return res.json(await read.getRegisterRequests());
//                 default:
//                     return res.sendStatus(404);
//                     // The server can not find the requested resource.
//             }
//         }else {
//             return res.sendStatus(403);
//         }
//     }catch(e){
//         console.log(e);
//         res.sendStatus(500);
//     }
// });
// //Admin-Only requests
// api.put(process.env.API_URL + ':action', async (req,res) => {
//     const validStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
//     try{
//         const body = req.body;
//         //Public requests
//         if(req.params.action === 'requireRegister') {
//             const passwordBytes = Buffer.from(body.password).length;
//             if(!body.name || !body.email || !body.phone || !body.nationalNumber || !body.state || !body.city
//                 || !body.password || passwordBytes!==64){
//                 return res.sendStatus(400);
//             }
//             return res.sendStatus(await create.requireRegister({
//                 name: body.name,
//                 email: body.email,
//                 pwdhash: body.password,
//                 phone: body.phone,
//                 nationalnumber: body.nationalNumber,
//                 state: body.state,
//                 city: body.city
//             }));
//         }
//         if(!body.credentials || !req.params.action) return res.sendStatus(400);
//         if(!body.credentials.email || !body.credentials.password) return res.sendStatus(400);
//         // The server could not understand the request due to invalid syntax.
//         if(req.params.action === 'login') {
//             return res.json(await read.login(body.credentials));
//         }
//         const login = await read.login(body.credentials);
//         if(!login.authorized || !login.isAdmin) return res.sendStatus(403);
//         // The client does not have access rights to the content.
//         switch(req.params.action) {
//             case 'createUser':{
//                 const passwordBytes = Buffer.from(body.password).length;
//                 if(!(
//                     body.state && validStates.includes(body.state) && (body.willBeAdmin !== undefined) &&
//                     body.name && body.email &&
//                     body.password && body.phone &&
//                     body.nationalNumber && body.city &&
//                     passwordBytes === 64
//                 )) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await create.createUser({
//                         isadmin: Boolean(body.willBeAdmin),
//                         name: body.name.trim(),
//                         email: body.email.trim(),
//                         pwdhash: body.password,
//                         phone: body.phone.trim(),
//                         nationalnumber: body.nationalNumber.trim(),
//                         state: body.state,
//                         city: body.city.trim(),
//                         creatoruserid: login.userId,
//                     })
//                 );
//             }
//             case 'createPlayer':
//                 if(!body.phone) return res.sendStatus(400);
//                 return res.json(
//                     await create.createPlayer({
//                         name: body.name ? body.name.trim() : "",
//                         email: body.email ? body.email.trim() : "",
//                         nickname: body.nickname ? String(body.nickname).replace(/\s/g,'') : "",
//                         phone: body.phone,
//                         creatoruserid: login.userId,
//                     })
//                 );
//             case 'createIncident':
//                 if(!(
//                     body.title && body.description && body.datetime &&
//                     body.incidenttypeid && body.referencedplayerid
//                 )) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await create.createIncident({
//                         title: body.title.trim(),
//                         description: body.description.trim(),
//                         datetime: new Date(body.datetime).toISOString(),
//                         incidenttypeid: body.incidenttypeid,
//                         referencedplayerid: body.referencedplayerid,
//                         creatoruserid: login.userId
//                     })
//                 );
//             case 'editUser': {
//                 if(!(
//                     body.state && validStates.includes(body.state) && (body.willBeAdmin !== undefined) &&
//                     body.name && body.email && body.phone &&
//                     body.nationalNumber && body.city
//                 )) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await create.editUser({
//                         id: body.id,
//                         isadmin: Boolean(body.willBeAdmin),
//                         name: body.name.trim(),
//                         email: body.email.trim(),
//                         phone: body.phone.trim(),
//                         nationalnumber: body.nationalNumber.trim(),
//                         state: body.state,
//                         city: body.city.trim(),
//                     })
//                 );
//             }
//             case 'editPlayer':
//                 if(!(
//                      body.phone
//                 )) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await create.editPlayer({
//                         id: body.id,
//                         name: body.name ? body.name.trim() : "",
//                         email: body.email ? body.email.trim() : "",
//                         nickname: body.nickname ? String(body.nickname).replace(/\s/g,'') : "",
//                         phone: body.phone
//                     })
//                 );
//             case 'editIncident':
//                 if(!(
//                     body.id && body.title && body.description && 
//                     body.datetime && body.incidenttypeid
//                 )) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await create.editIncident({
//                         id: body.id,
//                         title: body.title,
//                         description: body.description,
//                         datetime: new Date(body.datetime).toISOString(),
//                         incidenttypeid: body.incidenttypeid
//                     })
//                 );
//             case 'approveRegister':
//                 if(!(body.registryid)) return res.sendStatus(400);
//                 return res.sendStatus (
//                     await create.approveRegister({
//                         registryid: body.registryid,
//                         userid: login.userId
//                     })
//                 );
//             case 'setPlayerResourceName':
//                 if(!body.id || !body.peopleresourcename) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await create.setPlayerResourceName({
//                         playerid: body.id,
//                         peopleresourcename: body.peopleresourcename
//                     })
//                 );
//             default: return res.sendStatus(404);
//         }
//     }catch(e){
//         console.error(e);
//         return res.sendStatus(500);
//     }
// });
// api.delete(process.env.API_URL + ':action', async (req,res) => {
//     try{
//         const body = req.body;
//         if(!body.credentials || !req.params.action) return res.sendStatus(400);
//         if(!body.credentials.email || !body.credentials.password) return res.sendStatus(400);
//         // The server could not understand the request due to invalid syntax.
//         if(req.params.action === 'login') {
//             return res.json(await read.login(body.credentials));
//         }
//         const login = await read.login(body.credentials);
//         if(!login.authorized || !login.isAdmin) return res.sendStatus(403);
//         // The client does not have access rights to the content.
//         switch(req.params.action){
//             case 'removeUser':{
//                 if(!body.userid) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await remove.removeUser({referenceduserid: body.userid, removeruserid: login.userId})
//                 );
//             }
//             case 'removePlayer':{
//                 if(!body.playerid) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await remove.removePlayer({referencedplayerid: body.playerid, removeruserid: login.userId})
//                 );
//             }case 'removeIncident': {
//                 if(!body.incidentid) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await remove.removeIncident({referencedincidentid: body.incidentid, removeruserid: login.userId})
//                 );
//             }case 'refuseRegister': {
//                 if(!body.registerid) return res.sendStatus(400);
//                 return res.sendStatus(
//                     await remove.refuseRegister({referencedregisterid: body.registerid, removeruserid: login.userId})
//                 );
//             }default: return res.sendStatus(404);
//         }
//     }catch(e) {
//         res.sendStatus(500);
//     }
// });
// /**Invalid routes */
// const notFound = (req,res) => {
//     res.sendStatus(404);
// };
// api.get('*',notFound);
// api.post('*',notFound);
// api.put('*',notFound);
// api.delete('*',notFound);
