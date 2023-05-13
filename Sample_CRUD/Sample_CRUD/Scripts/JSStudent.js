$(document).ready(function () {
    var GlobalStudentID = 0; //Declaration ni sang StudentID as Global, para bisan diin lang nga function pwede ko sya matawag

    LoadStudents();
    function LoadStudents() {
        var dtStudents = $('#StudentTable').DataTable({
            destroy: true,
            responsive: true,
            processing: false,
            search: true,
            stateSave: true,
            info: true,
            searching: false, paging: true, info: true,
            order: [[1, "asc"], [2, "asc"]],
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
            ajax: {
                "url": "/Home/GetStudents", //Url ni para matawag ang function sa controller
                "type": "GET"
            },
            columns:
                [
                    { data: "FirstName", title: "FirstName", sClass: "dt-body-left", orderable: false },
                    { data: "MiddleName", title: "Middle Name", sClass: "dt-body-left", orderable: false },
                    { data: "LastName", title: "Last Name", sClass: "dt-body-left", orderable: false },
                    { data: "YearLevel", title: "Year Level", sClass: "dt-body-center", orderable: false },
                    {
                        data: "StudentID", title: "ACTION", render: function (data) {
                            return "<div class='row justify-content-center'><div class='dropdown dropleft'><button type='button' id='btnAction' class='btn btn-success btn-sm' data-toggle='dropdown' > <i class='fa fa-bars'></i></button > <div class='dropdown-menu'> <div class='container fluid'> <a class='btn btn-warning fa fa-edit col-sm-12' id='btnUpdate' style='margin-bottom: 3px; margin-top: 3px;'>&nbspUpdate</a><br /><a id='btnDelete' style='margin-bottom: 3px; margin-top: 3px; color: white;' class='btn btn-danger fa fa-trash col-sm-12'>&nbspDelete</a></div></div></div ></div> "
                        }
                    },
                ]
        });

        $("#StudentTable").find("tbody").off().on('click', 'tr', function (e) {
            if (!$(e.target).is("#btnUpdate") && !$(e.target).is("#btnDelete")) {
                GlobalStudentID = $("#StudentTable").DataTable().row($(this)).data().StudentID; //Pagkuha sang StudentID halin sa DataTable
            }
        });
    }

    $("#btnClear").click(function (e) { //Onclick function sang pag Clear
        e.preventDefault();
        $("#frmStudent").trigger("reset");
    });
    
    $("#btnSaveStudent").click(function (e) { //Onclick function sang pag Save
        e.preventDefault();
        SaveStudent();
    });

    $(document).on('click', '#btnUpdate', function () { //Onclick function sang pag Update
        if (GlobalStudentID != 0) {
            UpdateStudent();
        }
        else {
            MessageBox("Please, select a record frist", "Information!");
        }
    });

    $(document).on('click', '#btnDelete', function () { //PagDisplay sang validation modal
        if (GlobalStudentID != 0) {
            MessageBoxValidate("Do you want to delete this record?", "Validation!");
        }
        else {
            MessageBox("Please, select a record frist", "Information!");
        }
    });

    $("#YesDelete").click(function (e) { //PagDelete sang data mo sa db gamit StudentID nga parameter
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/Home/DeleteStudent?id= " + GlobalStudentID, //Url ni para matawag ang function sa controller parameter StudentID
            success: function (res) {
                $('#myModalValidate').modal('hide');
                if (res.success) {
                    MessageBox("Record has been successfully deleted.", "Information!");
                    LoadStudents();
                    $("#frmStudent").trigger("reset");
                }
            }
        });
    });

    function SaveStudent() { //Pagsave sang data pakadto sa db gamit ang form
        var frmStudent = $("#frmStudent"); //Ang form nga gin sudlan sang mga data nga gin encode mo sa textboxes
        $.ajax({
            url: "/Home/SaveStudent", //Url ni para matawag ang function sa controller
            type: "POST",
            data: frmStudent.serialize(),
            success: function (res) {
                if (res.success) {
                    MessageBox("Successfully saved.", "Information!");
                    LoadStudents();
                    $("#frmStudent").trigger("reset");
                } else {
                    MessageBox("Error while saving.", "Error!");
                }
            }
        });
    }

    function UpdateStudent() { //Pagkuha sang data halin sa db then idisplay sa textboxes
        $.ajax({
            url: "/Home/UpdateStudent?id= " + GlobalStudentID, //Url ni para matawag ang function sa controller parameter StudentID
            type: "GET",
            success: function (res) {
                $("#StudentID").val(res.data.StudentID);
                $("#FirstName").val(res.data.FirstName);
                $("#MiddleName").val(res.data.MiddleName);
                $("#LastName").val(res.data.LastName);
                $("#YearLevel").val(res.data.YearLevel);
                $("#GenderID").val(res.data.GenderID);
                $("#Province").val(res.data.Province);
                $("#City").val(res.data.City);
                $("#Purok").val(res.data.Purok);
                $("#Street").val(res.data.Street);
            }
        });
    }

}); //end of document