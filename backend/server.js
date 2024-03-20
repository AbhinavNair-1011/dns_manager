const express = require('express');
const cors=require("cors")
const app = express();
const port = process.env.PORT || 4000;
const database=require("./database/dbConnect");

const user= require("./routes/userRoute");
const dns=require("./routes/dnsRoute")

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('api running');
});
app.use(user)
app.use(dns)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
