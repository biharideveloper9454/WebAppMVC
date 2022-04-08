

$(document).ready(function () {

    ShowDataAll();

});
function ShowDataAll() {
    $.ajax({
        url: '/Home/ShowData',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            var obj = '';
            $.each(result, function (key, item) {
                obj += '<tr>';
                obj += '<td>' + item.Id + '</td>';
                obj += '<td>' + item.FirstName + '</td>';
                obj += '<td>' + item.LastName + '</td>';
                obj += '<td>' + item.Gender + '</td>';
                obj += '<td>' + item.Email + '</td>';
                obj += '<td>' + item.Mobile + '</td>';
                obj += '<td><a href="#"class="btn btn-sm btn-primary"  data-toggle="modal" data-target="#myModal"  onclick="Edit(' + item.Id + ')">Edit</a> || <a href="#"class="btn btn-sm btn-danger" onclick="Delete(' + item.Id + ')" >Delete</a></td>';
                obj += '</tr>';
            });
            $('.tbody').html(obj);
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
}
function Add() {
    var obj = {
        firstname: $('#FirstName').val(),
        lastname: $('#LastName').val(),
        gender: $('#Gender').val(),
        mobile: $('#Mobile').val(),
        email: $('#Email').val(),
    }
    $.ajax({
        type: "POST",
        url: "/Home/Create",
        contentType: false,
        processData: false,
        data: JSON.stringify(obj),
        async: false,
        success: function () {
            alert('Data Saved!');
        },
        error: function () {
            alert("Error!");
        }
    });
}
function Delete(Id) {
    if (confirm("Are you sure, You want to delete this record")) {
        $.ajax({
            url: '/Home/Delete?id=' + Id,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                alert('Deleted Record!');
                ShowDataAll();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function Edit(Id) {
    $.ajax({
        url: '/Home/Edit?id=' + Id,
        type: 'GET',
        dataType: 'json',
        processData: false,
        contentType: false,
        data: { Id: $('#Id').val() },
        success: function (data) {
            if (data != null) {
                $('#Id').val(data.Id);
                $('#FirstName').val(data.FirstName);
                $('#LastName').val(data.LastName);
                $('#Gender').val(data.Gender);
                $('#Mobile').val(data.Mobile);
                $('#Email').val(data.Email);
            }
            else {
                alert('Something Wrong!');
            }
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function Update() {
    debugger;
    var obj = {
        id:$('#Id').val(),
        firstname: $('#FirstName').val(),
        lastname: $('#LastName').val(),
        gender: $('#Gender').val(),
        mobile: $('#Mobile').val(),
        email: $('#Email').val(),
    }
    $.ajax({
        type: "POST",
        url: "/Home/Update",
        contentType: false,
        processData: false,
        data: JSON.stringify(obj),
        async: false,
        success: function (response) {
            $('#myModal').hide();
            alert('Data Updated!');
        },
        error: function () {
            alert("Error!");
        }
    });
}