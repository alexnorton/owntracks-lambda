import { useState, useEffect } from 'react';

const API_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? '/api'
    : process.env.REACT_APP_API_ENDPOINT;

function useData() {
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const req = await fetch(`${API_ENDPOINT}/list`);
      const dates = await req.json();

      setTotal(dates.length);

      const results = await Promise.all(
        dates.map(date =>
          fetch(`${API_ENDPOINT}/get/${date}`)
            .then(dateReq => dateReq.json())
            .then(dateData => {
              setLoaded(l => l + 1);
              return dateData;
            })
        )
      );

      setData(results);
      setIsLoading(false);
    }

    getData();
  }, []);

  return { isLoading, total, loaded, data };
}

export default useData;
