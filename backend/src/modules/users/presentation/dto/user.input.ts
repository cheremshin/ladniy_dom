import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MinLength,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'email is required' })
    @IsEmail({}, { message: 'email must be a valid email' })
    email: string;

    @Field(() => String)
    @IsNotEmpty({ message: 'password is required' })
    @IsString()
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'firstName must be a string' })
    firstName?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'lastName must be a string' })
    lastName?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'nickname must be a string' })
    nickname?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'phone must be a string' })
    phone?: string;

    @Field(() => UserRole, { defaultValue: UserRole.CUSTOMER })
    @IsOptional()
    @IsEnum(UserRole, { message: 'role must be customer or admin' })
    role?: UserRole = UserRole.CUSTOMER;

    @Field(() => Boolean, { defaultValue: true })
    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive?: boolean = true;
}

@InputType()
export class UpdateUserInput extends PartialType(OmitType(CreateUserInput, ['password'] as const)) {
    @Field(() => ID)
    @IsNotEmpty({ message: 'id is required' })
    @IsUUID(4, { message: 'id must be a valid UUID' })
    id: string;

    @Field(() => String, { nullable: true, description: 'Новый пароль (если нужно изменить)' })
    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'newPassword must be at least 8 characters' })
    newPassword?: string;
}

@InputType()
export class RegisterUserInputPublic {
    @Field(() => String)
    @IsNotEmpty({ message: 'email is required' })
    @IsEmail({}, { message: 'email must be a valid email' })
    email: string;

    @Field(() => String)
    @IsNotEmpty({ message: 'password is required' })
    @IsString()
    @MinLength(8, { message: 'password must be at least 8 characters' })
    password: string;
}

@InputType()
export class UpdateUserInputPublic {
    @Field(() => ID)
    @IsNotEmpty({ message: 'id is required' })
    @IsUUID(4, { message: 'id must be a valid UUID' })
    id: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'firstName must be a string' })
    firstName?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'lastName must be a string' })
    lastName?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'nickname must be a string' })
    nickname?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'phone must be a string' })
    phone?: string;
}
