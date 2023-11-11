const express = require("express");
const app = express();
app.use(express.json());
const storage = require("node-persist");
storage.init();

//Storing data
app.post("/students", (req, res) => {
  var { id, name, gpa } = req.body;
  storage.setItem(id, { id, name, gpa });
  res.send("User added successfully");
});

//Display all data
app.get("/students", async (req, res) => {
  const result = await storage.values();
  var data = "<h1 style=text-align:center>All students details</h1>";
  for (i of result) {
    data += `<div style=text-align:center>
    <h3>Student id: ${i.id}</h3>
    <h3>Name: ${i.name}</h3>
    <h3>GPA: ${i.gpa}</h3><br>
    </div>`;
  }
  res.send(data);
});

//Display particular data
app.get("/students/:id", async (req, res) => {
  const result = await storage.getItem(req.params.id);
  res.send(
    `<div style=text-align:center>
    <h1>Student details</h1>
    <h3>Student id: ${result.id}</h3>
    <h3>Name: ${result.name}</h3>
    <h3>GPA: ${result.gpa}</h3>
    </div>`
  );
});

//Display topper data
app.get("/topper", async (req, res) => {
  let allStudents = await storage.values();
  let max = 0;
  let ans;
  for (i of allStudents) {
    if (i.gpa > max) {
      max = i.gpa;
      ans = i.id;
    }
  }
  let final = await storage.getItem(ans);
  res.send(`<div style=text-align:center>
        <h1>Student detail</h1>
        <h2>Student id: ${final.id}</h2>
        <h3>Name: ${final.name}</h3>
        <h3>GPA: ${final.gpa}</h3>
        </div
        `);
});

app.listen(5000, () => {
  console.log("Server started");
});
