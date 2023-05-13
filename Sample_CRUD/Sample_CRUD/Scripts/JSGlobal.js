

function MessageBox(message, title) {
    $('#myModal').modal('show');
    $('#modalmessage').html(message);
    $('#modaltitle').text(title);
}

function MessageBoxValidate(message, title) {
    $('#myModalValidate').modal('show');
    $('#modalmessageValidate').html(message);
    $('#modaltitleValidate').text(title);
}

function fnGetRowData(DataTableID, rowData) {
    var row = $("#" + DataTableID).find(".dtactive");
    if (row.length > 0)
        return $("#" + DataTableID).DataTable().row(row[0]).data()[rowData];
    else
        return 0;
}
