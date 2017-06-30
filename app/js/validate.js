$('.validate').on('click', function () {		
    var form = this.form;
    return $('.value-form').empty().append('<li><span>Amount:</span>'+ form.amount.value+'</li><li><span>Period:</span>'+ form.Period.value +'</li><li><span>ИНН:</span>'+form.Code.value+'</li><li><span>Surname:</span>' + form.Surname.value + '</li><li><span>Name:</span>' + form.Name.value +'</li><li><span>City:</span>'+form.City.value+'</li>');
});