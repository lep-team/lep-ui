const download = require('download-git-repo');

export function loadRemote(
  repository: string,
  target: string,
  options = { clone: true }
) {
  return new Promise<void>((resolve, reject) => {
    download(repository, target, options, (err: any) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
