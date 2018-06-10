if(window.PasswordCredential && 'credentials' in navigator) {    
    let form = document.forms.login;
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        let user = e.currentTarget[0].value,
            password = e.currentTarget[1].value;
        
        doLogin(user, password);
    });
    
    function autoSignin() {
        navigator.credentials.get({
            password: true,
            mediation: 'optional'
        }).then((cred) => {
            console.log('credentials', cred);
            
            if(cred) {
                doLogin(cred.id, cred.password);
            }
        });
    }

    function doLogin(user, pwd) {
        let pwdCredential = new window.PasswordCredential({
            id: user,
            password: pwd
        });

        navigator.credentials.store(pwdCredential);
    }

    autoSignin();
}