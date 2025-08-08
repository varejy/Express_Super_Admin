/* eslint-disable consistent-return */
import { pathOr } from "ramda";

export default function base(request) {
  return new Promise((resolve, reject) => {
    request.end((err, res) => {
      if (err) {
        return reject(pathOr(["response", "body"], {}, err));
      }

      resolve(res.body || res.text);
    });
  });
}
