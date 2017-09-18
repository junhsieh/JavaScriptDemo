# JavaScriptDemo
JavaScript Demo

```
$(document).ready(function() {
		// global setting
		$.ajaxSetup({
			contentType: 'application/json',
		});

		//
        $('#userFormSubmit').on('click', function(event){
            event.preventDefault();

            $.ajax({
                url: '/index.php',
                method: 'GET',
                data: {},
                dataType: 'json',
            }).done(function(data, textStatus, jqXHR) {
            }).fail(function(jqXHR, textStatus, errorThrown) {
            }).always(function(data, textStatus, errorThrown) {
			//}).then(function(data, textStatus, jqXHR) {
            });
        });
});
```
