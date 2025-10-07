import { TokenPayload } from "google-auth-library";
import { UserDataRegister } from "src/auth/dto/UserDataRegister.dto";

export class CreateUserDto {
    tokenPayload:TokenPayload;
    userDataRegister:UserDataRegister
}
