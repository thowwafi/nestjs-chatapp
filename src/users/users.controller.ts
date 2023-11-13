import { Controller, Get, Param, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('User')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get-profile')
  async getProfile(@Request() req): Promise<User | null> {
    // Get the user ID from the authenticated user
    const result = await this.usersService.findOne(req.user.username);
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  async updateAbout(@Body() aboutData: Partial<User>, @Request() req): Promise<User> {
    // Get the user ID from the authenticated user
    const userId = req.user.userId; // Assuming the user ID is stored in the 'sub' (subject) claim of the JWT payload
    await this.usersService.updateAbout(userId, aboutData);
    const updatedProfile = await this.usersService.getUser(userId)
    return updatedProfile;
  }

}
