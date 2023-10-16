$(document).ready(function(){

    $('#submitLocation').click(function(){

        //get value from input field
        var city = $("#city").val();

        //check not empty
        if (city != ''){

            $.ajax({

                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=MYID",
                type: "GET",
                dataType: "jsonp",
                success: function(data){
                    console.log(data);
                    console.log(data.weather[0].main);
                    console.log(data.main);
                    console.log(data.main.temp);

                    var information = show(data);
                    $("#show").html(information);
                }
            });

        }else{
            $('#error').html('Field cannot be empty');
        }

    });
})

function show(data){
    return  
    "<h3>Current Weather: "+ data.main.temp +"</h3>" +
    "<h3>Current Weather: "+ data.main.description +"</h3>";
    // "<h3>Current Weather: "+ data.weather[0].main +"</h3>" 
}