import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
// import pricePlan from "./price-plan.js";
import flash from "express-flash";
import session from "express-session";
import DBJS from "./database.js";
import pricePlanDB from "./database/dbLogic.js";

const app = express();
let database = pricePlanDB(DBJS);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Yamisa",
  })
);
app.use(flash());
let username
let planUsers 
app.get("/", (req,res) => {
    res.render("index", {
      username: username
      });
})

app.post("/link_user", async (req,res) => {
    username = req.body.userInput
    let plan = req.body.plans
    await database.insertUser(username,plan)
    res.redirect("/")
})
app.get("/link_user", (req,res) => {
    res.render("allocateUser", {
        theUser: username
    })
})

app.get("/price_plans", (req,res) => {
    res.render("pricePlans")
})

app.get("/price_plans/:id"), async (req,res) => {
    let id = req.params.id

   planUsers = await database.getPlanUsers(id);

   res.render("planUsers", {
    planUsers :planUsers
   })
}

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App started...", PORT);
})