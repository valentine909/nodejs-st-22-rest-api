import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'LoginUnique' })
@Injectable()
export class IsLoginUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  validate(login: string, args: ValidationArguments) {
    return !this.userService.findOneByLogin(login);
  }

  defaultMessage(args: ValidationArguments) {
    return 'user ($value) is already registered';
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'LoginUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLoginUniqueConstraint,
    });
  };
}
