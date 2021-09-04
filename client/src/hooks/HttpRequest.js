import React from "react";

export default function useHttpRequest(url) {
  const [state, setState] = React.useState({
    loading: true,
    error: false,
    data: null,
  });

  React.useEffect(() => {
    setState({
      loading: true,
      error: false,
      data: null,
    });
    // console.log({url})
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setState({
            loading: false,
            error: false,
            data: data,
          })
      })
      .catch((error) => {
        setState({
            loading: false,
            error: true,
            data: null,
          })
      });
  }, [url]
  );

  return state;
}
