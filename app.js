const express = require('express')
const hbs = require('express-handlebars')
const cookieSession = require('cookie-session')
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');
const session = require('express-session')
const rateLimit = require('express-rate-limit')
const fetch = require('node-fetch')
const port = 3000
const Account = require('./models/accountModel')

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15minutes
  max: 100, //limit each IP to 100 requests per window
  standarHeaders: true, //return rate limit infor in the 'RateLimit'
  legacyHeaders: false, // disable the 'X-RateLimit-*' headers
});
const dotenv = require('dotenv');
dotenv.config({ path: './env' });
require('./connection/conn')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const accRouter = require('./routers/accountRouter')

const NLP = require('./NLP')
const enNLP = NLP.enNLP
const viNLP = NLP.viNLP

app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    extname: '.hbs'
  })
);
app.set("view engine", "hbs");

app.use(cookieSession({
  name: 'auth-session',
  keys: ['key1', 'key2']
}));
app.use(express.static(__dirname + "/public"));
app.use('/', apiLimiter);
app.use(flash());
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'flashblog',
  saveUninitialized: false,
  resave: false
}));
app.use(cookieParser());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use('/', accRouter)

io.on('connection', async (socketInstance) => {
  // Assign the socket instance to the variable
  var socket = await socketInstance;
  var user;
  socket.on('userConnected', async (data) => { // Use custom event name 'userConnected'
    user = await data.user; // Access the user object from data
    let account = await Account.findOne({ id: user.id })
    if (account) {
      // console.log(new Date().getDate())
      console.log('Client connected:', socket.id);

      // Ngắt kết nối với client
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
      // Listen for 'message' event inside of 'connection' event handler
      socket.on('message', async (data) => {
        let model
        if (data.lang == 'en') {
          model = enNLP
        }
        if (data.lang == 'vi') {
          model = viNLP
        }
        const response = await model.process(data.prompt);
        if (response.answer != undefined) {
          account.history.push({ 'User': data.prompt, 'Chatbot': response.answer })
          await account.save();
          // Gửi phản hồi cho client
          io.to(socket.id).emit('reply', { 'Chatbot': response.answer });
        }
        else {
          const response = await loadChatGPT(data.prompt)
          account.history.push({ 'User': data.prompt, 'Chatbot': `Support from ChatGPT: ${response}` })
          await account.save();
          io.to(socket.id).emit('reply', { 'Chatbot': `Support from ChatGPT: ${response}` });
        }
      });
    }
  });
});

async function loadChatGPT(prompt) {
  const chatgpt = await import('chatgpt');
  const ChatGPTAPI = chatgpt.ChatGPTAPI;
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_KEY,
    fetch: fetch
  })

  const res = await api.sendMessage(prompt)
  return res.text
}


http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});