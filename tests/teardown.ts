import { exec } from 'child_process';

export default () =>
  exec('rm prisma/test.sqlite && rm prisma/test.sqlite-journal');
