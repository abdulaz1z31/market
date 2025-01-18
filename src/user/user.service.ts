import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const result = await this.userRepository.save(createUserDto);
    return result;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      email: loginDto.email,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return { message: 'User logged in successfully' };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['orders'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.update(id, updateUserDto);
    return { message: 'updated' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.delete(id);
    return { message: 'deleted' };
  }
}
