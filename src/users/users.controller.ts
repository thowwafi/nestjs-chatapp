// src/profiles/profiles.controller.ts

import { Controller, Get, Param, Patch, Body, UseGuards, Request } from '@nestjs/common';
// import { ProfilesService } from './profiles.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { Profile } from './profiles.entity';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { format, parse } from 'date-fns';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req): Promise<User | null> {
    // Get the user ID from the authenticated user
    // const userId = req.user.userId;
    const result = await this.usersService.findOne(req.user.username);
    return result
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-about')
  async updateAbout(@Body() aboutData: Partial<User>, @Request() req): Promise<User> {
    // Get the user ID from the authenticated user
    const userId = req.user.userId; // Assuming the user ID is stored in the 'sub' (subject) claim of the JWT payload
    await this.usersService.updateAbout(userId, aboutData);
    const updatedProfile = await this.usersService.getUser(userId)
    return updatedProfile;
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch('update-interests')
  // async updateInterests(@Body() interests: string[], @Request() req): Promise<void> {
  //   // Get the user ID from the JWT payload
  //   const userId = req.user.userId; // Replace with actual user ID extraction logic
  //   await this.profilesService.updateInterests(userId, interests);
  // }
}
