import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import {
  isValidEmail,
  isValidPassword,
} from 'src/utils/validations/validations';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!isValidEmail(createUserDto.email)) {
      throw new Error('E-mail inválido');
    }

    const passwordError = isValidPassword(createUserDto.password);
    if (passwordError) {
      throw new Error(passwordError);
    }

    const userEntity = { ...createUserDto, id: randomUUID() };

    const hashed = await hash(createUserDto.password, 12);
    userEntity.password = hashed;

    const createdUser = await this.userRepository.createUser(userEntity);
    delete createdUser.password;
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userRepository.findUserById(id);
    delete foundUser.password;
    return foundUser;
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const hashedPassword = await hash(updateUserDto.password, 12);
      const userToUpdate = { ...updateUserDto, password: hashedPassword };
      const updatedUser = await this.userRepository.updateUser(userToUpdate);
      return updatedUser;
    }
    const updateUser = await this.userRepository.updateUser(updateUserDto);
    delete updateUser.password;
    return updateUser;
  }

  async remove(id: string): Promise<string> {
    await this.userRepository.deleteUser(id);
    return 'Usuário excluido com sucesso';
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findUserByEmail(email);
  }
}
