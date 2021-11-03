export default function useStandardColors(amount: number) {
  let colors = []

  for (let i = 0; i <= amount; i++) {
    colors.push(standardColors[i])
  }
  return colors
}

const standardColors = [
  '#FF0000',
  '#008000',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FF00',
  '#00FFFF',
  '#800080',
  '#800000',
  '#808000',
  '#008080',
  '#000080',
]
