xquery version "3.1";

import module namespace sm = "http://exist-db.org/xquery/securitymanager";

declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare namespace map= "http://www.w3.org/2005/xpath-functions/map";

declare option output:method "json";
declare option output:media-type "application/json";

let $id := sm:id()
let $base := ($id//sm:effective, $id//sm:real)[1]
let $tuser := request:get-parameter("user", ())

let $user := $base/sm:username/text()
let $name := sm:get-account-metadata($user, xs:anyURI('http://axschema.org/namePerson'))
let $groups := $base//sm:group/text()
let $properties := 
	for $key in sm:get-account-metadata-keys($user)
	return map { $key : sm:get-account-metadata($user, $key) }
return map:merge((
    map {
        "error": if ($tuser and ($tuser ne $user)) then fn:true() else fn:false(),
        "userid" : $user, 
        "name" : $name, 
        "groups" : array { 
        	for $group in  $groups
        	let $name-map := map { "name" : $group } 
        	let $properties := 
        		for $key in sm:get-group-metadata-keys($group)
        		return map { $key : sm:get-group-metadata($group, $key) }
        	return  map:merge(($name-map, $properties))
		}        
    },
    $properties))
