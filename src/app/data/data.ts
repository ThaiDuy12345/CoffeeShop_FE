import { Account } from "../core/models/account.model"
import { Category } from "../core/models/category.model"
import { Product } from "../core/models/product.model"
import { FeedBack } from "../core/models/feedback.model"


const imagePath = "assets/product-pictures/"

export const AccountData: Account[] = [
  {
    id: "0",
    name: "Sirikakire",
    phone: "0912571469",
    email: "siri@gmail.com",
    password: "123123",
    address: "443/18 Lê Văn Sỹ, Phường 12, Quận 3, TP Hồ Chí Minh",
    role: "1"
  },
  {
    id: "1",
    name: "Thái Duy",
    phone: "0858343251",
    email: "siri2@gmail.com",
    password: "123123",
    address: "443/18 Lê Văn Sỹ, Phường 12, Quận 3, TP Hồ Chí Minh",
    role: "1"
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
    price: 49000,
    quantity: -1,
    description: "Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác 'thức giấc', thơm ngon hết nấc.",
    picture: `${imagePath}cloudFeeHanhNhanNuong.webp`,
    category: CategoryData[0]
  },
  {
    id: "1",
    name: "Cà phê sữa đá",
    price: 29000,
    quantity: -1,
    description: "Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.",
    picture: `${imagePath}cafeSuaDa.webp`,
    category: CategoryData[0]
  },
  {
    id: "2",
    name: "Hi Tea vải",
    price: 49000,
    quantity: -1,
    description: "Chút ngọt ngào của Vải, mix cùng vị chua thanh tao từ trà hoa Hibiscus, mang đến cho bạn thức uống đúng chuẩn vừa ngon, vừa healthy.",
    picture: `${imagePath}hiTeaVai.webp`,
    category: CategoryData[1]
  },
  {
    id: "3",
    name: "Bánh mì thịt nguội",
    price: 35000,
    quantity: -1,
    description: "Gói gọn trong ổ bánh mì Việt Nam là từng lớp chả, từng lớp jambon hòa quyện cùng bơ và pate thơm lừng, thêm dưa rau cho bữa sáng đầy năng lượng. *Phần bánh sẽ ngon và đậm đà nhất khi kèm pate. Để đảm bảo hương vị được trọn vẹn, Nhà mong bạn thông cảm vì không thể thay đổi định lượng pate.",
    picture: `${imagePath}banhMiThitNguoi.webp`,
    category: CategoryData[2]
  },
  {
    id: "4",
    name: "Mochi kem chocolate",
    price: 19000,
    quantity: -1,
    description: "Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân chocolate độc đáo. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.",
    picture: `${imagePath}mochiKemChocolate.webp`,
    category: CategoryData[2]
  },
  {
    id: "6",
    name: "The Coffee House Sữa Đá",
    price: 19000,
    quantity: -1,
    description: "Thức uống giúp tỉnh táo tức thì để bắt đầu ngày mới thật hứng khởi. Không đắng khét như cà phê truyền thống, The Coffee House Sữa Đá mang hương vị hài hoà đầy lôi cuốn. Là sự đậm đà của 100% cà phê Arabica Cầu Đất rang vừa tới, biến tấu tinh tế với sữa đặc và kem sữa ngọt ngào cực quyến rũ. Càng hấp dẫn hơn với topping thạch 100% cà phê nguyên chất giúp giữ trọn vị ngon đến ngụm cuối cùng.",
    picture: `${imagePath}theCoffeeHouseSuaDa.webp`,
    category: CategoryData[0]
  }
]

