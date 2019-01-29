window.alert(4);
alert(4);
// var el = document.getElementById('txt');
// el.value = "43"
alert(5);
function readTextFile(file)
{
	alert(6);
    var rawFile = new XMLHttpRequest();
    alert(7);
    rawFile.open("GET", file, false);
    alert(8);
    rawFile.onreadystatechange = function ()
    {
    	alert(9);
        if(rawFile.readyState === 4)
        {
        	alert(10);
            if(rawFile.status === 200 || rawFile.status == 0)
            {
            	alert(11);
                var allText = rawFile.responseText;
                var cool = allText.split("\n");
                alert(cool[Math.floor(Math.random() * 100);]);
            }
        }
    }
    alert(12);
    rawFile.send(null);
    alert(13);
    alert(14);
}
