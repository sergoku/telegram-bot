import { useCallback, useEffect, useState } from "react";
import "./Form.css";
import useTelegram from "../../hooks/useTelegram";
const Form = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, city, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });
  }, []);

  useEffect(() => {
    if (!country || !city) {
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
