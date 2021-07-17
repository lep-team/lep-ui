import ora from 'ora'

import { RunCmd } from '../utils'


export default async (path: string = './components') => {
  const cmdQueue = [ 
    {
      cmd: 'eslint',
      options: [
        path,
        '--fix',
        '--ext',
        '.js,.ts,jsx,.tsx'
      ]
    }
  ]
  for (let i = 0; i < cmdQueue.length; i++) {
    const { cmd, options } = cmdQueue[i];
    await RunCmd(cmd, options)
  }
}