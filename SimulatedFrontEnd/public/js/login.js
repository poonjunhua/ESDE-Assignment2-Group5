let $loginFormContainer = $('#loginFormContainer');
if ($loginFormContainer.length != 0) {
    console.log('Login form detected. Binding event handling logic to form elements.');
    //If the jQuery object which represents the form element exists,
    //the following code will create a method to submit registration details
    //to server-side api when the #submitButton element fires the click event.
    $('#submitButton').on('click', function(event) {
        event.preventDefault();
        const baseUrl = ' https://52mbcmu056.execute-api.us-east-1.amazonaws.com';
        let email = $('#emailInput').val();
        let password = $('#passwordInput').val();
        let webFormData = new FormData();
        webFormData.append('email', email);
        webFormData.append('password', password);
        axios({
                method: 'post',
                url: baseUrl + '/esde-login/esde',
                data: webFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(function(response) {
                //Inspect the object structure of the response object.
                //console.log('Inspecting the respsone object returned from the login web api');
                //console.dir(response);
                console.log(data)
                if (data.role_name == 'user') {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user_id', userData.user_id);
                    localStorage.setItem('role_name', userData.role_name);
                    window.location.replace('user/manage_submission.html');
                    return;
                }
                if (response.data.role_name == 'admin') {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user_id', userData.user_id);
                    localStorage.setItem('role_name', userData.role_name);
                    window.location.replace('admin/manage_users.html');
                    return;
                }
            })
            .catch(function(response) {
                //Handle error
                console.dir(response);
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    theme: 'sunset',
                    timeout: '6000',
                    text: 'Unable to login. Check your email and password',
                }).show();

            });
    });

} //End of checking for $loginFormContainer jQuery object