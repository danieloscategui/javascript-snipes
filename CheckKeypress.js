// Adapted from https://gist.github.com/karmiphuc/8448724
$('.input-number').on('keypress keyup', function(evt){
	evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    	evt.preventDefault();
    	$(this).closest('.form-group').addClass('has-error');
    } else {
    	$(this).closest('.form-group').removeClass('has-error');
    	$(this).closest('.form-group').addClass('has-success');
    }
});

$('.input-number').on('blur', function(e){
	$(this).closest('.form-group').removeClass('has-success');
    $(this).closest('.form-group').removeClass('has-error');
});

$('.input-text').on('keypress keyup', function(e) {// Kami.2013.12.24.10:57 Allow only letters, numbers, and @ , . - _
	var allowedCode = [8, 13, 32, 44, 45, 46, 95];
    //8(backspace), 13(enter), 32( ), 44(,), 45(insert), 46(delete), 95(_)
    var allowedSpanish = [241, 209, 225, 193, 233, 201, 237, 205, 243, 211, 250, 218, 252, 220];
    //241(ñ), 209(Ñ), 225(á), 193(Á), 233(é), 201(É), 237(í), 205(Í), 243(ó), 211(Ó), 250(ú), 218(Ú), 252(ü), 220(Ü)
    var allowedSpecialCode = [47, 176]
    //47(/), 176(°)
    
	var charCode = (e.charCode) ? e.charCode : ((e.keyCode) ? e.keyCode :
					((e.which) ? e.which : 0));
	if  (charCode > 31 && (charCode < 64 || charCode > 90) &&
		(charCode < 97 || charCode > 122) &&
		(charCode < 48 || charCode > 57) &&
		(allowedCode.indexOf(charCode) == -1)) &&
		(allowedSpanish.indexOf(charCode) == -1) &&
        (allowedSpecialCode.indexOf(charCode) == -1)) {
		
		e.preventDefault();
		$(this).closest('.form-group').addClass('has-error');
	 } else {
		 $(this).closest('.form-group').removeClass('has-error');
         $(this).closest('.form-group').addClass('has-success');
	 }
 });

$('.input-text').on('blur', function(e){
	$(this).closest('.form-group').removeClass('has-success');
    $(this).closest('.form-group').removeClass('has-error');
});