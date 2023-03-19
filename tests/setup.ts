import { exec } from 'child_process';

export default () => exec('dotenv -e .env.test -- yarn prisma migrate dev');
