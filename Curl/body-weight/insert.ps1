$url="http://localhost:1976/Mark/body-weight"

$weight=123.456
$date="2012-02-03"

$dataString="[{%22value%22:$weight,%22date%22:%22$date%22}]"

curl --request POST $url --data "data=$dataString"