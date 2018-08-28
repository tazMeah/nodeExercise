"use strict"
const accessories = {
  template: `
  <!-- when you click the button that says "Get Accessories", do the function in the controller below that is called "getAccessories()" -->
  <button ng-click="$ctrl.getAccessories();">Get Accessories</button>
  <!--when you click the button that is in this form -->
  <form ng-submit="$ctrl.postAccessory($ctrl.newAccessory);">
    <input type="text" ng-model="$ctrl.newAccessory.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newAccessory.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newAccessory.material" placeholder="Material">
    <input type="text" ng-model="$ctrl.newAccessory.price" placeholder="Price">
    <button>Add Accessory</button>
  </form>
  <p ng-repeat="accessory in $ctrl.accessoriesList track by $index">{{ accessory }}
    <button ng-click="$ctrl.deleteAccessory($ctrl.accessoriesList[$index].id);">X</button>
    <!-- when you click the button, do the updateAccessory function in the controller below.-->
    <button ng-click="$ctrl.updateAccessory($ctrl.accessoriesList[$index].id, $ctrl.newAccessory);">Update</button>
  </p>
  `,
  controller: function($http) {
    const vm = this;
    vm.getAccessories = function () {
     $http({
        url: "/api/shop/accessories",
        method: "GET"                 
     }).then((response) => {
        vm.accessoriesList = response.data;         
     })
    }
    vm.deleteAccessory = function (index) {
        $http({
            url: "/api/shop/accessories/" + index,
            method: "DELETE"
        }).then(function (response) {
            vm.accessoriesList = response.data;
        })                
    }
    
    vm.updateAccessory = (index, newAccessory) => {
        $http({
            url: "/api/shop/accessories/" + index,
            method : "PUT",
            data: newAccessory                                
        }).then((response) => { 
            vm.accessoriesList = response.data                                          
        });                                                                
    }        

    vm.postAccessory = (newAccessory) => {
        $http({
            url: "api/shop/accessories/",
            method: "POST",
            data: newAccessory                                                                                                                        
        }).then((response) => {
            vm.accessoriesList = response.data;                        
        });                
    }
  }
}

angular.module("App").component("accessories", accessories);