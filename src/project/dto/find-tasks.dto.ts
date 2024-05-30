import { Task } from "@prisma/client";

export class FindTasksDto {
    state: string;
    tasks: Task[];
}