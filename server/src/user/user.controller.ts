import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { Param, Post, UseGuards } from '@nestjs/common/decorators';
import { User } from 'src/user/decorators';
import { JwtGuard } from 'src/user/guards';
import { SearchQueryDTO, SignInDTO, SignUpDTO, UpdateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('account')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signUp')
  async signUp(@Body() dto: SignUpDTO) {
    return await this.userService.signUp(dto);
  }

  @Post('signIn')
  async signIn(@Body() dto: SignInDTO) {
    return await this.userService.signIn(dto);
  }

  @Get('')
  @UseGuards(JwtGuard)
  async getMe(@User() user) {
    return await this.userService.getMe(user.id);
  }

  @Delete('')
  @UseGuards(JwtGuard)
  async deleteMe(@User() user) {
    return await this.userService.deleteUser(user.id);
  }

  @Put('')
  @UseGuards(JwtGuard)
  async updateAccount(@Body() dto: Omit<UpdateUserDTO, 'id'>, @User() user) {
    return await this.userService.updateUser({ ...dto, id: user.id });
  }

  @Get('users')
  @UseGuards(JwtGuard)
  async getUsers(
    @User() { id: userId },
    @Query() { searchId, limit }: SearchQueryDTO,
  ) {
    return await this.userService.getUsers({ userId, searchId, limit: +limit });
  }

  @Get('users/:userId')
  @UseGuards(JwtGuard)
  async getUser(@User() { id: activeUserId }, @Param('userId') userId) {
    return await this.userService.getUser(userId, activeUserId);
  }
}
