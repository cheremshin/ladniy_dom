import { InternalServerErrorException } from '@nestjs/common';

export class ConfigurationException extends InternalServerErrorException {
    constructor(key: string) {
        super({
            message: `Configuration error`,
            error: `Configuration key "${key}" is not set`,
            statusCode: 500,
        });
    }
}
