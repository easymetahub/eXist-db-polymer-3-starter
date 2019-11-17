xquery version "3.1";

import module namespace sm = "http://exist-db.org/xquery/securitymanager";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "json";
declare option output:media-type "application/json";

let $id := sm:id()
let $base := ($id//sm:effective, $id//sm:real)[1]
let $tuser := request:get-parameter("user", ())

let $user := $base/sm:username/text()
let $name := sm:get-account-metadata($user, xs:anyURI('http://axschema.org/namePerson'))
let $group := $base//sm:group/text()
return
    map {
        "error": if ($tuser and ($tuser ne $user)) then fn:true() else fn:false(),
        "userid" : $user, 
        "name" : $name, 
        "groups" : array { $group } 
        
    }
