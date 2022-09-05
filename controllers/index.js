//Code các chức năng thao với dữ liệu từ backend

//-------------------------------- GET: Lấy thông tin từ server về và hiển thị lên table tbody ---------------------------------------
function getApiProduct() {
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product', // Đường dần BE cung cấp
        method: 'GET',
        responseType: 'json',
    });

    //Thành công thì làm ?
    promise.then(function (result) {
        console.log('result', result.data);
        //Gọi hàm để từ dữ liệu tạo ra thẻ tr trên tbody
        renderProduct(result.data.content);
    });
    //Thất bại 
    promise.catch(function (err) {
        console.log(err)
    })
}

//Sau khi giao diện load xong thì sẽ tự động thực thi các hàm trong function này
window.onload = function () {
    //Gọi api lấy data từ backend
    getApiProduct();
    
}

/**
 * Hàm này sẽ nhận vào 1 array (sinhVien) và trả ra output là string <tr>....</tr>
 * @param {*} arrProduct arrSinhVien là mảng các object sinhVien [sinhVien1,sinhVien2,...]
 * @returns trả ra 1 giá trị là 1 htmlString '<tr>...</tr> <tr>...</tr>'
 */
 function renderProduct(arrProduct) { //param : input :arrSinhVien
    var html = ''; //output: string html 
    for (var i = 0; i < 6; i++) {
        var sp = arrProduct[i]; //Mỗi lần duyệt lấy ra 1 object sinhVien từ mảng {maSinhVien:'1',tenSinhVien:'...',...}
        html += `
        <div class="card" style="width: 334px" id="${sp.id}">
            <img src="${sp.image}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h1>${sp.name}</h1>
                <p class="card-text">${sp.shortDescription}</p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn">Buy Now</a>
                <span>
                    ${sp.price}$
                <span>
            </div>
        </div>
        `;
    }
    document.querySelector('#list').innerHTML = html;
}
