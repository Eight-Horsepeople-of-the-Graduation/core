export async function prismaWrapper<T>(
  handler: (args: any) => Promise<T>,
  args: any
) {
  try {
    const result = await handler(args);
    return result;
  } catch (error: any) {
    throw error;
  }
}
