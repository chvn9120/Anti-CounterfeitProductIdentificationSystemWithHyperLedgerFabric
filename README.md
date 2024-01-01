# Hệ thống nhận biết hàng giả sử dụng HyperLedger Fabric

## Các điều kiện tiên quyết

-   Text editor: [VS Code](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwii6J-yn7yDAxWe0KACHZeJCJoQFnoECBAQAQ&url=https%3A%2F%2Fcode.visualstudio.com%2Fdownload&usg=AOvVaw11fc5fOXYIyxQh75jYLjXg&opi=89978449) (optional)
-   [Ubuntu](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwju7bm-n7yDAxWV-DgGHaLdCHIQFnoECA0QAQ&url=https%3A%2F%2Fubuntu.com%2Ftutorials%2Finstall-ubuntu-on-wsl2-on-windows-11-with-gui-support&usg=AOvVaw0jgc4quGLsdlImKvYnVVvA&opi=89978449)
-   [Docker Desktop](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjgpZ6on7yDAxWGyzgGHS__ArEQFnoECBMQAQ&url=https%3A%2F%2Fwww.docker.com%2Fproducts%2Fdocker-desktop%2F&usg=AOvVaw1d0h_mLhkWV0ppkwLqcV3A&opi=89978449)
-   [Git](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjCydKUn7yDAxVW-TgGHXH5ClAQFnoECAoQAQ&url=https%3A%2F%2Fgit-scm.com%2F&usg=AOvVaw1lFNWgbWf8FsbaoU4AOPBr&opi=89978449)
-   [fabric-samples](https://github.com/hyperledger/fabric-samples)
-   [npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04) (version 10.2.3), [nodejs](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiV0Oufn7yDAxVG7TgGHTX3CeYQFnoECBYQAQ&url=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload&usg=AOvVaw1KKGKc_Mgv9UPW5EWXuSiV&opi=89978449) (version 18.19.0), [nvm](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/) (version 0.39.7)

## Các công nghệ sử dụng

![](https://img.shields.io/badge/html-e34f26?style=for-the-badge&logo=html5&logoColor=ffffff)
![](https://img.shields.io/badge/css-1572b6?style=for-the-badge&logo=css3&logoColor=ffffff)
![](https://img.shields.io/badge/javascript-f7df1e?style=for-the-badge&logo=javascript&logoColor=ffffff)
![](https://img.shields.io/badge/handlebars.js-f0772b?style=for-the-badge&logo=handlebars&ogoColor=ffffff)
![](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=ffffff)
![](https://img.shields.io/badge/hyperledger_fabric-0d3799?style=for-the-badge&logo=hyperledger&logoColor=ffffff)

## Các bước để chạy project

Bước 1: Mở VSC, liên kết VSC với Ubuntu

Bước 2: Clone thư mục fabric-samples về tại đây

Bước 3: Clone project này về

>Cấu trúc thư mục mẫu
|_ Anti-CounterfeitProductIdentificationSystemWithHyperLedgerFabric
|_ fabric_samples
|_ ..các thành phần khác

Bước 4: Mở terminal, cd đến thư mục Anti-CounterfeitProductIdentificationSystemWithHyperLedgerFabric với lệnh 

> cd Anti-CounterfeitProductIdentificationSystemWithHyperLedgerFabric 

Bước 5: Gõ lệnh bên dưới để cài đặt các dependency trong file package.json

> npm i

Bước 6: Mở thêm 1 terminal nữa, gõ lệnh bên dưới và làm theo các bước theo hướng dẫn của [hyperledger fabric](https://hyperledger-fabric.readthedocs.io/en/release-2.2/write_first_app.html#launch-the-network) để launch mạng blockchain

> cd ~

Bước 7: Trở lại terminal ban đầu, gõ lệnh bên dưới để chạy project

> npm start 

## License

[MIT](https://github.com/mrcaidev/hooks/tree/master/LICENSE)
