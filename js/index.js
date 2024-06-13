var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
var productImageInput = document.getElementById('productImage');
var productSearch = document.getElementById('input2');


var index=0;
var addButton=document.querySelector('.item button:nth-of-type(1)')
var updateButton=document.querySelector('.item button:nth-of-type(2)')
var productList = [];
if(JSON.parse(localStorage.getItem("containerOfProject")!= null))
{
productList=JSON.parse(localStorage.getItem("containerOfProject"));
Display();
}
function CreateProducts()
{


   if(validationInput(productNameInput,"invalidCheck1Feedback")
      &&validationInput(productPriceInput,"invalidCheck2eedback")
      &&validationInput(productCategoryInput,"invalidCheck3Feedback")
      &&validationInput(productDescriptionInput,"invalidCheck4Feedback")
      // &&validationInput(productImageInput,"invalidCheck5Feedback")
     )

   {
    var product = {
       name:productNameInput.value,
       price:productPriceInput.value,
       Categ:productCategoryInput.value,
       desc:productDescriptionInput.value,     
       img:productImageInput.files[0]?.name?`images/products/${productImageInput.files[0]?.name}`: `images/products/lap.png`

    }
    productList.push(product);
    localStorage.setItem("containerOfProject",JSON.stringify(productList));
    Display();
    console.log(productList);
   }
   else{
     inv2.classList.add("d-block")
   }
  
 }


// function Display(){
//    var cartona=""
//    for(var i =0 ;i<productList.length;i++){
//     cartona+=
//       `
//       <div  class="col-4 card text-center align-items-center ">
          
//           <img src="${productList[i].img}" alt="" class="w-50 pt-3 ">
//           <p>${productList[i].name}</p>
//           <p>${productList[i].Categ}</p>
//           <p>${productList[i].price}</p>
//           <p>${productList[i].desc}</p>

//           <button onclick="Delete(${i})" class="btn btn-outline-danger mt-2 mb-2">Delete</button>
//         </div>
//         `
//    }
//  document.getElementById("item").innerHTML=cartona;
// }

function clear(){
productNameInput.value=null;
productPriceInput.value=null;
productCategoryInput.value=null;
productDescriptionInput.value=null;  
}
function Delete(item)
{
   productList.splice(item,1);
   localStorage.setItem("containerOfProject",JSON.stringify(productList));
   Display();
}

function Display(){
   var WordSearch=productSearch.value;

   var cartona=""
   for(var i =0 ;i<productList.length;i++){
      if(productList[i].name.toLowerCase().startsWith(WordSearch.toLowerCase()) == true)
    cartona+=
      `
      <div  class="col-4 card text-center align-items-center ">
          <img class="w-50" src="images/products/iphone.jpg" alt="">
          <p>${productList[i].name}</p>
          <p>${productList[i].Categ}</p>
          <p>${productList[i].price}</p>
          <p>${productList[i].desc}</p>

          <div class="row justify-content-center flex-nowrap gap-1">
          <button onclick="Delete(${i})" class="w-75 btn btn-outline-danger col-6 mt-2 mb-2">Delete</button>
          <button onclick="updateSetItem(${i})" class="w-75 btn btn-outline-warning col-6 mt-2 mb-2">Update</button>
          </div>
          </div>
        `
   }
 document.getElementById("item").innerHTML=cartona;

}

function validationInput(element,msgId){
   Regex={
      productName: /^[A-Z][a-z]{3,8}$/,
      productCategory:/^[A-Z][a-z]{3,8}$/i,
      productPrice:/^[1-9]{2,5}$/,
      productDescription: /^.{3,}$/m,
      // productImage:/^.{1,}\.(jif|png|jpg)$/
   }

   test=element.value;
   var mesg=document.getElementById(msgId)
   if(Regex[element.id].test(test)==true)
      {
         element.classList.remove("is-invalid")
         element.classList.add("is-valid");
         // mesg.classList.add("d-none");
         return true

      }else{
         element.classList.remove("is-valid");
         element.classList.add("is-invalid");
         mesg.classList.remove("d-none");
         return false

      }
}

function updateSetItem(indexofItem)
{
   productNameInput.value=productList[indexofItem].name
   productPriceInput.value=productList[indexofItem].price
   productCategoryInput.value=productList[indexofItem].Categ
   productDescriptionInput.value=productList[indexofItem].desc

   addButton.classList.add("d-none");
   updateButton.classList.remove("d-none")
   index=indexofItem
}
function UpdateProducts(){
var productUpdated=
{
   name:productNameInput.value,
   price:productPriceInput.value,
   Categ:productCategoryInput.value,
   desc:productDescriptionInput.value,
   img:productImageInput.files[0]?.name?`images/products/${productImageInput.files[0]?.name}`: `images/products/lap.png`

}

productList.splice(productList[index],1,productUpdated)
Display()
localStorage.setItem("containerOfProject",JSON.stringify(productList));
clear();
}
