export const ErrorMessages = {
  commons: {
    generic: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    notFound: 'Recurso não encontrado.',
    unauthorized: 'Acesso não autorizado.',
    forbidden: 'Você não tem permissão para acessar este recurso.',
    badRequest: 'A solicitação não pôde ser processada devido a dados inválidos.',
  },

  validation: {
    required: (field: string) => `${field} é obrigatório.`,
    invalid: (field: string) => `${field} é inválido.`,
    minLength: (field: string, length: number) => `${field} deve ter pelo menos ${length} caracteres.`,
    maxLength: (field: string, length: number) => `${field} não pode ter mais de ${length} caracteres.`,
    email: 'O formato do email é inválido.',
  },
};
