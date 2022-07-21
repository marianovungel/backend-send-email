var express = require("express")
var nodemailer = require("nodemailer")
const cors = require('cors')

var app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "/*");
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    app.use(cors())
    next();
})
app.use(cors())

//Routing

app.post("/send_email", function(req, response){
    var from = req.body.from
    var to = req.body.to
    var subject = req.body.subject
    var message = req.body.message

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vungemariano@gmail.com',
          pass: 'mhpbafvgyiyeeaau'
        }
    })

    var mailOptions = {
        from: from,
        to:to,
        subject:subject,
        text:message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Sent: " + info.response)
        }
        response.redirect("/")
    })
})

app.get("/", (req, res)=>{
    res.json("oi cara!")
})

//Initialize Web Server
app.listen("8000", console.log("funcionando"))