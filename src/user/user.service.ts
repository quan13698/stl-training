import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
    private readonly users = [
        {
            userId: 1,
            username: 'quan1',
            password: '123456',
        },
        {
            userId: 2,
            username: 'quan2',
            password: '123456',
        },
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
