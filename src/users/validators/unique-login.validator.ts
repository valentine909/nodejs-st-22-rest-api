import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'LoginUnique' })
@Injectable()
export class IsLoginUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(login: string) {
    return !(await this.userService.findOneByLogin(login));
  }

  defaultMessage() {
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
