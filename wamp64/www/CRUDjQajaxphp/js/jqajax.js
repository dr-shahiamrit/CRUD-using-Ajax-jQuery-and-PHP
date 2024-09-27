$(document).ready(function () {

  // ############## Ajax Request for Retreving Data  ##################
  function showdata() {
    output = "";
    $.ajax({
      url: "retrieve.php",
      method: "GET",
      // work with json string received data to javaScript object understand data
      dataType: "json",
      success: function (data) {
        console.log(data);
        if (data) {
          x = data;
        } else {
          x = "";
        }

        for (i = 0; i < x.length; i++) {
          // console.log(x[i]);
          output +=
            "<tr><td>" +
            x[i].id +
            "</td><td>" +
            x[i].name +
            "</td><td>" +
            x[i].email +
            "</td><td>" +
            x[i].password +
            "</td><td> <button class='btn btn-warning btn-sm btn-edit' data-sid=" + x[i].id + ">Edit</button> <button class='btn btn-danger btn-sm btn-del' data-sid=" + x[i].id + " >Delete</button></td></tr>";
        }
        $("#tbody").html(output);
      }
    });
  }
  showdata();

  // #####################  Ajax Retreving Data end ######################s



  ////////////////// Ajax Reqeust for Insert Data /////////////////////////
  $("#btnadd").click(function (e) {
    e.preventDefault();
    console.log("button clikde save");
    let stid = $("#stuid").val();
    let nm = $("#nameid").val();
    let em = $("#emailid").val();
    let pw = $("#passwordid").val();
    // console.log(nm, em, pw)

    mydata = {
      id: stid,
      name: nm,
      email: em,
      password: pw,
    };
    // console.log(mydata)

    $.ajax({
      url: "insert.php",
      method: "POST",
      data: JSON.stringify(mydata),
      success: function (data) {
        // console.log(data)
        msg = "<div class='alert alert-dark mt-3'>" + data + "</div>";
        $("#msg").html(msg);

        $("#myform")[0].reset();
        showdata();
      },
    });
  });
  /////////////////// Ajax Insert data ends/////////////////////



// Delete Data using Ajax

$("tbody").on("click", ".btn-del", function() {

    /*
    // console.log("Delete button clicked")
    let id = $(this).attr("data-sid");
    // console.log(id)
    mydata = {sid: id};
    // this is altenative approach to hide deleted row
    mythis = this;
    $.ajax({
        url: "delete.php",
        method: "POST",
        data: JSON.stringify(mydata),
        success: function(data) {
            // console.log(data);
            msg = "<div class='alert alert-dark mt-3'>" + data + "</div>";
            $("#msg").html(msg);
            // showdata();
            $(mythis).closest("tr").fadeOut();
        },
    })
    */

    // console.log("Delete button clicked")
    let id = $(this).attr("data-sid");
    // console.log(id)
    mydata = {sid: id};
    // this is altenative approach to hide deleted row
    mythis = this;
    $.ajax({
        url: "delete.php",
        method: "POST",
        data: JSON.stringify(mydata),
        success: function(data) {
            // console.log(data);

            if(data == 1) {
                msg = "<div class='alert alert-dark mt-3'>Student Deleted Successfully</div>";
                $(mythis).closest("tr").fadeOut();
            } else if(data == 0) {
                msg = "<div class='alert alert-dark mt-3'>Unable to Delete Student</div>";
            }
            $("#msg").html(msg);
            // showdata();
            
        },
    })




})

// Delete Data End



// Edit Ajax call start

$('tbody').on("click", ".btn-edit", function() {
    console.log("Edit Button Clicked");
    let id = $(this).attr("data-sid");

    // javascript object
    mydata = {sid: id};

    $.ajax({
        url: "edit.php",
        method: "POST",
        // data comes in json string so we need to convert it to javascript object
        dataType: "json",
        data: JSON.stringify(mydata),
        success: function(data) {
            // console.log(data);
            $("#stuid").val(data.id);
            $("#nameid").val(data.name);
            $("#emailid").val(data.password);
            $("#passwordid").val(data.password);
        }
    })

})

// Edit Ajax call end



});
