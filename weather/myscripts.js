// document ready
$(document).ready(function () { 
    // handle button reset 
    $("#reset").click(function (e) { 
        location.reload();
    });

    // handle button submit
    $("#submitButton").click(function (e) {
        $.ajax({
            type: "POST",
            url: "http://api.openweathermap.org/data/2.5/group?id=1636544,1623446,1648340,2654675,2988507&appid=de6d52c2ebb7b1398526329875a49c57&units=metric",
            dataType: "json",
            success: function (result, status, xhr) {
                // call function
                res = CreateWeatherJson(result);

                //first row in table
                $("#weatherTable").append("<thead><tr><th>City Id</th><th>City Name</th><th>Temperature (&#8451;)</th><th>Min Temp</th><th>Max Temp</th><th>Humidity</th><th>Pressure</th></thead></table>");

                $('#weatherTable').DataTable({
                    data: JSON.parse(res),
                    columns: [
                        { data: 'cityID' },
                        { data: 'cityName' },
                        { data: 'temp' },
                        { data: 'tempMin' },
                        { data: 'tempMax' },
                        { data: 'pressure' },
                        { data: 'humidity' },
                        ],"pageLength": 5
                    });

                },
                error: function (xhr, status, error) {
                    console.log("Error: " + status + " " + error + xhr.status + " " + xhr.statusText);
                }
            });
        });
        
        // create function to get weather 
        function CreateWeatherJson (json) {
            var newJson = "";
            for (i = 0; i < json.list.length; i++) { 
                cityId = json.list[i].id;
                cityName = json.list[i].name;
                temp = json.list[i].main.temp
                pressure = json.list[i].main.pressure; 
                humidity = json.list[i].main.humidity; 
                tempmin = json.list[i].main.temp_min; 
                tempmax = json.list[i].main.temp_max;
                newJson = newJson + "{";
                newJson = newJson + "\"cityId\"" + ": " + cityId + "," 
                newJson = newJson + "\"cityName\"" + ": " + "\"" + cityName + "\"" + ","
                newJson = newJson + "\"temp\"" + ": " + temp + "," 
                newJson = newJson + "\"pressure\"" + ": " + pressure + "," 
                newJson = newJson + "\"humadity\"" + ": " + humadity + "," 
                newJson = newJson + "\"tempMin\"" + ": " + tempmin + "," 
                newJson = newJson + "\"tempMax\"" + ": " + tempmax 
                newJson = newJson + "},";
            }
            return "[" + newJson.slice(0, newJson.length - 1) + "]";
        }
    });



