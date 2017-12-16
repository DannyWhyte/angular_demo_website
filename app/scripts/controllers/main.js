'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
    .controller('MainCtrl', function($rootScope, $scope, $location, $http, toastr) {
        $scope.moreProds = function(value) {
            // console.log("$scope.styleValue", value)
            $rootScope.styleTypeToSend = value;
            $location.path('/products')
        }
        var wakeUpHeroku = function() {
            // console.log("function called");
            $http.get("https://pppc-api.herokuapp.com/api/ping")
                .then(function(data) {
                    // console.log(data)
                })
                .catch(function(err) {

                })
        }
        wakeUpHeroku()
        $scope.sendEmail = function() {
            // console.log("insidefunc", $scope.contact)
            var apiRequest = [{
                    yourName: $scope.contact.name,
                    email: $scope.contact.email,
                    subject: $scope.contact.subject,
                    message: $scope.contact.message,
                }]
                // console.log('------------------------------------', apiRequest);
            $http.post("https://pppc-api.herokuapp.com/api/sendMailDemo", apiRequest)
                .then(function(data) {
                    // console.log(data)
                    toastr.success(data.data.message, {
                        progressBar: true,
                        closeButton: true
                    });
                })
                .catch(function(err) {
                    toastr.info(err, {
                        progressBar: true,
                        closeButton: true
                    });
                })
            $scope.contact = {};
            // $scope.reply = "Thanks for the message.We will get back to you";
            // $location.path('/products')
        }

        $scope.getLink = function(value) {
            $scope.linkForModal = value;
            // console.log($scope.linkForModal)
        }

        $('.carousel').carousel({
            interval: 4000,
            pause: "false"
        })

    });