import { graphConfig } from './auth_config';

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
// eslint-disable-next-line import/prefer-default-export
export async function callMsGraph(accessToken: any) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
