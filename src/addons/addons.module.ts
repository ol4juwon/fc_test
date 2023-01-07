import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsController } from './addons.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Addon } from './model/addon.model';

@Module({
  controllers: [AddonsController],
  providers: [AddonsService],
  imports: [ObjectionModule.forFeature([Addon])],
})
export class AddonsModule {}
