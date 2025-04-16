let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

// console.log(title, price, taxes, ads, discount, total, count, category, submit)

// get total price

function getTotal(){
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    }
    else{
        total.innerHTML = '';
        total.style.background = '#da4343';
    }
}





// create new product

let data;

if(localStorage.product != null) {
    data = JSON.parse(localStorage.product)
}else{
    data = []
}

submit.onclick = function () {
    let item = {
        title:  title.value,
        price:  price.value,
        taxes:  taxes.value,
        ads:    ads.value,
        discount: discount.value,
        total:  total.innerHTML,
        count:  count.value,
        category: category.value
    }
    data.push(item)

    localStorage.setItem('product', JSON.stringify(data))

    console.log(data)
}








// save product in local storage
// clear inputs
// read
// count
// delete
// update
// search
// clean data