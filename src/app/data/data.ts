import { Account } from "../core/models/account.model"
import { Category } from "../core/models/category.model"
import { Product } from "../core/models/product.model"


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
    name: "Sirikakire2",
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