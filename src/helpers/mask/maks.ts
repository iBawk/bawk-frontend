export function phoneNumberMask(phoneNumber: string): string {
  let masked = phoneNumber.replace(/[^\d]/g, "");

  masked =
    masked.length <= 9
      ? masked.replace(/(\d{2})(\d)/, "($1) $2")
      : masked.replace(/(\d{2})(\d{5}|\d{4})(\d{4})/, "($1) $2-$3");

  return masked.length > 15 ? masked.substring(0, 15) : masked;
}

const Mask = { phoneNumberMask };

export default Mask;
