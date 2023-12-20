const tiki_apis = {
    shoes: {
        nike: {
            0: 'https://tiki.vn/api/v2/products/273257519',
            1: 'https://tiki.vn/api/v2/products/271239272',
            2: 'https://tiki.vn/api/v2/products/271237487',
            3: 'https://tiki.vn/api/v2/products/271237261',
            4: 'https://tiki.vn/api/v2/products/270920270',
        },
        bitis: {
            0: 'https://tiki.vn/api/v2/products/193516534',
            1: 'https://tiki.vn/api/v2/products/193516882',
            2: 'https://tiki.vn/api/v2/products/59080455',
            3: 'https://tiki.vn/api/v2/products/201610129',
            4: 'https://tiki.vn/api/v2/products/115244909',
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
            4: 'https://tiki.vn/api/v2/products/215717966',
        },
        vans: {
            0: 'https://tiki.vn/api/v2/products/214488566',
            1: 'https://tiki.vn/api/v2/products/9809445',
            2: 'https://tiki.vn/api/v2/products/9810452',
            3: 'https://tiki.vn/api/v2/products/214488566',
            4: 'https://tiki.vn/api/v2/products/173635791',          
        },
        converse: {
            0: 'https://tiki.vn/api/v2/products/20008606',
            1: 'https://tiki.vn/api/v2/products/187547435',
            2: 'https://tiki.vn/api/v2/products/7995370',
            3: 'https://tiki.vn/api/v2/products/247464513',
            4: 'https://tiki.vn/api/v2/products/7997237',
        }
    },
    handbag: {
        yuumy: {
            0: 'https://tiki.vn/api/v2/products/272195426',
            1: 'https://tiki.vn/api/v2/products/263056736',
            2: 'https://tiki.vn/api/v2/products/200627574',
            3: 'https://tiki.vn/api/v2/products/200624228',
            4: 'https://tiki.vn/api/v2/products/271296041',
        },
        bee_gee: {
            0: 'https://tiki.vn/api/v2/products/199166005',
            1: 'https://tiki.vn/api/v2/products/270239272',
            2: 'https://tiki.vn/api/v2/products/243080552',
            3: 'https://tiki.vn/api/v2/products/263292873',
            4: 'https://tiki.vn/api/v2/products/263293058',
        },
        elley: {
            0: 'https://tiki.vn/api/v2/products/124393734',
            1: 'https://tiki.vn/api/v2/products/128869210',
            2: 'https://tiki.vn/api/v2/products/182813484',
            3: 'https://tiki.vn/api/v2/products/8114416',
            4: 'https://tiki.vn/api/v2/products/77590755',
        }
    }
};

