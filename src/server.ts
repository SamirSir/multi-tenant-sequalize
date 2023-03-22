import userRoutes from "./routes/user.routes";

const express = require("express");

const app = express();

// setting
app.set('port', process.env.port || 3000)

// middleware
app.use(express.json());

app.use("/user", userRoutes);

app.use('/', (req, resp) => {
    resp.send('Hello from multitenant app');
})

app.listen(app.get('port'), () => {
    console.error(`App running on port ${app.get('port')} ...`);
});
