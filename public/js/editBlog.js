(function(){
    $(document).ready(function(){
        let field = $('.field'),
            update = $('#update'),
            deleteBtn = $('#delete');

        let _id;

        //open edit modal windows
        $('body').on('click','.field' ,function(){
            $('#edit').modal('show');
            _id = $(this).attr('id');

            $.ajax({
                type: "GET",
                url: '/blogs/' + _id,
                dataContent: "application/json",
                data: JSON.stringify(_id),
                success: function(data){
                    $('#edit').find('#header').text('Edit ' + data[0].title);
                    $('#edit').find('#blogTitle').val(data[0].title).prop('disabled', true);
                    $('#edit').find('#imgUrl').val(data[0].url).prop('disabled', true);
                    $('#edit').find('#img').attr('src', data[0].url);
                    $('#edit').find('#blogText').val(data[0].text);
                }
            })
        })


        //update actual blog
        update.on('click' , function(){
            $('#edit').modal('hide');
            let dataObj = {
                "title" : $(this).parent().find('#blogTitle').val(),
                "url": $(this).parent().find('#imgUrl').val(),
                "text": $(this).parent().find('#blogText').val()
            }
            $.ajax({
                type: "PUT",
                url: '/blogs/' + _id,
                dataContent: "application/json",
                data: dataObj,
                success: function(updated){
                    $('#'+_id).html('<div class="field" id="' + updated._id +'"><h2>' + updated.title + '</h2><img class="ui fluid image" src="' + updated.url + '"><br><p>' + updated.text + '</p><br><div class="ui horizontal divider">RESTful blog SPA</div></div');
                }
            })
        })


        //delete blog
        deleteBtn.on('click', function(){
            $.ajax({
                type: "DELETE",
                url: '/blogs/' + _id,
                dataContent: "application/json",
                data: _id,
                success: function(id){
                    $('#'+id).remove()
                }
            })
            $('#edit').modal('hide');
        })



    })
})()