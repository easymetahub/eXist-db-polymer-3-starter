xquery version "3.0";

import module namespace login="http://exist-db.org/xquery/login" at "resource:org/exist/xquery/modules/persistentlogin/login.xql";

declare variable $exist:path external;
declare variable $exist:resource external;
declare variable $exist:controller external;
declare variable $exist:prefix external;
declare variable $exist:root external;

let $logout := request:get-parameter("logout", ())
let $user := login:set-user("com.easymetahub.login", (), false())
return
    if ($exist:path eq '') 
    then
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <redirect url="{request:get-uri()}/"/>
        </dispatch>
    else if ($exist:path eq "/") 
    then
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <redirect url="{request:get-uri()}/index.html"/>
        </dispatch>
    else if (contains($exist:path, "modules/")) 
    then 
(
    <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
        <cache-control cache="no"/>
    </dispatch>
    
(: Resource paths starting with $shared are loaded from the shared-resources app :)
)    else
        (: everything else is passed through :)
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <cache-control cache="yes"/>
        </dispatch>
