const getToken = async (email) => {
    var data = await fetch("/chat/token", {
      method: "POST",
      body: JSON.stringify({
        identity: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    return data.token;
  };
export default getToken;