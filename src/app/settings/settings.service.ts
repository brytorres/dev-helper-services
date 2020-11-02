import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class SettingsService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) { }
}
