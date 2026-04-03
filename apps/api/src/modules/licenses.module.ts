import { Module } from '@nestjs/common';
import { LicensesController } from '../licenses/licenses.controller';
import { LicensesService } from '../licenses/licenses.service';

@Module({
  controllers: [LicensesController],
  providers: [LicensesService],
  exports: [LicensesService]
})
export class LicensesModule {}
