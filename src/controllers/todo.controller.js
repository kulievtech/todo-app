import { todoService } from "../services/todo.service.js";
import { catchAsync } from "../errors/catchAsync.js";
import { CustomError } from "../errors/customError.js";

class TodoController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            title: body.title,
            description: body.description,
            dueDate: body.dueDate
        };

        if (!input.title || !input.description || !input.dueDate) {
            throw new CustomError(
                "Name, Description and Due Date are required",
                400
            );
        }

        const todo = await todoService.create(input, userId);

        res.status(201).json({
            data: todo
        });
    });

    getOne = catchAsync(async (req, res) => {
        const { userId, params } = req;

        const todo = await todoService.getOne(params.id, userId);

        res.status(200).json({
            data: todo
        });
    });

    update = catchAsync(async (req, res) => {
        const { body, params, userId } = req;
        const update = {};

        if (body.title) {
            update.title = body.title;
        }
        if (body.description) {
            update.description = body.description;
        }
        if (body.dueDate) {
            update.dueDate = body.dueDate;
        }

        if (!update.title && !update.description && !update.dueDate) {
            throw new CustomError("No update data provided", 400);
        }

        await todoService.update(params.id, userId, update);
        res.status(204).send();
    });

    getAll = catchAsync(async (req, res) => {
        const { userId } = req;

        const todos = await todoService.getAll(userId);
        res.status(200).json({
            data: todos
        });
    });

    archive = catchAsync(async (req, res) => {
        const { params, userId } = req;

        await todoService.changeStatus(params.id, userId, "ARCHIVED");
        res.status(204).send();
    });

    reactivate = catchAsync(async (req, res) => {
        const { params, userId } = req;

        await todoService.changeStatus(params.id, userId, "TODO");
        res.status(204).send();
    });
}

export const todoController = new TodoController();
