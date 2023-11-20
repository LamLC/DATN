app.controller("order-management-ctrl", function($scope, $http, $location) {
	$scope.orders = [];
	$scope.status = [];
	$scope.accounts = [];
	$scope.orderDetails = [];
	$scope.products = [];
	$scope.sta = {};
	
	$scope.initialize = function() {
		// load all roles
		$http.get("/rest/order").then(resp => {
			$scope.orders = resp.data;
		})
		$http.get("/rest/Status").then(resp => {
			$scope.status = resp.data;
		})
		$http.get("/rest/OrderDetails").then(resp => {
			$scope.orderDetails = resp.data;
		})
		$http.get("/rest/accounts").then(resp => {
			$scope.accounts = resp.data;
		})
		$http.get("/rest/products").then(resp => {
			$scope.products = resp.data;
		})
	}
	
	
	  $scope.editor = function(order) {
        $scope.sta = angular.copy(order);
       
    }
	

	$scope.update = function() {
		var order = angular.copy($scope.sta);
		$http.put(`/rest/order/${order.id}`, order).then(resp => {
			var index = $scope.orders.findIndex( f => f.id == order.id);
			$scope.orders[index] = order;
			alert("cap nhap thanh cong");
		}).catch(error => {
			alert("Loi them moi san pham");
			console.log("Error", error);
		})
	}
	
	
	$scope.cart = {
        items: [],
	get amount() {
            return this.items
                .map(item => item.qty * item.price)
                .reduce((total, qty) => total += qty, 0);  
        },
        
        saveToLocalStorage() {
            var json = JSON.stringify(angular.copy(this.items));
            localStorage.setItem("cart", json);
        },
        loadFromLocalStorage() {
            var json = localStorage.getItem("cart");
            this.items = json ? JSON.parse(json) : [];
        }
    }
    $scope.cart.loadFromLocalStorage();
   $scope.order = {
        createDate: new Date(),
        address: "",
        fullname: "Nguyễn Tâm Tâm",
        status: { id: "1", status: "default status" },
        phone: "0345303416",
        account: { username: $("#username").text() },
        get orderDetails() {
            return $scope.cart.items.map(item => {
                return {
                    product: { id: item.id },
                    price: item.price,
                    quantity: item.qty,
                   	
                }
            });
        },

},

	$scope.initialize();
})



/*
//hiển thị bảng thông tin 
function toggleTable() {
	var hiddenTable = document.getElementById('hidddenTable');
	hiddenTable.classList.toggle('hiddden');
}

function hideTable() {
	var hiddenTable = document.getElementById('hidddenTable');
	hiddenTable.classList.add('hiddden');
}

// phân trang
var rowsPerPage = 10;
var rows = document.querySelectorAll('.order-information-list');
var pageCount = Math.ceil(rows.length / rowsPerPage);
var paginationContainer = document.getElementById('pagination');

showPage(1);

function showPage(page) {
	for (var i = 0; i < rows.length; i++) {
		rows[i].style.display = 'none';
	}

	var startIndex = (page - 1) * rowsPerPage;
	var endIndex = startIndex + rowsPerPage;
	for (var j = startIndex; j < endIndex && j < rows.length; j++) {
		rows[j].style.display = 'table-row';
	}

	updatePaginationButtons();
}

function createPaginationButtons(pageCount) {
	for (var i = 1; i <= pageCount; i++) {
		var button = document.createElement('button');
		button.innerText = i;
		button.addEventListener('click', function () {
			showPage(parseInt(this.innerText));
		});

		paginationContainer.appendChild(button);
	}

	updatePaginationButtons();
}

function updatePaginationButtons() {
	if (rows.length <= rowsPerPage) {
		paginationContainer.style.display = 'none';
	} else {
		paginationContainer.style.display = 'block';
	}
}

createPaginationButtons(pageCount);
*/
