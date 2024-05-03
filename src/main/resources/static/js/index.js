const url = "http://localhost:8080/products";


async function findProduct() {
    const productId  = document.getElementById("search").value;


    const productURL = "http://localhost:8080/products/findProductBy/"+productId;

    fetchDataAndPopulateTable(productURL);

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
                        <td class="flex items-center justify-center px-4 py-2 border border-gray-700">
                            <button type="button" onclick="deleteStudent(${currentStudent.id})" class="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Eliminar</button>
                            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Editar</button>
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
    const deleteUrl = "http://localhost:8080/products/deleteProductById?id="+id;

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