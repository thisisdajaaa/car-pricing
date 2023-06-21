import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  private readonly DEFAULT_PASSWORD: string = '123456';

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.create(body.email, this.DEFAULT_PASSWORD);
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    return await this.usersService.findOne(+id);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(+id, body);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}