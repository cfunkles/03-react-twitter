export function getMessages() {
  return fetch('/api/messages', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch((error) => {
      console.log(error); // eslint-disable no-console
    });
}

export function postMessage(user_id, text) {
  return new Promise(async(resolve, reject) => {
      try {
        const response = await fetch('/api/messages', {
          headers: {
            Accept: 'application/json text/plain, */*',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ userId: user_id, text: text }),
        });
        resolve(response.json())
      } catch(e){
        console.error(e);
        reject(e);
      }
  });
}

export function addStar(messageId) {
  return new Promise(async(resolve, reject) => {
      try {
        const response = await fetch('/api/addStar', {
          headers: {
            Accept: 'application/json text/plain, */*',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: messageId,
        });
        resolve(response.json())
      } catch(e){
        console.error(e);
        reject(e);
      }
  });
}

