authentication = {

    signIn: function () {
        $("#signIn").on('click', function () {
            $(".loginModal").show(function () {
                
            });
        })
    },

    login: function () {
        $("#loginButton").on('click', function () {
            e.preventDefault();
            $.ajax({url: "/login",
                type: "POST",
                data: $("#loginForm").serialize(),
                success: function(data, status) {
                    if (data.loggedIn) {
                        // success
                        dialog.dialog('close');

                    } else {
                        loginFailed(data);
                    }
                },
                error: loginFailed
            });
        })
    },
    
    register: function () {
        $("#registerButton").on('click', function () {
            
        })
    }
}