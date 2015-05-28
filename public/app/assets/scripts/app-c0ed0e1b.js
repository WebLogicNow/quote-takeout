"use strict";angular.module("valueMash",["ngMaterial","ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ngStorage","toaster","angular-cache","ng-token-auth"]).config(["$httpProvider","$authProvider","$locationProvider","API_URL",function(t,e,o,a){o.html5Mode(!1),o.hashPrefix("!"),"#%21"===window.location.hash.substr(0,4)&&window.location.replace(window.location.href.split("#%21").join("#!")),t.defaults.withCredentials=!0,e.configure({apiUrl:a})}]).run(["$rootScope","Notifier","$state","ENV","API_URL",function(t,e,o,a,n){t.ENV=a,t.API_URL=n,t.$on("$stateChangeError",function(){e.show("Please log in"),o.go("layout_guest.login")})}]),angular.module("valueMash").controller("ValueShowCtrl",["$scope","API","$stateParams","Notifier",function(t,e,o,a){t.value={},e.values.get(o.valueId).then(function(e){console.log("resp",e),t.value=e.data.value}),t.updateValue=function(o){e.values.update(o.id,o).then(function(e){200===e.status&&(a.show("Success: Value updated"),t.value=e.data.value)})}}]),angular.module("valueMash").controller("ValueCtrl",["$scope","API","Notifier",function(t,e,o){t.values=[],t.newValue={},e.values.all().then(function(e){t.values=e.data.values}),t.createValue=function(a){e.values.create(a).then(function(e){200===e.status&&(o.show("Success: Added new value"),t.newValue={},t.values.push(e.data.value))})},t.resetForm=function(t){t&&(t.$setPristine(),t.$setUntouched())}}]),angular.module("valueMash").controller("UserCtrl",["$scope","API",function(t,e){t.users={},e.users.all().then(function(e){console.log("resp",e),t.users=e.data.users})}]),angular.module("valueMash").controller("LayoutGuestCtrl",["$scope","$rootScope","$state",function(t,e,o){t.$state=o,t.layoutModel={}}]),angular.module("valueMash").controller("LayoutAppCtrl",["$scope","$rootScope","$state",function(t,e,o){t.$state=o,t.layoutModel={}}]),angular.module("valueMash").controller("LoginCtrl",["$scope","API","$mdDialog",function(t,e,o){t.modalTest=function(t){o.show({controller:"changePasswordModalCtrl",templateUrl:"modules/guest/_change_password.modal.html",targetEvent:t})}}]),angular.module("valueMash").controller("DashboardCtrl",["$scope",function(){}]),angular.module("valueMash").config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/login"),t.state("layout_guest",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_guest.html",controller:"LayoutGuestCtrl"}}}).state("layout_guest.login",{url:"/login",templateUrl:"modules/guest/login.html",controller:"LoginCtrl"}).state("layout_app",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_app.html",controller:"LayoutAppCtrl"},"sidebar@layout_app":{templateUrl:"modules/layout/_layout_app_sidebar.html",controller:"LayoutAppCtrl"}},resolve:{auth:["$auth",function(t){return t.validateUser()}]}}).state("layout_app.dashboard",{url:"/dashboard",templateUrl:"modules/dashboard/dashboard.html",controller:"DashboardCtrl"}).state("layout_app.users",{url:"/users",templateUrl:"modules/user/user.html",controller:"UserCtrl"}).state("layout_app.values",{url:"/values",templateUrl:"modules/value/value.html",controller:"ValueCtrl"}).state("layout_app.values.show",{url:"/{valueId:[0-9]+}",templateUrl:"modules/value/value.show.html",controller:"ValueShowCtrl"})}]),angular.module("valueMash").constant("ENV","production").constant("API_URL",""),angular.module("valueMash").run(["$rootScope","$mdDialog",function(t,e){t.$on("auth:registration-email-success",function(){console.log("auth:registration-email-success")}),t.$on("auth:registration-email-error",function(){console.log("auth:registration-email-error")}),t.$on("auth:email-confirmation-success",function(){console.log("auth:email-confirmation-success")}),t.$on("auth:email-confirmation-error",function(){console.log("auth:email-confirmation-error")}),t.$on("auth:password-reset-request-success",function(){console.log("auth:password-reset-request-success")}),t.$on("auth:password-reset-request-error",function(){console.log("auth:password-reset-request-error")}),t.$on("auth:password-reset-confirm-error",function(){console.log("auth:password-reset-confirm-error")}),t.$on("auth:password-reset-confirm-success",function(){console.log("auth:password-reset-confirm-success"),e.show({controller:"changePasswordModalCtrl",templateUrl:"modules/guest/_change_password.modal.html"})}),t.$on("auth:password-change-success",function(){console.log("auth:password-change-success")}),t.$on("auth:password-change-error",function(){console.log("auth:password-change-error")}),t.$on("auth:logout-success",function(){console.log("auth:logout-success")}),t.$on("auth:logout-error",function(){console.log("auth:logout-error")}),t.$on("auth:account-update-success",function(){console.log("auth:account-update-success")}),t.$on("auth:account-update-error",function(){console.log("auth:account-update-error")}),t.$on("auth:account-destroy-success",function(){console.log("auth:account-destroy-success")}),t.$on("auth:account-destroy-error",function(){console.log("auth:account-destroy-error")}),t.$on("auth:validation-success",function(){console.log("auth:validation-success")}),t.$on("auth:validation-error",function(){console.log("auth:validation-error")}),t.$on("auth:validation-expired",function(){console.log("auth:validation-expired")}),t.$on("auth:login-success",function(){console.log("auth:login-success")}),t.$on("auth:login-error",function(){console.log("auth:login-error")}),t.$on("auth:registration-email-success",function(){console.log("auth:registration-email-success")}),t.$on("auth:registration-email-error",function(){console.log("auth:registration-email-error")})}]).controller("changePasswordModalCtrl",["$scope","$mdDialog","$rootScope",function(t,e,o){t.updatePassword=function(t){o.updatePassword(t)},t.cancel=function(){e.hide()}}]),angular.module("valueMash").service("User",function(){var t={};return t}),angular.module("valueMash").service("Notifier",["$mdToast",function(t){var e={show:function(e){t.show(t.simple().content(e).position("top left").hideDelay(1e3))}};return e}]),angular.module("valueMash").service("API",["$http","$auth","Notifier","API_URL",function(t,e,o,a){var n=function(e){e=angular.extend({auth:!0,method:"",url:""},e);var o={method:e.method,url:a+"/"+e.url,data:e.data||null};return t(o)},l={users:{all:function(){return n({method:"GET",url:"users.json"})}},values:{all:function(){return n({method:"GET",url:"values.json"})},create:function(t){return n({method:"POST",url:"values.json",data:t})},get:function(t){return n({method:"GET",url:"values/"+t+".json"})},update:function(t,e){return n({method:"PUT",url:"values/"+t+".json",data:e})}}};return l}]),angular.module("valueMash").run(["$templateCache",function(t){t.put("modules/dashboard/dashboard.html",'<h2>Dashboard!</h2><md-button class="contact" ui-sref="layout_guest.login" aria-label="Log in"><md-tooltip>Contact Bob</md-tooltip>Log in</md-button>'),t.put("modules/layout/_layout_app_sidebar.html",'<md-toolbar class="md-whiteframe-z1"><h1>Sidebar</h1></md-toolbar><md-list><md-list-item><md-button ui-sref="layout_app.dashboard">Dashboard</md-button></md-list-item><md-list-item><md-button ui-sref="layout_app.users">Users</md-button></md-list-item><md-list-item><md-button ui-sref="layout_app.values">Values</md-button></md-list-item></md-list>'),t.put("modules/layout/layout_app.html",'<md-sidenav ui-view="sidebar" class="site-sidenav md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-sm\')"></md-sidenav><div flex="" layout="column" tabindex="-1" role="main" class="md-whiteframe-z2"><md-toolbar layout="row" class="md-whiteframe-z1"><md-button class="menu" hide-gt-sm="" ng-click="ul.toggleList()" aria-label="Show User List">Menu</md-button><h1>Layout_app.html <i class="fa fa-user"></i></h1></md-toolbar><md-content flex="" id="content" ui-view=""><p>ui-view</p></md-content></div>'),t.put("modules/layout/layout_guest.html",'<div flex="" layout="column" tabindex="-1" role="main" class="md-whiteframe-z2"><md-toolbar layout="row" class="md-whiteframe-z1" layout-padding=""><h1>Layout guest - ENV: {{ ENV }}, API_URL: {{ API_URL }}</h1></md-toolbar><md-content id="content" ui-view="" layout-padding=""></md-content><md-content layout="row" id="footer" layout-padding=""><p>Footer.</p></md-content></div>'),t.put("modules/guest/_change_password.modal.html",'<md-dialog ng-style="{width: \'400px\'}" class="account-type-change-modal"><md-dialog-content class="sticky-container"><md-subheader class="md-sticky-no-effect"><div class="md-headline">Set new Password</div></md-subheader><div class="flex-container"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate"><md-input-container><label>Password</label> <input ng-model="newPass.password" type="password" required="required"></md-input-container><md-input-container><label>Password Confirmation</label> <input ng-model="newPass.password_confirmation" type="password" required="required"></md-input-container><md-button ng-disabled="resetPasswordForm.$invalid" class="submit-btn md-raised md-primary">Submit</md-button></form></div></md-dialog-content><div layout="row" class="md-actions"><md-button ng-click="cancel()" type="button" class="md-primary">Cancel</md-button></div></md-dialog>'),t.put("modules/guest/login.html",'<h3>Login!</h3><pre>User: {{ user | json }}</pre><md-button ng-click="signOut()" ng-disabled="!user.signedIn">Sign out</md-button><md-content layout="row"><md-button ui-sref="layout_app.dashboard" aria-label="Log in" class="contact"><md-tooltip>Dashboard</md-tooltip>Go to Dashboard</md-button><md-button ng-click="modalTest($event)">Password change modal</md-button></md-content><form layout="row" name="loginForm" ng-submit="submitLogin(credentials)" novalidate="novalidate"><md-content layout-padding="layout-padding"><div layout="row"><md-input-container><label>Email</label> <input ng-model="credentials.email" required="required"></md-input-container><md-input-container><label>Password</label> <input ng-model="credentials.password" type="password" required="required"></md-input-container></div><md-button ng-disabled="loginForm.$invalid" class="submit-btn md-raised md-primary">Log In</md-button></md-content></form><form layout="row" name="signupForm" ng-submit="submitRegistration(signup)" novalidate="novalidate"><md-content layout-padding="layout-padding"><div layout="row"><md-input-container><label>Email</label> <input ng-model="signup.email" required="required"></md-input-container><md-input-container><label>Password</label> <input ng-model="signup.password" type="password" required="required"></md-input-container><md-input-container><label>Password Confirmation</label> <input ng-model="signup.password_confirmation" type="password" required="required"></md-input-container></div><md-button ng-disabled="signupForm.$invalid" class="submit-btn md-raised md-primary">Sign up</md-button></md-content></form><form layout="row" name="resetPassForm" ng-submit="requestPasswordReset(reset)" novalidate="novalidate"><md-content layout-padding="layout-padding"><div layout="row"><md-input-container><label>Email</label> <input ng-model="reset.email" required="required"></md-input-container></div><md-button ng-disabled="resetPassForm.$invalid" class="submit-btn md-raised md-primary">Request password reset</md-button></md-content></form>'),t.put("modules/user/user.html",'<h2>Users</h2><div ng-repeat="user in users" layout="row"><div layout-padding="layout-padding"><i ng-if="user.admin" class="fa fa-star"></i>{{ user.id }}</div><div layout-padding="layout-padding">{{ user.email }}</div><div layout-padding="layout-padding">{{ user.created_at }}</div></div>'),t.put("modules/value/value.html",'<div ui-view=""><h2>Values</h2><table class="table"><tr class="header"><th width="20%">ID</th><th>Name</th><th>Description</th></tr><tr ng-repeat="value in values" class="body"><td>{{ value.id }}</td><td><a href="" ui-sref="layout_app.values.show({valueId: value.id})">{{ value.name }}</a></td><td>{{ value.description }}</td></tr></table><hr><form layout="row" ng-if="user.admin" name="newValueForm" ng-submit="createValue(newValue);resetForm(newValueForm)" novalidate="novalidate"><md-content layout-padding="layout-padding"><div layout="row"><md-input-container><label>Name</label> <input ng-model="newValue.name" required="required"></md-input-container><md-input-container><label>Description</label> <input ng-model="newValue.description" required="required"></md-input-container></div><md-button ng-disabled="newValueForm.$invalid" class="submit-btn md-raised md-primary">Create new Value</md-button></md-content></form></div>'),t.put("modules/value/value.show.html",'<h2><a href="" ui-sref="layout_app.values">Values</a>- {{ value.name }}</h2><form layout="row" ng-if="user.admin" name="updateValueForm" ng-submit="updateValue(value)" novalidate="novalidate"><md-content layout-padding="layout-padding"><div layout="row"><md-input-container><label>Name</label> <input ng-model="value.name" required="required"></md-input-container><md-input-container><label>Description</label> <input ng-model="value.description" required="required"></md-input-container></div><md-button ng-disabled="updateValueForm.$invalid" class="submit-btn md-raised md-primary">Update Value</md-button></md-content></form>')}]);