import { Mask } from "."

export const cpfMask: Mask = (value: string) => {
  const regex = /^(\d{3})(\d{0,3})(\d{0,3})(\d{0,2}).*/
  const outputFormat = (...groups: string[]) => {
    let result = `${groups[1]}`;

    if (groups[2]) result += ` ${groups[2]}`;
    if (groups[3]) result += ` ${groups[3]}`;
    if (groups[4]) result += ` ${groups[4]}`;

    return result;
  }

  const valueWithoutSpaces = value.replace(/\s/g, '')

  const formatedValue = valueWithoutSpaces.replace(regex, outputFormat)

  const primitiveValue = formatedValue.replace(/\s/g, '')
  
  return { primitiveValue: Number(primitiveValue), formatedValue }
} 


