import React from 'react';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Divider from '@material-ui/core/Divider';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from "redux/modules/Portion/actions/portion-actions";
import { closeDiagram, openDiagram } from "redux/modules/Portion/actions/portion-actions";
import LineChart from "components/Charts/Line.js";
import SDialog from "components/Dialog";

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    },
    tooltips: {
      callbacks: {
        label: function (item, data) {
          var label = data.datasets[item.datasetIndex].label || "";
          var yLabel = item.yLabel;
          var content = "";
          if (data.datasets.length > 1) {
            content += label;
          }
          content += yLabel;
          return content;
        },
      },
    }
};

function PopupSuccess(props){
    const { 
        dataAPI
    } = props;
    const dispatch = useDispatch();
    const dataChart = useSelector(state => state.getIn(["portionReducer", "dataChart"]));
    const openDialogDiagram = useSelector(state => state.getIn(["portionReducer", "openDiagram"]));

    const openExecDiagram = (e) => {
        e.preventDefault();
        dispatch(closeModal());
        dispatch(openDiagram());
    };

    return(
        <Card>
            <SDialog 
                cancelText="Cancel"
                content={<LineChart data={dataChart} options={options} />}
                onCancel={() => dispatch(closeDiagram())}
                onOK={() => dispatch(closeDiagram())}
                okText="OK"
                open={openDialogDiagram}
                title="Execution Time"
                type="success"
            />
            {
                dataAPI.map((theData, idx)=>(
                    <div key={"table-ppl-" + idx}>
                        <CardBody>
                            Nama
                            {"  :  "}
                            {theData["nama"]}
                        </CardBody>
                        <CardBody>
                            No. Urut
                            {"  :  "}
                            {theData["no_urut"]}
                        </CardBody>
                        <Divider />
                    </div>
                ))
            }
            <CardBody>
                <Button
                    color="transparent"
                    onClick={openExecDiagram}
                >
                    View execution time
                </Button>
            </CardBody>
        </Card>
    );
}

export default PopupSuccess

PopupSuccess.propTypes = {
    dataAPI: PropTypes.array
};