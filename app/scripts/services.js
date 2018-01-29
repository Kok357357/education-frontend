'use strict';
angular.module('netbase')

    .factory('Forum', ['$http', function($http) {

      var baseUrl = "https://api.universida.de/university";

      return {

        getForumPostById: function(id, universityId) {

          var url = '/id/' + universityId + '/forum/post/id/' + id;

          return $http.get(baseUrl + url);

        },

        postAnswerByForumPostId: function(id, universityId, answer) {

          var url = '/id/' + universityId + '/forum/post/id/' + id + "/answer";

          return $http({
            method: 'POST',
            url: baseUrl + url,
            data : answer,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        }

      }

    }])

    .factory('University', ['$http', function($http) {

      //var baseUrl = "https://localhost:9003/university";

      var baseUrl = "https://api.universida.de/university"

      return {

        getUniversities: function() {

          var url = '/';

          return $http.get(baseUrl + url);

        },

        getAllUniversities: function() {

          var url = '/all';

          return $http.get(baseUrl + url);

        },

        getUniversityById: function(universityId) {

          var url = '/id/' + universityId;

          return $http.get(baseUrl + url);

        },

        getUniversity: function(universityUrl) {

          var url = '/url/' + universityUrl;

          return $http.get(baseUrl + url);

        },

        getUniversityForumPosts: function(universityId) {

          var url = "/id/" + universityId + "/forum";

          return $http.get(baseUrl + url);

        },

        subscribeOnUniversity: function(universityUrl) {

          var url = '/url/' + universityUrl + "/subscribe";

          return $http({
            method: 'POST',
            url: baseUrl + url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        createForumPost: function(universityId, data) {

          var url = '/id/' + universityId + '/forum';

          return $http({
            method: 'POST',
            data: data,
            url: baseUrl + url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        upvoteForumPost: function(universityId, postId) {

          var url = '/id/' + universityId + '/forum/post/id/' + postId + '/vote/up';

          return $http({
            method: 'POST',
            url: baseUrl + url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        downvoteForumPost: function(universityId, postId) {

          var url = '/id/' + universityId + '/forum/post/id/' + postId + '/vote/down';

          return $http({
            method: 'POST',
            url: baseUrl + url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        upvoteForumPostAnswer: function(universityId, postId, answerId) {

          var url = "/id/" + universityId + "/forum/post/id/" + postId + "/answer/id/" + answerId + "/vote/up";

          return $http({
            method: 'PUT',
            url: baseUrl + url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        downvoteForumPostAnswer: function(universityId, postId, answerId) {

          var url = "/id/" + universityId + "/forum/post/id/" + postId + "/answer/id/" + answerId + "/vote/down";

          return $http({
            method: 'PUT',
            url: baseUrl + url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        }

      }

    }])

    .factory('Students', ['$http', function($http) {

      var baseUrl = "https://api.universida.de/accounts/students";

      return {

        login: function(data) {

          var url = '/authenticate/';

          return $http({
            method: 'POST',
            url: baseUrl + url,
            data : data,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        createAccount: function(data) {

          var url = '/create/';

          data.language = "PT";

          return $http({
            method: 'POST',
            url: baseUrl + url,
            data : data,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        getStudentById: function(id) {

          var url = '/id/' + id;

          return $http.get(baseUrl + url);

        }

      }

    }])

    .factory('Search', ['$http', function($http) {

      var baseUrl = "https://api.universida.de/search";

      return {

        all: function(query) {

          var url = '/all?q=' + query;

          return $http.get(baseUrl + url);

        }

      }

    }])

    .factory('SocialMarketPlace', ['$http', '$localStorage', 'jwtHelper', function($http, $localStorage, jwtHelper) {

      var baseUrl = "https://api.universida.de/listing";

      return {

        create: function(data) {

          var url = "/";

          return $http({
            method: 'POST',
            url: baseUrl + url,
            data : data,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            contentType: 'application/json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        update: function(data) {

          var url = "/id/" + data.id;

          return $http({
            method: 'PUT',
            url: baseUrl + url,
            data : data,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            contentType: 'application/json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        getListingById: function(id) {

          var url = '/id/' + id;

          return $http.get(baseUrl + url);

        },

        getListingsByUniversity: function(universityId) {

          var url = '/university/id/' + universityId;

          return $http.get(baseUrl + url);

        },

        want: function(id) {

          var url = '/id/' + id + '/want';

          return $http({
            method: 'POST',
            url: baseUrl + url,
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            contentType: 'application/json',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }});

        },

        getListingsByAccountId: function(id) {

          var url = '/accounts/id/' + id + '/listings';

          return $http.get(baseUrl + url);

        }

      }

    }])

    .factory('FileUpload', ['$http', function($http) {

      var baseUrl = "https://api.universida.de/images";

      return {

        smp: function(query) {

          var url = '/all?q=' + query;

          return $http.get(baseUrl + url);

        }

      }

    }])

;
