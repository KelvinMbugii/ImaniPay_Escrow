export class AuthResponseDto {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
