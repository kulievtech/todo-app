import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { todoController } from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.post("/", userMiddleware.authenticate, todoController.create);
todoRouter.get("/:id", userMiddleware.authenticate, todoController.getOne);

todoRouter.patch("/:id", userMiddleware.authenticate, todoController.update);
todoRouter.get("/", userMiddleware.authenticate, todoController.getAll);

todoRouter.patch(
    "/:id/archive",
    userMiddleware.authenticate,
    todoController.archive
);
todoRouter.patch(
    "/:id/reactivate",
    userMiddleware.authenticate,
    todoController.reactivate
);

export { todoRouter };
