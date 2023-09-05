import { log } from "console";

const getExperts = async () => {
  const endpoint = 'http://localhost:9009/graphql';
  const headers = {
    'content-type': 'application/json',
  };

  const graphqlQuery = {
    query: `
        query Experts {
          experts {
            id
          }
        }    
      `,
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();
  log(data)
  return data.data.experts;
};

export default getExperts;
