export interface Student {
    id: number,
    name: string,
    surname: string,
    birthYear: number,
    courseId: number
}

export interface CreateStudentData {
    name: string;
    surname: string;
    birthYear: number;
    courseId: number
}

export interface UpdateStudentData {
    name?: string;
    surname?: string;
    birthYear?: number;
}