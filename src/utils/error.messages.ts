export const notFoundErrorMessage = (entity: string, id: string) => {
  return `${entity} with id (${id}) is not found`;
};

export const ErrorMessage = {
  unauthorized: 'Unauthorized',
  forbidden: 'Forbidden',
  internalServerError: 'Internal server error',
};
