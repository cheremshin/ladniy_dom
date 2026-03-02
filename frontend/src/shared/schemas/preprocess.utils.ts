import { z } from 'zod';

type PreprocessorProps = {
    message?: string;
};

export const numberSchema = (props?: PreprocessorProps) =>
    z.preprocess(
        (value) => {
            if (value === '' || value === null || value === undefined) return undefined;
            const number = Number(value);
            return isNaN(number) ? value : number;
        },
        z.number({ message: props?.message ?? 'Must be a number' }),
    );

export const optionalNumberSchema = (props?: PreprocessorProps) =>
    z.preprocess(
        (value) => {
            if (value === '' || value === null || value === undefined) return undefined;
            const number = Number(value);
            return isNaN(number) ? value : number;
        },
        z.number({ message: props?.message ?? 'Must be a number' }).optional(),
    );
