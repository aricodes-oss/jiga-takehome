export interface OfferItem {
  itemID: string;
  unitPrice: number;
  quantity: number;
}

export interface Offer {
  supplierId: string;
  items: OfferItem[];
  shippingPrice: number;
  totalPrice: number;
  leadTime: number;
}

export interface Quote {
  _id: string;
  customerName: string;
  offers: Offer[];
}

export interface Rating {
  _id: string;
  supplierId: string;
  rating: number;
}

export interface Supplier {
  _id: string;
  name: string;
  country: string;
}

export interface Item {
  _id: string;
  name: string;
}

export interface SupplierQuotes {
  [supplierId: string]: {
    [itemId: string]: OfferItem;
  };
}
