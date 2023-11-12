var source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
source.onmessage = function(event) {
  document.getElementById("result").innerHTML += event.data + "<br>";
}; 