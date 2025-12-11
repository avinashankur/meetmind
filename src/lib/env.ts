export const getEnvVar = (key: string): string => {
  const val = process.env[key];

  if (!val) {
    throw new Error(`Missing environment variable: ${key}!`);
  }

  return val;
};
