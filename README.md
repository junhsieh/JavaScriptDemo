# JavaScriptDemo
JavaScript Demo

```
$(document).ready(function() {
		// global setting
		$.ajaxSetup({
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
		});

		//
        $('#userFormSubmit').on('click', function(event){
            event.preventDefault();

			var obj = {
				Username: 'test',
			};

            $.ajax({
                url: '/index.php',
                method: 'POST',
                data: JSON.stringify(obj),
            }).done(function(data, textStatus, jqXHR) {
            }).fail(function(jqXHR, textStatus, errorThrown) {
            }).always(function(data, textStatus, errorThrown) {
			//}).then(function(data, textStatus, jqXHR) {
            });
        });
});
```
