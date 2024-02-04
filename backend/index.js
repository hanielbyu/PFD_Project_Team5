const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { send } = require('vite');
const app = express();
const port = 5000;
var MongoClient = require('mongodb').MongoClient;

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

const accountSid = 'AC08684d8f4db8b42ce1308619191a54de'
const authToken = '068b127a2471d45395276b61f40bc390'
const client = require('twilio')(accountSid,authToken);

const sendSMS = async (body) => {
    let msgOptions = {
        from: '+16592214697',
        to: '+6592323204',
        body
    }
    try{
        const message = await client.messages.create(msgOptions);
        console.log(message)
    }catch(error){
        console.error(error);
    }
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// POST REQUEST FOR SMS 
app.post("/sms", function   (req, res) {
  sendSMS(req.body.message)
  res.send({ status: 'SUCCESS' });
});





app.get('/', (req, res) => {       
    res.sendFile('index.html', {root: __dirname});     
                                                        
});

app.get("/test", async (req, res) => { 
  res.status(200);
  res.send("HELLO TEST")
}) 

app.post("/Hello", async (req, res) => {
  res.status(200);
  res.send("AppointmentDetails")
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

// Connect URL
const url = 'mongodb+srv://hanielbyu1:PBsm19921967@pfdcluster.eo11eeu.mongodb.net/?retryWrites=true&w=majority'

// Connect to MongoDB
MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    if (err) {
      return console.log(err)
    }

    // Specify the database you want to access
    const db = client.db('PFDDatabase')

    console.log(`MongoDB Connected: ${url}`)

    const users = db.collection('AppointmentDetails')
    users.find().toArray((err, results) => {
        console.log(results)
      })
  }
)