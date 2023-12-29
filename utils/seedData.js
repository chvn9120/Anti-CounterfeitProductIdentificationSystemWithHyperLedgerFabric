const shoes = {
    nike: {
        0: 'https://tiki.vn/api/v2/products/273257519',
        1: 'https://tiki.vn/api/v2/products/271239272',
        2: 'https://tiki.vn/api/v2/products/271237487',
        3: 'https://tiki.vn/api/v2/products/271237261',
        4: 'https://tiki.vn/api/v2/products/270920270',
        5: 'https://tiki.vn/api/v2/products/271238949',
        6: 'https://tiki.vn/api/v2/products/273269429',
        7: 'https://tiki.vn/api/v2/products/273269425',
        8: 'https://tiki.vn/api/v2/products/270918236',
        9: 'https://tiki.vn/api/v2/products/270919968',
    },
    bitis: {
        0: 'https://tiki.vn/api/v2/products/193516534',
        1: 'https://tiki.vn/api/v2/products/193516882',
        2: 'https://tiki.vn/api/v2/products/59080455',
        3: 'https://tiki.vn/api/v2/products/115244909',
    },
    anta: {
        0: 'https://tiki.vn/api/v2/products/191824217',
        1: 'https://tiki.vn/api/v2/products/271964697',
        2: 'https://tiki.vn/api/v2/products/270180343',
        3: 'https://tiki.vn/api/v2/products/270142383',
        4: 'https://tiki.vn/api/v2/products/194372515',
    },
    puma: {
        0: 'https://tiki.vn/api/v2/products/208293730',
        1: 'https://tiki.vn/api/v2/products/195866155',
        2: 'https://tiki.vn/api/v2/products/222593457',
        3: 'https://tiki.vn/api/v2/products/208639461',
    },
    vans: {
        0: 'https://tiki.vn/api/v2/products/214488566',
        1: 'https://tiki.vn/api/v2/products/9809445',
        2: 'https://tiki.vn/api/v2/products/9810452',
        3: 'https://tiki.vn/api/v2/products/214488566',
        4: 'https://tiki.vn/api/v2/products/173635791',
        5: 'https://tiki.vn/api/v2/products/263292243',
        6: 'https://tiki.vn/api/v2/products/202284013',
        7: 'https://tiki.vn/api/v2/products/262061529',
        8: 'https://tiki.vn/api/v2/products/271197889',
        9: 'https://tiki.vn/api/v2/products/74341746',
    },
    converse: {
        0: 'https://tiki.vn/api/v2/products/20008606',
        1: 'https://tiki.vn/api/v2/products/187547435',
        2: 'https://tiki.vn/api/v2/products/7995370',
        3: 'https://tiki.vn/api/v2/products/247464513',
        4: 'https://tiki.vn/api/v2/products/7997237',
        5: 'https://tiki.vn/api/v2/products/203911060',
        6: 'https://tiki.vn/api/v2/products/173520819',
    }
};

