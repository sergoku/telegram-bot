import { useEffect, useState } from "react";
import "./Form.css";
import useTelegram from "../../hooks/useTelegram";
const Form = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");

  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });
  }, []);

  useEffect(() => {
    if (!country || !city || !subject) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, city]);

  return (
    <div className={"form"}>
      <h3>Input your data</h3>
      <input
        className="input"
        type="text"
        placeholder="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="select"
      >
        <option value={"Mr"}>Mr</option>
        <option value={"Ms"}>Ms</option>
        <option value={"Other"}>Other</option>
      </select>
    </div>
  );
};

export default Form;
