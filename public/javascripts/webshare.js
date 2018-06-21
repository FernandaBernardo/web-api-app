if (navigator.share) {
    var buttonShare = document.querySelector('.share');
    buttonShare.addEventListener('click', function() {
        navigator.share({
            title: document.title + ' - Web Share API',
            url: window.location.href,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
    });
}