export function phoneNumberMask(phoneNumber: string): string {
  let masked = phoneNumber.replace(/[^\d]/g, "");

  masked =
    masked.length <= 9
      ? masked.replace(/(\d{2})(\d)/, "($1) $2")
      : masked.replace(/(\d{2})(\d{5}|\d{4})(\d{4})/, "($1) $2-$3");

  return masked.length > 15 ? masked.substring(0, 15) : masked;
}

export function CPFMask(cpf: string): string {
  // Remove todos os caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "");

  // Adicione a máscara ao CPF
  if (cpf.length <= 6) cpf = cpf.replace(/(\d{3})(\d{1})/, "$1.$2");
  if (cpf.length <= 9) cpf = cpf.replace(/(\d{3})(\d{3})(\d{1})/, "$1.$2.$3");
  if (cpf.length > 9)
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");

  cpf = cpf.slice(0, 14);

  return cpf;
}

export function CEPMaks(cep: string): string {
  cep = cep.replace(/\D/g, "");

  cep = cep.replace(/(\d{5})(\d{1})/, "$1-$2");

  cep = cep.slice(0, 9);

  return cep;
}

export function onlyNumber(str: string): number {
  return Number(str.replace(/\D/g, ""));
}

const Mask = { phoneNumberMask, CPFMask, CEPMaks, onlyNumber };

export default Mask;
