if('credentials' in navigator) {    
    let logout = document.querySelector('.logout');
    
    logout.addEventListener('click', function() {
        if ('credentials' in navigator && navigator.credentials.preventSilentAccess) {
            navigator.credentials.preventSilentAccess();
        }
    });
}