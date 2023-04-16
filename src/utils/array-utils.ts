export const sortByField = (arr: any[], sortField: string) => 
   arr.sort((itemA, itemB) => itemA[sortField] - itemB[sortField]);
