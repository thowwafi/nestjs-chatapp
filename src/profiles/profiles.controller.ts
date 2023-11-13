// src/profiles/profiles.controller.ts

import { Controller, Get, Param, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ProfilesService } from './profiles.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Profile } from './profiles.entity';
// import { User } from '../users/users.entity';
// import { UsersService } from '../users/users.service';


@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req): Promise<Profile | null> {
    // Get the user ID from the authenticated user
    const userId = req.user.userId;
    console.log("userId", userId)
    console.log("req.user", req.user)
    const result = await this.profilesService.getProfile(userId);
    // const result = await this.profilesService.findOne(req.user.username);
    console.log("result", result)
    return result
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch('update-about')
  // async updateAbout(@Body() aboutData: Partial<Profile>, @Request() req): Promise<void> {
  //   // Get the user ID from the authenticated user
  //   const userId = req.user.userId; // Assuming the user ID is stored in the 'sub' (subject) claim of the JWT payload

  //   // TODO: Implement logic to convert height and weight to a common unit
  //   // Example: Convert height to cm and weight to kg before updating the profile

  //   await this.profilesService.updateAbout(userId, aboutData);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch('update-interests')
  // async updateInterests(@Body() interests: string[], @Request() req): Promise<void> {
  //   // Get the user ID from the JWT payload
  //   const userId = req.user.userId; // Replace with actual user ID extraction logic
  //   await this.profilesService.updateInterests(userId, interests);
  // }
}
