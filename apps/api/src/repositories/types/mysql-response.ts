export type MySqlResponse<ResponseType> = [
  ResponseType[],
  sqlFields: [
    any
  ]
]