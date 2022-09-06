document.querySelector('#btnSubmit').onclick = () => {

    let valid = true
    valid &= checkEmail() & checkName() & checkPassword() & checkPhone() & checkPasswordConfirm() &checkGender()
    if (!valid) {
        return
    }
    var nguoiDung = new NguoiDung();
    nguoiDung.email = document.querySelector('#email').value;
    nguoiDung.name = document.querySelector('#name').value;
    nguoiDung.password = document.querySelector('#password').value;
    nguoiDung.phone = document.querySelector('#phone').value;
    // nguoiDung.gender = document.querySelector('#gender').value;
    if(document.querySelector("#male").checked){
        nguoiDung.gender=true;
    }else if(document.querySelector("#female").checked){
        nguoiDung.gender=false;
    }
    console.log('ng',nguoiDung);

    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup', // Đường dần BE cung cấp
        method: 'POST',
        responseType: 'json',
        data:nguoiDung
    });

    //Thành công thì làm ?
    promise.then(function (result) {
        console.log('result', result.data.content);
        console.log('Đăng ký thành công');
        //Gọi hàm để từ dữ liệu tạo ra thẻ tr trên tbody
    });
    //Thất bại 
    promise.catch(function (err) {
        console.log(err)
    })
}

const inputs = document.querySelector('.input input');

// const clearForm = () => {
//     for (let i = 0; i < inputs.length; i++) {
//         inputs[i].value = ''
//     }
// }



// Kiểm tra email
const checkEmail = () => {
    const email = document.querySelector('#email').value;
    const tb = document.querySelector('#tbEmail');
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email)) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.innerHTML = 'Email không đúng định dạng !!!'
        return false;
    } else {
        tb.style.display = 'none'
        return true;
    }
}

// Kiểm tra name
const checkName = () => {
    const name = document.querySelector('#name').value;
    const tb = document.querySelector('#tbName');
    const regex = /^[a-zA-Z ]{1,}$/g
    if (!regex.test(removeAscent(name))) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.innerHTML = 'Tên không được bỏ trống !!!'
        return false;
    } else {
        tb.style.display = 'none'
        return true;
    }
}

// Kiểm tra định dạng
function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

// Kiểm tra mật khẩu
const checkPassword = () => {
    const password = document.querySelector('#password').value;
    const tb = document.querySelector('#tbPassword');
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    if (!regex.test(password) || password.length < 8 || password.length > 20) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.style.width = '200px'
        tb.style.lineHeight = 1.1
        tb.style.top = '-10px'
        tb.innerHTML = 'Mật khẩu từ 8-20 ký tự, phải có cả số và chữ, ít nhất 1 ký tự viết hoa, 1 ký tự đặt biệt !!!'
        return false;
    } else {
        tb.style.display = 'none'
        return true;
    }
}
// Kiểm tra nhập lại mật khẩu
const checkPasswordConfirm = () => {
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;
    const tb = document.querySelector('#tbPasswordConfirm');
    if (passwordConfirm === '') {
        tb.style.display = 'block'
    } else if (passwordConfirm !== password) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.innerHTML = 'Nhập lại mật khẩu'
        return false;
    } else {
        tb.style.display = 'none'
        return true;
    }
}

// Kiểm tra phone
function checkPhone() {
    const phone = document.querySelector('#phone').value;
    const tb = document.querySelector('#tbPhone');
    const regex = /^[0-9]+$/
    if (!regex.test(phone) || phone.length < 10 || phone.length > 11) {
        tb.style.display = 'block'
        tb.innerHTML = 'Phone không được bỏ trống và phải có từ 10-11 số !!!'
        tb.style.fontSize = '13px'
        return false;
    } else {
        tb.style.display = 'none'
        return true;
    }
}
// kiểm tra giới tính
const checkGender = () => {
    const tb = document.querySelector('#tbGender')
    if (document.querySelector("#male").checked === false && document.querySelector("#female").checked === false) {
        tb.style.display = 'block'
        tb.innerHTML = 'Hãy chọn giới tính !!!'
        return false;
    } else {
        tb.style.display = 'none'
        return true;
    }
}