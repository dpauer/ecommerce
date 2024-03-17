export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
}

export interface Category {
  id: number
  name: string
  created_at: string
  updated_at: string
  attributes: Attribute[]
  products: Product[]
}

export interface Attribute {
  id: number
  type: string
  name: string
  created_at: string
  updated_at: string
  attribute_values: AttributeValue[]
}

export interface AttributeValue {
  id: number
  value: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  price: number
}
export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User
  }
}