const seedsBrand = [
    {
        brand_name: 'nike',
        display_brand_name: 'Nike',
        brand_desc: `Nike là một công ty đa quốc gia của Mỹ chuyên sản xuất và kinh doanh các sản phẩm thể thao, 
        bao gồm giày dép, quần áo, phụ kiện và thiết bị. Nike được thành lập vào năm 1964 bởi Phil Knight
        và Bill Bowerman với tên gọi ban đầu là Blue Ribbon Sports. Năm 1971, công ty đổi tên thành Nike,
        theo tên của nữ thần chiến thắng trong thần thoại Hy Lạp. Biểu tượng của Nike là "swoosh", 
        một đường cong đơn giản mô phỏng chuyển động của một vận động viên.
        Nike cũng nổi tiếng với khẩu hiệu "Just Do It" và sự tài trợ cho nhiều vận động viên và đội thể thao hàng đầu thế giới.`,
    },
    {
        brand_name: `bitis`,
        display_brand_name: `Biti's`,
        brand_desc: `Bitis là một thương hiệu giày dép nổi tiếng của Việt Nam, được thành lập vào năm 1982 tại quận 6, 
        Thành phố Hồ Chí Minh. Bitis sản xuất và kinh doanh nhiều loại giày dép cho nam, nữ và trẻ em, với các dòng sản
        phẩm như Hunter, Êmbrace, Galaxy, Marvel, Disney và nhiều hơn nữa. Bitis không chỉ phát triển mạnh mẽ trên thị
        trường trong nước, mà còn xuất khẩu sang hơn 40 quốc gia trên thế giới, trong đó có nhiều thị trường khó tính
        như Ý, Pháp, Anh, Mỹ, Nhật Bản, Trung Quốc và Mexico. Bitis tự hào là một thương hiệu #PROUDLYMADEINVIETNAM,
        mang đến cho người tiêu dùng những sản phẩm chất lượng, đẹp mắt và phù hợp với phong cách sống hiện đại.`,
    },
    {
        brand_name: 'anta',
        display_brand_name: 'Anta',
        brand_desc: `Anta là một công ty đa quốc gia của Trung Quốc chuyên sản xuất và kinh doanh các sản phẩm thể thao,
        bao gồm giày dép, quần áo, phụ kiện và thiết bị. Anta được thành lập vào năm 1991 tại Quảng Châu, Trung Quốc,
        và là một trong những thương hiệu thể thao lớn nhất tại nước này. Anta cũng là nhà tài trợ chính thức cho nhiều đội
        tuyển quốc gia và vận động viên nổi tiếng thế giới, như đội tuyển bóng rổ Trung Quốc, đội tuyển bóng chuyền Trung Quốc,
        đội tuyển bóng bàn Trung Quốc, đội tuyển bóng đá Trung Quốc, cầu thủ bóng rổ Klay Thompson, cầu thủ bóng rổ Gordon Hayward,
        cầu thủ bóng rổ Rajon Rondo và nhiều hơn nữa. Anta có khẩu hiệu là “永不止步Keep Moving” (Không bao giờ dừng lại,
        Tiếp tục tiến lên), thể hiện tinh thần vượt qua mọi thử thách và phấn đấu cho mục tiêu cao nhất.`,
    },
    {
        brand_name: 'puma',
        display_brand_name: 'Puma',
        brand_desc: `Puma là một công ty đa quốc gia của Đức chuyên sản xuất và kinh doanh các sản phẩm thể thao, 
        bao gồm giày dép, quần áo, phụ kiện và thiết bị. Puma được thành lập vào năm 1948 bởi Rudolf Dassler, anh trai của Adolf Dassler,
        người sáng lập Adidas. Puma là một trong những thương hiệu thể thao lớn nhất thế giới, với sự tài trợ cho nhiều vận động 
        viên và đội thể thao nổi tiếng, như đội tuyển bóng đá Italia, đội tuyển bóng đá Pháp, đội tuyển bóng đá Uruguay, cầu
        thủ bóng đá Neymar, cầu thủ bóng đá Antoine Griezmann, cầu thủ bóng rổ LaMelo Ball, cầu thủ bóng rổ Kyle Kuzma 
        và nhiều hơn nữa. Puma cũng có nhiều hợp tác với các nhà thiết kế và nghệ sĩ nổi tiếng, như Rihanna, Selena Gomez, 
        Cara Delevingne, The Weeknd, J. Cole và nhiều hơn nữa . Puma có khẩu hiệu là “Forever Faster” (Mãi mãi nhanh hơn),
         thể hiện tinh thần không ngừng cải tiến và sáng tạo của công ty.`,
    },
    {
        brand_name: 'vans',
        display_brand_name: 'Vans',
        brand_desc: `Vans là một thương hiệu giày dép nổi tiếng của Mỹ, được thành lập vào năm 1966 tại California bởi Paul 
        Van Doren và ba người đồng sáng lập khác. Vans chuyên sản xuất và kinh doanh các loại giày dép, quần áo, phụ kiện và 
        thiết bị liên quan đến văn hóa trượt ván, BMX, lướt sóng và nhạc rock. Vans có nhiều dòng sản phẩm nổi tiếng, như Old
        Skool, Sk8-Hi, Slip-On, Authentic, Era và nhiều hơn nữa. Vans cũng là nhà tài trợ cho nhiều sự kiện và cuộc thi thể
        thao hành động, như Vans Warped Tour, Vans Triple Crown Series, Vans Pool Party và nhiều hơn nữa. Vans có khẩu hiệu là
        “Off The Wall”, thể hiện tinh thần tự do, sáng tạo và khác biệt của thương hiệu.`,
    },
    {
        brand_name: 'converse',
        display_brand_name: 'Converse',
        brand_desc: `Converse là một thương hiệu giày dép nổi tiếng của Mỹ, được thành lập vào năm 1966 tại California bởi 
        Paul Van Doren và ba người đồng sáng lập khác. Converse chuyên sản xuất và kinh doanh các loại giày dép, quần áo, 
        phụ kiện và thiết bị liên quan đến văn hóa trượt ván, BMX, lướt sóng và nhạc rock. Converse có nhiều dòng sản phẩm
        nổi tiếng, như Old Skool, Sk8-Hi, Slip-On, Authentic, Era và nhiều hơn nữa. Converse cũng là nhà tài trợ cho nhiều 
        sự kiện và cuộc thi thể thao hành động, như Vans Warped Tour, Vans Triple Crown Series, Vans Pool Party và nhiều hơn nữa. 
        Converse có khẩu hiệu là “Off The Wall”, thể hiện tinh thần tự do, sáng tạo và khác biệt của thương hiệu.`,
    },
];

export default { shoes, seedsBrand };
