export interface MenuItem {
  id: string
  name: string
  price: number
  image_url: string
  category: string
  created_at: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface CustomerInfo {
  fullName: string
  phoneNumber: string
  email: string
}
