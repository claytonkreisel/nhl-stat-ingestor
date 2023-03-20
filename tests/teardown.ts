import { exec } from 'child_process';

export default () => {
  if (!process.env?.KEEP_DB) {
    exec('rm prisma/test.sqlite');
    exec('rm prisma/test.sqlite-journal');
  }
};
