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
import { Support } from "../models/support.model";
import { FavoriteProduct } from "../models/favorite-product.model";
import { Feedback } from "../models/feedback.model";

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
      cancelDescription: payload.orderingCancelDescription,
      approveDescription: payload.orderingApproveDescription,
      paymentStatus: payload.orderingPaymentStatus,
      totalPrice: payload.orderingTotalPrice,
      account: this.account(payload.accountEntity),
      updatedByAccount: this.account(payload.updatedByAccountEntity),
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

  feedback(payload: any): Feedback {
    return payload ? {
      rate: payload.feedbackRate,
      comment: payload.feedbackComment,
      creationDate: payload.feedbackCreationDate,
      active: payload.feedbackActive,
      account: this.account(payload.accountEntity),
      product: this.product(payload.productEntity)
    } : new Feedback()
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
      active: payload.productActive,
      minPrice: payload.productMinPrice 
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

  support(payload: any): Support {
    return payload ? {
      id: payload.supportID,
      title: payload.supportTitle,
      content: payload.supportContent,
      reason: payload.supportReason,
      creationDate: payload.supportCreationDate,
      status: payload.supportStatus,
      account: this.account(payload.accountEntity)
    } : new Support()
  }

  favoriteProduct(payload: any): FavoriteProduct {
    return payload ? {
      account: this.account(payload.accountEntity),
      product: this.product(payload.productEntity)
    } : new FavoriteProduct()
  }
}