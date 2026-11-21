/**
 * engine-version — 把 xfmpress 的实际安装版本注入模板
 * -------------------------------------------------------------------
 * footer 要显示「由 xfmpress 0.4.17 强力驱动」，版本号取自 node_modules 里
 * 真实的 package.json，而不是手写在模板或配置里 —— 升级依赖后自动跟上。
 *
 * 模板里用 {{ engine.version }}（另附 engine.name / engine.repo）。
 */

function readVersion() {
  try {
    return require('xfmpress/package.json').version || '';
  } catch (e) {
    return '';
  }
}

module.exports = () => {
  const version = readVersion();
  return {
    name: 'engine-version',
    extendContext(ctx) {
      return {
        ...ctx,
        engine: { name: 'xfmpress', version, repo: 'https://github.com/xfm0797/xfm' },
      };
    },
  };
};
