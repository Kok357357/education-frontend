'use strict';

/* Controllers */

angular.module('netbase')

.controller('AcademiaHandAnalysisCreateCtrl', ['$rootScope', '$scope', '$location', '$route', 'University', '$timeout', 'ngDialog', 'jwtHelper', '$localStorage', 'PokerHands', '$q' , function($rootScope, $scope, $location, $route, University, $timeout, ngDialog, jwtHelper, $localStorage, PokerHands, $q) {

  let universityUrl = $route.current.params.academiaName;

  /* Hands */

  $scope.hands = [{ title : "", handtext : "" }];

  $scope.addHand = function() {

    let hand = { title : "" };

    $scope.hands.push(hand);

  }

  $scope.sendHand = function() {

    console.log($scope.hands)

    function createEmbed(handtext) {
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {

        PokerHands.animateHand(handtext).success(function(res) {

          console.log("poker hand response: ")
          console.log(res);

          if (res.success) {
            resolve(res.data);
          } else {
            reject();
          }

        });

      });
    }

    // 1 - add all on

    let promisesToRun = [];

    let handsUpload = [];
    let handsUploadFinal = [];

    for (let idx = 0; idx < $scope.hands.length; idx++) {

      let handtext = $scope.hands[idx].handtext;

      promisesToRun.push(createEmbed(handtext))
      handsUpload.push({ title : $scope.hands[idx].title, embedId : "" });

    }

    $q.all(promisesToRun).then(function(results) {
      //TODOD:  When both task are completed here.
      console.log("all results from calls: ")
      console.log(results)

      for (let adx = 0; adx < results.length; adx++) {
        let result = results[adx];
        console.log("result::: ")
        console.log(result)
        console.log(adx)
        handsUpload[adx].embedId = result._id;
        console.log("handsUpload[adx]: ")
        console.log(handsUpload[adx])
        handsUploadFinal.push(handsUpload[adx])
      }

      console.log(handsUpload[0])

      let payload = { hands : JSON.stringify(handsUploadFinal), title : $scope.title, universityId : $scope.university._id };

      console.log(payload)

      PokerHands.create(payload).success(function(res) {

        console.log("poker hand response: ")
        console.log(res);

        if (res.success) {
          console.log(res);
          $location.path('/a/sambapoker/handanalysis/id/' + res.data._id)
        } else {
          console.log("error, no success")
        }

      });

      // post on api

    }, function() {
      //TODOD:  When both task are rejected here.
    })

    /*
    PokerHands.animateHand().success(function(res) {

      console.log("poker hand response: ")
      console.log(res);

    });
    */

  }

  /* Get University */

  if ( University.isStoredLocal(universityUrl) ) {

    let universityStorage = University.retrieveStorage(universityUrl);

    $scope.university = universityStorage[universityUrl];

  } else {

    University.getUniversity(universityUrl).then(function(res) {

      console.log("university: ")
      console.log(res.data.data)
      $scope.university = res.data.data;
      University.storeLocal($scope.university);

    });

  }

}])

