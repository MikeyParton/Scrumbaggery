export const reorder = (list, startIndex, endIndex) => {
  const item = list[startIndex]
  let result = removeFromList(list, startIndex)
  return addToList(result, item, endIndex)
}

export const removeFromList = (list, index) => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)
  return result
}

export const addToList = (list, item, index) => {
  const result = Array.from(list)
  result.splice(index, 0, item)
  return result
}
