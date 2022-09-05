//Code các chức năng thao với dữ liệu từ backend
function getProductByID(id) {
    var promise = axios({
        url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + id,  //Đường dẫn backend cung cấp
        method: 'GET',//method backend cung cấp
        ResponseType: JSON
    });
    //Xử lý thành công
    promise.then(function (result) {
        console.log(result.data.content);
        renderProductDetail(result.data.content);
        renderProduct(result.data.content);
    });
    //Xử lý thất bại
    promise.catch(function (err) {
    });
}
window.onload = function () {
  //Gọi api lấy data từ backend
  getApiProduct();
  
}

function renderProductDetail(ObjectProduct){
    var html = '';
    var sp = ObjectProduct;
    html =`
    <div class="pro-img">
          <img src="${sp.image}" alt="" />
        </div>
        <div class="pro-content">
        <h2>${sp.name}</h2>
        <p>
          ${sp.description}
        </p>
        <h3>Avaliable size</h3>
        <div class="list-sizes">
          <div class="row">
            <div class="col">
              <div class="item">
                <button class="btn-size">${sp.size}</button>
              </div>
            </div>
          </div>
        </div>
        <h4>${sp.price}$</h4>
        <div class="pro-quality">
          <button class="btn-quality">
            <i class="fa-solid fa-plus"></i>
          </button>
          <span>1</span>
          <button class="btn-quality">
            <i class="fa-solid fa-minus"></i>
          </button>
        </div>
        <div class="add-to-card">
          <button class="btn-add">Add to cart</button>
        </div>
      </div>
    `;
    document.querySelector('#detail').innerHTML = html;
}

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
            <a href="./detail.html?productid=${sp.id}">Buy now</a>
                <span>
                    ${sp.price}$
                <span>
            </div>
        </div>
        `;
    }
    document.querySelector('#list').innerHTML = html;
}

