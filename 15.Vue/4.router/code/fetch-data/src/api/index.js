export function apiPost(id, showError) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (showError) {
        reject();
      } else {
        resolve({
          title: "post" + id,
          body: "body post" + id,
        });
      }
    }, 1000);
  });
}
