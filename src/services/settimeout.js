useEffect(() => {
  if (!id || !login) {
    return;
  }

  // Add a delay of 1000 milliseconds (1 second)
  const delay = 1000;

  // Use setTimeout to delay the execution of the axios request
  const timerId = setTimeout(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        if (data.user_id == login._id) {
          setInputsValue(fromServer(data));
        } else {
          toast.error("🦄 You are not the owner of this card", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate(ROUTES.HOME);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, delay);

  // Clean up the timer to prevent memory leaks
  return () => clearTimeout(timerId);
}, [id, login]);
