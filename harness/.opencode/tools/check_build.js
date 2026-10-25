import { execSync } from 'child_process';    // Node.js module to execute shell commands in terminal
import path from 'path'; // module to handle and transform file paths

export default {
  name: 'check_build', 

  description:
    'Runs `npm run build` inside the target-app directory to check ' +
    'whether the project has any build/type-check errors.',

  parameters: {
    type: 'object',
    properties: {},
  },

  async execute() {
    const targetDir = path.resolve(process.cwd(), '../target-app');

    try {
      const stdout = execSync('npm run build', {
        cwd: targetDir,
        encoding: 'utf-8',
      });

      return JSON.stringify({
        status: 'SUCCESS',
        message: 'Build completed successfully. No errors found.',
        output: stdout.slice(-300),
      });
    } catch (error) {
      return JSON.stringify({
        status: 'FAILED',
        message: 'Build failed.',
        errorLog: error.stdout ? error.stdout.toString() : error.message,
      });
    }
  },
};