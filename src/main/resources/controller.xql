xquery version "3.0";

import module namespace login="http://exist-db.org/xquery/login" at "resource:org/exist/xquery/modules/persistentlogin/login.xql";

declare variable $exist:path external;
declare variable $exist:resource external;
declare variable $exist:controller external;
declare variable $exist:prefix external;
declare variable $exist:root external;

declare variable $local:login_domain := "org.exist-db.mysec";
declare variable $local:user := $local:login_domain || '.user';

let $logout := request:get-parameter("logout", ())
let $set-user := login:set-user($local:login_domain, (), false())
let $user-id := request:get-attribute($local:user)
return
    if ($exist:path eq '') 
    then
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <redirect url="{request:get-uri()}/"/>
        </dispatch>
    else if (($exist:path eq "/") or ($logout)) 
    then
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <redirect url="{request:get-uri()}/login.html"/>
        </dispatch>
    else if (ends-with($exist:resource, ".xq")) 
    then 
        if ($user-id) 
        then
            (: the html page is run through view.xql to expand templates :)
            <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
                <set-attribute name="user-id" value="{$user-id}"/>
                <set-attribute name="$exist:prefix" value="{$exist:prefix}"/>
                <set-attribute name="$exist:controller" value="{$exist:controller}"/>
            </dispatch>
        else
            <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
                <cache-control cache="yes"/>
            </dispatch>
    else
        (: everything else is passed through :)
        <dispatch xmlns="http://exist.sourceforge.net/NS/exist">
            <cache-control cache="yes"/>
        </dispatch>
