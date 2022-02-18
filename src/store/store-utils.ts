export const updateArrayData = (prevValues: any[], newValues: any[], page: number, pageSize: number) => {
  if (page > 1) {
    const start = (page - 1) * pageSize;
    const newArray = [...prevValues];
    newArray.splice(start, pageSize, ...newValues);
    return newArray;
  } else {
    return newValues;
  }
};
