import express from "express";

import { userRouter } from "./routes/user.routes.js";
import { todoRouter } from "./routes/todo.routes.js";

import dotenv from "dotenv";
import { GlobalError } from "./middlewares/global-error.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use(GlobalError.handle);

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
