export interface IAuthForm {
  username: string,
  password: string,
}

export interface ISignUpForm extends IAuthForm {
  fullname: string,
}