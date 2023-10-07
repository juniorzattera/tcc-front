import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

type Props = {
    handleSearch: (startDate: Date, endDate: Date) => void;
    handleClear: () => void;
};

const DateTimePicker = (props: Props) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);



  const handleData = () => {
    if (startDate && endDate) {
      props.handleSearch(startDate, endDate);
    }
  }

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    props.handleClear();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Data e hora inicial"
          minDate={endDate ? endDate : null}
          maxDate={endDate ? endDate : new Date()}
          minTime={
            endDate
              ? new Date(endDate.getTime() - 4 * 60 * 60 * 1000)
              : undefined
          }
          maxTime={endDate ? endDate : undefined}
        />
        <DatePicker
          selected={!endDate ? startDate : endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd/MM/yyyy HH:mm"
          placeholderText="Data e hora final"
          minDate={startDate ? startDate : null}
          maxDate={startDate ? startDate : new Date()}
          minTime={startDate ? startDate : undefined}
          maxTime={
            startDate
              ? new Date(startDate.getTime() + 4 * 60 * 60 * 1000)
              : undefined
          }
        />
        <div className="text-gray-300 cursor-pointer" onClick={handleClear}>
          Limpar
        </div>
        <div className="text-gray-300 cursor-pointer" onClick={handleData}>
          Buscar
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
