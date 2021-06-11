export const dbUriCreator = () =>
  process.env.DATABASE_URI.replace('user', process.env.DATABASE_USER).replace(
    'password',
    process.env.DATABASE_PASSWORD,
  );
