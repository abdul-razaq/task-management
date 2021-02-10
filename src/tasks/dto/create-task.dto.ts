import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  // these decorators add some rules to the properties of the DTO class.
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
