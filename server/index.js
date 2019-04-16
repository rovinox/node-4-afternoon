require("dotenv").config()
const express = require("express")
const session = require("express-session")
const checkForSession = require("./middlewares/checkForSession")
const sc = require("./controller/swagController")
const ac = require("./controller/authController")
const cc = require("./controller/cartController")
const shc = require("./controller/searchController");


const app = express()
app.use(express.json())


const { PORT, SESSION_SECRET} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave:false,
    saveUninitialized:true


}))

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get("/api/swag", sc.read)

app.post("/api/login", ac.login)
app.post("/api/register", ac.register)
app.post("/api/signout", ac.signout)
app.get("/api/user", ac.getUser)

app.post("/api/cart/checkout", cc.checkout);
app.post("/api/cart/:id", cc.add);
app.delete("/api/cart/:id", cc.delete);

app.get("/api/search", shc.search);





app.listen(PORT, console.log(`listening on ${PORT}`))