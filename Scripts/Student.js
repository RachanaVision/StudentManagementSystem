$(document).ready(function () {
    GetAllRecord()
})

function GetCityByState(sid) {

    $.ajax({
        url: "/Student/GetCityByState/",
        data: { stateid: sid },
        type: "POST",
        success: function (data) {
            var option = "<option value='0'>--------------- Select ---------------</option>";
            for (var i = 0; i < data.length; i++) {
                option += "<option value=" + data[i].CityId + ">" + data[i].CityName + "</option>";
            }
            $("#City").html(option).show();
        },
        error: function (response) {
            alert(response);
        }
    })
}

$('#City').on('change', function () {
    var cityid = $(this).val();
    $("#SCity").val(cityid);
});

$('#State').on('change', function () {
    var stateid = $(this).val();
    $("#SState").val(stateid);
});

$('#btnAddRecord').on('click', function () {
    window.location.href = "/Student/Create"
})

$('#btnCancel').on('click', function () {
    ClearControls();
    $('#DisplayInsertedData').empty();
})

function GetAllRecord() {
    $.ajax({
        url: '/Student/GetAllRecords',
        type: 'GET',
        datatype: 'ajax',
        success: function (studentlist) {
            var setdata = $('#setstudent');

            for (var i = 0; i < studentlist.length; i++) {
                var data = "<tr>" +
                    "<td>" + studentlist[i].Name + "</td>" +
                    "<td>" + studentlist[i].Address + "</td>" +
                    "<td>" + studentlist[i].Standard + "</td>" +
                    "<td>" + studentlist[i].Age + "</td>" +
                    "<td>" + studentlist[i].Hobby + "</td>" +
                    "<td>" + studentlist[i].Gender + "</td>" +
                    "<td>" + studentlist[i].StateId + "</td>" +
                    "<td>" + studentlist[i].CityId + "</td>" +
                    "<td>" + studentlist[i].Pincode + "</td>" +
                    "<td>" + "<input type='button' class='btn btn-default btn-info' value='EDIT' onclick=addeditrecord(" + studentlist[i].Id + ")>" + "</td>" +
                    "<td>" + "<input type='button' value='DELETE' class='btn btn-default btn-danger' onclick=DeleteRecord(" + studentlist[i].Id + ")>" + "</td>" +
                    "</tr>";
                setdata.append(data);
                $('#status').html("");
            }
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    })
}

function DeleteRecord(id) {
    if (confirm("Are you sure you want to Delete.???")) {
        $.ajax({
            url: '/Student/DeleteRecord?id=' + id,
            type: 'GET',
            datatype: 'ajax',
            success: function () {
                $('#setstudent').empty();
                GetAllRecord()
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        })
    }
}

function GetStates() {
    $.ajax({
        url: "/Student/GetStates/",
        type: "POST",
        success: function (data) {
            var option = "<option value='0'>--------------- Select ---------------</option>";
            for (var i = 0; i < data.length; i++) {
                option += "<option value=" + data[i].StateId + ">" + data[i].StateName + "</option>";
            }
            $("#State").html(option).show();
        },
        error: function (response) {
            alert(response);
        }
    })
}

function InsertRecord() {
    var hobby = [];
    $('input[type=checkbox]:checked').each(function () {
        hobby.push($(this).val());
    });
    hobby.join(",");
    $('#Hobbies').val(hobby);

    var gender = "";
    gender = $('input[type=radio]:checked').val()
    $('#SGender').val(gender);

    var formdata = new FormData();
    formdata.append('Name', $('#Name').val());
    formdata.append('Address', $('#Address').val());
    formdata.append('Standard', $('#Standard').val());
    formdata.append('Age', $('#Age').val());
    formdata.append('Hobby', $('#Hobbies').val());
    formdata.append('Gender', $('#SGender').val());
    formdata.append('StateId', $('#SState').val());
    formdata.append('CityId', $('#SCity').val());
    formdata.append('Pincode', $('#Pincode').val());
    $.ajax({
        url: '/Student/Create',
        type: 'POST',
        contentType: false,
        processData: false,
        data: formdata,
        success: function () {
            InsertedData()
            //ClearControls()
        },
        error: function (msg) {
            alert(msg.responseText);
        }
    })
}

function ClearControls() {
    $('#Name').val(" ")
    $('#Address').val(" ")
    $('#Age').val(" ")
    $('#Standard').val(0)
    $('#Pincode').val(" ")
    $('#State').val(0)
    $('#City').val(0)
    $('input[type=checkbox]').prop('checked', false)
    $('input[type=radio]').prop('checked', false)
}


function InsertedData() {

    var name = $('#Name').val();
    var address = $('#Address').val();
    var standard = $("#Standard").val();
    var age = $("#Age").val();
    var hobby = $('#Hobbies').val();
    var gender = $('#SGender').val();
    var stateName = $("#State option:selected").text();
    var cityName = $("#City option:selected").text();
    var pincode = $("#Pincode").val();
    var state = $('#SState').val();
    var city = $('#SCity').val();
  

   
    var displayText = "<ul>";
    displayText += "<li>Student Name: " + name + "</li>";
    displayText += "<li>Address: " + address + "</li>";
    displayText += "<li>Class: " + standard + "</li>";
    displayText += "<li>Age: " + age + "</li>";
    displayText += "<li>Hobbies: " + hobby + "</li>";
    displayText += "<li>Gender: " + gender + "</li>";
    displayText += "<li>State: " + stateName + "</li>";
    displayText += "<li>City: " + cityName + "</li>";
    displayText += "<li>Pincode: " + pincode + "</li>";
    displayText += "</ul>";

    document.getElementById("DisplayInsertedData").innerHTML = displayText;    
}



