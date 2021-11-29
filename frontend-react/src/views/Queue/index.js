import React from 'react';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector } from 'react-redux';

function Queue(){
    const dataChart = JSON.parse(JSON.stringify(useSelector(state => state.getIn(["portionReducer", "dataChart"]))));
    if(dataChart["labels"].length == 0){
        return(
            <h3>Tidak ada antrian jamaah haji.</h3>
        );
    }else{
        return(
            <div>
                {
                    dataChart["labels"].map((theData, indeks) => (
                        <Card key={"data-urutan-" + indeks}>
                            <CardBody>
                                <b>
                                    {theData}
                                </b>
                            </CardBody>
                            <CardBody>
                                Urutan {dataChart["no_urut"][indeks]}
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        );
    }
}

export default Queue;