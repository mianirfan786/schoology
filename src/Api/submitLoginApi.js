import {api} from './index';

export function postgeneralApi(params, config) {

  return api.post('/modules/CustomerPortal/api.php', params, {
    headers: {Authorization: config},
  });
}
