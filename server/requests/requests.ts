const axios = require("axios");

export class RequestController {
  laadpalen(url: string) {
    return axios
      .get(url)
      .then((response: any) => response.data)
      .catch((err: any) => console.log(err));
  }
}
