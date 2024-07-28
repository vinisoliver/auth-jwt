export type MaskResponse = {
  primitiveValue: string | number, 
  formatedValue: string, 
}

export type Mask = (value: string) => MaskResponse

export { cpfMask } from './cpf.ts'
