const app = angular.module("shopping-cart-app", []);

app.controller("shopping-cart-ctrl", function($scope, $http) {
	$scope.getTotalPrice = function() {
                var totalPrice = 0;
                for (var i = 0; i < $scope.cart.items.length; i++) {
                    var item = $scope.cart.items[i];
                    totalPrice += item.qty * item.price;
                }
                return totalPrice.toFixed(2);
            };
    $scope.getsalePrice = function(id) {
  var item = $scope.cart.items.find(function(item) {
    return item.id == id;
  });

  if (item) {
    var salePrice = ((item.price - item.pricesale) / item.price) * 100;
    return salePrice;
  } else {
    return null;
  }
};
        
    $scope.cart = {
        items: [],
        add(id) {
            var item = this.items.find(item => item.id == id );
            if (item) {
                item.qty++;
                alert("Sản phẩm đã được thêm vào giỏ hàng");
                this.saveToLocalStorage();
            } else {
                $http.get(`/rest/products/${id}`).then(resp => {
                    resp.data.qty = 1;
                    this.items.push(resp.data);
                    this.saveToLocalStorage();
                })
            }
        },
        
        check(){
			if (this.items.length === 0) {
			  alert("Không có sản phẩm nào trong giỏ hàng. Vui lòng thêm sản phẩm vào giỏ hàng trước khi mua hàng.");
			  return;
			
			}else{
				location.href = "/order/checkout";
			}
		},
        remove(id) {
            var index = this.items.findIndex(item => item.id == id );
            this.items.splice(index, 1);
            this.saveToLocalStorage();
        },
        clear() {
            this.items = [];
            this.saveToLocalStorage();
        },
        
		doc(){
			var submit = document.getElementById("myForm").addEventListener("submit", function(event) {
		  event.preventDefault();
		  redirectToPage();
		});
		},
        amt_of(item) {},
        get count() {
            return this.items
                .map(item => item.qty)
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
    $scope.feedback = {
    fullname: "",
    email: "",
    phone_number: "",
    pubjectname: "",
    note: "",
    savefeedback() {
        var feedbackData = {
            fullname: this.fullname,
            email: this.email,
            phone_number: this.phone_number,
            pubjectname: this.pubjectname,
            note: this.note
        };
        $http.post("/rest/feedback", feedbackData).then(resp => {
            alert("Bạn đã phản hồi thành công");
        }).catch(error => {
            alert("Phản hồi lỗi");
            console.log(error);
        });
    }
};
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
        history(){
			location.href = "/order/detail/" + resp.data.id;
		},
        purchase() {
            var order = angular.copy(this);
            $http.post("/rest/orders", order).then(resp => {
                alert("Bạn đã đặt hàng thành công");
                $scope.cart.clear();
                location.href = "/order/detail/" + resp.data.id;
                
            }).catch(error => {
                alert("Đặt hàng lỗi");
                console.log(error)
            })
        },
        redirectToPage() {
  var gender = document.querySelector('input[name="gender"]:checked');
  if (gender) {
    if (gender.value === "momo") {
      location.href = "/pay/momo/mail";
    } else if (gender.value === "nganhang") {
      location.href = "/pay/thanhtoan";
    } else if (gender.value === "nhanhang") {
     	this.purchase();
    }
  }else{
	   alert("Vui lòng chọn phương thanh toán");
  }
},

	
    }
       
   
})
var address = $scope.order.address;
  console.log(address);

    
   function sortProductsByPriceDescending() {
  // Lấy danh sách các sản phẩm
  var productList = document.getElementById("product-list");
  var products = productList.getElementsByClassName("product-box");

  // Chuyển danh sách sản phẩm thành mảng để có thể sắp xếp
  var productsArray = Array.prototype.slice.call(products);

  // Sắp xếp thứ tự sản phẩm dựa trên giá, từ cao đến thấp
  productsArray.sort(function(a, b) {
    var priceA = parseFloat(a.getElementsByClassName("car-price")[0].innerHTML);
    var priceB = parseFloat(b.getElementsByClassName("car-price")[0].innerHTML);
    return priceB - priceA;
  });

  // Xóa danh sách hiện tại
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }

  // Thêm lại danh sách sản phẩm đã sắp xếp
  for (var i = 0; i < productsArray.length; i++) {
    productList.appendChild(productsArray[i]);
  }
}
    