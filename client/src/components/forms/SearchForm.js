import react, { useState } from "react";

import { DatePicker, Select } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchForm = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");

  const history = useNavigate();

  const handleSubmit = () => {
    history(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <div className="d-flex pb-4 ">
      <div className="w-100 ">
        <input
          type="input"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
          className="form-control bg-light text-dark "
          placeholder="Location"
          style={{height:"50px" ,borderRadius:"0"}}
        ></input>
         </div>
        <RangePicker
          className="w-100"
          onChange={(value, dateString) => setDate(dateString)}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />

        <Select
        onChange={(value)=>setBed(value)}
        className="w-100"
        size="large"
        placeholder="number of beds"
        >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
        </Select>
        <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square" />
      
    </div>
  );
};

export default SearchForm;
