$("input").prop('disabled', true);
var time = 60;
var out = document.getElementById('outText');
var wordMarker = 0;
var errMarker = 0;
var arrMarker = 0;
var correct = false;
var NUM_OF_WORDS = 72;
out.value = '';
var jsWords = [];

function onTimer()
{
  $("input").prop('disabled', false);
  document.getElementById("timeLeft").innerHTML = "Time left: "+time;
  time--;
  if (time < 0)
  {
    alert("Time's up!");

    var url = '/results';
	var form = $('<form action="' + url + '" method="post">' +
	  '<input type="text" name="right" value="' + wordMarker + '" />' +
	  '<input type="text" name="wrong" value="' + errMarker + '" />' +
	  '</form>');
	$('body').append(form);
	form.submit();
  }
  else
  {
    setTimeout(onTimer, 1000);
  }
}

{%for i in words%}
	jsWords.push("{{i}}");
{%endfor%}

for(var i = 0; i <= NUM_OF_WORDS; i++)
{
	out.value += jsWords[i]+' ';
}

$(document).ready(function()
{
	window.addEventListener('keypress',

	function ev (e)
	{
	    if (e.keyCode == 32) 
	    {
	    	var correctText = jsWords[wordMarker].replace(/\s+/g, '');
	        var x = document.getElementById("inText").value.replace(/\s+/g, '');
	        // alert(correctText);
	        if(correctText == x && wordMarker == 0)
	        {
	        	wordMarker = 1;
	        	correct = true;
	        }

	        else if(correctText == x || correctText == "\n"+x && wordMarker > 0)
	        {
	        	wordMarker++;
	        	correct = true;
	        }
	        else
	        {
	        	alert("Incorrect word, type again");
	        	errMarker++;
	        	correct = false;
	        }
	        
	        $('input[type="text"]').val('');

	        if(correct)
	        {
	        	out.value = '';
	        	arrMarker++;
	        	var tempArrMraker = arrMarker + NUM_OF_WORDS;
	        	for(var i = arrMarker; i < tempArrMraker; i++)
				{
					out.value += jsWords[i]+' ';
				}
			}
        }
	}, false);
});
