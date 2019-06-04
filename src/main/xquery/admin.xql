xquery version "3.1";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare option output:method "html5";
declare option output:media-type "text/html";

(:let $log := util:log("info","admin.xql"):)

let $route := request:get-parameter("route","#/launcher")
(:let $log := util:log("info","route " || $route):)

return
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes"/>
    <title>Starter App</title>
    <meta name="description" content="Starter App"/>
    <link rel="stylesheet" href="style.css"/>
    <script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script type="module" src="./src/starter-app/starter-app.js"></script>
</head>
  <body>
    <starter-app></starter-app>
  </body>
</html>