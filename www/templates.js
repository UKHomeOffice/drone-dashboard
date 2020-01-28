angular.module('App').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/_app/templates/wall.html',
    "<aside class=\"config\">\n" +
    "    <a href=\"/#/config\"><i class=\"fa fa-cog\"></i> Config</a>\n" +
    "</aside>\n" +
    "\n" +
    "<section class=\"build-column\">\n" +
    "\n" +
    "    <section class=\"last-failure\">\n" +
    "\n" +
    "        <h1 data-ng-if=\"!wall.failDate\"><span class=\"good\">No failed builds</span> today!</h1>\n" +
    "        <h1 data-ng-if=\"wall.failDate\"><span class=\"wide\">It's been </span><span class=\"bad\">{{ wall.failDate | from:wall.now }}</span> since the last failed build<span class=\"wide\">.</span></h1>\n" +
    "\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"build-health\">\n" +
    "\n" +
    "        <h1 class=\"bar\">This Week's Build Health <i class=\"fa fa-medkit\"></i></h1>\n" +
    "\n" +
    "        <span class=\"no-builds\" data-ng-if=\"wall.buildCount === 0\">Waiting for builds.</span>\n" +
    "\n" +
    "        <div class=\"build-count\" data-ng-if=\"wall.buildCount > 0\">\n" +
    "            <h2>Builds</h2>\n" +
    "            <div class=\"count\">{{ wall.buildCount }}</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"pull-count\" data-ng-if=\"wall.buildCount > 0\">\n" +
    "            <h2>PRs</h2>\n" +
    "            <div class=\"count\">{{ wall.pullCount }}</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"success-fail\" data-ng-if=\"wall.buildCount > 0\">\n" +
    "            <h2>Successes</h2>\n" +
    "            <h2>Failures</h2>\n" +
    "            <div class=\"build-bar\">\n" +
    "                <div class=\"success\" data-ng-class=\"{ zero: wall.successCount === 0 }\">{{ wall.successCount }}</div>\n" +
    "                <div class=\"failure\" data-ng-class=\"{ zero: wall.failureCount === 0 }\" style=\"width: calc( {{ ( wall.failureCount / ( wall.successCount + wall.failureCount ) ) * 100 }}% - 25px )\"><span>{{ wall.failureCount }}</span></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"build-leaders\">\n" +
    "\n" +
    "        <h1 class=\"bar\">This Week's Build Leaders <i class=\"fa fa-users\"></i></h1>\n" +
    "\n" +
    "        <span class=\"no-builds\" data-ng-if=\"( wall.developers | filter: { visible: true } ).length === 0\">Waiting for builders.</span>\n" +
    "\n" +
    "        <ol data-ng-if=\"( wall.developers | filter: { visible: true } ).length > 0\">\n" +
    "\n" +
    "            <li data-ng-repeat=\"developer in wall.developers | filter: { visible: true, avatar: 'http' } | orderBy: ['-rank','-successes'] | limitTo: wall.maxLeaders\" data-ng-style=\"{ width: ( 100 / wall.maxLeaders ) + '%' }\" data-iterate-pop>\n" +
    "\n" +
    "                <div class=\"container\">\n" +
    "                    <div class=\"developer\">\n" +
    "                        <img data-ng-src=\"{{ developer.avatar }}\" class=\"builder\">\n" +
    "                    </div>\n" +
    "                    <span class=\"successes\" data-ng-if=\"developer.successes > 0\">{{ developer.successes }}</span>\n" +
    "                    <span class=\"failures\" data-ng-if=\"developer.failures > 0\">{{ developer.failures }}</span>\n" +
    "                </div>\n" +
    "\n" +
    "            </li>\n" +
    "\n" +
    "        </ol>\n" +
    "\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"latest-builds\">\n" +
    "\n" +
    "        <h1 class=\"bar\">Latest Builds <i class=\"fa fa-rocket\"></i></h1>\n" +
    "\n" +
    "        <span class=\"no-builds\" data-ng-if=\"wall.builds.length === 0\">Waiting for builds.</span>\n" +
    "\n" +
    "        <ol data-ng-if=\"wall.builds.length > 0\">\n" +
    "\n" +
    "            <li class=\"{{ build.status }}\" data-ng-repeat=\"build in wall.builds | orderBy: 'createdAt': true | limitTo: wall.maxBuilds\">\n" +
    "\n" +
    "                <div class=\"author\">\n" +
    "                    <img data-ng-src=\"{{ build.developer.avatar }}\" data-ng-if=\"build.developer.avatar\">\n" +
    "                    <span class=\"no-author\" data-ng-if=\"!build.developer.avatar\"><i class=\"fa fa-user\"></i></span>\n" +
    "                    <i class=\"fa fa-circle-o-notch fa-spin\" data-ng-if=\"build.status === 'running'\"></i>\n" +
    "                </div>\n" +
    "                <div class=\"name\">{{ build.name }}</div>\n" +
    "                <div class=\"message\">{{ build.message }}</div>\n" +
    "                <div class=\"when\" data-ng-if=\"build.status !== 'pending'\">{{ build.startedAt * 1000 | from:wall.now }} ago</div>\n" +
    "                <div class=\"when\" data-ng-if=\"build.status === 'pending'\">Build Pending</div>\n" +
    "                <div class=\"duration\" data-ng-if=\"build.finishedAt > 0\">\n" +
    "                    <i class=\"fa fa-clock-o\"></i> {{ ( build.finishedAt - build.startedAt ) | duration }}\n" +
    "                </div>\n" +
    "\n" +
    "            </li>\n" +
    "\n" +
    "        </ol>\n" +
    "\n" +
    "    </section>\n" +
    "\n" +
    "</section>\n" +
    "\n" +
    "<section class=\"repo-column\">\n" +
    "\n" +
    "    <h1>Watching repos since <span data-ng-bind=\"wall.watchTime | moment: 'dddd, MMMM Do [at] h:mm a': true\">...</span></h1>\n" +
    "\n" +
    "    <div class=\"column\">\n" +
    "\n" +
    "        <ul class=\"repos\">\n" +
    "\n" +
    "            <li data-ng-repeat=\"repo in wall.displayRepos\" class=\"{{ repo.status }}\" data-scroll-repo>\n" +
    "\n" +
    "                <div class=\"author\">\n" +
    "                    <img data-ng-src=\"{{ repo.developer.avatar }}\" data-ng-if=\"repo.developer.avatar\">\n" +
    "                    <span class=\"no-author\" data-ng-if=\"!repo.developer.avatar\"><i class=\"fa fa-user\" data-ng-if=\"repo.lastMerge\"></i></span>\n" +
    "                    <i class=\"fa fa-circle-o-notch fa-spin\" data-ng-if=\"repo.status === 'running'\"></i>\n" +
    "                </div>\n" +
    "\n" +
    "                <ul class=\"pull-requests\">\n" +
    "                    <li data-ng-repeat=\"pull in repo.pulls | filter: { merging: false }\" class=\"{{ pull.status }}\">\n" +
    "                        <div class=\"pull-author\">\n" +
    "                            <img data-ng-src=\"{{ pull.developer.avatar }}\" data-ng-if=\"pull.developer.avatar\">\n" +
    "                            <span class=\"no-author\" data-ng-if=\"!pull.developer.avatar\"><i class=\"fa fa-user\"></i></span>\n" +
    "                            <i class=\"fa fa-circle-o-notch fa-spin\" data-ng-if=\"pull.status === 'running'\"></i>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "\n" +
    "                <div class=\"repo-name\">{{ repo.name }}</div>\n" +
    "\n" +
    "            </li>\n" +
    "\n" +
    "        </ul>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</section>"
  );


  $templateCache.put('modules/config/templates/config.html',
    "<section class=\"wall-config\">\n" +
    "\n" +
    "    <div>\n" +
    "\n" +
    "        <h1><span>Drone</span> <span>Wall</span></h1>\n" +
    "\n" +
    "        <form name=\"configForm\" data-ng-submit=\"config.setConfig( configForm.$valid )\" novalidate>\n" +
    "\n" +
    "            <ol>\n" +
    "                <li>\n" +
    "                    <label for=\"path\">\n" +
    "                        Enter your Drone API root path.  We'll be slapping <code>user/feed</code> after it, so provide\n" +
    "                        something like <code>https://drone.yourdomain.com/api/</code>.\n" +
    "                    </label>\n" +
    "                    <input type=\"url\" name=\"path\" id=\"path\" data-ng-model=\"config.path\" placeholder=\"api path\" data-ng-class=\"{ 'error': configForm.path.$invalid && configForm.$submitted }\" required>\n" +
    "                    <div data-ng-messages=\"configForm.path.$error\" data-ng-if=\"configForm.$submitted\">\n" +
    "                        <div data-ng-message=\"required\">Please enter the API root</div>\n" +
    "                        <div data-ng-message=\"url\">Please enter a valid URL</div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <label for=\"token\">\n" +
    "                        Enter a valid Drone token.  You can find this token by accessing your Drone dashboard, clicking\n" +
    "                        the arrow in the top-right corner, and selecting \"profile.\"\n" +
    "                    </label>\n" +
    "                    <input type=\"text\" name=\"token\" id=\"token\" data-ng-model=\"config.token\" placeholder=\"drone token\" data-ng-class=\"{ 'error': configForm.token.$invalid && configForm.$submitted }\" required>\n" +
    "                    <div data-ng-messages=\"configForm.token.$error\" data-ng-if=\"configForm.$submitted\">\n" +
    "                        <div data-ng-message=\"required\">Please enter a token</div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <p>\n" +
    "                        Select a theme.\n" +
    "                    </p>\n" +
    "                    <div class=\"theme\">\n" +
    "                        <a data-ng-click=\"site.toggleTheme( 'light' )\" class=\"theme-light\">light</a>\n" +
    "                        <a data-ng-click=\"site.toggleTheme( 'dark' )\" class=\"theme-dark\">dark</a>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ol>\n" +
    "\n" +
    "            <div class=\"buttons\">\n" +
    "                <button type=\"submit\">Save</button>\n" +
    "                <a href=\"/#/\">Cancel</a>\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</section>"
  );

}]);
