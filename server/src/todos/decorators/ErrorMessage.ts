import { SetMetadata } from '@nestjs/common';

export const ErrorMessage = (error: string) => SetMetadata('guardError', error);
