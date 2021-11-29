import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import DeleteIcon from '@material-ui/icons/Delete';
import People from "@material-ui/icons/People";
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
// core components
import SDialog from "components/Dialog";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from 'components/CustomButtons/Button.js';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import PopupSuccess from "./PopupSuccess.js";
// import LineChart from "components/Charts/Line.js";
import { RequestPost } from "utilities";
import { addDataChart, closeModal, openModal } from "redux/modules/Portion/actions/portion-actions";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

function Portion(props){
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const dispatch = useDispatch();
    const [formPortion, setFormPortion] = React.useState([
      {
        "nama": "",
        "errNama": false,
        "errUmur": false,
        "umur": 0
      }
    ]);
    const openDialogSuccess = useSelector(state => state.getIn(["portionReducer", "openModalSuccess"]));
    const [rawData, setRawData] = React.useState([]);

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const addPortion = () => {
      let porsi = [...formPortion];
      porsi.push({
        "nama": "",
        "errNama": false,
        "errUmur": false,
        "umur": 0
      });
      setFormPortion(porsi);
    };

    const changePortion = (obj, index, change) => {
      let porsi = [...formPortion];
      porsi[index][obj] = change;
      porsi[index]["err" + obj.charAt(0).toUpperCase() + obj.slice(1)] = false;
      setFormPortion(porsi);
    };

    // const deletePortion = (index) => {
    //   let porsi = [...formPortion];
    //   porsi.splice(index, 1);
    //   setFormPortion(porsi);
    // };

    const validateForm = () => {
      let continueVal = true;
      let tempSentData = [];
      formPortion.forEach((p)=>{
        if(p["nama"] === null || p["nama"] === ""){
          console.log("Error di nama!");
          p["errNama"] = true;
          continueVal = false;
        }else if(p["umur"] === null || p["umur"] === ""){
          console.log("Error di umur!");
          p["errUmur"] = true;
          continueVal = false
        }
        tempSentData.push({
          "nama": p["nama"],
          "umur": p["umur"]
        });
      })

      if(continueVal){
        RequestPost("fibonacci-heap", tempSentData)
          .then(res => {
            let edata = {
              labels: [],
              datasets: [
                {
                  label: "Execution time (s)",
                  data: []
                }
              ],
              no_urut: []
            };
            let elabels = [];
            let etime = [];
            let urutan = [];
            res.data.forEach((data)=>{
              elabels.push(data["nama"]);
              etime.push(data["exec_time"]);
              urutan.push(data["no_urut"]);
            });
            
            edata["labels"] = elabels;
            edata["datasets"][0]["data"] = etime;
            dispatch(addDataChart(edata));
            setRawData(res.data);
            dispatch(openModal());
          })
          .catch(er => {
            console.log("Error: ", er);
          })
      }
    };

    return(
      <div>
        <Header
            brand="Fibonacci Heaps"
            fixed
            color="transparent"
            {...rest}
        />
        <Parallax image={require("assets/img/kaba.jpg").default}>
            <div className={classes.container}>
                <GridContainer>
                    <GridItem>
                        <div className={classes.brand}>
                            <h1 className={classes.title}>Administrasi Sistem Haji</h1>
                            <h3 className={classes.subtitle}>
                                23521059 Jalaluddin - 23521089 Aaz M. Hafidh
                            </h3>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
        </Parallax>
        <div className={classes.container}>
          <SDialog 
            cancelText="Cancel"
            content={<PopupSuccess dataAPI={rawData} />}
            onCancel={() => dispatch(closeModal())}
            onOK={() => dispatch(closeModal())}
            okText="OK"
            open={openDialogSuccess}
            title="Success"
            type="success"
          />
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Hajj Portion</h4>
                  </CardHeader>
                  {
                    formPortion.map((thePortion, i) => {
                      return(
                        <div key={"div-form-" + i}>
                          <CardBody>
                            <CustomInput
                              error={thePortion["errNama"]}
                              labelText="Full Name..."
                              id="fullname"
                              onChange={e => changePortion("nama", i, e.target.value)}
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "text",
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                  </InputAdornment>
                                ),
                              }}
                              value={thePortion["nama"]}
                            />
                          </CardBody>
                          <CardBody>
                            <CustomInput
                              error={thePortion["errUmur"]}
                              labelText="Age..."
                              id="umur"
                              onChange={e => changePortion("umur", i, e.target.value)}
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "text",
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <PermContactCalendarIcon className={classes.inputIconsColor} />
                                  </InputAdornment>
                                ),
                              }}
                              value={thePortion["umur"]}
                            />
                          </CardBody>
                        </div>
                      );
                    })
                  }
                  <CardBody>
                    <GridContainer justify="flex-end">
                      <GridItem xs={3}>
                        <Tooltip title="Add more people...">
                          <Button color="facebook" simple onClick={addPortion}>
                            <AddIcon />
                          </Button>
                        </Tooltip>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={3}>
                        <Link to="/">
                          <Button color="primary" round><ArrowBackIcon /></Button>
                        </Link>
                      </GridItem>
                      <GridItem xs={4}></GridItem>
                      <GridItem xs={3}>
                        <Button color="primary" round onClick={validateForm}>Submit</Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
    </div>
  );
}

export default Portion;