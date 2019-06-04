xquery version "3.1";

import module namespace sm = "http://exist-db.org/xquery/securitymanager";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare option output:method "json";
declare option output:media-type "application/json";

let $user:= request:get-attribute("user-id")

let $name := if ($user) then sm:get-account-metadata($user, xs:anyURI('http://axschema.org/namePerson')) else 'Guest'
let $group := if ($user) then sm:get-user-groups($user) else ('guest')
return
    map { "userid" : $user, "name" : $name, "groups" : array { $group } }
