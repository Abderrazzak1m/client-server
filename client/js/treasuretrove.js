var app = angular.module("treasureTrove", []);
app.controller("mainController", function ($scope, $http) {
    $scope.inventory = [];
    $scope.newBids = [];
    // GET list of items and latest bids
    $scope.retrieveItemList = () => {
        console.log("$scope.retrieveItemList() called");
        $http.get("http://localhost:3000/list")
            .then((response) => {
            $scope.inventory = response.data;
            console.log(response.data);
        })
            .catch((error) => {
            if (error.status != -1) {
                console.log("Server responsed with an error: " + error.status + " : " + error.data);
                alert("Server responsed with an error: " + error.status + " : " + error.data);
            }
        });
    };
    // POST a new bid
    // format example: http://localhost:3000/bid?id=a00011-11&newbid=8000.9
    $scope.sendBid = (itemId, newBid, newBidUser) => {
        console.log("$scope.sendBid(" + itemId + ", " + newBid + ", " + newBidUser + ") called");
        $http.post("http://localhost:3000/bid?id=" + itemId + "&newbid=" + newBid + "&newbiduser=" + newBidUser)
            .then((response) => {
            $scope.retrieveItemList();
            console.log("The server accepted your bid");
        })
            .catch((error) => {
            if (error.status != -1) {
                console.log("Server responsed with an error: " + error.status + " : " + error.data);
                alert("Server responsed with an error: " + error.status + " : " + error.data);
            }
        });
    };
    $scope.retrieveItemList();
    setInterval($scope.retrieveItemList, 5000);
});
