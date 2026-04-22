/** Cơ sở dữ liệu địa giới hành chính Việt Nam (cập nhật 2025) */

export interface Ward     { name: string }
export interface District { name: string; wards: Ward[] }
export interface Province { name: string; districts: District[] }

export const provinces: Province[] = [
  /* ══════════════════════════════════════════════════════════
     TP. HỒ CHÍ MINH
  ══════════════════════════════════════════════════════════ */
  {
    name: "TP. Hồ Chí Minh",
    districts: [
      {
        name: "Quận 1",
        wards: [
          { name: "Phường Bến Nghé" }, { name: "Phường Bến Thành" },
          { name: "Phường Cô Giang" }, { name: "Phường Cầu Kho" },
          { name: "Phường Cầu Ông Lãnh" }, { name: "Phường Đa Kao" },
          { name: "Phường Nguyễn Cư Trinh" }, { name: "Phường Nguyễn Thái Bình" },
          { name: "Phường Phạm Ngũ Lão" }, { name: "Phường Tân Định" },
        ],
      },
      {
        name: "Quận 3",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Phường 13" }, { name: "Phường 14" }, { name: "Phường Võ Thị Sáu" },
        ],
      },
      {
        name: "Quận 4",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 6" }, { name: "Phường 8" },
          { name: "Phường 9" }, { name: "Phường 10" }, { name: "Phường 13" },
          { name: "Phường 14" }, { name: "Phường 15" }, { name: "Phường 16" },
          { name: "Phường 18" },
        ],
      },
      {
        name: "Quận 5",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Phường 13" }, { name: "Phường 14" }, { name: "Phường 15" },
        ],
      },
      {
        name: "Quận 6",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Phường 13" }, { name: "Phường 14" },
        ],
      },
      {
        name: "Quận 7",
        wards: [
          { name: "Phường Bình Thuận" }, { name: "Phường Phú Mỹ" },
          { name: "Phường Phú Thuận" }, { name: "Phường Tân Hưng" },
          { name: "Phường Tân Kiểng" }, { name: "Phường Tân Phong" },
          { name: "Phường Tân Phú" }, { name: "Phường Tân Quy" },
          { name: "Phường Tân Thuận Đông" }, { name: "Phường Tân Thuận Tây" },
        ],
      },
      {
        name: "Quận 8",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Phường 13" }, { name: "Phường 14" }, { name: "Phường 15" },
          { name: "Phường 16" },
        ],
      },
      {
        name: "Quận 10",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Phường 13" }, { name: "Phường 14" }, { name: "Phường 15" },
        ],
      },
      {
        name: "Quận 11",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Phường 13" }, { name: "Phường 14" }, { name: "Phường 15" },
          { name: "Phường 16" },
        ],
      },
      {
        name: "Quận 12",
        wards: [
          { name: "Phường An Phú Đông" }, { name: "Phường Đông Hưng Thuận" },
          { name: "Phường Hiệp Thành" }, { name: "Phường Tân Chánh Hiệp" },
          { name: "Phường Tân Hưng Thuận" }, { name: "Phường Tân Thới Hiệp" },
          { name: "Phường Tân Thới Nhất" }, { name: "Phường Thạnh Lộc" },
          { name: "Phường Thạnh Xuân" }, { name: "Phường Thới An" },
          { name: "Phường Trung Mỹ Tây" },
        ],
      },
      {
        name: "Quận Bình Thạnh",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 5" }, { name: "Phường 6" }, { name: "Phường 7" },
          { name: "Phường 11" }, { name: "Phường 12" }, { name: "Phường 13" },
          { name: "Phường 14" }, { name: "Phường 15" }, { name: "Phường 17" },
          { name: "Phường 19" }, { name: "Phường 21" }, { name: "Phường 22" },
          { name: "Phường 24" }, { name: "Phường 25" }, { name: "Phường 26" },
          { name: "Phường 27" }, { name: "Phường 28" },
        ],
      },
      {
        name: "Quận Bình Tân",
        wards: [
          { name: "Phường An Lạc" }, { name: "Phường An Lạc A" },
          { name: "Phường Bình Hưng Hòa" }, { name: "Phường Bình Hưng Hòa A" },
          { name: "Phường Bình Hưng Hòa B" }, { name: "Phường Bình Trị Đông" },
          { name: "Phường Bình Trị Đông A" }, { name: "Phường Bình Trị Đông B" },
          { name: "Phường Tân Tạo" }, { name: "Phường Tân Tạo A" },
        ],
      },
      {
        name: "Quận Gò Vấp",
        wards: [
          { name: "Phường 1" }, { name: "Phường 3" }, { name: "Phường 4" },
          { name: "Phường 5" }, { name: "Phường 6" }, { name: "Phường 7" },
          { name: "Phường 8" }, { name: "Phường 9" }, { name: "Phường 10" },
          { name: "Phường 11" }, { name: "Phường 12" }, { name: "Phường 13" },
          { name: "Phường 14" }, { name: "Phường 15" }, { name: "Phường 16" },
          { name: "Phường 17" },
        ],
      },
      {
        name: "Quận Phú Nhuận",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 7" },
          { name: "Phường 8" }, { name: "Phường 9" }, { name: "Phường 10" },
          { name: "Phường 11" }, { name: "Phường 12" }, { name: "Phường 13" },
          { name: "Phường 14" }, { name: "Phường 15" }, { name: "Phường 17" },
        ],
      },
      {
        name: "Quận Tân Bình",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Phường 13" }, { name: "Phường 14" }, { name: "Phường 15" },
        ],
      },
      {
        name: "Quận Tân Phú",
        wards: [
          { name: "Phường Hiệp Tân" }, { name: "Phường Hòa Thạnh" },
          { name: "Phường Phú Thạnh" }, { name: "Phường Phú Thọ Hòa" },
          { name: "Phường Phú Trung" }, { name: "Phường Sơn Kỳ" },
          { name: "Phường Tân Quý" }, { name: "Phường Tân Sơn Nhì" },
          { name: "Phường Tân Thành" }, { name: "Phường Tân Thới Hòa" },
          { name: "Phường Tây Thạnh" },
        ],
      },
      {
        name: "TP. Thủ Đức",
        wards: [
          { name: "Phường An Khánh" }, { name: "Phường An Lợi Đông" },
          { name: "Phường An Phú" }, { name: "Phường Bình Chiểu" },
          { name: "Phường Bình Thọ" }, { name: "Phường Bình Trưng Đông" },
          { name: "Phường Bình Trưng Tây" }, { name: "Phường Cát Lái" },
          { name: "Phường Hiệp Bình Chánh" }, { name: "Phường Hiệp Bình Phước" },
          { name: "Phường Hiệp Phú" }, { name: "Phường Linh Chiểu" },
          { name: "Phường Linh Đông" }, { name: "Phường Linh Tây" },
          { name: "Phường Linh Trung" }, { name: "Phường Linh Xuân" },
          { name: "Phường Long Bình" }, { name: "Phường Long Phước" },
          { name: "Phường Long Thạnh Mỹ" }, { name: "Phường Long Trường" },
          { name: "Phường Phú Hữu" }, { name: "Phường Phước Bình" },
          { name: "Phường Phước Long A" }, { name: "Phường Phước Long B" },
          { name: "Phường Tam Bình" }, { name: "Phường Tam Phú" },
          { name: "Phường Tăng Nhơn Phú A" }, { name: "Phường Tăng Nhơn Phú B" },
          { name: "Phường Thảo Điền" }, { name: "Phường Thủ Thiêm" },
          { name: "Phường Trường Thạnh" }, { name: "Phường Trường Thọ" },
        ],
      },
      {
        name: "Huyện Bình Chánh",
        wards: [
          { name: "Thị trấn Tân Túc" }, { name: "Xã An Phú Tây" },
          { name: "Xã Bình Chánh" }, { name: "Xã Bình Hưng" },
          { name: "Xã Bình Lợi" }, { name: "Xã Đa Phước" },
          { name: "Xã Hưng Long" }, { name: "Xã Lê Minh Xuân" },
          { name: "Xã Phạm Văn Hai" }, { name: "Xã Phong Phú" },
          { name: "Xã Quy Đức" }, { name: "Xã Tân Kiên" },
          { name: "Xã Tân Nhựt" }, { name: "Xã Tân Quý Tây" },
          { name: "Xã Vĩnh Lộc A" }, { name: "Xã Vĩnh Lộc B" },
        ],
      },
      {
        name: "Huyện Củ Chi",
        wards: [
          { name: "Thị trấn Củ Chi" }, { name: "Xã An Nhơn Tây" },
          { name: "Xã An Phú" }, { name: "Xã Bình Mỹ" },
          { name: "Xã Hòa Phú" }, { name: "Xã Nhuận Đức" },
          { name: "Xã Phạm Văn Cội" }, { name: "Xã Phú Hòa Đông" },
          { name: "Xã Phú Mỹ Hưng" }, { name: "Xã Phước Hiệp" },
          { name: "Xã Phước Thạnh" }, { name: "Xã Phước Vĩnh An" },
          { name: "Xã Tân An Hội" }, { name: "Xã Tân Phú Trung" },
          { name: "Xã Tân Thạnh Đông" }, { name: "Xã Tân Thạnh Tây" },
          { name: "Xã Tân Thông Hội" }, { name: "Xã Thái Mỹ" },
          { name: "Xã Trung An" }, { name: "Xã Trung Lập Hạ" },
          { name: "Xã Trung Lập Thượng" },
        ],
      },
      {
        name: "Huyện Hóc Môn",
        wards: [
          { name: "Thị trấn Hóc Môn" }, { name: "Xã Bà Điểm" },
          { name: "Xã Đông Thạnh" }, { name: "Xã Nhị Bình" },
          { name: "Xã Tân Hiệp" }, { name: "Xã Tân Thới Nhì" },
          { name: "Xã Tân Xuân" }, { name: "Xã Thới Tam Thôn" },
          { name: "Xã Trung Chánh" }, { name: "Xã Xuân Thới Đông" },
          { name: "Xã Xuân Thới Sơn" }, { name: "Xã Xuân Thới Thượng" },
        ],
      },
      {
        name: "Huyện Nhà Bè",
        wards: [
          { name: "Thị trấn Nhà Bè" }, { name: "Xã Hiệp Phước" },
          { name: "Xã Long Thới" }, { name: "Xã Nhơn Đức" },
          { name: "Xã Phú Xuân" }, { name: "Xã Phước Kiển" },
          { name: "Xã Phước Lộc" },
        ],
      },
      {
        name: "Huyện Cần Giờ",
        wards: [
          { name: "Thị trấn Cần Thạnh" }, { name: "Xã An Thới Đông" },
          { name: "Xã Bình Khánh" }, { name: "Xã Long Hòa" },
          { name: "Xã Lý Nhơn" }, { name: "Xã Tam Thôn Hiệp" },
          { name: "Xã Thạnh An" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     HÀ NỘI
  ══════════════════════════════════════════════════════════ */
  {
    name: "Hà Nội",
    districts: [
      {
        name: "Quận Ba Đình",
        wards: [
          { name: "Phường Cống Vị" }, { name: "Phường Điện Biên" },
          { name: "Phường Đội Cấn" }, { name: "Phường Giảng Võ" },
          { name: "Phường Kim Mã" }, { name: "Phường Liễu Giai" },
          { name: "Phường Ngọc Hà" }, { name: "Phường Ngọc Khánh" },
          { name: "Phường Phúc Xá" }, { name: "Phường Quán Thánh" },
          { name: "Phường Thành Công" }, { name: "Phường Trúc Bạch" },
          { name: "Phường Vĩnh Phúc" },
        ],
      },
      {
        name: "Quận Hoàn Kiếm",
        wards: [
          { name: "Phường Chương Dương" }, { name: "Phường Cửa Đông" },
          { name: "Phường Cửa Nam" }, { name: "Phường Đồng Xuân" },
          { name: "Phường Hàng Bạc" }, { name: "Phường Hàng Bài" },
          { name: "Phường Hàng Bồ" }, { name: "Phường Hàng Buồm" },
          { name: "Phường Hàng Gai" }, { name: "Phường Hàng Mã" },
          { name: "Phường Hàng Trống" }, { name: "Phường Lý Thái Tổ" },
          { name: "Phường Phan Chu Trinh" }, { name: "Phường Trần Hưng Đạo" },
          { name: "Phường Tràng Tiền" },
        ],
      },
      {
        name: "Quận Đống Đa",
        wards: [
          { name: "Phường Cát Linh" }, { name: "Phường Hàng Bột" },
          { name: "Phường Khâm Thiên" }, { name: "Phường Kim Liên" },
          { name: "Phường Láng Hạ" }, { name: "Phường Láng Thượng" },
          { name: "Phường Nam Đồng" }, { name: "Phường Ngã Tư Sở" },
          { name: "Phường Nguyễn Trãi" }, { name: "Phường Ô Chợ Dừa" },
          { name: "Phường Phương Liên" }, { name: "Phường Phương Mai" },
          { name: "Phường Thổ Quan" }, { name: "Phường Trung Liệt" },
          { name: "Phường Trung Phụng" }, { name: "Phường Trung Tự" },
          { name: "Phường Văn Chương" }, { name: "Phường Văn Miếu" },
          { name: "Phường Xã Đàn" },
        ],
      },
      {
        name: "Quận Hai Bà Trưng",
        wards: [
          { name: "Phường Bách Khoa" }, { name: "Phường Bạch Đằng" },
          { name: "Phường Bạch Mai" }, { name: "Phường Bùi Thị Xuân" },
          { name: "Phường Cầu Dền" }, { name: "Phường Đồng Nhân" },
          { name: "Phường Đồng Tâm" }, { name: "Phường Lê Đại Hành" },
          { name: "Phường Minh Khai" }, { name: "Phường Nguyễn Du" },
          { name: "Phường Phạm Đình Hổ" }, { name: "Phường Quỳnh Lôi" },
          { name: "Phường Quỳnh Mai" }, { name: "Phường Thanh Lương" },
          { name: "Phường Thanh Nhàn" }, { name: "Phường Trương Định" },
          { name: "Phường Tương Mai" }, { name: "Phường Vĩnh Tuy" },
        ],
      },
      {
        name: "Quận Hoàng Mai",
        wards: [
          { name: "Phường Định Công" }, { name: "Phường Đại Kim" },
          { name: "Phường Giáp Bát" }, { name: "Phường Hoàng Liệt" },
          { name: "Phường Hoàng Văn Thụ" }, { name: "Phường Lĩnh Nam" },
          { name: "Phường Mai Động" }, { name: "Phường Tân Mai" },
          { name: "Phường Thanh Trì" }, { name: "Phường Thịnh Liệt" },
          { name: "Phường Trần Phú" }, { name: "Phường Tương Mai" },
          { name: "Phường Vĩnh Hưng" }, { name: "Phường Yên Sở" },
        ],
      },
      {
        name: "Quận Thanh Xuân",
        wards: [
          { name: "Phường Hạ Đình" }, { name: "Phường Khương Đình" },
          { name: "Phường Khương Mai" }, { name: "Phường Khương Trung" },
          { name: "Phường Kim Giang" }, { name: "Phường Nhân Chính" },
          { name: "Phường Phương Liệt" }, { name: "Phường Thanh Xuân Bắc" },
          { name: "Phường Thanh Xuân Nam" }, { name: "Phường Thanh Xuân Trung" },
          { name: "Phường Thượng Đình" },
        ],
      },
      {
        name: "Quận Cầu Giấy",
        wards: [
          { name: "Phường Dịch Vọng" }, { name: "Phường Dịch Vọng Hậu" },
          { name: "Phường Mai Dịch" }, { name: "Phường Nghĩa Đô" },
          { name: "Phường Nghĩa Tân" }, { name: "Phường Quan Hoa" },
          { name: "Phường Trung Hòa" }, { name: "Phường Yên Hòa" },
        ],
      },
      {
        name: "Quận Tây Hồ",
        wards: [
          { name: "Phường Bưởi" }, { name: "Phường Nhật Tân" },
          { name: "Phường Phú Thượng" }, { name: "Phường Quảng An" },
          { name: "Phường Tứ Liên" }, { name: "Phường Thụy Khuê" },
          { name: "Phường Xuân La" }, { name: "Phường Yên Phụ" },
        ],
      },
      {
        name: "Quận Hà Đông",
        wards: [
          { name: "Phường Dương Nội" }, { name: "Phường Đồng Mai" },
          { name: "Phường Hà Cầu" }, { name: "Phường Kiến Hưng" },
          { name: "Phường La Khê" }, { name: "Phường Mộ Lao" },
          { name: "Phường Nguyễn Trãi" }, { name: "Phường Phú La" },
          { name: "Phường Phú Lãm" }, { name: "Phường Phú Lương" },
          { name: "Phường Phúc La" }, { name: "Phường Quang Trung" },
          { name: "Phường Vạn Phúc" }, { name: "Phường Văn Quán" },
          { name: "Phường Yên Nghĩa" }, { name: "Phường Yết Kiêu" },
        ],
      },
      {
        name: "Quận Long Biên",
        wards: [
          { name: "Phường Bồ Đề" }, { name: "Phường Cự Khối" },
          { name: "Phường Đức Giang" }, { name: "Phường Gia Thụy" },
          { name: "Phường Giang Biên" }, { name: "Phường Long Biên" },
          { name: "Phường Ngọc Lâm" }, { name: "Phường Ngọc Thụy" },
          { name: "Phường Phúc Đồng" }, { name: "Phường Phúc Lợi" },
          { name: "Phường Sài Đồng" }, { name: "Phường Thạch Bàn" },
          { name: "Phường Thượng Thanh" }, { name: "Phường Việt Hưng" },
        ],
      },
      {
        name: "Quận Nam Từ Liêm",
        wards: [
          { name: "Phường Cầu Diễn" }, { name: "Phường Đại Mỗ" },
          { name: "Phường Mễ Trì" }, { name: "Phường Mỹ Đình 1" },
          { name: "Phường Mỹ Đình 2" }, { name: "Phường Phú Đô" },
          { name: "Phường Phương Canh" }, { name: "Phường Tây Mỗ" },
          { name: "Phường Trung Văn" }, { name: "Phường Xuân Phương" },
        ],
      },
      {
        name: "Quận Bắc Từ Liêm",
        wards: [
          { name: "Phường Cổ Nhuế 1" }, { name: "Phường Cổ Nhuế 2" },
          { name: "Phường Đông Ngạc" }, { name: "Phường Đức Thắng" },
          { name: "Phường Liên Mạc" }, { name: "Phường Minh Khai" },
          { name: "Phường Phú Diễn" }, { name: "Phường Phúc Diễn" },
          { name: "Phường Tây Tựu" }, { name: "Phường Thụy Phương" },
          { name: "Phường Thượng Cát" }, { name: "Phường Xuân Đỉnh" },
          { name: "Phường Xuân Tảo" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     ĐÀ NẴNG
  ══════════════════════════════════════════════════════════ */
  {
    name: "Đà Nẵng",
    districts: [
      {
        name: "Quận Hải Châu",
        wards: [
          { name: "Phường Bình Hiên" }, { name: "Phường Bình Thuận" },
          { name: "Phường Hải Châu 1" }, { name: "Phường Hải Châu 2" },
          { name: "Phường Hòa Cường Bắc" }, { name: "Phường Hòa Cường Nam" },
          { name: "Phường Hòa Thuận Đông" }, { name: "Phường Hòa Thuận Tây" },
          { name: "Phường Nam Dương" }, { name: "Phường Phước Ninh" },
          { name: "Phường Thạch Thang" }, { name: "Phường Thanh Bình" },
          { name: "Phường Thuận Phước" },
        ],
      },
      {
        name: "Quận Thanh Khê",
        wards: [
          { name: "Phường An Khê" }, { name: "Phường Chính Gián" },
          { name: "Phường Hòa Khê" }, { name: "Phường Tam Thuận" },
          { name: "Phường Tân Chính" }, { name: "Phường Thạc Gián" },
          { name: "Phường Thanh Khê Đông" }, { name: "Phường Thanh Khê Tây" },
          { name: "Phường Vĩnh Trung" }, { name: "Phường Xuân Hà" },
        ],
      },
      {
        name: "Quận Sơn Trà",
        wards: [
          { name: "Phường An Hải Bắc" }, { name: "Phường An Hải Đông" },
          { name: "Phường An Hải Tây" }, { name: "Phường Mân Thái" },
          { name: "Phường Nại Hiên Đông" }, { name: "Phường Phước Mỹ" },
          { name: "Phường Thọ Quang" },
        ],
      },
      {
        name: "Quận Ngũ Hành Sơn",
        wards: [
          { name: "Phường Hòa Hải" }, { name: "Phường Hòa Quý" },
          { name: "Phường Khuê Mỹ" }, { name: "Phường Mỹ An" },
        ],
      },
      {
        name: "Quận Liên Chiểu",
        wards: [
          { name: "Phường Hòa Hiệp Bắc" }, { name: "Phường Hòa Hiệp Nam" },
          { name: "Phường Hòa Khánh Bắc" }, { name: "Phường Hòa Khánh Nam" },
          { name: "Phường Hòa Minh" },
        ],
      },
      {
        name: "Quận Cẩm Lệ",
        wards: [
          { name: "Phường Hòa An" }, { name: "Phường Hòa Phát" },
          { name: "Phường Hòa Thọ Đông" }, { name: "Phường Hòa Thọ Tây" },
          { name: "Phường Hòa Xuân" }, { name: "Phường Khuê Trung" },
        ],
      },
      {
        name: "Huyện Hòa Vang",
        wards: [
          { name: "Xã Hòa Bắc" }, { name: "Xã Hòa Châu" },
          { name: "Xã Hòa Khương" }, { name: "Xã Hòa Liên" },
          { name: "Xã Hòa Nhơn" }, { name: "Xã Hòa Ninh" },
          { name: "Xã Hòa Phong" }, { name: "Xã Hòa Phú" },
          { name: "Xã Hòa Phước" }, { name: "Xã Hòa Sơn" },
          { name: "Xã Hòa Tiến" }, { name: "Xã Hòa Trung" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     CẦN THƠ
  ══════════════════════════════════════════════════════════ */
  {
    name: "Cần Thơ",
    districts: [
      {
        name: "Quận Ninh Kiều",
        wards: [
          { name: "Phường An Bình" }, { name: "Phường An Cư" },
          { name: "Phường An Hòa" }, { name: "Phường An Khánh" },
          { name: "Phường An Lạc" }, { name: "Phường An Nghiệp" },
          { name: "Phường An Phú" }, { name: "Phường Cái Khế" },
          { name: "Phường Hưng Lợi" }, { name: "Phường Tân An" },
          { name: "Phường Thới Bình" }, { name: "Phường Xuân Khánh" },
          { name: "Phường Mỹ Khánh" },
        ],
      },
      {
        name: "Quận Bình Thủy",
        wards: [
          { name: "Phường An Thới" }, { name: "Phường Bình Thủy" },
          { name: "Phường Bùi Hữu Nghĩa" }, { name: "Phường Long Hòa" },
          { name: "Phường Long Tuyền" }, { name: "Phường Thới An Đông" },
          { name: "Phường Trà An" }, { name: "Phường Trà Nóc" },
        ],
      },
      {
        name: "Quận Cái Răng",
        wards: [
          { name: "Phường Ba Láng" }, { name: "Phường Hưng Phú" },
          { name: "Phường Hưng Thạnh" }, { name: "Phường Lê Bình" },
          { name: "Phường Phú Thứ" }, { name: "Phường Tân Phú" },
          { name: "Phường Thường Thạnh" },
        ],
      },
      {
        name: "Quận Ô Môn",
        wards: [
          { name: "Phường Châu Văn Liêm" }, { name: "Phường Long Hưng" },
          { name: "Phường Phước Thới" }, { name: "Phường Thới An" },
          { name: "Phường Thới Hòa" }, { name: "Phường Thới Long" },
          { name: "Phường Trường Lạc" },
        ],
      },
      {
        name: "Quận Thốt Nốt",
        wards: [
          { name: "Phường Tân Hưng" }, { name: "Phường Thốt Nốt" },
          { name: "Phường Thuận An" }, { name: "Phường Thới Thuận" },
          { name: "Phường Trung Kiên" }, { name: "Phường Trung Nhứt" },
          { name: "Phường Tân Lộc" },
        ],
      },
      {
        name: "Huyện Phong Điền",
        wards: [
          { name: "Thị trấn Phong Điền" }, { name: "Xã Giai Xuân" },
          { name: "Xã Mỹ Khánh" }, { name: "Xã Nhơn Ái" },
          { name: "Xã Nhơn Nghĩa" }, { name: "Xã Tân Thới" },
          { name: "Xã Trường Long" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     HẢI PHÒNG
  ══════════════════════════════════════════════════════════ */
  {
    name: "Hải Phòng",
    districts: [
      {
        name: "Quận Hồng Bàng",
        wards: [
          { name: "Phường Hoàng Văn Thụ" }, { name: "Phường Minh Khai" },
          { name: "Phường Phan Bội Châu" }, { name: "Phường Quán Toan" },
          { name: "Phường Sở Dầu" }, { name: "Phường Thượng Lý" },
          { name: "Phường Trại Cau" }, { name: "Phường Trần Phú" },
        ],
      },
      {
        name: "Quận Lê Chân",
        wards: [
          { name: "Phường An Biên" }, { name: "Phường An Dương" },
          { name: "Phường Cát Bi" }, { name: "Phường Dư Hàng Kênh" },
          { name: "Phường Đông Hải 1" }, { name: "Phường Đông Hải 2" },
          { name: "Phường Hàng Kênh" }, { name: "Phường Lam Sơn" },
          { name: "Phường Nghĩa Xá" }, { name: "Phường Niệm Nghĩa" },
          { name: "Phường Trại Chuối" }, { name: "Phường Vĩnh Niệm" },
        ],
      },
      {
        name: "Quận Ngô Quyền",
        wards: [
          { name: "Phường Cầu Đất" }, { name: "Phường Cầu Tre" },
          { name: "Phường Đồng Quốc Bình" }, { name: "Phường Gia Viên" },
          { name: "Phường Lạc Viên" }, { name: "Phường Lê Lợi" },
          { name: "Phường Máy Chai" }, { name: "Phường Máy Tơ" },
          { name: "Phường Đông Khê" }, { name: "Phường Vạn Mỹ" },
        ],
      },
      {
        name: "Quận Kiến An",
        wards: [
          { name: "Phường Bắc Sơn" }, { name: "Phường Đồng Hòa" },
          { name: "Phường Lão Hổ" }, { name: "Phường Nam Sơn" },
          { name: "Phường Phù Liễn" }, { name: "Phường Quán Trữ" },
          { name: "Phường Tràng Minh" }, { name: "Phường Văn Đẩu" },
        ],
      },
      {
        name: "Huyện An Dương",
        wards: [
          { name: "Thị trấn An Dương" }, { name: "Xã An Đồng" },
          { name: "Xã An Hòa" }, { name: "Xã An Hưng" },
          { name: "Xã Đặng Cương" }, { name: "Xã Đồng Thái" },
          { name: "Xã Hồng Phong" }, { name: "Xã Hồng Thái" },
          { name: "Xã Lê Lợi" }, { name: "Xã Nam Sơn" },
          { name: "Xã Tân Tiến" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     ĐỒNG NAI (Thành phố Biên Hòa)
  ══════════════════════════════════════════════════════════ */
  {
    name: "Đồng Nai",
    districts: [
      {
        name: "TP. Biên Hòa",
        wards: [
          { name: "Phường An Bình" }, { name: "Phường Bình Đa" },
          { name: "Phường Bửu Hòa" }, { name: "Phường Bửu Long" },
          { name: "Phường Hòa Bình" }, { name: "Phường Hiệp Hòa" },
          { name: "Phường Long Bình" }, { name: "Phường Long Bình Tân" },
          { name: "Phường Quang Vinh" }, { name: "Phường Quyết Thắng" },
          { name: "Phường Tam Hiệp" }, { name: "Phường Tam Hòa" },
          { name: "Phường Tân Biên" }, { name: "Phường Tân Hiệp" },
          { name: "Phường Tân Hòa" }, { name: "Phường Tân Mai" },
          { name: "Phường Tân Phong" }, { name: "Phường Tân Tiến" },
          { name: "Phường Tân Vạn" }, { name: "Phường Thống Nhất" },
          { name: "Phường Trung Dũng" }, { name: "Phường An Hòa" },
          { name: "Xã Hóa An" }, { name: "Xã Long Hưng" },
          { name: "Xã Phước Tân" }, { name: "Xã Tân Hạnh" },
        ],
      },
      {
        name: "TP. Long Khánh",
        wards: [
          { name: "Phường Bảo Quảng" }, { name: "Phường Bảo Vinh" },
          { name: "Phường Phú Bình" }, { name: "Phường Suối Tre" },
          { name: "Phường Xuân An" }, { name: "Phường Xuân Bình" },
          { name: "Phường Xuân Hòa" }, { name: "Phường Xuân Lập" },
          { name: "Phường Xuân Thanh" }, { name: "Xã Bàu Sen" },
          { name: "Xã Bảo Bình" }, { name: "Xã Hàng Gòn" },
        ],
      },
      {
        name: "Huyện Nhơn Trạch",
        wards: [
          { name: "Xã Đại Phước" }, { name: "Xã Hiệp Phước" },
          { name: "Xã Long Tân" }, { name: "Xã Long Thọ" },
          { name: "Xã Phước An" }, { name: "Xã Phước Khánh" },
          { name: "Xã Phước Thiền" }, { name: "Xã Tân Thành" },
          { name: "Xã Vĩnh Thanh" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     KHÁNH HÒA (Nha Trang)
  ══════════════════════════════════════════════════════════ */
  {
    name: "Khánh Hòa",
    districts: [
      {
        name: "TP. Nha Trang",
        wards: [
          { name: "Phường Lộc Thọ" }, { name: "Phường Phước Hải" },
          { name: "Phường Phước Hòa" }, { name: "Phường Phước Long" },
          { name: "Phường Phước Tân" }, { name: "Phường Phước Tiến" },
          { name: "Phường Tân Lập" }, { name: "Phường Vạn Thắng" },
          { name: "Phường Vạn Thạnh" }, { name: "Phường Vĩnh Hải" },
          { name: "Phường Vĩnh Hòa" }, { name: "Phường Vĩnh Nguyên" },
          { name: "Phường Vĩnh Phước" }, { name: "Phường Vĩnh Thọ" },
          { name: "Phường Vĩnh Trường" }, { name: "Phường Xương Huân" },
          { name: "Xã Phước Đồng" }, { name: "Xã Vĩnh Hiệp" },
          { name: "Xã Vĩnh Lương" }, { name: "Xã Vĩnh Ngọc" },
          { name: "Xã Vĩnh Phương" }, { name: "Xã Vĩnh Tân" },
          { name: "Xã Vĩnh Thái" }, { name: "Xã Vĩnh Thạnh" },
          { name: "Xã Vĩnh Trung" },
        ],
      },
      {
        name: "TX. Ninh Hòa",
        wards: [
          { name: "Phường Ninh Hiệp" }, { name: "Xã Ninh An" },
          { name: "Xã Ninh Bình" }, { name: "Xã Ninh Đa" },
          { name: "Xã Ninh Điền" }, { name: "Xã Ninh Hà" },
          { name: "Xã Ninh Hưng" }, { name: "Xã Ninh Ích" },
          { name: "Xã Ninh Lộc" }, { name: "Xã Ninh Phú" },
          { name: "Xã Ninh Phụng" }, { name: "Xã Ninh Quang" },
          { name: "Xã Ninh Sim" }, { name: "Xã Ninh Sơn" },
          { name: "Xã Ninh Tân" }, { name: "Xã Ninh Tây" },
          { name: "Xã Ninh Thân" }, { name: "Xã Ninh Thọ" },
          { name: "Xã Ninh Thủy" }, { name: "Xã Ninh Trung" },
          { name: "Xã Ninh Vân" }, { name: "Xã Ninh Xuân" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     THỪA THIÊN HUẾ
  ══════════════════════════════════════════════════════════ */
  {
    name: "Thừa Thiên Huế",
    districts: [
      {
        name: "TP. Huế",
        wards: [
          { name: "Phường An Cựu" }, { name: "Phường An Đông" },
          { name: "Phường An Hòa" }, { name: "Phường An Tây" },
          { name: "Phường Đúc" }, { name: "Phường Hương Long" },
          { name: "Phường Kim Long" }, { name: "Phường Phú Bình" },
          { name: "Phường Phú Cát" }, { name: "Phường Phú Hậu" },
          { name: "Phường Phú Hiệp" }, { name: "Phường Phú Hội" },
          { name: "Phường Phú Nhuận" }, { name: "Phường Phú Thuận" },
          { name: "Phường Phường Đúc" }, { name: "Phường Tây Lộc" },
          { name: "Phường Thuận Hòa" }, { name: "Phường Thuận Lộc" },
          { name: "Phường Thuận Thành" }, { name: "Phường Trường An" },
          { name: "Phường Vĩ Dạ" }, { name: "Phường Vỹ Dạ" },
          { name: "Phường Xuân Phú" },
        ],
      },
      {
        name: "TX. Hương Thủy",
        wards: [
          { name: "Phường Phú Bài" }, { name: "Phường Thủy Châu" },
          { name: "Phường Thủy Dương" }, { name: "Phường Thủy Lương" },
          { name: "Phường Thủy Phương" }, { name: "Xã Dương Hòa" },
          { name: "Xã Phú Sơn" }, { name: "Xã Thủy Bằng" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     ĐẮK LẮK (Buôn Ma Thuột)
  ══════════════════════════════════════════════════════════ */
  {
    name: "Đắk Lắk",
    districts: [
      {
        name: "TP. Buôn Ma Thuột",
        wards: [
          { name: "Phường An Lạc" }, { name: "Phường Châu Thắng" },
          { name: "Phường Ea Tam" }, { name: "Phường Khánh Xuân" },
          { name: "Phường Tân An" }, { name: "Phường Tân Hòa" },
          { name: "Phường Tân Lập" }, { name: "Phường Tân Lợi" },
          { name: "Phường Tân Thành" }, { name: "Phường Tân Tiến" },
          { name: "Phường Thắng Lợi" }, { name: "Phường Thành Công" },
          { name: "Phường Thành Nhất" }, { name: "Phường Tự An" },
          { name: "Phường Tân Hội" }, { name: "Phường Thiện An" },
          { name: "Xã Cư Êbur" }, { name: "Xã Ea Kao" },
          { name: "Xã Hòa Khánh" }, { name: "Xã Hòa Phú" },
          { name: "Xã Hòa Suốt" }, { name: "Xã Hòa Thắng" },
          { name: "Xã Hòa Thuận" }, { name: "Xã Hòa Xuân" },
          { name: "Xã Hòa Đông" },
        ],
      },
      {
        name: "TX. Buôn Hồ",
        wards: [
          { name: "Phường An Lạc" }, { name: "Phường Bình Tân" },
          { name: "Phường Đạt Hiếu" }, { name: "Phường Đoàn Kết" },
          { name: "Phường Thiện An" }, { name: "Phường Thống Nhất" },
          { name: "Xã Bình Thuận" }, { name: "Xã Cư Bao" },
          { name: "Xã Ea Blang" }, { name: "Xã Ea Drông" },
          { name: "Xã Ea Siên" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     BÀ RỊA – VŨNG TÀU
  ══════════════════════════════════════════════════════════ */
  {
    name: "Bà Rịa – Vũng Tàu",
    districts: [
      {
        name: "TP. Vũng Tàu",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 7" },
          { name: "Phường 8" }, { name: "Phường 9" }, { name: "Phường 10" },
          { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Xã Long Sơn" },
        ],
      },
      {
        name: "TP. Bà Rịa",
        wards: [
          { name: "Phường Kim Dinh" }, { name: "Phường Long Hương" },
          { name: "Phường Long Tâm" }, { name: "Phường Long Toàn" },
          { name: "Phường Phú Mỹ" }, { name: "Phường Phước Hiệp" },
          { name: "Phường Phước Hưng" }, { name: "Phường Phước Nguyên" },
          { name: "Phường Phước Trung" }, { name: "Xã Hòa Long" },
          { name: "Xã Long Phước" }, { name: "Xã Tân Hưng" },
        ],
      },
      {
        name: "Huyện Xuyên Mộc",
        wards: [
          { name: "Thị trấn Phước Bửu" }, { name: "Xã Bình Châu" },
          { name: "Xã Bông Trang" }, { name: "Xã Bưng Riềng" },
          { name: "Xã Hòa Bình" }, { name: "Xã Hòa Hội" },
          { name: "Xã Hòa Hiệp" }, { name: "Xã Phước Thuận" },
          { name: "Xã Tân Lâm" }, { name: "Xã Xuyên Mộc" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     BÌNH DƯƠNG
  ══════════════════════════════════════════════════════════ */
  {
    name: "Bình Dương",
    districts: [
      {
        name: "TP. Thủ Dầu Một",
        wards: [
          { name: "Phường Chánh Mỹ" }, { name: "Phường Chánh Nghĩa" },
          { name: "Phường Định Hòa" }, { name: "Phường Hiệp An" },
          { name: "Phường Hiệp Thành" }, { name: "Phường Hòa Phú" },
          { name: "Phường Phú Cường" }, { name: "Phường Phú Hòa" },
          { name: "Phường Phú Lợi" }, { name: "Phường Phú Mỹ" },
          { name: "Phường Phú Thọ" }, { name: "Phường Tân An" },
          { name: "Phường Tương Bình Hiệp" },
        ],
      },
      {
        name: "TP. Dĩ An",
        wards: [
          { name: "Phường An Bình" }, { name: "Phường Bình An" },
          { name: "Phường Bình Thắng" }, { name: "Phường Dĩ An" },
          { name: "Phường Đông Hòa" }, { name: "Phường Tân Bình" },
          { name: "Phường Tân Đông Hiệp" },
        ],
      },
      {
        name: "TP. Thuận An",
        wards: [
          { name: "Phường An Phú" }, { name: "Phường An Sơn" },
          { name: "Phường An Thạnh" }, { name: "Phường Bình Chuẩn" },
          { name: "Phường Bình Hòa" }, { name: "Phường Bình Nhâm" },
          { name: "Phường Hưng Định" }, { name: "Phường Lái Thiêu" },
          { name: "Phường Thuận Giao" }, { name: "Phường Vĩnh Phú" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     LÂM ĐỒNG (Đà Lạt)
  ══════════════════════════════════════════════════════════ */
  {
    name: "Lâm Đồng",
    districts: [
      {
        name: "TP. Đà Lạt",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường 3" },
          { name: "Phường 4" }, { name: "Phường 5" }, { name: "Phường 6" },
          { name: "Phường 7" }, { name: "Phường 8" }, { name: "Phường 9" },
          { name: "Phường 10" }, { name: "Phường 11" }, { name: "Phường 12" },
          { name: "Xã Đạ Nhim" }, { name: "Xã Lát" }, { name: "Xã Tà Nung" },
          { name: "Xã Xuân Thọ" }, { name: "Xã Xuân Trường" },
        ],
      },
      {
        name: "TP. Bảo Lộc",
        wards: [
          { name: "Phường 1" }, { name: "Phường 2" }, { name: "Phường B'Lao" },
          { name: "Phường Lộc Phát" }, { name: "Phường Lộc Sơn" },
          { name: "Phường Lộc Tiến" }, { name: "Xã Đại Lào" },
          { name: "Xã Lộc Châu" }, { name: "Xã Lộc Nga" }, { name: "Xã Lộc Thanh" },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     AN GIANG (Long Xuyên)
  ══════════════════════════════════════════════════════════ */
  {
    name: "An Giang",
    districts: [
      {
        name: "TP. Long Xuyên",
        wards: [
          { name: "Phường Bình Đức" }, { name: "Phường Bình Khánh" },
          { name: "Phường Đông Xuyên" }, { name: "Phường Mỹ Bình" },
          { name: "Phường Mỹ Hòa" }, { name: "Phường Mỹ Long" },
          { name: "Phường Mỹ Phước" }, { name: "Phường Mỹ Quý" },
          { name: "Phường Mỹ Xuyên" }, { name: "Phường Mỹ Thạnh" },
          { name: "Phường Mỹ Thới" }, { name: "Xã Bình Thạnh" },
          { name: "Xã Mỹ Hòa Hưng" },
        ],
      },
      {
        name: "TP. Châu Đốc",
        wards: [
          { name: "Phường Châu Phú A" }, { name: "Phường Châu Phú B" },
          { name: "Phường Núi Sam" }, { name: "Phường Vĩnh Mỹ" },
          { name: "Phường Vĩnh Ngươn" }, { name: "Xã Vĩnh Châu" },
          { name: "Xã Vĩnh Tế" },
        ],
      },
    ],
  },
];

/** Lấy danh sách quận/huyện theo tên tỉnh/thành phố */
export function getDistricts(provinceName: string): District[] {
  return provinces.find((p) => p.name === provinceName)?.districts ?? [];
}

/** Lấy danh sách phường/xã theo tên tỉnh và tên quận/huyện */
export function getWards(provinceName: string, districtName: string): Ward[] {
  const districts = getDistricts(provinceName);
  return districts.find((d) => d.name === districtName)?.wards ?? [];
}

/** Danh sách tên tỉnh/thành phố */
export const provinceNames: string[] = provinces.map((p) => p.name);
