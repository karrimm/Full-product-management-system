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

        // save product in local storage
        localStorage.setItem('product', JSON.stringify(data))

        clearInputs()
        showData()
    }

} 

// clear inputs

function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData() {
    let table = '';
    for(let i = 0; i < data.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>  
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    
    document.getElementById('tbody').innerHTML = table;
}

showData()

// delete

function deleteData(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data)
    showData()
}

// count
// update
// search
// clean data