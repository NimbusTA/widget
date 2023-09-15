// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isEmptyObject(obj: any): boolean {
  return Object.keys(obj).length === 0;
}
