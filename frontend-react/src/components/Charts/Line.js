
import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from "prop-types";

function LineChart(props){
    const { data, options } = props;
    return (
        <>
          <Line data={data} options={options} />
        </>
    );
}

export default LineChart;

LineChart.propTypes = {
    data: PropTypes.object,
    options: PropTypes.object
};