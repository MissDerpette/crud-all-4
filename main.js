const apiUrl = "http://206.189.148.20:8080/api/create";
const myForm = document.getElementById("create-product-form");
const htmlOutput = document.querySelector("#added-output");

function getValue() {
    const name = document.getElementById("addName").value;
    const description = document.getElementById("addDesc").value;
    const price = document.getElementById("addPrice").value;

    let getData = {
        "name": name,
        "description": description,
        "price": price
    };

    return getData;
}

myForm.addEventListener('submit', function(event) {
    event.preventDefault();
   

    let getData = getValue();
    console.log(getData);

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(getData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response', data);

            const {_id, created_at, description, name, price} = data;

            htmlOutput.innerHTML = `<div class="newly-added-data">
                <div class="new-card">
                     <div class="product-id">ID: ${_id}</div>
                    <div class="name">Name: ${name}</div>
                    <div class="description">Description: ${description}</div>
                    <div class="price">Price: ${price}</div>
                </div>
            </div>`;
        })
        .catch(error => {
            console.error('Error', error);
        });
});

// code for add data ends here

let getForm = document.querySelector('#get-product-form'); //get the form ID
getForm.addEventListener('submit', function(event) {
    event.preventDefault(); //for submit button to work
    console.log('here')

    let productForm = document.querySelector('#get-id').value; //get the value of the data that was provided on the field
    console.log(`${productForm}`)



    let getUrl = `http://206.189.148.20:8080/api/get/${productForm}`; //to get the actual ID equivalent to the data that was provided on the field
    console.log(`${getUrl}`)
    const outputElement = document.querySelector('#get-output'); //where the output is going to show
 

    fetch(getUrl)
        .then(response => response.json())
        .then(data => {
        console.log(data)
       if ( data.hasOwnProperty("name") && data.hasOwnProperty("price") && data.hasOwnProperty("_id") && data.hasOwnProperty("description") ) {
        outputElement.innerHTML = `
        <div class="get-card return">
            <div class="get-id-output">
             <div class="product-id"> Product ID:
            ${productForm}
             </div>
             <div class="product-name"> Product Name: 
                   ${data.name} 
             </div>
               <div class="product-description"> Product Description: 
                  ${data.description}
                </div>
               <div class="product-price"> Product Price: 
                  ${data.price}
                </div>
            </div>
       `; 
       } else (
        outputElement.innerHTML = `
        <div class="deleted-card return">
            <div class="deleted-name">
            <h3>${data.message}</h3>
            </div>
        </div>`
       )

    })
    .catch(error => {
      // Handle any errors that occurrßed during the request
    //   console.log('Error', error);
    });
    
    

})

// code for get data ends here


const updateForm = document.querySelector('#update-product-form');
updateForm.addEventListener('submit', function(event){
    event.preventDefault();
    console.log('updateForm, clicked')

    function getFormValue(){
        let id = document.getElementById('updateId').value;
        let name = document.getElementById('updateName').value;
        let description = document.getElementById('updateDesc').value;
        let price = document.getElementById('updatePrice').value;

        let updatedData = {
            "id" : id,
            "name" : name,
            "description" : description,
            "price" : price
        }

        return updatedData
    };

    let updatedId = document.querySelector('#updateId').value;
    let updatedUrl = `http://206.189.148.20:8080/api/update/${updatedId}`
    let updatedData = document.querySelector('#update-output');


    fetch(updatedUrl, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(getFormValue())
    })
    .then(response => response.json())
    .then(data => { console.log(data)
        updatedData.innerHTML = `<div class="updated-data-response">
             <div class="updated-data-container">
                  
                   ${data} 
                  
                  ${data}
                
                  ${data}
             </div>
        </div>`


})

})

// code for update data ends here



function deletedData() {

    let deletedId = document.querySelector('#deleteId').value;
    let deletedUrl = `http://206.189.148.20:8080/api/delete/${deletedId}`;
    let deletedMsg = document.querySelector('#deleted-output');

    fetch(deletedUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // alert(data.status)
        // deletedMsg.innerHTML = data.status
        deletedMsg.innerHTML = `<div class="get-deleted-response">
             <div class="deleted-response-container">
                  ${data.status}
             </div> 
         </div>`
    }) 

    .catch(error => {
        console.error('Error:', error);
    });
}

const delDataForm = document.querySelector('#delete-product-form');
delDataForm.addEventListener('submit', function(event){
    event.preventDefault();
    deletedData();
});

// code for delete data ends here

const getAllData = 'http://206.189.148.20:8080/api/get';


const myButton = document.getElementById('myButton');

function handleClick() {
    event.preventDefault();

  //generate container div here
  
  const getAllData = 'http://206.189.148.20:8080/api/get';

    fetch(getAllData)
        .then(response => response.json())
        .then(data => {

            alert(data)
            const allOutput = document.querySelector('#all-output');
        
            data.forEach(product => {
                const productCard = document.createElement('div');
                 productCard.className = 'product-card';
            
                 const productBody = document.createElement('div');
                 productBody.className = 'product-body';
            
                 const productId = document.createElement('div');
                 productId.className = 'productId';
                 productId.textContent = `Product ID: ${product._id}`;
                 console.log(`${product._id}`);
            
                 const productName = document.createElement('div')
                 productName.className = 'product-name'
                 productName.textContent = `Name: ${product.name}`;
            
                 const productDescription = document.createElement('div');
                 productDescription.className = 'product-description';
                 productDescription.textContent = `Description: ${product.description}`;
            
                 const productPrice = document.createElement('div');
                 productPrice.className = 'product-price';
                 productPrice.textContent = `$${product.price}`;
            
                 productBody.appendChild(productId);
                 productBody.appendChild(productName);
                 productBody.appendChild(productDescription);
                 productBody.appendChild(productPrice);
                 productCard.appendChild(productBody);
                 allOutput.appendChild(productCard);
            })
        })

    .catch(error => {
        console.error('Error fetching product data', error);
    });

}

myButton.addEventListener('click', handleClick);