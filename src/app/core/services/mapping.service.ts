import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Account } from "../models/account.model";
import { Discount } from "../models/discount.model";
import { Ordering } from "../models/ordering.model";
import { Category } from "../models/category.model";
import { Product } from "../models/product.model";
import { ProductSize } from "../models/product-size.model";
import { DetailOrder } from "../models/detail-order.model";

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  account(payload: any): Account {
    return payload ? {
      phone: payload.accountPhone,
      name: payload.accountName,
      email: payload.accountEmail,
      password: payload.accountPassword,
      role: payload.accountRole,
      active: payload.accountActive,
      address: payload.accountAddress
    } : new Account()
  }

  discount(payload: any): Discount {
    return payload ? {
      id: payload.discountId,
      code: payload.discountCode,
      creationDate: payload.discountCreationDate,
      expiredDate: payload.discountExpiredDate,
      minimumOrderPrice: payload.discountMinimumOrderPrice,
      amount: payload.discountAmount,
    } : new Discount()
  }

  ordering(payload: any): Ordering {
    return payload ? {
      id: payload.orderingID,
      status: payload.orderingStatus,
      date: payload.orderingCreationDate,
      shippingFee: payload.orderingShippingFee,
      price: payload.orderingPrice,
      note: payload.orderingNote,
      paymentStatus: payload.orderingPaymentStatus,
      totalPrice: payload.orderingTotalPrice,
      account: this.account(payload.accountEntity),
      discount: this.discount(payload.discountEntity)
    } : new Ordering()
  }

  detailOrder(payload: any): DetailOrder {
    return payload ? {
      productSize: this.productSize(payload.productSizeEntity),
      ordering: this.ordering(payload.orderingEntity),
      quantity: payload.detailOrderProductQuantity,
      subTotal: payload.detailOrderSubTotal
    } : new DetailOrder()
  }

  category(payload: any): Category {
    return payload ? {
      id: payload.categoryId,
      name: payload.categoryName,
    } : new Category()
  }

  product(payload: any): Product {
    return payload ? {
      id: payload.productId,
      name: payload.productName,
      description: payload.productDescription,
      imageUrl: payload.productImageUrl,
      creationDate: payload.productCreationDate,
      isPopular: payload.productIsPopular,
      category: this.category(payload.categoryEntity),
      active: payload.productActive
    } : new Product()
  }

  productSize(payload: any): ProductSize {
    return payload ? {
      id: payload.productSizeId,
      size: payload.productSize,
      price: payload.productSizePrice,
      product: this.product(payload.productEntity)
    } : new ProductSize()
  }
}