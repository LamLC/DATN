
app.controller("staff-ctrl", function($scope, $http , $location ,  $window) {
    $scope.to = {};
    $scope.stafs = []; 

    $scope.initialize = function() {
        $http.get("/rest/staf?staf=true").then(resp => {
            $scope.stafs = resp.data; 
        });
       
    }

    
    
    $scope.createStaf = function() {
        $http.post("/rest/staf", $scope.to).then(resp => {
            $scope.stafs.push(resp.data);
            alert("Tạo mới Nhân Viên thành công");
        }).catch(error => {
            alert("Tạo mới Nhân Viên thất bại");
            console.log("Error", error);
        });
	$scope.to = {};
      
    };

     $scope.updateStaf = function() {
     console.log("Updating staff:", $scope.to);
    var itemCopy = angular.copy($scope.to);
    console.log("Item copy:", itemCopy);
    $http.put(`/rest/staf/${itemCopy.username}`, itemCopy).then(resp => {
        var index = $scope.stafs.findIndex(s => s.username == itemCopy.username);
        if (index !== -1) {
            $scope.stafs[index] = resp.data;
        }
        alert("Cập nhật Nhân Viên thành công");
    }).catch(error => {
        alert("Cập nhật Nhân Viên thất bại");
        console.log("Error", error);
    });
   $scope.to = {};
};
    
    
    
      $scope.deleteStaf = function() {
        if ($scope.to.username) {
            $http.delete(`/rest/staf/${$scope.to.username}`).then(resp => {
                var index = $scope.stafs.findIndex(s => s.username == $scope.to.username);
                if (index !== -1) {
                    $scope.stafs.splice(index, 1);
                }
                alert("Xóa Nhân Viên thành công");
                  $window.location.reload();
            }).catch(error => {
                alert("Xóa Nhân Viên thất bại");
                console.log("Error", error);
            });
			
        } else {
            alert("Vui lòng chọn một Nhân Viên để xóa");
            
        }
        
    };
	
	$scope.resetStaf = function() {
        $scope.to = {}; 
       
    };
    
 
    $scope.editStaf = function(item) {
        $scope.to = angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show');
    }
	
    
    $scope.initialize();
});