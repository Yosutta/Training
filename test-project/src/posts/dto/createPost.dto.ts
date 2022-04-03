import {IsEmail, IsInt, isNumber, IsString, Length} from 'class-validator'

export class CreatePostDto {

  @Length(10,50)
  title: string

  @IsString()
  slug: string

  @IsString()
  content: string
}
