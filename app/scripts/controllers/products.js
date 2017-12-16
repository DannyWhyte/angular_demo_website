angular.module('angularApp')
    .controller('productsctrl', function($scope, $rootScope, $http, _, $window) {
        $rootScope.nav = true;
        $scope.my = 'Test'
        $scope.gridOptions = {}
        $scope.searchKeyword = '';
        $scope.showSearchFromKey = false;
        $scope.allStyles = function() {
            $http.get("config/products.json")
                .then(function(data) {
                    $scope.noData = '';
                    $scope.hidePagination = false;
                    $scope.searchKeyword = '';
                    $scope.showSearchFromKey = false;
                    $scope.currentPage = 0
                    $scope.data = data.data
                    $scope.listName = "All Types"
                    var arrToJsonStyle = [];
                    var arrToJsonSize = [];
                    var arrToJsoncompany = [];
                    var arrToJsonMaterial = [];
                    var styles = _.map($scope.data, function(num) { return num.style });
                    $scope.styles = _.uniq(styles);
                    _.each($scope.styles, function(num) {
                        var fetchJson = _.where($scope.data, { style: num });
                        var length = fetchJson.length
                        var json = { styles: num, length: length }
                        arrToJsonStyle.push(json)
                    })
                    $scope.finalStyles = arrToJsonStyle
                    $scope.allStylesLength = data.data.length
                    var Size = _.map($scope.data, function(num) { return num.size });
                    var uniqSize = _.uniq(Size);
                    _.each(uniqSize, function(num) {
                        var jsons = { size: num }
                        arrToJsonSize.push(jsons)
                    })
                    $scope.arrToJsonSize = arrToJsonSize;

                    var company = _.map($scope.data, function(num) { return num.company });
                    var uniqcompany = _.uniq(company);
                    _.each(uniqcompany, function(num) {
                        var jsons = { company: num }
                        arrToJsoncompany.push(jsons)
                    })
                    $scope.arrToJsoncompany = arrToJsoncompany;
                    console.log("dddddd", arrToJsoncompany)

                    var Material = _.map($scope.data, function(num) { return num.material });
                    var uniqMaterial = _.uniq(Material);
                    _.each(uniqMaterial, function(num) {
                        var jsons = { material: num }
                        arrToJsonMaterial.push(jsons)
                    })
                    $scope.arrToJsonMaterial = arrToJsonMaterial;

                    $scope.pageSize = 5;
                    // $scope.data = [];
                    $scope.numberOfPages = function() {
                            return Math.ceil($scope.data.length / $scope.pageSize);
                        }
                        // console.log(JSON.stringify(arrToJsonStyle))

                    // console.log(JSON.stringify(data.data))
                })
        }

        $scope.fromStyles = function(value) {
            $scope.noData = "";
            $scope.hidePagination = false;
            $scope.showSearchFromKey = false;
            $scope.searchKeyword = '';
            // console.log(value)
            $http.get("config/products.json")
                .then(function(data) {
                    $scope.currentPage = 0
                    $scope.allData = data.data
                    $scope.listName = value
                    var selected = _.where($scope.allData, { style: value });
                    $scope.data = selected
                    if (selected.length <= 5) {
                        $scope.hidePagination = true;
                    }
                    $scope.showSearchFromKey = "";
                    $scope.pageSize = 5;
                    // $scope.data = [];
                    $scope.numberOfPages = function() {
                            return Math.ceil($scope.data.length / $scope.pageSize);
                        }
                        // console.log(selected.length)

                    // console.log(JSON.stringify(data.data))
                })
        }
        if ($rootScope.styleTypeToSend == 'allStyles') {
            $scope.allStyles()
        } else if ($rootScope.styleTypeToSend == undefined) {
            $scope.allStyles()
        } else {
            $scope.allStyles()
            $scope.fromStyles($rootScope.styleTypeToSend)
        }
        $scope.searchFromKey = function() {
            $scope.searchKeyword = '';
            $scope.currentPage = 0
            $scope.showSearchFromKey = true;
            $http.get("config/products.json")
                .then(function(data) {
                    $scope.data = data.data
                    $scope.listName = "Find By Keyword"
                    $scope.pageSize = 5;
                    // $scope.data = [];
                    $scope.pageSize = 100;
                    // $scope.data = [];
                    $scope.numberOfPages = function() {
                        return Math.ceil($scope.data.length / $scope.pageSize);
                    }
                    $scope.hidePagination = true;
                    $scope.currentPage = 0
                })

        }
        $scope.searchFromSpec = function() {
            $scope.searchKeyword = '';
            $scope.showSearchFromKey = false;
        }
        $scope.searchSpecs = function() {
            $scope.showSearchFromKey = false;
            $scope.searchKeyword = '';
            $scope.searchField.style = $scope.searchField.style || null;
            $scope.searchField.size = $scope.searchField.size || null;
            $scope.searchField.company = $scope.searchField.company || null;
            $scope.searchField.material = $scope.searchField.material || null;
            // console.log(JSON.stringify($scope.searchField))
            $http.get("config/products.json")
                .then(function(data) {
                    $scope.currentPage = 0
                    $scope.allData = data.data
                    var style = $scope.searchField.style == null ? null : $scope.searchField.style.styles;
                    var size = $scope.searchField.size == null ? null : $scope.searchField.size.size;
                    var company = $scope.searchField.company == null ? null : $scope.searchField.company.company;
                    var material = $scope.searchField.material == null ? null : $scope.searchField.material.material;
                    var specsArray = [];
                    specsArray.push(style, size, company, material)

                    var BODY = {
                        "recipients": {
                            "values": []
                        }
                    }

                    var values = [],
                        names = specsArray;
                    var one = specsArray[0];
                    var two = specsArray[1];
                    var three = specsArray[2];
                    var four = specsArray[3];
                    // console.log(one, two, three, four)
                    for (var ln = 0; ln < names.length; ln++) {
                        // console.log(ln)
                        if (ln == 0 && one != null) {
                            var item1 = {
                                //"person": { "_path": "/people/"+names[ln] }
                                "style": one
                            };
                            values.push(item1);
                        }
                        if (ln == 1 && two != null) {
                            var item1 = {
                                //"person": { "_path": "/people/"+names[ln] }
                                "size": two
                            };
                            values.push(item1);
                        }
                        if (ln == 2 && three != null) {
                            var item1 = {
                                //"person": { "_path": "/people/"+names[ln] }
                                "company": three
                            };
                            values.push(item1);
                        }
                        if (ln == 3 && four != null) {
                            var item1 = {
                                //"person": { "_path": "/people/"+names[ln] }
                                "material": four
                            };
                            values.push(item1);
                        }

                    }
                    $.extend(BODY.recipients.values, values);
                    // console.log(JSON.stringify(BODY.recipients.values));

                    $scope.myFunction = function() {
                        var str = JSON.stringify(BODY.recipients.values);
                        var res = str.replace(/},{/g, ",");
                        var singleJson = res;
                        return singleJson
                    }
                    var a = $scope.myFunction()
                    var b = JSON.parse(a)
                        // console.log("-------------------", b);


                    $scope.listName = "Search Result";
                    var selected = _.where($scope.allData, b[0]);
                    // console.log(JSON.stringify(selected))
                    if (_.isEmpty(selected)) {
                        $scope.data = "";
                        $scope.noData = "No Such Product Found"
                        $scope.hidePagination = true;
                    } else {
                        $scope.data = selected;
                        $scope.noData = "";
                        $scope.hidePagination = true;
                        if (selected.length >= 5) {
                            $scope.hidePagination = false;
                        }

                    }
                })
            $scope.pageSize = 5;
            // $scope.data = [];
            $scope.numberOfPages = function() {
                return Math.ceil($scope.data.length / $scope.pageSize);
            }
        }

        $scope.valForModal = function(value) {
            // console.log(value)
            $http.get("config/products.json")
                .then(function(data) {
                    $scope.allData = data.data
                    var selected = _.where($scope.allData, { id: value });
                    $scope.model = selected
                    $scope.showSearchFromKey = "";
                    // console.log(JSON.stringify(selected))

                    // console.log(JSON.stringify(data.data))
                })
        }


        $scope.openWindow = function(value) {
                console.log("sssssssssssssss", value)
                $window.open(value);
            }
            // console.log($rootScope.styleTypeToSend)
            // $scope.currentPage = 0;

        // for (var i=0; i<45; i++) {
        //     $scope.data.push("Item "+i);
        // }

    });