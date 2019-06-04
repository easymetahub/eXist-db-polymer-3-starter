import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-location/iron-location.js';
import '@polymer/iron-location/iron-query-params.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

/**
 * @customElement
 * @polymer
 */
class StarterApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background-color: lightgrey;
          --app-drawer-width: 400px;
        }
        app-drawer-layout {
          background-color: lightgrey;
        }
        section {
          background-color: white;
          height: 100%;
          overflow: auto;
        }
        vaadin-split-layout {
          background-color: white;
          height: 100%;
        }
        .card {
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          padding: 8px;
          margin: 4px;
          border-radius: 5px;
          background-color: #fff;
          color: #757575;
        }
        .flex-horizontal {
          @apply(--layout-horizontal);
        }
        .flex-vertical {
          @apply(--layout-vertical);
        }
        .flexchild {
          @apply(--layout-flex);
        }
        #username {
          color: white;
        }
        paper-item {
          cursor: pointer;
        }
        app-toolbar {
          background-color: grey;
          color: #fff;
        }
        .unassignednode  {
          background-color: lightgrey;
          color: black;
          height: 20px;
          padding: 3px;
          margin-top: 3px;
        }

        .rootnode  {
          background-color: seagreen;
          color: black;
          height: 20px;
          padding: 3px;
          margin-top: 3px;
        }

        .dependentnode  {
          background-color: steelblue;
          color: black;
          height: 20px;
          padding: 3px;
          margin-top: 3px;
        }

        .referencenode  {
          background-color: chocolate;
          color: black;
          height: 20px;
          padding: 3px;
          margin-top: 3px;
        }

        #savechanges {
          width: 90%;
        }

        #harvestdata {
          width: 90%;
        }


      </style>
      <iron-location id="sourceLocation" query="{{query}}" hash="{{hash}}"></iron-location>
      <iron-query-params id="sourceParams" params-string="{{query}}" params-object="{{params}}"></iron-query-params>
      <iron-ajax auto="true"  id="whoAmI"
        url="modules/who-am-i.xq"
        handle-as="json"
        on-response="handleUserData"></iron-ajax>
      <app-drawer-layout fullbleed>
        <app-drawer slot="drawer">
          <app-toolbar>
            <div main-title>Drawer</div>
          </app-toolbar>
          <section>
            <div style="margin-bottom:90px;width:100%;"></div>
          </section>
        </app-drawer>
        <app-header-layout has-scrolling-region>
          <app-header slot="header" fixed effects="waterfall">
          <app-toolbar>
            <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
            <div main-title>Starter</div>
            <span>Hello [[user.name]]</span>
            <template is="dom-if" if="[[user.userid]]">
              <a href="login.html">login</a>
            </template>
            <template is="dom-if" if="[[!user.userid]]">
              <a href="index.html?logout=true">logout</a>
            </template>
          </app-toolbar>
          </app-header>
            <section></section>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
  static get properties() {
    return {
      params: { type: Object, notify: true },
      user: { type: Object, notify: true }
    };
  }

  _isEqualTo(title, string) {
    return title == string;
  }


  handleUserData(request){
    var myResponse = request.detail.response;
    console.log(myResponse);
    this.user = myResponse;
  }
}

window.customElements.define('starter-app', StarterApp);
