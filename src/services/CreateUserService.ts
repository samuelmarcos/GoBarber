import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ email, name, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUsersExists = await usersRepository.findOne({
            where: { email },
        });

        const hashedPassword = await hash(password, 8);

        if (checkUsersExists) throw new Error('Email already used');

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
