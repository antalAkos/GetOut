authentication = {

    signIn: function () {
        $("#signIn").on('click', function () {
            $(".loginModal").modal();
            authentication.login();
            authentication.register();

        })
    },

    login: function () {
        $("#loginButton").on('click', function () {
            $(".error").remove();
            //e.preventDefault();
            let login = $(".form-horizontal input").serialize();
            console.log(login);
            $.ajax({url: "/login",
                type: "POST",
                data: login,
                success: function(data, status) {
                console.log(data);
                    if (!data.includes("Error")) {
                        $("#loginModal").modal('toggle');
                        $("#welcome-username").text("Welcome " + data)
                    } else {
                        authentication.loginFailed(data);
                    }
                },
                error: authentication.loginFailed
            });
        })
    },
    
    register: function () {
        $("#registerButton").on('click', function () {
            $(".error").remove();
            let register = $(".register input").serialize();
            //console.log(register);
            $.ajax({url: "/registration",
                type: "POST",
                data: register,
                success: function(data, status) {
                    if (!data.includes("Error")) {
                        $("#loginModal").modal('toggle');
                        $("#welcome-username").text("Welcome " + data)

                    } else {
                        authentication.loginFailed(data);
                    }
                },
                error: authentication.loginFailed
            });
        })
    },
    loginFailed: function(data, status) {
        console.log(data);
        $(".error").remove();
        $('#username-label').before('<div style="color:red" class="error">'+ data +'</div>');
    }
}