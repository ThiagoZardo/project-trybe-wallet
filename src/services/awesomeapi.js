const awesomeApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  delete json.USDT;
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default awesomeApi;
