import { prisma } from "../prisma/index.js";

class TodoService {
    create = async (input, userId) => {
        const todo = await prisma.todo.create({
            data: {
                ...input,
                userId: userId
            },
            select: {
                title: true,
                description: true,
                dueDate: true,
                status: true,
                id: true
            }
        });

        return todo;
    };

    getOne = async (id, userId) => {
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });

        if (!todo) {
            throw new CustomError("todo does not exist", 404);
        }

        if (todo.userId !== userId) {
            throw new CustomError(
                "Forbidden: This todo does not belong to you!",
                403
            );
        }

        return todo;
    };

    update = async (id, userId, update) => {
        await prisma.todo.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                ...update
            }
        });
    };

    getAll = async (userId) => {
        const todos = await prisma.todo.findMany({
            where: {
                userId: userId
            }
        });

        return todos;
    };

    changeStatus = async (id, userId, status) => {
        await prisma.todo.update({
            where: {
                id: id,
                userId: userId
            },

            data: {
                status: status
            }
        });
    };
}

export const todoService = new TodoService();
