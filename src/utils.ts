import { Review } from './types/types.ts';

export function compare(a: Review, b: Review) {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);
  return Number(dateB) - Number(dateA);
}
