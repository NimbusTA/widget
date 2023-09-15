export const formatCost = (cost: number, smallestCost = 0.01): string =>
  cost < smallestCost ? '<$0.01' : `$${cost.toFixed(2)}`;
