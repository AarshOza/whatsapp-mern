import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js'
import cors from 'cors';
import Pusher from 'pusher';

const app = express();
const port = process.env.PORT || 9000;

var pusher = new Pusher({
  appId: '1081386',
  key: 'b2a67b977d0f9fd41725',
  secret: '17a0d738004851bef129',
  cluster: 'us2',
  encrypted: true
});

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Headers", "*")
//   next();
// });

const connection_url = "mongodb+srv://admin:vjotsP3X2iCKXRlR@cluster0.ndjyv.mongodb.net/whatsappdb?retryWrites=true&w=majority"

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected')
  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    console.log(change)
    if(change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted',{
        _id: messageDetails._id,
        message: messageDetails.message,
        name: messageDetails.name,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
      });
    }
    else {
      console.log('Error triggering Pusher')
    }
  })
})

app.get('/',(req, res) => res.status(200).send('hello world'))

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(data)
    }
  })
})

app.post('/messages/new',(req, res) => {
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(201).send(`new message created: \n ${data}`)
    }
  })
})

app.listen(port, () => console.log(`Listening on localhost:${port}`));