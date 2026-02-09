import { ConfigurationException } from '@/common/exceptions/configuration.exception';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, MinLength, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsString()
    NODE_ENV: string;

    @IsString()
    DB_HOST: string;

    @IsNumber()
    @Min(0)
    @Max(65535)
    DB_PORT: number;

    @IsString()
    DB_USER: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_NAME: string;

    @IsString()
    @MinLength(32)
    SESSION_SECRET: string;
}

export function validate(config: Record<keyof EnvironmentVariables, unknown>) {
    const validateConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validateConfig, {
        whitelist: true,
    });

    if (errors.length > 0) {
        const missingKeys = errors.map((error) => error.property).join(', ');
        throw new ConfigurationException(missingKeys);
    }

    return validateConfig;
}
