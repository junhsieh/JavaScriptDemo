# JavaScriptDemo
JavaScript Demo

```
$(document).ready(function() {
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
