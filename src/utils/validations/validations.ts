export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const domainRegex = /@(outlook|gmail|hotmail|yahoo|icloud|example|test)\./i;
  const isValidDomain = domainRegex.test(email);
  return emailRegex.test(email) && isValidDomain;
}

export function isValidPassword(password: string): string | null {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres.';
  }

  if (!/[a-z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra minúscula.';
  }

  if (!/[A-Z]/.test(password)) {
    return 'A senha deve conter pelo menos uma letra maiúscula.';
  }

  if (!/\d/.test(password)) {
    return 'A senha deve conter pelo menos um número.';
  }

  if (!/[@$!%*?&]/.test(password)) {
    return 'A senha deve conter pelo menos um caractere especial: @$!%*?&';
  }

  if (!passwordRegex.test(password)) {
    return 'Sua senha deve conter 8 digitos ou mais, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
  }

  return null;
}
