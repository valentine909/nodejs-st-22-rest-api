export const notFoundErrorMessage = (entity: string, id: string) => {
  return `${entity} with id (${id}) is not found`;
};

export const ErrorMessage = {
  '500': 'Internal server error',
};
