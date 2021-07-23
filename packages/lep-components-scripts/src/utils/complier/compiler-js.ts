import { transformFileSync } from '@babel/core'
import { Console, existsPath } from "..";

export default async (path: string) => {
  try {
    await existsPath(path)
    const result = transformFileSync(path, {

    })
    return result?.code
  } catch (error) {
    Console(error, 2)
    process.exit(1)
  }
}