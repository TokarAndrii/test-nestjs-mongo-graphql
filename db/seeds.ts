/* eslint @typescript-eslint/no-var-requires: "off" */
require('dotenv-flow').config();
import { createConnection } from 'typeorm';
import { User } from '../src/auth/model/user.model';

const users = [
  {
    username: 'john',
    password: 'changeme987654321',
    email: 'john.snow@gmail.com',
  },
  {
    username: 'maria',
    password: 'guess123zxc',
    email: 'maria.salomon@gmail.com',
  },
];

const seed = async () => {
  const dbUriCreator = () =>
    process.env.DATABASE_URI.replace('user', process.env.DATABASE_USER).replace(
      'password',
      process.env.DATABASE_PASSWORD,
    );

  console.log('seed....');
  const connection = await createConnection({
    type: 'mongodb',
    url: dbUriCreator(),
    logging: true,
    synchronize: true,
    logger: 'advanced-console',
    entities: [User],
  });

  try {
    const usersRepository = await connection.getMongoRepository(User);
    const template = await usersRepository.save(users);
    console.log(template);
  } catch (error) {
    console.log('seeds error', error);
  } finally {
    return connection.close();
  }
};

seed();
