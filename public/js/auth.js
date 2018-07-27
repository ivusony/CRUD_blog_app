(function(){
    $(document).ready(function(){
        $('#register').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $('#registerModal').modal('show');
        })

        $('#registerNewUser').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $.ajax({
                type: 'POST',
                url: '/register',
                dataContent: "application/json",
                data: {
                    name: $('#regName').val(),
                    email: $('#regEmail').val(),
                    username: $('#regUsername').val(),
                    password: $('#regPassword').val() 
                }
            })
            $('#registerModal').modal('hide');
        })

        $('#login').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $.ajax({
                type: 'POST',
                url: '/login',
                dataContent: "application/json",
                data: {
                    username: $('#loginUsername').val(),
                    password: $('#loginPassword').val() 
                }
            })
        })
    })
})()