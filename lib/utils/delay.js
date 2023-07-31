export default async (handler, delay = 1500, ...args) => {
  const endTime = Date.now() + delay;
  await handler.apply(this || null, args);
  const remainingTime = endTime - Date.now();
  if (remainingTime > 0) await new Promise(resolve => setTimeout(resolve, remainingTime));
}
