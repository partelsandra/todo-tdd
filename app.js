const express = require('express')
const todoRoutes = require("./routes/todo.routes");
const app = express()

app.use(express.json())

app.use("/todos", todoRoutes);
app.get('/', function (req, res) {
    res.send('Hello World')
})

//app.listen(3015, () => {
    //console.log('server is running')
//})

module.exports = app