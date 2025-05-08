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

let temp;
let myVar = "create";

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
        title:  title.value.toLowerCase(),
        price:  price.value,
        taxes:  taxes.value,
        ads:    ads.value,
        discount: discount.value,
        total:  total.innerHTML,
        count:  count.value,
        category: category.value.toLowerCase()
    }

    // Count 
    if (title.value != '' 
        && price.value != '' 
        && category.value != '' 
        && item.count < 100) {
        if(myVar === 'create'){
            if (item.count > 1) {
            for (let i=0; i<item.count; i++) {
                data.push(item);
            }
            }else {
                data.push(item)
            }
        }else{
            data[tmp] = item;
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            myVar = 'create';
        }
        clearInputs()
    }
    else{
        alert('Please enter valid data, and count should be less than 100')
        
    }
    
    

    // save product in local storage
    localStorage.setItem('product', JSON.stringify(data))
    showData()
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
    getTotal()
    let table = '';
    for(let i = 0; i < data.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>  
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    
    document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById('deleteAll'); 

    if (data.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${data.length})</button>`
    }else {
        btnDeleteAll.innerHTML = '';
    }
}

showData()

// Delete one element

function deleteData(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data)
    showData()
}

// Delete All

function deleteAll() {
    localStorage.clear();
    data.splice(0);
    showData();
}


// update

function updateData(i) {
    console.log(i);
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    getTotal();
    category.value = data[i].category;
    count.style.display = 'none';   
    submit.innerHTML = 'Update';
    myVar = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}


// search

let searchMood = "Title";

function getSearchMood(id) {
    let search = document.getElementById('search')
    
    if (id === 'searchTitle') {
        searchMood = 'Title';
    }else{
        searchMood = 'Category';
    }
    
    search.placeholder = 'Search By ' + searchMood;
    search.focus()
    search.value = '';
    showData();
}



function searchData(value) {
    // console.log(value);
    getTotal();
    let table = '';
    for(let i = 0; i < data.length; i++) {
        if (searchMood === 'Title') {
                if (data[i].title.includes(value.toLowerCase())){
                    table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>  
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
                }
            }
        else {
            if (data[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>  
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}


// clean data