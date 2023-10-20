app.get("/form", async (req, res) => {
  const submissions = await fetch(
    `${URL}form/${FORM_ID}/submissions?apiKey=${API_KEY}`
  );
  const data = await submissions.json();
  res.json(data);
});

app.get("/form/questions", async (req, res) => {
  const submissions = await fetch(
    `${URL}form/${FORM_ID}/questions?apiKey=${API_KEY}`
  );
  const data = await submissions.json();
  res.json(data);
});
