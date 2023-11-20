import { DetailOrder } from './../core/models/detail-order.model';
import { Account } from "../core/models/account.model"
import { Category } from "../core/models/category.model"
import { Product } from "../core/models/product.model"
import { FeedBack } from "../core/models/feedback.model"
import { Ordering } from "../core/models/ordering.model"
import { FavoriteProduct } from '../core/models/favorite-product.model';
import { Notification } from '../core/models/notification.model';
import { ProductSize } from '../core/models/product-size.model';
import { Discount } from '../core/models/discount.model';


const imagePath = "assets/product-pictures/"

export const AccountData: Account[] = [
  {
    name: "Sirikakire",
    phone: "0912571469",
    email: "siri@gmail.com",
    password: "123123",
    address: "443/18 Lê Văn Sỹ, Phường 12, Quận 3, TP Hồ Chí Minh",
    role: 2,
    active: true,
  },
  {
    name: "Thái Duy",
    phone: "0858343251",
    email: "siri2@gmail.com",
    password: "123123",
    address: "443/18 Lê Văn Sỹ, Phường 12, Quận 3, TP Hồ Chí Minh",
    role: 0,
    active: true,
  }
]

export const CategoryData: Category[] = [
  {
    id: "0",
    name: "coffee"
  },
  {
    id: "1",
    name: "tea"
  },
  {
    id: "2",
    name: "food"
  },
  {
    id: "3",
    name: "package"
  }
]

export const ProductData: Product[] = [
  {
    id: "0",
    name: "CloudFee Hạnh Nhân Nướng",
    description: "Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác 'thức giấc', thơm ngon hết nấc.",
    imageUrl: `${imagePath}cloudFeeHanhNhanNuong.webp`,
    category: CategoryData[0],
    isPopular: true,
    creationDate: new Date('2023-09-01').getTime(),
    active: true,
  },
  {
    id: "1",
    name: "Cà phê sữa đá",
    description: "Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
    imageUrl: `${imagePath}cafeSuaDa.webp`,
    category: CategoryData[0],
    isPopular: true,
    creationDate: new Date('2023-09-02').getTime(),
    active: true,
  },
  {
    id: "2",
    name: "Hi Tea vải",
    description: "Chút ngọt ngào của Vải, mix cùng vị chua thanh tao từ trà hoa Hibiscus, mang đến cho bạn thức uống đúng chuẩn vừa ngon, vừa healthy.",
    imageUrl: `${imagePath}hiTeaVai.webp`,
    category: CategoryData[1],
    isPopular: false,
    creationDate: new Date('2023-09-03').getTime(),
    active: true,
  },
  {
    id: "3",
    name: "Bánh mì thịt nguội",
    description: "Gói gọn trong ổ bánh mì Việt Nam là từng lớp chả, từng lớp jambon hòa quyện cùng bơ và pate thơm lừng, thêm dưa rau cho bữa sáng đầy năng lượng. *Phần bánh sẽ ngon và đậm đà nhất khi kèm pate. Để đảm bảo hương vị được trọn vẹn, Nhà mong bạn thông cảm vì không thể thay đổi định lượng pate.",
    imageUrl: `${imagePath}banhMiThitNguoi.webp`,
    category: CategoryData[2],
    isPopular: true,
    creationDate: new Date('2023-08-26').getTime(),
    active: true,
  },
  {
    id: "4",
    name: "Mochi kem chocolate",
    description: "Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân chocolate độc đáo. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.",
    imageUrl: `${imagePath}mochiKemChocolate.webp`,
    category: CategoryData[2],
    isPopular: false,
    creationDate: new Date('2023-09-11').getTime(),
    active: true,
  },
  {
    id: "5",
    name: "The Coffee House Sữa Đá",
    description: "Thức uống giúp tỉnh táo tức thì để bắt đầu ngày mới thật hứng khởi. Không đắng khét như cà phê truyền thống, The Coffee House Sữa Đá mang hương vị hài hoà đầy lôi cuốn. Là sự đậm đà của 100% cà phê Arabica Cầu Đất rang vừa tới, biến tấu tinh tế với sữa đặc và kem sữa ngọt ngào cực quyến rũ. Càng hấp dẫn hơn với topping thạch 100% cà phê nguyên chất giúp giữ trọn vị ngon đến ngụm cuối cùng.",
    imageUrl: `${imagePath}theCoffeeHouseSuaDa.webp`,
    category: CategoryData[0],
    isPopular: true,
    creationDate: new Date('2023-08-10').getTime(),
    active: true,
  }
]

