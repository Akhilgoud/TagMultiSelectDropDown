
(function () {

  var app = angular.module("tagDropDown",[]);
  app.component("tagDropDown", {
    bindings: {
      "data": "<",
      "output" : "="
    },
    templateUrl: "Views/tagDropDown.html",
    controllerAs: "tdd",
    controller: function () {
      var tdd = this;
      tdd.dropDownModel=[];
      tdd.selectedValuesArray = [];

      tdd.$onInit = function () {
        tdd.selectedValueCount = 0;
        console.log("data " + tdd.data);
        console.log("output "+ tdd.output);
        tdd.buttonText = tdd.selectedValueCount + " selected";
        tdd.unSelectAll();
      }

      tdd.selectedValue = function (currentData) {
        tdd.selectedValuesArray.push(currentData);
        tdd.output = tdd.selectedValuesArray;
        tdd.selectedValueCount++;
        tdd.buttonText = tdd.selectedValueCount + " selected";

      }
      tdd.unselectedValue = function (currentData) {
        var index = tdd.selectedValuesArray.indexOf(currentData);
        if (index > -1) {
          tdd.selectedValuesArray.splice(index, 1);
          tdd.selectedValueCount--;
        }
        tdd.output = tdd.selectedValuesArray;
        tdd.buttonText = tdd.selectedValueCount + " selected";
      }

      $(function() {
        $('.dropdown.tagDropDown').on({
          "click": function(event) {
            if ($(event.target).closest('.dropdown-toggle').length) {
              $(this).data('closable', true);
            } else {
              $(this).data('closable', false);
            }
          },
          "hide.bs.dropdown": function(event) {
            hide = $(this).data('closable');
            $(this).data('closable', true);
            return hide;
          }
        });
      });

      tdd.checkAll = function() {
        for(var i in tdd.data){
          if(!tdd.dropDownModel[i]){
            tdd.dropDownModel[i] = true;
            tdd.selectedValue(tdd.data[i]);
          }
        }
      }
      tdd.unSelectAll = function() {
        for(var i in tdd.data){
          if(tdd.dropDownModel[i] || tdd.dropDownModel[i]==null){
            tdd.dropDownModel[i] = false;
            tdd.unselectedValue(tdd.data[i]);
          }
        }
      }

      tdd.ItemSelected = function (currentData,$index){
        if(!tdd.dropDownModel[$index]){
          tdd.selectedValue(currentData);
        } else {
          tdd.unselectedValue(currentData);
        }
        tdd.dropDownModel[$index] = !tdd.dropDownModel[$index];
      }

    }
  });
} ());
