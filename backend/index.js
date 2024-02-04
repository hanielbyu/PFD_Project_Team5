const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { send } = require('vite');
const app = express();
const port = 5000;
var MongoClient = require('mongodb').MongoClient;

// Connect URL
const url = 'mongodb+srv://hanielbyu1:PBsm19921967@pfdcluster.eo11eeu.mongodb.net/?retryWrites=true&w=majority'

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

const accountSid = 'AC08684d8f4db8b42ce1308619191a54de'
const authToken = 'fb378259201821fbf6534ac9e62e6744'
const client = require('twilio')(accountSid,authToken);

const sendSMS = async (body, phoneNumber) => {
    let msgOptions = {
        from: '+16592214697',
        to: phoneNumber,
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
app.post("/sms", function(req, res) {

  console.log('check body', req.body, typeof req.body)

  // Connect to MongoDB
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    async(err, client) => {
      if (err) {
        return console.log(err)
      }

      // Specify the database you want to access
      const db = client.db('PFDDatabase')

      console.log(`MongoDB Connected: ${url}`)

      const apptDetails = db.collection('AppointmentDetails')

      // create a document to insert
      const doc = {
        name: req.body.name,
        appointmentDate: req.body.appointmentDate,
        description: req.body.description
      }
      const result = await apptDetails.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      // apptDetails.find().toArray((err, results) => {
      //     console.log(results)
      //   })
    }
  )
  
  // sends SMS
  sendSMS(req.body.message , req.body.phone)
  res.send({ status: 'SUCCESS' });
});



app.post("/register", (req,res) => {
    // Connect to MongoDB
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      async(err, client) => {
        if (err) {
          return console.log(err)
        }
  
        // Specify the database you want to access
        const db = client.db('PFDDatabase')
  
        console.log(`MongoDB Connected: ${url}`)
  
        const users = db.collection('users')
        users.find({username: req.body.username}).toArray(async(err, results) => {
            console.log(results)
            if(results.length == 0) {
              const doc = {
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
              }
              const result = await users.insertOne(doc);
              console.log(`A document was inserted with the _id: ${result.insertedId}`);
              res.send({ status: 'SUCCESS' });
            } else {
              res.send({ status: 'ERROR' });
            }
          })
      }
    )
})

app.post("/login", (req, res) => {
  // Connect to MongoDB
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    async(err, client) => {
      if (err) {
        return console.log(err)
      }

      // Specify the database you want to access
      const db = client.db('PFDDatabase')

      console.log(`MongoDB Connected: ${url}`)

      const users = db.collection('users')
      users.find({username: req.body.username}).toArray(async(err, results) => {
          console.log(results)
          if(results.length > 0) {
            if(req.body.password == results[0].password) {
              res.send({ status: 'SUCCESS', user: results[0] });
            } else {
              res.send({ status: 'ERROR' });
            }
          } else {
            res.send({ status: 'ERROR' });
          }
        })
    }
  )
})



// app.post("/login", (req, res) => {
//   // Connect to MongoDB
//   MongoClient.connect(
//     url,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     },
//     async(err, client) => {
//       if (err) {
//         return console.log(err)
//       }

//       // Specify the database you want to access
//       const db = client.db('PFDDatabase')

//       console.log(`MongoDB Connected: ${url}`)

//       const users = db.collection('users')
//       users.find({username: req.body.username}).toArray(async(err, results) => {
//           console.log(results)
//           if(results.length > 0) {
//             if(req.body.password == results[0].password) {
//               res.send({ status: 'SUCCESS' });
//             } else {
//               res.send({ status: 'ERROR' });
//             }
//           } else {
//             res.send({ status: 'ERROR' });
//           }
//         })
//     }
//   )
// })



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