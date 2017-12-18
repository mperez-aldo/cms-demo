/* get the products already selected */
function initFeaturedProducts(){
  return;
}
/* clear the available products from oCC */
function clearAvailableProducts(availableProductsNode){
  while (last = availableProductsNode.lastChild) availableProductsNode.removeChild(last);
}
/* create a featured product JSON */
function createFeaturedProductObj(htmlElement, index){
  let spanElems = htmlElement.getElementsByTagName('span'),
      imageElem = htmlElement.getElementsByTagName('img'),
      linkElem = htmlElement.getElementsByTagName('a');
  let featuredProduct = {
    "id" : htmlElement.id,
    "img" : imageElem[0].src,
    "link" : linkElem[0].href,
    "sequence" : index,
    "text" : spanElems[1].innerHTML,
    "name" : spanElems[2].innerHTML
  };
  return featuredProduct;
}
/* create featured product html element */
function createdProductElem(productObj, elemType){
  let productDiv = document.createElement('div');
  if(elemType){
    //product.images.length-2
    productDiv.innerHTML = '<div class="product" id="' + productObj.code + '" draggable="true">' + 
                    ' <span>' + productObj.code + '</span>' +
                    ' <span>' + productObj.price.formattedValue + '</span>' +
                    ' <span>' + productObj.name + '</span>' +
                    ' <a class="link" href="' + productObj.url + '"><image src="' + productObj.images[0].url + '" alt="" /></a>' + 
                    '</div>';
  }else{
    productDiv.innerHTML = '<div class="product" id="' + productObj.id + '" draggable="true">' + 
                    ' <span>' + productObj.id + '</span>' +
                    ' <span>' + productObj.text + '</span>' +
                    ' <span>' + productObj.name + '</span>' +
                    ' <a class="link" href="' + productObj.link + '"><image class="image" src="' + productObj.img + '" alt="" /></a>' + 
                    '</div>';
  }
  return productDiv;
}
/* get the features products from OCC */
function searchProducts(){
  event.preventDefault();
  let searchQuery = document.getElementById('search-criteria').value,
      url = encodeURI("https://www.callitspring.com/aldowebservices/v2/caAldo/products/search?query=:" + searchQuery + "&format=json&pageSize=5&fields=FULL"),
      availableProductsArea = document.getElementById('available-products');
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data);
    clearAvailableProducts(availableProductsArea);
    // Examine the text in the response
    data.products.forEach(function(product){
      let productDiv = createdProductElem(product, true);
      productDiv.addEventListener('dragstart', function(event) {
        drag(event);
      });
      availableProductsArea.appendChild(productDiv);
    });          
    
  })
  .catch(function(err) {
    console.log('Fetch Error', err);
  });
}
/* Drag the featured products */
function drag(event){
  event.stopPropagation();
  if(event.target.tagName === 'DIV'){
    event.dataTransfer.setData('productId', event.target.id);
  }
}
function allowDrop(event) {
  event.preventDefault();
}
/* Drop the featured products */
function drop(event, element) {
  event.stopPropagation();
  event.preventDefault();
  let productObj = null,
      divId = event.dataTransfer.getData('productId');
      div = document.getElementById(divId);
  if(divId){
    element.appendChild(div);
    div.addEventListener('dragstart', function(event) {
        drag(event);
    });
  }
}