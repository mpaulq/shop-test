const APICategories = () => {
    return fetch('http://localhost:3000/categories')
        .then(res => res.json())
}

const APIProducts = (name, category, discount, sort, order, limit = 8, offset) => {
    let query = 'http://localhost:3000/products?';
    if(name) query += `name=${name}&`;
    if(category) query += `category=${category}&`;
    if(discount) query += `discount=${discount}&`;
    if(sort) query += `sort=${sort}&`;
    if(order) query += `order=${order}&`;
    if(limit) query += `limit=${limit}&`;
    if(offset) query += `offset=${offset}`;

    return fetch(query)
        .then(res => res.json())
}
    
const btnContainer = document.getElementById('btn-container')
const appendCategory = () => {
    APICategories()
        .then(data => {
            data.categories.forEach(category => {
                const button = document.createElement('button');
                const catName = category.name;
                button.innerHTML = catName[0].toUpperCase() + catName.slice(1);
                button.className = 'btn'
                button.id = category.id
                btnContainer.appendChild(button)
            });
            const event = new CustomEvent('categoryLoaded')
            btnContainer.dispatchEvent(event);
        })
        .catch(err => console.log(err))
    
}

let current = document.getElementsByClassName('active');
btnContainer.addEventListener('categoryLoaded', () => {
    let btn = btnContainer.getElementsByClassName('btn');
    Array.from(btn).forEach(btn => {
        btn.addEventListener('click', function() {
            current[0].className = current[0].className.replace(' active', '');
            this.className += ' active';
            cardContainer.innerHTML = '';
            appendProduct()
        })
    })

})

const cardContainer = document.getElementById('card-container');
const appendProduct = () => {
    APIProducts(null, current[0].id, null, null, null, 8, null)
        .then(data => {
            console.log(data.products);
            data.products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
                card.id = product.id;
                const img = document.createElement('img');
                img.src = product.url_image || '../notfound.png';
                img.alt = product.name;
                img.style.textAlign = 'center';
                img.style.maxHeight = '200px';
                img.style.maxWidth = '100%'
                const title = document.createElement('h3');
                title.innerHTML = product.name.toUpperCase();
                const price = document.createElement('p');
                price.className = 'price';
                price.innerHTML = '$'+product.price;
                const discount = document.createElement('p');
                discount.className = 'discount';
                discount.innerHTML = product.discount+'%';
                discount.style.display = !product.discount? 'none':'block';

                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(price);
                card.appendChild(discount);

                cardContainer.appendChild(card);
            })
        })
        .catch(err => console.log(err))
}

appendCategory();
appendProduct();


