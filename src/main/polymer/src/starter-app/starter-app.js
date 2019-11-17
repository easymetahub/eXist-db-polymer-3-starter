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
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-input/paper-input.js';

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
        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
        section {
          background-color: lightgrey;
          height: 100%;
          overflow: auto;
        }
        #username {
          color: white;
        }
        app-toolbar {
          background-color: grey;
          color: #fff;
        }
      </style>
      <iron-location id="sourceLocation" query="{{query}}" hash="{{hash}}"></iron-location>
      <iron-query-params id="sourceParams" params-string="{{query}}" params-object="{{params}}"></iron-query-params>
      <iron-ajax auto="true"  id="whoAmI"
        url="modules/who-am-i.xq"
        handle-as="json"
        on-response="handleUserData"></iron-ajax>
      <iron-ajax id="loginAction" 
        url="modules/who-am-i.xq"  
        handle-as="json"
        on-response="_onLoginResponse"></iron-ajax>
      <paper-dialog id="login">
        <h2>Login</h2>
        <paper-input label="user" value="{{logindata.user}}"></paper-input>
        <paper-input label="password" value="{{logindata.password}}" type="password"></paper-input>
        <div class="buttons">
          <paper-button dialog-dismiss>Close</paper-button>
          <paper-button on-click="_attemptUserLogin">Login</paper-button>
        </div>
      </paper-dialog>
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
            <paper-button on-click="_openLoginDialog" raised>Hello [[user.name]]</paper-icon-button>
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
      user: { type: Object, notify: true },
      logindata: { type: Object, notify: true, value: { user: '', password: '' } }
    };
  }

  _openLoginDialog() {
    this.$.login.open();
  }

  _attemptUserLogin() {
    let a = this.logindata;
    this.$.loginAction.params = this.logindata;
    this.$.loginAction.generateRequest();
  }

  _onLoginResponse(e) {
    var resp = e.detail.response;
    if (resp.error == false) {
      this.user = resp;
      this.$.login.close();
    } else {
      alert('error');
    }
  }

  handleUserData(request){
    var myResponse = request.detail.response;
    console.log(myResponse);
    this.user = myResponse;
  }
}

window.customElements.define('starter-app', StarterApp);
