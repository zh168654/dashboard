// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {stateName as parentStateName} from 'admin/state';
import {stateName as chromeStateName} from 'chrome/state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';

import {stateUrl} from './../state';
import {StorageClassListController} from './controller';

/**
 * I18n object that defines strings for translation used in this file.
 */
const i18n = {
  /** @type {string} @desc Label 'Storage Classes' that appears as a breadcrumbs on the action
   bar. */
  MSG_BREADCRUMBS_STORAGE_CLASSES_LABEL: goog.getMsg('Storage Classes'),
};

/**
 * Config state object for the Storage Class list view.
 *
 * @type {!ui.router.StateConfig}
 */
export const config = {
  url: stateUrl,
  parent: chromeStateName,
  resolve: {
    'storageClassList': resolveStorageClassList,
  },
  data: {
    [breadcrumbsConfig]: {
      'label': i18n.MSG_BREADCRUMBS_STORAGE_CLASSES_LABEL,
      'parent': parentStateName,
    },
  },
  views: {
    '': {
      controller: StorageClassListController,
      controllerAs: '$ctrl',
      templateUrl: 'storageclass/list/list.html',
    },
  },
};

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
export function storageClassListResource($resource) {
  return $resource('api/v1/storageclass');
}

/**
 * @param {!angular.Resource} kdStorageClassListResource
 * @param {!./../../common/pagination/pagination_service.PaginationService} kdPaginationService
 * @returns {!angular.$q.Promise}
 * @ngInject
 */
export function resolveStorageClassList(kdStorageClassListResource, kdPaginationService) {
  /** @type {!backendApi.PaginationQuery} */
  let query = kdPaginationService.getDefaultResourceQuery('');
  return kdStorageClassListResource.get(query).$promise;
}