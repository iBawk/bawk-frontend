export function isCPFValid(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
    return false;
  }

  const cpfs = cpf.split("").map((el) => +el);
  const rest = (count: number) =>
    ((cpfs
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;

  return rest(10) === cpfs[9] && rest(11) === cpfs[10];
}

export function isCPFInvalid(cpf: string): boolean {
  if (!cpf.length) return false;

  return !isCPFValid(cpf);
}

export function isEmailValid(email: string): boolean {
  const regex = /^[^@\s]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;

  return regex.test(email?.toLowerCase());
}

export function isEmailInvalid(email: string): boolean {
  if (!email.length) return false;

  return !isEmailValid(email);
}

export function isPasswordMinimumValid(password: string): boolean {
  return password?.length >= 8;
}

export function isPhoneNumberValid(phoneNumber: string): boolean {
  const regex = /^\(?[0-9]{2}\)? ?[0-9]{1}?[0-9]{4}-?[0-9]{4}$/;

  return regex.test(phoneNumber);
}

export function isNameMinimumValid(password: string): boolean {
  return password?.length >= 5;
}

export function isPasswordValid(password: string): boolean {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

  return regex.test(password);
}

export function isPasswordInvalid(password: string): boolean {
  if (!password.length) return false;

  return !isPasswordValid(password);
}


const Validation = {
  isCPFValid,
  isCPFInvalid,
  isEmailValid,
  isEmailInvalid,
  isNameMinimumValid,
  isPasswordMinimumValid,
  isPasswordValid,
  isPhoneNumberValid,
  isPasswordInvalid,
};

export default Validation;
