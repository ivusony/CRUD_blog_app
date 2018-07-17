(function(){
    $(document).ready(function(){

        const   blogTitle   = $('#blogTitle'),
                imgUrl      = $('#imgUrl'),
                blogText    = $('#blogText'),
                conf     = $('#confirm'),
                addnewblog  = $('#addnewblog');

                

                addnewblog.on('click', function(e){
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    $('#input').modal('show');
                })


                conf.on('click', function(e){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    $('#input').modal('hide');

                   $.ajax({
                       type: "POST",
                       url: '/',
                       dataContent: "application/json",
                       data: {
                           title: blogTitle.val(),
                           url: imgUrl.val(),
                           text: blogText.val() 
                       },
                       success: function(data){
                           $('#output').append('<div class="field" id="' + data._id +'"><h2>' + data.title + '</h2><img class="ui fluid image" src="' + data.url + '"><br><p>' + data.text + '</p><br><hr></div');
                           blogTitle.val('');
                           imgUrl.val('');
                           blogText.val('');
                       }
                   })
                })
               
    })
})()