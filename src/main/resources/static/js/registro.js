
// REGISTRO DE PRODUCTOS

function validateData() {

    const form = document.getElementById('record');
    const formElements = form.elements;


    for (let i = 0; i < formElements.length; i++) {
        if (!formElements[i].checkValidity()) {
            // Si algún campo no es válido, mostrar mensaje de error y salir de la función
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
    }

    const name = document.getElementById('nombre');
    const description = document.getElementById('descripcion');
    const quantity = document.getElementById('cantidad');

    productRegister(name, description, quantity);
    name.value = '';
    description.value = '';
    quantity.value = '';

}

function productRegister(productName,productDescription,productQuantity) {
    const apiUrl = 'http://Inventory-env.eba-m2qc5yfk.us-east-2.elasticbeanstalk.com/products';
    // Sample data
    const productData = {
        name: productName.value,
        description: productDescription.value,
        quantity: productQuantity.value
    };

    // Configure the request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Add any other headers if needed
        },
        body: JSON.stringify(productData)
    };

    // Make the POST request
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if(data.id == -1){
                alert("El nombre ya ha sido registrado anteriormente");
            }
            //clean inputs
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error here
        });
}

