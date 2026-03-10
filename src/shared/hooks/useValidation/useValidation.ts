export function useValidation(value: string, validate: (v: string) => boolean) {
  const isValid = validate(value);
  return { isValid };
}
