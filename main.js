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
                <div class="card">
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


const getUrl = "http://206.189.148.20:8080/api/get/"
