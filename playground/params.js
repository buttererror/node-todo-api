const express = require('express');

const app = express();

app.get('/todos/:id', (req, res) => {
   res.send("hi");
   console.log(req.params);
});

app.listen(3000, () => {
   console.log("app up and running");
});