export const ProductSizeData: ProductSize[] = [
  {
    id: "0",
    size: "S",
    price: 19000,
    product: ProductData[0]
  },
  {
    id: "1",
    size: "M",
    price: 29000,
    product: ProductData[0]
  },
  {
    id: "2",
    size: "S",
    price: 29000,
    product: ProductData[1]
  },
  {
    id: "3",
    size: "S",
    price: 29000,
    product: ProductData[2]
  },
  {
    id: "4",
    size: "S",
    price: 49000,
    product: ProductData[3]
  },
  {
    id: "5",
    size: "M",
    price: 59000,
    product: ProductData[3]
  },
  {
    id: "6",
    size: "S",
    price: 39000,
    product: ProductData[4]
  },
  {
    id: "7",
    size: "M",
    price: 39000,
    product: ProductData[4]
  },
  {
    id: "8",
    size: "S",
    price: 29000,
    product: ProductData[5]
  },
  {
    id: "9",
    size: "M",
    price: 39000,
    product: ProductData[5]
  },
  {
    id: "10",
    size: "L",
    price: 49000,
    product: ProductData[5]
  }
]

export const FavoriteProductData: FavoriteProduct[] = [
  {
    id: '0',
    account: AccountData[0],
    product: ProductData[0]
  },
  {
    id: '0',
    account: AccountData[0],
    product: ProductData[1]
  },
  {
    id: '0',
    account: AccountData[0],
    product: ProductData[3]
  },
  {
    id: '0',
    account: AccountData[0],
    product: ProductData[5]
  }
]

