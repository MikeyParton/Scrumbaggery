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

export const crossParentReorder = ({
  lists,
  listKey,
  fromListIndex,
  fromIndex,
  toListIndex,
  toIndex
}) => {
  // First remove the child from where it started
  const startingFromList = lists[fromListIndex][listKey]
  const finalFromList = removeFromList(
    startingFromList,
    fromIndex
  )

  // Then add the child to where it needs to go
  const startingToList = toListIndex === fromListIndex
    ? finalFromList
    : lists[toListIndex].cards

  const finalToList = addToList(
    startingToList,
    startingFromList[fromIndex],
    toIndex
  )

  // Insert the updated list(s) back into the lists array
  return lists.map((list, index) => {
    if (index == fromListIndex && index != toListIndex) {
      return { ...list, [listKey]: finalFromList }
    }
    if (index == toListIndex) {
      return { ...list, [listKey]: finalToList }
    }
    return list
  })
}
