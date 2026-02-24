export const logger = {
  info: (...args) => console.info('[vms]', ...args),
  warn: (...args) => console.warn('[vms]', ...args),
  error: (...args) => console.error('[vms]', ...args)
};
