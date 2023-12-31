const {xfs} = require(`@yarnpkg/fslib`);
const {
  fs: {writeJson},
} = require(`pkg-tests-core`);

exports.environments = {
  [`empty project`]: async path => {
    await writeJson(`${path}/package.json`, {});
  },
  [`one regular dependency`]: async path => {
    await writeJson(`${path}/package.json`, {
      dependencies: {
        [`no-deps`]: `1.0.0`,
      },
    });
  },
  [`two regular dependencies`]: async path => {
    await writeJson(`${path}/package.json`, {
      dependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
    });
  },
  [`two development dependencies`]: async path => {
    await writeJson(`${path}/package.json`, {
      devDependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
    });
  },
  [`two regular dependencies, two development dependencies`]: async path => {
    await writeJson(`${path}/package.json`, {
      dependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
      devDependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
    });
  },
  [`multiple workspaces`]: async path => {
    await writeJson(`${path}/package.json`, {
      private: true,
      workspaces: [`packages/**`],
    });

    await xfs.mkdirPromise(`${path}/packages`);

    await xfs.mkdirPromise(`${path}/packages/workspace-a`);
    await xfs.mkdirPromise(`${path}/packages/workspace-b`);

    await writeJson(`${path}/packages/workspace-a/package.json`, {
      name: `workspace-a`,
      dependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
      devDependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
    });

    await writeJson(`${path}/packages/workspace-b/package.json`, {
      name: `workspace-b`,
      dependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
      devDependencies: {
        [`no-deps`]: `1.0.0`,
        [`no-deps-bins`]: `1.0.0`,
      },
      dependenciesMeta: {
        [`no-deps`]: {
          built: false,
        },
      },
    });
  },
  [`various field types`]: async path => {
    await writeJson(`${path}/package.json`, {
      name: `foo`,
      repository: {
        type: `git`,
        url: `ssh://git@github.com/yarnpkg/berry.git`,
        directory: `.`,
      },
      files: [
        `/a`,
        `/b`,
        `/c`,
      ],
    });
  },
};
