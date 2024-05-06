const url = "http://Inventory-env.eba-m2qc5yfk.us-east-2.elasticbeanstalk.com/products";


async function findProduct() {
    const productId  = document.getElementById("search");

    if(!productId.checkValidity()){
        alert('Por favor, complete todos los campos correctamente.');
    }else{
        const productURL = "http://Inventory-env.eba-m2qc5yfk.us-east-2.elasticbeanstalk.com/products/findProductBy/"+productId.value;

        fetchDataAndPopulateTable(productURL);
    }

}

async function cleanSearchInput(search){
    search.value = '';
    fetchDataAndPopulateTable("http://Inventory-env.eba-m2qc5yfk.us-east-2.elasticbeanstalk.com/products");
}

async function fetchDataAndPopulateTable(url) {
    try {
        const response = await fetch(url);
        const products = await response.json();


        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = ''; // Clear existing table data

        try{

            if(Array.isArray(products)){
                products.forEach(currentStudent => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="border border-gray-700 px-4 py-2">${currentStudent.id}</td>
                        <td class="border border-gray-700 px-4 py-2">${currentStudent.name}</td>
                        <td class="border border-gray-700 px-4 py-2">${currentStudent.description}</td>
                        <td class="border border-gray-700 px-4 py-2">${currentStudent.quantity}</td>
                        <td class="border border-gray-700 px-4 py-2 text-center">
                            <button type="button" onclick="deleteStudent(${currentStudent.id})" class="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Eliminar</button>
                            <button type="button" onclick="editProductButton(${currentStudent.id})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Editar</button>
                        </td>

                    `;


                    row.setAttribute("id",currentStudent.id);

                    tableBody.appendChild(row);
                });
            }else{
                // Si recibimos un objeto único
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="border border-gray-700 px-4 py-2">${products.id}</td>
                    <td class="border border-gray-700 px-4 py-2">${products.name}</td>
                    <td class="border border-gray-700 px-4 py-2">${products.description}</td>
                    <td class="border border-gray-700 px-4 py-2">${products.quantity}</td>
                    <td class="border border-gray-700 px-4 py-2 text-center">
                            <button type="button" onclick="deleteStudent(${products.id})" class="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Eliminar</button>
                            <button type="button" onclick="editProductButton(${products.id})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Editar</button>
                    </td>
                `;
                row.setAttribute("id",products.id);
                tableBody.appendChild(row);
            }

        }catch (e){
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td class="border border-gray-700 px-4 py-2">No se encontro producto con ese Id</td>
                `;
            // row.setAttribute("id",products.id);
            tableBody.appendChild(row);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchDataAndPopulateTable(url);


function deleteStudent(id) {
    //cuando ya estemos seguros de que se quiere eliminar.
    const deleteUrl = "http://Inventory-env.eba-m2qc5yfk.us-east-2.elasticbeanstalk.com/products/deleteProductById?id="+id;

    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(data => {
            console.log('Item deleted successfully:', data);
            fetchDataAndPopulateTable(url);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            // Handle errors, show an error message, or retry the operation
        });
}

function editProductButton(id){
    //TODO: conocer el id del usuario que queremos editar,  check
    // cambiar las propiedades de la fila para poder editar
    let currentRow = document.getElementById(id);

    let nameCell = currentRow.children.item(1);
    let descriptionCell = currentRow.children.item(2);
    let quantityCell = currentRow.children.item(3);


    nameCell.setAttribute("contenteditable","true");
    descriptionCell.setAttribute("contenteditable","true");
    quantityCell.setAttribute("contenteditable","true");

    currentRow.children.item(1).focus();


    //cambiar el texto del botón editar y cambiar el color
    let editButton = currentRow.children.item(4).children.item(1);
    editButton.setAttribute("class","bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline");
    editButton.innerHTML = "Save";
    // cuando el usuario presione nuevamente el botón de guardar, debemos de ir a la función guardar
    editButton.setAttribute("onClick","saveProduct("+id+")");
}

function saveProduct(id) {
    let currentRow = document.getElementById(id);

    let nameCell = currentRow.children.item(1);
    let descriptionCell = currentRow.children.item(2);
    let quantityCell = currentRow.children.item(3);


    const editProduct = {
        id: id,
        name : nameCell.innerHTML,
        description : descriptionCell.innerHTML,
        quantity : quantityCell.innerHTML
    }

    const updateUrl = "http://Inventory-env.eba-m2qc5yfk.us-east-2.elasticbeanstalk.com/products";

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            // Add any other headers if needed
        },
        body: JSON.stringify(editProduct)
    };

    // Make the PUT request
    fetch(updateUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            fetchDataAndPopulateTable(url);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error here
        });

}



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
            fetchDataAndPopulateTable(url);
            //clean inputs
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error here
        });


}

