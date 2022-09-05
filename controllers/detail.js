//Code các chức năng thao với dữ liệu từ backend
function getProductByID(id) {
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=" + id, //Đường dẫn backend cung cấp
    method: "GET", //method backend cung cấp
    ResponseType: JSON,
  });
  //Xử lý thành công
  promise.then(function (result) {
    console.log(result.data.content);
    renderProductDetail(result.data.content);
    renderProduct(result.data.content);
  });
  //Xử lý thất bại
  promise.catch(function (err) {});
}


function renderProductDetail(ObjectProduct) {
  var html = "";
  var sp = ObjectProduct;
  html = `
    <div class="pro-img">
          <img src="${sp.image}" alt="" />
        </div>
        <div class="pro-content">
        <h2>${sp.name}</h2>
        <p>
          ${sp.description}
        </p>
        <h3>Avaliable size</h3>
        <ul>
          <li><a href="#">36</a></li>
          <li><a href="#">37</a></li>
          <li><a href="#">38</a></li>
          <li><a href="#">39</a></li>
          <li><a href="#">40</a></li>
          <li><a href="#">41</a></li>
          <li><a href="#">42</a></li>
        </ul>
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
  document.querySelector("#detail").innerHTML = html;
}

function renderProduct(ObjectProduct) {
  //param : input :arrSinhVien
  var html = ""; //output: string html
  var arrayProduct = ObjectProduct.relatedProducts;
  for(let sp of arrayProduct){
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
  document.querySelector("#list").innerHTML = html;
}
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  // console.log("params", myParam);
  getProductByID(myParam);
};
