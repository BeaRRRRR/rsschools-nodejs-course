export interface Task {
    id: string | null,
    title: string,
    order: string,
    description: string,
    userId: string,
    boardId: string,
    columnId: string,
}