.controller('AcademiaHandAnalysisByIdCtrl', ['$rootScope', '$scope', '$location', '$route', 'University', '$timeout', 'ngDialog', 'jwtHelper', '$localStorage', 'PokerHands', '$sce', 'Students' , function($rootScope, $scope, $location, $route, University, $timeout, ngDialog, jwtHelper, $localStorage, PokerHands, $sce, Students) {

  let universityUrl = $route.current.params.academiaName;
  let handId = $route.current.params.id;

  //

  let pokerhands = {
    title : "Dúvidas Mula181",
    description : "",
    universityId : "5b3d26eed636a3081832bef6",
    createdAt : 1544035466,
    accountId : "5c06932af6cee400148535aa",
    active : 1,
    viewers: [{
      accountId : "5c06932af6cee400148535aa",
      viewedAt : 3114
    }],
    hand: [
      { title : "De boa fazer isso em HT? vi umas aulas de kelvin de hyper q ele faz mt isso, e o range do cara ta capado. talvez fazer 900 flop, 1400 turn seria melhor p n ficar spr tao alto", embedId: "5c0fc290d39043410d8b457e", answers : [{ accountId : "5bb2a406af9db9001359ce0d", text : "<div><!--block-->1 - você quis dizer pro SPR não ficar tão curto, e não tão alto, né? Sim, eu faria maior PF e menor flop e turn<br><br>2 - vs UTG tem que foldar tudo river<br><br>3 - PF? nunca, tá cheio de coach ai de big blind trash hands (tem um especifico sobre isso e um ultimo coach sobre bb squeeze que também aborda umonte de spot desses multiway)<br><br>4 - 28 ok<br><br>5 - prefiro raise com o backdoor e call com os off, combos off você só vai hitar broca e mais nada, com o backdoor pode hitar mais coisas, já dando call ai com Q9 é um float de boas com bastante equity</div>", createdAt : 1544035466 }] },
      { title : "Es un buen spot para delayed cb no? una vez que hago eso debo pagar los dos barrels o esta ok fold?", embedId: "5c0fc290d39043410d8b457e", answers : [{ accountId : "5bb2a406af9db9001359ce0d", text : "<div><!--block-->1 - você quis dizer pro SPR não ficar tão curto, e não tãcdasacasdcasaior PF e menor flop e turn<br><br>2 - vs UTG tem que foldar tudo river<br><br>3 - PF? nunca, tá cheio de coach ai de big blind trash hands (tem um especifico sobre isso e um ultimo coach sobre bb squeeze que também aborda umonte de spot desses multiway)<br><br>4 - 28 ok<br><br>5 - prefiro raise com o backdoor e call com os off, combos off você só vai hitar broca e mais nada, com o backdoor pode hitar mais coisas, já dando call ai com Q9 é um float de boas com bastante equity</div>", createdAt : 1544035466 }, { accountId : "5bb2a406af9db9001359ce0d", text : "<div><!--block-->1 - você quis dizer pro SPR não ficar tão curto, e não tãcdasacasdcasaior PF e menor flop e turn<br><br>2 - vs UTG tem que foldar tudo river<br><br>3 - PF? nunca, tá cheio de coach ai de big blind trash hands (tem um especifico sobre isso e um ultimo coach sobre bb squeeze que também aborda umonte de spot desses multiway)<br><br>4 - 28 ok<br><br>5 - prefiro raise com o backdoor e call com os off, combos off você só vai hitar broca e mais nada, com o backdoor pode hitar mais coisas, já dando call ai com Q9 é um float de boas com bastante equity</div>", createdAt : 1544035466 }] },
      { title : "De boa fazer isso em HT? vi umas aulas de kelvin de hyper q ele faz mt isso, e o range do cara ta capado. talvez fazer 900 flop, 1400 turn seria melhor p n ficar spr tao alto", "embedId": "5c0fc290d39043410d8b457e", answers : [{ accountId : "5bb2a406af9db9001359ce0d", text : "<div><!--block-->1 - você quis dizer pro SPR não ficar tão curto, e não tão alto, né? Sim, eu faria maior PF e menor flop e turn<br><br>2 - vs UTG tem que foldar tudo river<br><br>3 - PF? nunca, tá cheio de coach ai de big blind trash hands (tem um especifico sobre isso e um ultimo coach sobre bb squeeze que também aborda umonte de spot desses multiway)<br><br>4 - 28 ok<br><br>5 - prefiro raise com o backdoor e call com os off, combos off você só vai hitar broca e mais nada, com o backdoor pode hitar mais coisas, já dando call ai com Q9 é um float de boas com bastante equity</div>", createdAt : 1544035466 }] }
    ]
  };

  //

  $scope.analysisText = "";

  $scope.sendAnalysis = function() {

    let payload = { text : $scope.analysisText , embedId : $scope.pokerhands[$scope.handIndex].embedId };

    PokerHands.answer(id, payload).success(function(res) {

      console.log("poker hands answer: ")
      console.log(res);

    });

  }

  $scope.getEmbedUrl = function(id) {

    return $sce.trustAsResourceUrl("https://www.weaktight.com/e/" + id);

  }

  //

  $scope.pokerhands = pokerhands;

  if ( University.isStoredLocal(universityUrl) ) {

    let universityStorage = University.retrieveStorage(universityUrl);

    $scope.university = universityStorage[universityUrl];

    PokerHands.getById(handId).success(function(res) {
      console.log(res);
      if (res.success) {
        //$scope.pokerhands = res.data;

        Students.getStudentById($scope.pokerhands.accountId).then(function(res) {

          let data = res.data.data;

          if (data.imageUrl != undefined && data.imageUrl != null) {
            $scope.userImage = data.imageUrl;
          }

          $scope.studentAsking = data;

        });

        console.log(res.data)
      } else {
        alert("error while loading")
      }

    });

  } else {

    University.getUniversity(universityUrl).then(function(res) {

      console.log("university: ")
      console.log(res.data.data)
      $scope.university = res.data.data;
      University.storeLocal($scope.university);

      PokerHand.getById(handId).success(function(res) {
        console.log(res);
        if (res.success) {
          //$scope.pokerhands = res.data;
          console.log(res.data)

          Students.getStudentById($scope.pokerhands.accountId).then(function(res) {

            let data = res.data.data;

            if (data.imageUrl != undefined && data.imageUrl != null) {
              $scope.userImage = data.imageUrl;
            }

            $scope.studentAsking = data;

          });

        } else {
          alert("error while loading")
        }

      });

    });

  }

  //

  //$scope.pokerhands = pokerhands;
  $scope.handIndex = 0;

  $scope.move = function(type) {

    if (type == "next") {
      if ($scope.handIndex + 1 < $scope.pokerhands.hand.length) {
        $scope.handIndex = $scope.handIndex + 1;
      }
    }

    if (type == "back") {
      if ($scope.handIndex + 1 > 1) {
        $scope.handIndex = $scope.handIndex - 1;
      }
    }

  }

}])

