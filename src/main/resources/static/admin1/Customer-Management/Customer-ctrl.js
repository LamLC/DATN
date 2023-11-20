        
// agulajs 

app.controller("Customer-ctrl", function($scope, $http, $location ,  $window) {
    $scope.custs = [];
    $scope.isCreating = true; 
	

    $scope.initialize = function() {
       
        $http.get("/rest/cust?cust=true").then(resp => {
            $scope.custs = resp.data;
        });
        
    };

	
   $scope.showAlert = function(message, type, reload) {
        var alertElement = document.getElementById('custom-alert');
        alertElement.innerHTML = message;


        if (type === 'success') {
            alertElement.style.backgroundColor = '#28a745'; 
        } else if (type === 'error') {
            alertElement.style.backgroundColor = '#dc3545'; 
        }

        alertElement.style.display = 'block';

        setTimeout(function() {
            alertElement.style.display = 'none';
            if (reload) {
                $window.location.reload();
            }
        }, 1500);
    };
  

    $scope.createCustomer = function() {
        $http.post("/rest/cust", $scope.selectedCustomer).then(resp => {
            $scope.custs.push(resp.data);
            $scope.showAlert("Tạo mới khách hàng thành công", "success", true);
        }).catch(error => {
              $scope.showAlert("Tạo mới khách hàng thất bại", "error", false);
            console.log("Error", error);
        });


    };

    $scope.updateCustomer = function() {
        $http.put(`/rest/cust/${$scope.selectedCustomer.username}`, $scope.selectedCustomer).then(resp => {
            var index = $scope.custs.findIndex(c => c.username == $scope.selectedCustomer.username);
            if (index !== -1) {
                $scope.custs[index] = resp.data;
            }
            $scope.showAlert("Cập nhật khách hàng thành công", "success", true);
        }).catch(error => {
             $scope.showAlert("Cập nhật khách hàng thất bại", "error", false);
            console.log("Error", error);
        });


    };

    $scope.deleteCustomer = function() {
        if ($scope.selectedCustomer.username) {
            $http.delete(`/rest/cust/${$scope.selectedCustomer.username}`).then(resp => {
                var index = $scope.custs.findIndex(c => c.username == $scope.selectedCustomer.username);
                if (index !== -1) {
                    $scope.custs.splice(index, 1);
                }
                $scope.showAlert("Xóa khách hàng thành công", "success", true);
            }).catch(error => {
                $scope.showAlert("Xóa khách hàng Không thành công", "error", false);
                console.log("Error", error);
            });


        } else {
             $scope.showAlert("Vui Lòng Chọn Khách hàng Để Xóa", "error", false);
            
        }
    };

    $scope.resetForm = function() {

        $scope.selectedCustomer = {};
        document.getElementById("infoForm-mangement").reset();
    };

    $scope.editCustomer = function(customer) {

        $scope.selectedCustomer = angular.copy(customer);
        $scope.isCreating = false; 
    };

    $scope.initialize();
    
    

});




