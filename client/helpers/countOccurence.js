const countOccurence = arr => {
  const counts = {}

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]
    counts[num] = counts[num] ? counts[num] + 1 : 1
  }
  return counts
}

export default countOccurence
