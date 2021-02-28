import { Injectable } from '@nestjs/common';
import { CreateRoomInput } from '../dto/create-room.input';
import { UpdateRoomInput } from '../dto/update-room.input';

@Injectable()
export class RoomService {
  create(createRoomInput: CreateRoomInput) {
    return 'This action adds a new room';
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomInput: UpdateRoomInput) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