.controller('AcademiaHandAnalysisCtrl', ['$rootScope', '$scope', 'ngDialog', 'University', 'Knowledge' , function($rootScope, $scope, ngDialog, University, Knowledge) {

  $scope.universities = [];

  /* */
  $scope.page = 2;
  /* */

  /* Knowledge -> Page 1 */

  Knowledge.getAllPaginated().success(function(res) {

    let data = res.data;
    let success = res.success;
    let docs = data.docs;

    $scope.knowledges = docs;

  });

  $scope.checkbox = false;

  let knowledgeSelected = [];

  $scope.knowledgeCheck = function(id) {

    let idx = knowledgeSelected.indexOf(id);

    if (idx >= 0) {
      knowledgeSelected.splice(idx, 1);
    } else {
      knowledgeSelected.push(id);
    }

    console.log(knowledgeSelected)

  }

  $scope.knowledgeStore = function() {

    // Get value id from inputs
    // Do a for loop
    // Do multiple requests to push into user account

    knowledgeSelected.forEach(function(id, idx) {

      Knowledge.subscribe(id).success(function(res) {

        console.log("knowledge registered")

      });

    });
    //END knowledgeSelected

    $scope.page = 2;

  }

  /* Universities -> Page 2 */

  let universitySelected = [];

  University.getAllUniversities().success(function(res) {

    let success = res.success;
    let data = res.data;

    $scope.universities = data;

    console.log(res);

  });

  $scope.universityCheck = function(url) {

    let idx = universitySelected.indexOf(url);

    if (idx >= 0) {
      universitySelected.splice(idx, 1);
    } else {
      universitySelected.push(url);
    }

  }

  $scope.universityStore = function() {

    // Get value id from inputs
    // Do a for loop
    // Do multiple requests to push into user account

    universitySelected.forEach(function(url, idx) {

      University.subscribeOnUniversity(url).success(function(res) {

        console.log("knowledge registered")

      });

      ngDialog.close();

    });
    //END knowledgeSelected

    $scope.page = 2;

  }

  $scope.studentProExplore = function () {
    ngDialog.open({ template: 'partials/modals/studentpro.html', className: 'ngdialog-theme-default ngdialog-student-pro', controller: 'StudentProExploreCtrl' });
  };

  //ngDialog.close();

}])

.directive('handhistory', ['University', '$rootScope', 'Students', 'News', '$sce', function(University, $rootScope, Students, News, $sce) {
  return {
    restrict: 'E',
    templateUrl: '../partials/handanalysis/handhistory.html',
    replace: false,
    scope: true,
    link: function(scope, element, attr) {

      let id = attr.embedid;

      scope.embedUrl = $sce.trustAsResourceUrl("https://www.weaktight.com/e/" + id);

    }
  }
}])

.directive('pokerhandanswer', ['University', '$rootScope', 'Students', 'News', '$sce', function(University, $rootScope, Students, News, $sce) {
  return {
    restrict: 'E',
    templateUrl: '../partials/handanalysis/useranalysis.html',
    replace: false,
    scope: true,
    link: function(scope, element, attr) {

      let analysis = JSON.parse(attr.a);

      scope.analysis = analysis;

      scope.text = $sce.trustAsHtml(analysis.text);

      console.log(analysis)

      Students.getStudentById(analysis.accountId).then(function(res) {

        console.log("student: ")
        console.log(res)
        scope.student = res.data.data;
        console.log(scope.student)

      });
      //Get Student

    }
  }
}])
