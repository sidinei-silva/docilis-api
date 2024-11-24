import { ErrorMessages } from '../../../shared/core/errors/messages.error';

export const AdminResponse = {
  success: {
    created: {
      message: 'Admin created successfully.',
      status: 201,
    },
  },
  error: {
    emailAlreadyExists: {
      message: ErrorMessages.admin.emailAlreadyExists,
      status: 409,
    },
    notFound: {
      message: ErrorMessages.admin.notFound,
      status: 404,
    },
    invalidCredentials: {
      message: ErrorMessages.admin.invalidCredentials,
      status: 401,
    },
    invalidData: {
      message: ErrorMessages.commons.badRequest,
      status: 400,
    },
  },
};
