const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const {
  getAllMessages,
  getMessagesByUser,
  createMessage,
  addStar
} = require('./controllers/messages');
const {
  loginUser,
  updateUser,
  createUser,
  findUserByHandle
} = require('./controllers/users');
const {
  createReply
} = require('./controllers/replies');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/messages', getAllMessages);
app.get('/api/messages/user/:userId', getMessagesByUser);
app.post('/api/messages', createMessage);
app.post('/api/addStar', addStar);


app.post('/api/users/login', loginUser);
app.post('/api/users/update', updateUser);
app.post('/api/users/signup', createUser);
app.get('/api/users/:handle', findUserByHandle);

app.post('/api/replies', createReply);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// standardize error and data response to front end
app.use('*', (req, res) => {
  if (res.err) res.status(500).send({ error: res.err });
  else res.send({ data: res.data });
});

if (!module.parent) app.listen(process.env.PORT || 8080);

module.exports = app;
