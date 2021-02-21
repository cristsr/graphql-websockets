import { SetMetadata } from '@nestjs/common';

/**
 * Metadata used by GqlAuthGuard to determinate
 * if the resource required is public
 * @constructor
 */
export const IS_PUBLIC = 'IS_PUBLIC';
export const Public = () => SetMetadata(IS_PUBLIC, true);
