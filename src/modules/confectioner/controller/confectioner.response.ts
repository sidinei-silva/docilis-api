import { ErrorMessages } from '../../../shared/core/errors/messages.error';

export const ConfectionerResponse = {
  success: {
    created: {
      message: 'Confectioner created successfully.',
      status: 201,
    },
  },
  error: {
    emailAlreadyExists: {
      message: ErrorMessages.confectioner.emailAlreadyExists,
      status: 409,
    },
    notFound: {
      message: ErrorMessages.confectioner.notFound,
      status: 404,
    },
    invalidCredentials: {
      message: ErrorMessages.confectioner.invalidCredentials,
      status: 401,
    },
    invalidData: {
      message: ErrorMessages.commons.badRequest,
      status: 400,
    },
  },
};
