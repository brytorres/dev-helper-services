import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ){}

  async findOneById(id: number): Promise<User> {
    try {
      return await this.userRepo.findOneOrFail(id);
    } catch (error) {
      this.logger.error(error)
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepo.findOneOrFail({
        where: {
          email,
        }
      });
    } catch (error) {
      this.logger.error(error)
    }
  }

  async saveUserPassword(user: User, password: string): Promise<boolean> {
    try {
      user.password = password;
      await this.userRepo.save(user);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
