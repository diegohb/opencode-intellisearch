export function detectPackageManager(): string {
  const userAgent = process.env.npm_config_user_agent || process.env.USERAGENT || '';
  const isBun = userAgent.startsWith('bun') || process.env.BUN_INSTALL;

  if (isBun) {
    return 'bun';
  }

  if (userAgent.startsWith('npm')) {
    return 'npm';
  }

  if (process.env.npm_execpath && process.env.npm_execpath.includes('bun')) {
    return 'bun';
  }

  if (process.execArgv && process.execArgv[0] && process.execArgv[0].includes('bun')) {
    return 'bun';
  }

  return 'npm';
}
