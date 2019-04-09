// Global variables
let productCollection = []

// Product Constructor
class Product {
   constructor(name, price, year) {
      this.name = name
      this.price = price
      this.year = year
   }
}

// UI Constructor
class UI {
   addProduct(product) {
      productCollection.push(product)
      this.productStorage()
      this.resetForm()
      this.showMessage('Product Added Successfully', 'success')
   }

   productStorage() {
      localStorage.setItem('products', JSON.stringify(productCollection))

      UI.listProduct()
   }

   static listProduct() {
      const productList = document.getElementById("product-list")
      productCollection = JSON.parse(localStorage.getItem('products'))

      if (productCollection === null) {
         productCollection = []
         localStorage.setItem('indexProduct', JSON.stringify(1))
         return productCollection
      }
      let indexProduct = JSON.parse(localStorage.getItem('indexProduct'))
      productList.textContent = ''
      productCollection.forEach(product => {
         const element = document.createElement("div")
         element.className = 'alert alert-success product-alert'
         element.setAttribute('role', 'alert')
         element.innerHTML = `
            <i class="material-icons float-left mr-2">
               accessibility
            </i>
            <strong>Product Name</strong> ${product.name} 
            <strong class="ml-3">Product Price</strong> ${product.price} 
            <strong class="ml-3">Product Year</strong> ${product.year}
            <span class="float-right">
               <i class="material-icons">
                  done
               </i>
               <i class="material-icons icon-blue" id=${indexProduct} data-list="delete">
                  delete
               </i>
            </span>
         `
         productList.appendChild(element)
         indexProduct++
      })
      localStorage.setItem('indexProduct', indexProduct)
   }

   resetForm() {
      document.getElementById('product-form').reset()
   }

   deleteProduct(product) {
      const element = document.getElementById(product.id)
      let indexArray

      if (!product.getAttribute('data-list'))
         return false

      productCollection.forEach((elemento, index) => {
         if (elemento.id === element.id)
            indexArray = index;
      });

      productCollection.splice(indexArray, 1);
      this.productStorage();
      //element.parentElement.parentElement.remove()
      this.showMessage('Product Deleted SuccessFully', 'info')
   }

   showMessage(message, typeOfAlert) {
      const contentForm = document.getElementById('content-form'),
         content = document.createElement('div')

      content.className = `alert alert-${typeOfAlert} alert-dismissible fade show`
      content.setAttribute('role', alert)
      content.innerHTML = `
         ${message}
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
         </button>
      `
      //content.appendChild(document.createTextNode(message))
      //content.textContent = message

      // Showing in DOM
      contentForm.innerHTML = ''
      contentForm.appendChild(content)
      setTimeout(() => content.remove(), 3000)
   }
}

// DOM Events
document.addEventListener('DOMContentLoaded', UI.listProduct)

document.getElementById('product-form').addEventListener('submit', e => {
   e.preventDefault()
   const name = e.target.name.value,
      price = e.target.price.value,
      year = e.target.year.value,
      ui = new UI(),
      product = new Product(name, price, year)

   if ((name == null || name.length == 0 || /^\s+$/.test(name)) ||
      (price == null || price.length == 0 || /^\s+$/.test(price)) ||
      (year == null || year.length == 0 || /^\s+$/.test(year)))
      return ui.showMessage('Complete Fields Please', 'danger')

   ui.addProduct(product)
})

document.getElementById("product-list").addEventListener("click", e => {
   const ui = new UI()
   ui.deleteProduct(e.target)
})