
app.controller("product-ctrl", function($scope, $http,$window) {
    $scope.items = [];
    $scope.cates = [];
    $scope.form = {};

    $scope.initialize = function() {
        $http.get("/rest/products").then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.createDate = new Date(item.createDate)
            })
        });
        $http.get("/rest/categories").then(resp => {
            $scope.cates = resp.data;
        });
    }
    $scope.initialize();
    $scope.reset = function() {
        $scope.form = {
            createDate: new Date(),
            image: 'cloud-upload.jpg',
            available: true,


        }
    }
    $scope.edit = function(item) {
        $scope.form = angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show');
    }
    $scope.create = function() {
        var item = angular.copy($scope.form);
        $http.post(`/rest/products`, item).then(resp => {
            resp.data, createDate = new Date(resp.data.createDate);
            $scope.items.push(resp.data);
            $scope.reset();
            alert("them moi thanh cong");
        }).catch(error => {
            alert("Loi them moi san pham");
            console.log("Error", error);
        })
    }
    $scope.update = function(item) {
        var item = angular.copy($scope.form);
        $http.put(`/rest/products/${item.id}`, item).then(resp => {
            var index = $scope.items.findIndex(p => p.id == item.id);
            $scope.items[index] = item;
            alert("cap nhap thanh cong");
        }).catch(error => {
            alert("Loi them moi san pham");
            console.log("Error", error);
        })
    }

$scope.delete = function(item) {
	var item = angular.copy($scope.form);
        if (item.id) {
            $http.delete(`/rest/products/${item.id}`).then(resp => {
                var index = $scope.items.findIndex(p => p.id == item.id);
                if (index !== -1) {
                    $scope.items.splice(index, 1);
                }
                 alert("Xóa thành công");
                 $window.location.reload();
            }) .catch(function(error) {
    console.error('Error:', error);
    console.error('Error Data:', error.data);
            });


        } else {
             $scope.showAlert("Vui Lòng Chọn Sản Phẩm Để Xóa", "error", false);
            
        }
    };

    $scope.imageChanged = function(files) {
        var data = new FormData();
        data.append('file', files[0]);
        $http.post('/rest/upload/images', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(resp => {
            $scope.form.image = resp.data.name;
        }).catch(error => {
            alert("Loi upload");
            console.log("Error", error);
        })
    }
    
    
    
    $scope.pager = {
        page: 0,
        size: 10,
        get items() {
            var start = this.page * this.size;
            return $scope.items.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1 * $scope.items.length / this.size);
        },
        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        }
    }
    
     $scope.createCategory = function () {
        var newCategory = {
            name: $scope.newCategory
        };

        $http.post(`/rest/categories`, newCategory).then(function (resp) {
            $scope.cates.push(resp.data);
            $scope.newCategory = ''; // Reset giá trị mới sau khi thêm
            alert("Thêm mới danh mục thành công");
        }).catch(function (error) {
            alert("Lỗi thêm mới danh mục");
            console.error("Error", error);
        });
    };

    $scope.updateCategory = function () {
        var updatedCategory = angular.copy($scope.form);

        $http.put(`/rest/categories/${updatedCategory.id}`, updatedCategory).then(function (resp) {
            var index = $scope.cates.findIndex(c => c.id === updatedCategory.id);
            if (index !== -1) {
                $scope.cates[index] = updatedCategory;
            }
            alert("Cập nhật danh mục thành công");
        }).catch(function (error) {
            alert("Lỗi cập nhật danh mục");
            console.error("Error", error);
        });
    };

    $scope.deleteCategory = function () {
        var categoryToDelete = angular.copy($scope.form);

        if (categoryToDelete.id) {
            $http.delete(`/rest/categories/${categoryToDelete.id}`).then(function (resp) {
                var index = $scope.cates.findIndex(c => c.id === categoryToDelete.id);
                if (index !== -1) {
                    $scope.cates.splice(index, 1);
                }
                alert("Xóa danh mục thành công");
            }).catch(function (error) {
                alert("Lỗi xóa danh mục");
                console.error("Error", error);
            });
        } else {
            alert("Vui lòng chọn danh mục để xóa");
        }
    };
});