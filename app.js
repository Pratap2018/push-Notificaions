const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

const vapidKeys = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
};


webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  )
  const sendNotification = (subscription, dataToSend) => {
    webpush.sendNotification(subscription, dataToSend)
  }
app.post('/api/send',(req,res)=>{
    try {
        sendNotification(req.body,'DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.')
        
    } catch (error) {
        console.log(error.message);
    }
  
   res.json({msg:"I am the king"})
})


app.listen(3000, () => {
    console.log("http://localhost:3000");
  });