const {
  fs: {writeFile},
} = require('pkg-tests-core');

const lockfile100 = `
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1


no-deps@*:
  version "1.0.0"
  resolved "https://registry.yarnpkg.com/no-deps/-/no-deps-1.0.0.tgz#39453512f8241e2d20307975e8d9eb6314f7bf61"
  integrity sha1-OUU1EvgkHi0gMHl16NnrYxT3v2E=
`.replace(/^\n+/g, ``);

const lockfile200 = `
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1


no-deps@*:
  version "2.0.0"
  resolved "https://registry.yarnpkg.com/no-deps/-/no-deps-2.0.0.tgz#39453512f8241e2d20307975e8d9eb6314f7bf62"
  integrity sha1-OUU1EvgkHi0gMHl16NnrYxT3v2E=
`.replace(/^\n+/g, ``);

describe(`Legacy tests`, () => {
  test(
    `it should import lock entries from v1 lockfiles (resolves to 1.0.0)`,
    makeTemporaryEnv(
      {
        dependencies: {[`no-deps`]: `*`},
      },
      async ({path, run, source}) => {
        await writeFile(`${path}/yarn.lock`, lockfile100);
        await run(`install`);

        await expect(source(`require('no-deps')`)).resolves.toMatchObject({
          name: `no-deps`,
          version: `1.0.0`,
        });
      },
    )
  );

  test(
    `it should import lock entries from v1 lockfiles (resolves to 2.0.0)`,
    makeTemporaryEnv(
      {
        dependencies: {[`no-deps`]: `*`},
      },
      async ({path, run, source}) => {
        await writeFile(`${path}/yarn.lock`, lockfile200);
        await run(`install`);

        await expect(source(`require('no-deps')`)).resolves.toMatchObject({
          name: `no-deps`,
          version: `2.0.0`,
        });
      },
    )
  );
});
