import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomResolver } from './resolvers/room.resolver';

@Module({
  providers: [RoomResolver, RoomService],
})
export class RoomModule {}