export const FeedBackData: FeedBack[] = [
  {
    id: '0',
    star: 4,
    comment: 'Cũng tạm được',
    product: ProductData[0],
    creationDate: new Date('07-04-2023'),
    account: AccountData[0],
  },
  {
    id: '1',
    star: 4,
    comment: 'Ngon á, nhưng hơi dở',
    product: ProductData[1],
    creationDate: new Date('01-04-2023'),
    account: AccountData[0],
  },
  {
    id: '2',
    star: 5,
    comment: 'Quá tuyệt vời!',
    product: ProductData[2],
    creationDate: new Date('05-04-2023'),
    account: AccountData[1],
  },
  {
    id: '3',
    star: 4,
    comment: 'Hợp khẩu vị của mình',
    product: ProductData[3],
    creationDate: new Date('04-04-2023'),
    account: AccountData[1],
  },
  {
    id: '4',
    star: 3,
    comment: 'Không thích',
    product: ProductData[4],
    creationDate: new Date('04-04-2023'),
    account: AccountData[0],
  },
  {
    id: '5',
    star: 5,
    comment: 'Rất ngon, tôi thích!',
    product: ProductData[0],
    creationDate: new Date('03-04-2023'),
    account: AccountData[1],
  },
  {
    id: '6',
    star: 4,
    comment: 'Cũng ổn thôi',
    product: ProductData[1],
    creationDate: new Date('02-04-2023'),
    account: AccountData[1],
  },
  {
    id: '7',
    star: 5,
    comment: 'Sản phẩm chất lượng',
    product: ProductData[2],
    creationDate: new Date('08-04-2023'),
    account: AccountData[0],
  },
  {
    id: '8',
    star: 4,
    comment: 'Hơi mắc nhưng cũng đáng giá',
    product: ProductData[3],
    creationDate: new Date('05-04-2023'),
    account: AccountData[0],
  },
  {
    id: '9',
    star: 2,
    comment: 'Không thích',
    product: ProductData[4],
    creationDate: new Date('07-04-2023'),
    account: AccountData[0],
  },
  // Tiếp tục thêm các mục feedback khác
  {
    id: '10',
    star: 4,
    comment: 'Sản phẩm phải lòng',
    product: ProductData[2],
    creationDate: new Date('06-04-2023'),
    account: AccountData[0],
  },
  {
    id: '11',
    star: 4,
    comment: 'Hơi ngọt quá',
    product: ProductData[3],
    creationDate: new Date('07-04-2023'),
    account: AccountData[0],
  },
  {
    id: '12',
    star: 5,
    comment: 'Thích hương vị này',
    product: ProductData[4],
    creationDate: new Date('05-04-2023'),
    account: AccountData[1],
  },
  {
    id: '13',
    star: 3,
    comment: 'Không hài lòng lắm',
    product: ProductData[0],
    creationDate: new Date('05-04-2023'),
    account: AccountData[1],
  },
  {
    id: '14',
    star: 4,
    comment: 'Sản phẩm tốt',
    product: ProductData[1],
    creationDate: new Date('03-04-2023'),
    account: AccountData[1],
  },
  {
    id: '15',
    star: 4,
    comment: 'Sản phẩm không tệ',
    product: ProductData[0],
    creationDate: new Date('01-04-2023'),
    account: AccountData[1],
  },
  {
    id: '16',
    star: 3,
    comment: 'Không đáng giá giá tiền',
    product: ProductData[1],
    creationDate: new Date('07-04-2023'),
    account: AccountData[0],
  },
  {
    id: '17',
    star: 4,
    comment: 'Mình thích',
    product: ProductData[2],
    creationDate: new Date('08-04-2023'),
    account: AccountData[1],
  },
  {
    id: '18',
    star: 3,
    comment: 'Chưa đủ tốt',
    product: ProductData[3],
    creationDate: new Date('03-04-2023'),
    account: AccountData[1],
  },
  {
    id: '19',
    star: 3,
    comment: 'Không ưa',
    product: ProductData[4],
    creationDate: new Date('03-04-2023'),
    account: AccountData[1],
  },
  // Tiếp tục thêm các mục feedback khác
  {
    id: '20',
    star: 5,
    comment: 'Rất thích!',
    product: ProductData[0],
    creationDate: new Date('04-04-2023'),
    account: AccountData[1],
  },
  {
    id: '21',
    star: 3,
    comment: 'Cũng khá ngon',
    product: ProductData[1],
    creationDate: new Date('03-04-2023'),
    account: AccountData[1],
  },
  {
    id: '22',
    star: 5,
    comment: 'Mua lần nữa',
    product: ProductData[2],
    creationDate: new Date('03-04-2023'),
    account: AccountData[0],
  },
  {
    id: '23',
    star: 3,
    comment: 'Tạm được',
    product: ProductData[3],
    creationDate: new Date('02-04-2023'),
    account: AccountData[0],
  },
  {
    id: '24',
    star: 4,
    comment: 'Hợp khẩu vị',
    product: ProductData[4],
    creationDate: new Date('07-04-2023'),
    account: AccountData[0],
  },
]