const seedsCategory = {
    0: {
        category_name: 'apple',
        category_desc: `Apple Inc. là một công ty công nghệ đa quốc gia của Mỹ có trụ sở tại Cupertino, California. Apple được thành lập vào ngày 1 tháng 4 năm 1976 bởi Steve Wozniak, Steve Jobs và Ronald Wayne với mục đích phát triển và bán máy tính cá nhân Apple I do Wozniak thiết kế. Apple đã trở thành công ty máy tính cá nhân thành công đầu tiên và là người phổ biến giao diện người dùng đồ họa.
			Các sản phẩm như iPod, iPhone, iPad và Apple Watch đã trở nên vô cùng phổ biến trong thế kỷ 21. Tính đến tháng 3 năm 2023, Apple là công ty lớn nhất thế giới về vốn hóa thị trường. Apple cũng là nhà sản xuất máy tính cá nhân lớn thứ tư về đơn vị bán hàng; công ty sản xuất lớn nhất về doanh thu; và nhà sản xuất điện thoại di động lớn thứ hai trên thế giới.`,
    },
    1: {
        category_name: 'samsung',
        category_desc: `Samsung (tiếng Hàn: 삼성; RR: samseong) là một tập đoàn đa quốc gia sản xuất hàng hóa của Hàn Quốc có trụ sở tại Samsung Digital City, Suwon, Hàn Quốc. Tập đoàn này bao gồm nhiều công ty liên kết, hầu hết chúng đều thuộc thương hiệu Samsung, và là chaebol (tập đoàn kinh doanh) lớn nhất Hàn Quốc. Samsung được thành lập bởi Lee Byung-chul vào năm 1938 như một công ty thương mại.
		Trong suốt ba thập kỷ tiếp theo, tập đoàn đã mở rộng vào các lĩnh vực bao gồm chế biến thực phẩm, dệt may, bảo hiểm, chứng khoán và bán lẻ. Samsung đã bước vào ngành công nghiệp điện tử vào cuối những năm 1960 và ngành công nghiệp xây dựng và đóng tàu vào giữa những năm 1970; những lĩnh vực này sẽ thúc đẩy sự phát triển tiếp theo của nó.
		Samsung chuyên sản xuất một loạt các sản phẩm điện tử tiêu dùng và công nghiệp, bao gồm các thiết bị gia dụng, thiết bị truyền thông số, bán dẫn, chip nhớ và hệ thống tích hợp. Nó đã trở thành một trong những tên tuổi được nhận biết nhất trong công nghệ và sản xuất khoảng một phần năm tổng xuất khẩu của Hàn Quốc.`,
    },
    2: {
        category_name: 'xiaomi',
        category_desc: `Xiaomi Corporation (小米) là một công ty thiết kế và sản xuất điện tử tiêu dùng, phần mềm liên quan, thiết bị gia dụng và phần cứng gia đình của Trung Quốc. Xiaomi được thành lập vào năm 2010 tại Bắc Kinh bởi tỷ phú Lei Jun khi ông 40 tuổi, cùng với sáu cộng sự cao cấp.
		Xiaomi là nhà sản xuất điện thoại thông minh lớn thứ hai trên thế giới, sau Samsung. Hầu hết các sản phẩm của Xiaomi chạy trên giao diện người dùng MIUI, dựa trên hệ điều hành Android. Công ty được xếp hạng 338 và là công ty trẻ nhất trên Fortune Global 500.
		Xiaomi đã phát triển một loạt các sản phẩm điện tử tiêu dùng1. Vào năm 2020, công ty đã bán được 146,3 triệu điện thoại thông minh và giao diện người dùng di động MIUI của mình có hơn 500 triệu người dùng hàng tháng. Tính đến năm 2023, Xiaomi là nhà bán lẻ điện thoại thông minh lớn thứ ba trên toàn thế giới, với thị phần khoảng 12%, theo Counterpoint.
		Xiaomi cũng là một nhà sản xuất lớn của các thiết bị gia dụng bao gồm tivi, đèn pin, máy bay không người lái, và máy lọc không khí sử dụng hệ sinh thái sản phẩm Internet of things và Xiaomi Smart Home của mình. Xiaomi giữ giá cả của mình gần với chi phí sản xuất và chi phí hóa đơn vật liệu của mình bằng cách giữ hầu hết sản phẩm của mình trên thị trường trong 18 tháng, lâu hơn hầu hết các công ty điện thoại thông minh.`,
    },
    3: {
        category_name: 'oppo',
        category_desc: `Oppo là một công ty sản xuất điện tử tiêu dùng của Trung Quốc có trụ sở tại Dongguan, Guangdong1. Các dòng sản phẩm chính của Oppo bao gồm điện thoại thông minh, thiết bị thông minh, thiết bị âm thanh, pin dự phòng và các sản phẩm điện tử khác. Oppo được thành lập vào ngày 10 tháng 10 năm 2004 bởi Tony Chen.
		Oppo đã trở thành một trong những nhà sản xuất điện thoại thông minh hàng đầu trên thế giới. Tính đến năm 2023, Oppo đã mở rộng kinh doanh của mình đến hơn 60 quốc gia và khu vực trên toàn thế giới. Oppo đã xây dựng một hệ thống đổi mới toàn cầu, khám phá các công nghệ tiên tiến.
		Oppo cũng là một nhà sản xuất lớn của các thiết bị gia dụng bao gồm tivi, đèn pin, máy bay không người lái, và máy lọc không khí sử dụng hệ sinh thái sản phẩm Internet of things và Xiaomi Smart Home của mình. Oppo giữ giá cả của mình gần với chi phí sản xuất và chi phí hóa đơn vật liệu của mình bằng cách giữ hầu hết sản phẩm của mình trên thị trường trong 18 tháng, lâu hơn hầu hết các công ty điện thoại thông minh.`,
    },
    4: {
        category_name: 'bphone',
        category_desc: `Bphone là một dòng điện thoại thông minh được sản xuất bởi Bkav Corporation, một công ty có trụ sở tại Việt Nam. Bphone được biết đến với các mẫu như Bphone A85 5G, Bphone A60, và Bphone A502.
		Bphone A85 5G có giá bán là 9.490.000 VNĐ2. Bphone A60 có giá bán là 5.350.000 VNĐ. Bphone A50 có giá bán là 4.350.000 VNĐ.
		Ngoài ra, Bkav còn sản xuất các phụ kiện như tai nghe không dây AirB, củ sạc, ốp lưng, và cáp sạc. Bphone được mô tả là nâng tầm nhiếp ảnh điện toán và là thế hệ smartphone bảo mật.`,
    },
    5: {
        category_name: 'vsmart',
        category_desc: `Vsmart là một thương hiệu điện thoại thông minh của VinSmart, một công ty con của Tập đoàn Vingroup, có trụ sở tại Việt Nam. Vsmart đã sản xuất nhiều mẫu điện thoại thông minh và tivi. Tuy nhiên, gần đây, VinSmart đã quyết định ngừng sản xuất tivi và điện thoại di động để tập trung vào phát triển công nghệ cao cho VinFast.`,
    },
    6: {
        category_name: 'vivo',
        category_desc: `Vivo Communication Technology Co. Ltd. là một công ty công nghệ đa quốc gia của Trung Quốc có trụ sở tại Dongguan, Guangdong. Vivo được thành lập vào ngày 22 tháng 5 năm 2009 bởi Shen Wei. Công ty thiết kế và phát triển điện thoại thông minh, phụ kiện điện thoại thông minh, phần mềm và dịch vụ trực tuyến.
		Vivo phát triển phần mềm cho điện thoại của mình, được phân phối qua V-Appstore của họ, với iManager được bao gồm trong hệ điều hành dựa trên Android của họ, Origin OS ở Trung Quốc đại lục, và Funtouch OS ở nơi khác. Vivo có 10,000 nhân viên, với 10 trung tâm nghiên cứu và phát triển ở Shenzhen, Dongguan, Nanjing, Bắc Kinh, Hangzhou, Thượng Hải, Xi’an, Đài Bắc, Tokyo, và San Diego.
		Kể từ khi thành lập vào năm 2009, Vivo đã mở rộng thị trường toàn cầu của mình, phục vụ hơn 400 triệu người dùng với các sản phẩm và dịch vụ di động của mình, đến hơn 60 quốc gia và khu vực1. Vivo đã vào thị trường điện thoại thông minh tại Pakistan vào tháng 6 năm 2017 và thương hiệu Vivo hiện đang trải qua sự tăng trưởng và phổ biến nhanh chóng tại quốc gia này.`,
    },
};

export default { tiki_apis, seedsCategory };