export const FeedBackData: FeedBack[] = [
  {
    star: 4,
    comment: 'Sản phẩm này cũng tạm được, tôi cảm thấy hài lòng với những gì nó mang lại. Mặc dù có một số điểm nhỏ cần cải thiện, nhưng tổng thể vẫn rất tốt!',
    product: ProductData[0],
    creationDate: new Date('07-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 4,
    comment: 'Món này thực sự ngon đấy, tôi thích cách hương vị kết hợp với nhau. Tuy nhiên, còn một chút điều gì đó chưa hoàn hảo, có lẽ cần một chút cải thiện.',
    product: ProductData[1],
    creationDate: new Date('01-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 5,
    comment: 'Wow, quả thật là tuyệt vời! Mọi thứ đều hoàn hảo, từ hương vị cho đến chất lượng. Tôi hoàn toàn hài lòng và sẵn sàng trở lại lần sau.',
    product: ProductData[2],
    creationDate: new Date('05-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 4,
    comment: 'Thức ăn này thực sự phù hợp với khẩu vị của mình. Tôi thích cách nó làm thỏa mãn cảm giác đói và vị giác của mình.',
    product: ProductData[3],
    creationDate: new Date('04-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 3,
    comment: 'Không phải là món ưa thích của tôi, nhưng nó vẫn còn khá tốt. Có một số điểm cần cải thiện, tôi hy vọng tương lai sẽ có sự cải tiến.',
    product: ProductData[4],
    creationDate: new Date('04-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 1,
    comment: 'Gớm quá! Tôi cảm thấy thất vọng về sản phẩm này. Chất lượng kém và không đáp ứng được mong đợi của tôi.',
    product: ProductData[0],
    creationDate: new Date('03-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 4,
    comment: 'Tôi nghĩ rằng sản phẩm này cũng ổn thôi, không có gì đặc biệt nhưng cũng không tệ. Mình có thể xem xét thử lần nữa.',
    product: ProductData[1],
    creationDate: new Date('02-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 5,
    comment: 'Sản phẩm chất lượng, thực sự đáng để đầu tư. Tôi cảm thấy vui mừng khi chọn sản phẩm này và không hối hận về quyết định của mình.',
    product: ProductData[2],
    creationDate: new Date('08-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 4,
    comment: 'Mặc dù sản phẩm hơi mắc một chút, nhưng tôi thấy nó đáng giá với chất lượng và trải nghiệm mà nó mang lại.',
    product: ProductData[3],
    creationDate: new Date('05-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 2,
    comment: 'Tôi không cảm thấy hài lòng với sản phẩm này, có lẽ nó không phù hợp với sở thích của tôi. Tôi mong muốn có nhiều lựa chọn khác hơn.',
    product: ProductData[4],
    creationDate: new Date('07-04-2023').getTime(),
    account: AccountData[0],
  },
  // Tiếp tục thêm các mục feedback khác
  {
    star: 4,
    comment: 'Sản phẩm này thực sự phải lòng tôi. Tôi rất thích cách nó được thiết kế và hương vị của nó.',
    product: ProductData[2],
    creationDate: new Date('06-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 4,
    comment: 'Món này hơi ngọt quá đối với khẩu vị của mình. Tuy nhiên, nếu bạn thích đồ ngọt thì đây có thể là một sự lựa chọn tốt. Mình cảm nhận được vị ngọt đậm đà, nhưng một chút quá mức mà mình mong muốn.',
    product: ProductData[3],
    creationDate: new Date('07-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 5,
    comment: 'Mình thực sự thích hương vị của sản phẩm này. Nó có sự kết hợp hoàn hảo giữa các thành phần và tạo ra một trải nghiệm thú vị. Hương vị này thực sự đã nắm bắt được điểm yếu của mình.',
    product: ProductData[4],
    creationDate: new Date('05-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 2,
    comment: 'Mình không cảm thấy hài lòng lắm với sản phẩm này. Dù đã hy vọng điều gì đó tốt hơn, nhưng nó không đáp ứng được mong đợi của mình. Có lẽ mình sẽ thử lựa chọn khác lần sau.',
    product: ProductData[0],
    creationDate: new Date('05-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 4,
    comment: 'Sản phẩm này thực sự đáng giá sự đánh giá tích cực từ phía mình. Mình đã thử và cảm nhận được sự tốt của nó. Mình có thể dễ dàng khuyên nó cho bạn bè và người thân.',
    product: ProductData[1],
    creationDate: new Date('03-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 4,
    comment: 'Sản phẩm này không tệ chút nào. Tôi đã có một trải nghiệm tích cực khi thử nó. Mặc dù không thể coi là hoàn hảo, nhưng tôi vẫn cảm thấy thoải mái khi tiếp tục sử dụng nó.',
    product: ProductData[0],
    creationDate: new Date('01-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 3,
    comment: 'Mình nghĩ rằng sản phẩm này không đáng giá với giá tiền mình bỏ ra. Mình mong đợi nhiều hơn về chất lượng và trải nghiệm khi sử dụng nó.',
    product: ProductData[1],
    creationDate: new Date('07-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 4,
    comment: 'Mình thực sự thích sản phẩm này. Nó mang đến một trải nghiệm tuyệt vời và hợp với khẩu vị của mình. Mình cảm thấy mình đã đưa ra một quyết định đúng đắn.',
    product: ProductData[2],
    creationDate: new Date('08-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 3,
    comment: 'Mình cảm thấy sản phẩm này vẫn chưa đủ tốt. Dù có một số điểm tích cực, nhưng còn nhiều điểm cần cải thiện để nâng cao trải nghiệm của khách hàng.',
    product: ProductData[3],
    creationDate: new Date('03-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 3,
    comment: 'Mình không thực sự ưa thích sản phẩm này. Nó không hoàn toàn phù hợp với sở thích của mình và tôi cảm thấy không hài lòng với trải nghiệm.',
    product: ProductData[4],
    creationDate: new Date('03-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 5,
    comment: 'Mình rất thích sản phẩm này! Nó thực sự đáp ứng tất cả những gì mình mong đợi. Từ hương vị đến chất lượng, đều tuyệt vời. Mình rất hài lòng với sự lựa chọn của mình.',
    product: ProductData[0],
    creationDate: new Date('04-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 3,
    comment: 'Mình nghĩ sản phẩm này cũng khá ngon. Tuy không thể nói là hoàn hảo, nhưng nó vẫn đáp ứng được một phần mong đợi của mình.',
    product: ProductData[1],
    creationDate: new Date('03-04-2023').getTime(),
    account: AccountData[1],
  },
  {
    star: 5,
    comment: 'Mình đã quyết định mua sản phẩm này lần nữa. Đây là một trải nghiệm tuyệt vời và mình không thể bỏ qua nó. Sản phẩm này đúng đáng để đầu tư.',
    product: ProductData[2],
    creationDate: new Date('03-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 3,
    comment: 'Sản phẩm này tạm được với mình. Mình thấy nó không có gì đặc biệt và cũng không gây ấn tượng mạnh cho mình.',
    product: ProductData[3],
    creationDate: new Date('02-04-2023').getTime(),
    account: AccountData[0],
  },
  {
    star: 4,
    comment: 'Sản phẩm này thực sự hợp với khẩu vị của mình. Mình thích cách hương vị được kết hợp và nó mang lại trải nghiệm tốt cho mình.',
    product: ProductData[4],
    creationDate: new Date('07-04-2023').getTime(),
    account: AccountData[0],
  },
]

export const NotificationData: Notification[] = [
  {
    id: '0',
    type: "VIEW",
    link: "",
    content: "Ngày ngày nắng nóng, nhớ chống nóng bằng ly COFFEE",
    userId: "0",
    createdDate: new Date("23-09-2023").toString(),
    isRead: false
  },
  {
    id: "1",
    type: "LINK",
    link: "/main/cart",
    content: "Đơn hàng của bạn đã được bàn giao cho đơn vị vận chuyển",
    userId: "0",
    createdDate: new Date("23-09-2023").toString(),
    isRead: false
  }
]

export const OrderingData: Ordering[] = [
  {
    id: "VN2308685190140",
    status: 4,
    account: AccountData[0],
    discount: new Discount(),
    date: new Date("2023-08-26").getTime(),
    shippingFee: 15000,
    paymentStatus: null,
    price: 212000,
    note: "bruh",
    cancelDescription: "",
    approveDescription: "",
    updatedByAccount: AccountData[1],
    totalPrice: 227000
  },
  {
    id: "VN22323623190140",
    status: 2,
    account: AccountData[0],
    discount: new Discount(),
    date: new Date("2023-08-30").getTime(),
    shippingFee: 15000,
    paymentStatus: null,
    price: 216000,
    note: "bruh",
    cancelDescription: "",
    approveDescription: "",
    updatedByAccount: AccountData[1],
    totalPrice: 231000
  }
]

export const DetailOrderData: DetailOrder[] = [
  {
    quantity: 1,
    productSize: ProductSizeData[0],
    ordering: OrderingData[0],
    subTotal: 0
  },
  {
    quantity: 2,  
    productSize: ProductSizeData[5],
    ordering: OrderingData[0],
    subTotal: 0
  },
  {
    quantity: 4,
    productSize: ProductSizeData[3],
    ordering: OrderingData[0],
    subTotal: 0
  },

  {
    quantity: 3,
    productSize: ProductSizeData[5],
    ordering: OrderingData[1],
    subTotal: 0
  },
  {
    quantity: 6,
    productSize: ProductSizeData[1],
    ordering: OrderingData[1],
    subTotal: 0
  },

]

