export function emailIsValid(email: string): boolean {
  const regex = /^[^@\s]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;

  return regex.test(email?.toLowerCase());
}

export function passwordIsMinimumValid(password: string): boolean {
  return password?.length >= 8;
}

export function phoneNumberIsValid(phoneNumber: string): boolean {
  const regex = /^\(?[0-9]{2}\)? ?[0-9]{1}?[0-9]{4}-?[0-9]{4}$/;

  return regex.test(phoneNumber);
}

export function nameIsMinimumValid(password: string): boolean {
  return password?.length >= 5;
}

export function passwordIsValid(password:string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

  return regex.test(password);
}

const Validation = { emailIsValid, passwordIsMinimumValid };
export default Validation;
