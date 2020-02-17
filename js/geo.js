function getGeo() {
    var from = $('#geo_value_from').val();
    var to = $('#geo_value_to').val();
    $('#geo_results').html('<img src="/img/spinner.gif" />');

    $.ajax({
        type: "GET",
        url: '/calcs/vremya-poleta-na-samolete/api.php?from='+from+'&to='+to,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (data) {
            $('#geo_results').html(data.content);
        }
    });
}
function geo_set_from(from) {
    $('#geo_value_from').val(from);
}
function geo_set_to(to) {
    $('#geo_value_to').val(to);
}
