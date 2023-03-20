import { exec } from 'child_process';
import { promisify } from 'util';

export default async () => {
  const execPromise = promisify(exec);
  await execPromise('rm prisma/test.sqlite').catch(e => console.log(e.message));
  await execPromise('rm prisma/test.sqlite-journal').catch(e =>
    console.log(e.message)
  );
  await execPromise('dotenv -e .env.test -- yarn prisma migrate dev');
};
