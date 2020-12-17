
function getCities() {
    $.ajax({
        url: "/admincities",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            let rows = [];
            const cities = response.cities;

            for (let i = 0; i < cities.length; i++) {
                rows += row(cities[i]);
            }
            $("#cityList").append(rows);
        }
    });
}
function getCity(id) {
    $.ajax({
        url: "/admincities/" + id,
        type: "GET",
        contentType: "application/json",
        success: function(city) {
            let form = document.forms.cityForm;
            form.elements.id.value = city._id;
            form.elements.cityName.value = city.name_en;
            form.elements.cityNameUA.value = city.name_ua;
        }
    });
}
function addCity(city) {
    console.log(city);
    $.ajax({
        url: "/admincities",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            city
        }),
        success: function(city) {
            $("#cityList").append(row(city));
            resetForm();
        }
    });
}
function updateCity(id, city) {
    $.ajax({
        url: "/admincities",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            id,
            city
        }),
        success: function(city) {
            $(`tr[data-rowid='${city._id}']`).replaceWith(row(city));
            resetForm();
        }
    });
}
function deleteCity(id) {
    console.log(id);
    $.ajax({
        url: "/admincities/" + id,
        method: "DELETE",
        contentType: "application/json",
        success: function(city) {
            $(`tr[data-rowid='${city._id}']`).remove();
        }
    });
}
function row(city) {
    return `<tr data-rowid=${city._id}>
                    <td>${city._id}</td>
                    <td>${city.name_en}</td>
                    <td>${city.name_ua}</td>
                    <td><button class='btn btn-sm btn-primary editCity' id=${city._id} onclick="editCity(this.id)">Редагувати</button></td>
                    <td><button class='btn btn-sm btn-primary removeCity' id=${city._id} onclick="removeCity(this.id)">Видалити</button></td>
                </tr>`;
}

function resetForm() {
    let form = document.forms["cityForm"];
    form.reset();
    form.elements["id"].value = 0;
}

function removeCity(objectID) {
    let id = objectID;
    deleteCity(objectID);
};
function editCity(objectID) {
    let id = objectID;
    console.log(objectID);
    getCity(objectID);
};
getCities();