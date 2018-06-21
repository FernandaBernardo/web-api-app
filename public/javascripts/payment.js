if(window.PaymentRequest) {
    function onBuyClicked(event) {
        var supportedInstruments = [{
            supportedMethods: [
                'visa', 'mastercard', 'amex', 'discover', 'maestro', 'diners', 'jcb', 'unionpay', 'bitcoin'
            ]
        }];
        
        var details = {
            displayItems: [{
                label: 'Original donation amount',
                amount: { currency: 'USD', value: '65.00' }
            }, {
                label: 'Friends and family discount',
                amount: { currency: 'USD', value: '-10.00' }
            }],
            total: {
                label: 'Total due',
                amount: { currency: 'USD', value : '55.00' }
            }
        };
        
        var options = {
            requestShipping: true,
            requestPayerEmail: true,
            requestPayerPhone: true,
            requestPayerName: true
        };
        
        var request = new PaymentRequest(supportedInstruments, details, options);
        
        request.addEventListener('shippingaddresschange', e => {
            e.updateWith(((details, addr) => {
                var shippingOption = {
                    id: '',
                    label: '',
                    amount: { currency: 'USD', value: '0.00' },
                    selected: true
                };
                if (addr.country === 'US') {
                    shippingOption.id = 'us';
                    shippingOption.label = 'Standard shipping in US';
                    shippingOption.amount.value = '0.00';
                    details.total.amount.value = '55.00';
                } else if (addr.country === 'JP') {
                    shippingOption.id = 'jp';
                    shippingOption.label = 'International shipping';
                    shippingOption.amount.value = '10.00';
                    details.total.amount.value = '65.00';
                } else {
                    details.shippingOptions = [];
                    return Promise.resolve(details);
                }
                if (details.displayItems.length === 2) {
                    details.displayItems[2] = shippingOption;
                } else {
                    details.displayItems.push(shippingOption);
                }
                details.shippingOptions = [shippingOption];
                
                return Promise.resolve(details);
            })(details, request.shippingAddress));
        });
        
        request.addEventListener('shippingoptionchange', e => {
            e.updateWith(((details) => {
                return Promise.resolve(details);
            })(details));
        });
        
        request.show().then(result => {
            return fetch('/pay', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result.toJSON())
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw 'Failure';
                }
            }).then(response => {
                if (response.success == true) {
                    return result.complete('success');
                } else {
                    return result.complete('fail');
                }
            }).then(() => {
                console.log('Thank you!',
                result.shippingAddress.toJSON(),
                result.methodName,
                result.details.toJSON());
            }).catch(() => {
                return result.complete('fail');
            });
        }).catch(function(err) {
            console.error('Uh oh, something bad happened: ' + err.message);
        });
    }

    document.querySelector('.buy').addEventListener('click', onBuyClicked);
}