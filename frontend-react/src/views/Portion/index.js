import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import People from "@material-ui/icons/People";
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
// core components
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

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

function Portion(props){
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [formPortion, setFormPortion] = React.useState([
      {
        "name": "",
        "errName": false,
        "errAge": false,
        "age": 0
      }
    ]);
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const addPortion = () => {
      let porsi = [...formPortion];
      porsi.push({
        "name": "",
        "errName": false,
        "errAge": false,
        "age": 0
      });
      setFormPortion(porsi);
    };

    const backPage = () => {
      history.push("/");
    };

    const changePortion = (obj, index, change) => {
      let porsi = [...formPortion];
      porsi[index][obj] = change;
      porsi[index]["err" + obj.charAt(0).toUpperCase() + obj.slice(1)] = false;
      setFormPortion(porsi);
    };

    const validateForm = () => {
      let continueVal = true;
      formPortion.forEach((p)=>{
        if(p["name"] === null || p["name"] === ""){
          p["errName"] = true;
          continueVal = false;
        }else if(p["age"] === null || p["age"] === ""){
          p["errAge"] = true;
          continueVal = false
        }
      })
      if(continueVal){
        console.log("berhasil!");
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
                              labelText="Full Name..."
                              id="fullname"
                              onChange={e => changePortion("name", i, e.target.value)}
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
                              value={thePortion["name"]}
                            />
                          </CardBody>
                          <CardBody>
                            <CustomInput
                              labelText="Age..."
                              id="age"
                              onChange={e => changePortion("age", i, e.target.value)}
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
                              value={thePortion["age"]}
                            />
                          </CardBody>
                        </div>
                      );
                    })
                  }
                  <CardBody>
                    <GridContainer justify="flex-end">
                      <GridItem xs={3}>
                        <Button color="facebook" simple onClick={addPortion}>
                          <AddIcon />
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={3}>
                        <Button color="primary" onClick={backPage} round><ArrowBackIcon /></Button>
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