import { arr } from "./db.js"

let slots = document.querySelector('.slots')
let arrBasket = []
export function reloadSlots(arr, place) {
    place.innerHTML = ''
    for (let item of arr) {
        let slot = document.createElement('div')

        let photo = document.createElement('div')
        let img = document.createElement('img')

        let descr = document.createElement('div')
        let slotName = document.createElement('h3')
        let p = document.createElement('p')

        let icons = document.createElement('div')
        let price = document.createElement('div')
        let priceImg = document.createElement('img')

        let star = document.createElement('div')
        let starImg = document.createElement('img')

        let pack = document.createElement('div')
        let packImg = document.createElement('img')

        let button = document.createElement('button')


        // b

        slot.classList.add('slot')
        photo.classList.add('photo')
        descr.classList.add('descr')
        slotName.classList.add('slot-name')
        p.classList.add('descr-p')
        icons.classList.add('icons')
        button.classList.add('to-star')

        place.append(slot)
        slot.append(photo)
        photo.append(img)
        img.src = item.image
        slot.append(descr)
        descr.append(slotName, p, icons, button)
        slotName.innerHTML = item.category
        p.innerHTML = item.description
        icons.append(price, star, pack)
        price.append(priceImg, item.price)
        priceImg.src = './img/dollar.svg'
        star.append(starImg, item.rating.rate)
        starImg.src = './img/star.svg'
        pack.append(packImg, item.rating.count)
        packImg.src = './img/box.svg'
        button.innerHTML = 'В корзину'

        if (arrBasket.includes(item)) {
            button.innerHTML = 'Добавлено'
            button.classList.add('to-star_active')
        }
        let numView = document.querySelector('#in_pocket')
        numView.innerHTML = arrBasket.length


        button.onclick = () => {
            let numView = document.querySelector('#in_pocket')
            let num = +numView.innerText
            if (!button.classList.contains('to-star_active')) {
                button.innerHTML = 'Добавлено'
                button.classList.add('to-star_active')
                numView.innerHTML = num + 1
                arrBasket.push(item)
                reloadBasket(arrBasket, products)
            } else {
                button.innerHTML = 'В корзину'
                button.classList.remove('to-star_active')
                numView.innerHTML = num - 1
                arrBasket.splice(arrBasket.indexOf(item), 1)
                reloadBasket(arrBasket, products)
            }
        }
    }
}


let products = document.querySelector('.products')
export function reloadBasket(arr2, place) {
    place.innerHTML = ''
    for (let item of arr2) {
        // a
        let product = document.createElement('div')

        let productView = document.createElement('div')
        let productTools = document.createElement('div')

        // Product View
        let prdPhoto = document.createElement('div')
        let prdImg = document.createElement('img')
        let prdName = document.createElement('h3')

        // Product Tools
        let counter = document.createElement('div')
        let minus = document.createElement('span')
        let count = document.createElement('span')
        let plus = document.createElement('span')

        let prdPrice = document.createElement('h3')

        // b
        product.classList.add('product')
        productView.classList.add('product-view')
        productTools.classList.add('product-tools')

        // product view
        prdPhoto.classList.add('product-photo')
        prdImg.classList.add('product-img')
        prdName.classList.add('product-name')

        // Product Tools
        counter.classList.add('counter')
        minus.id = 'minus'
        count.id = 'count'
        plus.id = 'plus'

        prdPrice.id = 'product-price'

        // c
        place.append(product)
        product.append(productView, productTools)
        productView.append(prdPhoto, prdName)
        prdPhoto.append(prdImg)

        productTools.append(counter, prdPrice)
        counter.append(minus, count, plus)

        prdImg.src = item.image
        prdImg.alt = 'product photo'
        prdName.innerHTML = item.category

        minus.innerHTML = "&minus;"
        count.innerHTML = "1"
        plus.innerHTML = "&plus;"

        prdPrice.innerHTML = "$" + item.price


        // let allPriceView = document.querySelector('.all-price-number')
        // let allPricesNum = 0
        // let numItem = prdPrice.innerText.split('$')
        // allPricesNum += +numItem[numItem.length - 1]
        // allPriceView.innerHTML = "$" + allPricesNum


        let countNum = 1
        plus.onclick = () => {
            if (countNum < 100) {
                countNum++
                count.innerHTML = countNum
                let prdPriceNum = prdPrice.innerText.split('$')
                prdPrice.innerHTML = '$' + Math.round((+prdPriceNum[prdPriceNum.length - 1] + item.price))
                let allPricesNum = 0;
                let allPrices = document.querySelectorAll('#product-price')
                allPrices.forEach(item => {
                    let numItem = item.innerText.split('$')
                    allPricesNum += +numItem[numItem.length - 1]
                });
                allPriceView.innerHTML = "$" + allPricesNum;

            }
        }

        minus.onclick = () => {
            if (countNum > 0) {
                countNum--
                count.innerHTML = countNum
                let prdPriceNum = prdPrice.innerText.split('$')
                prdPrice.innerHTML = "$" + Math.round((+prdPriceNum[prdPriceNum.length - 1] - item.price))
                let allPricesNum = 0;
                let allPrices = document.querySelectorAll('#product-price')
                allPrices.forEach(item => {
                    let numItem = item.innerText.split('$')
                    allPricesNum += +numItem[numItem.length - 1]
                });
                allPriceView.innerHTML = "$" + allPricesNum;

            }

            if (countNum === 0) {
                arrBasket.splice(arrBasket.indexOf(item), 1)
                product.remove()
                reloadSlots(arr, slots)
            }
        }

    }

    let allPrices = document.querySelectorAll('#product-price')
    let allPricesNum = 0
    allPrices.forEach(item => {
        let numItem = item.innerText.split('$')
        allPricesNum += +numItem[numItem.length - 1]
    })
    let allPriceView = document.querySelector('.all-price-number')
    allPriceView.innerHTML = "$" + allPricesNum

    let allCount = document.querySelector('.all-count-number')
    allCount.innerHTML = arr2.length
}
