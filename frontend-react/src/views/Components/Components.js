import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardFooter from "components/Card/CardFooter.js";
import Parallax from "components/Parallax/Parallax.js";
import { openModal } from "redux/modules/Departure/actions/departure-actions.js";
import { addDataChart } from "redux/modules/Portion/actions/portion-actions.js";
import { RequestPost } from "utilities";
import SDialog from "components/Dialog";
// sections for this page
// import HeaderLinks from "components/Header/HeaderLinks.js";
// import SectionBasics from "./Sections/SectionBasics.js";
// import SectionNavbars from "./Sections/SectionNavbars.js";
// import SectionTabs from "./Sections/SectionTabs.js";
// import SectionPills from "./Sections/SectionPills.js";
// import SectionNotifications from "./Sections/SectionNotifications.js";
// import SectionTypography from "./Sections/SectionTypography.js";
// import SectionJavascript from "./Sections/SectionJavascript.js";
// import SectionCarousel from "./Sections/SectionCarousel.js";
// import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
// import SectionLogin from "./Sections/SectionLogin.js";
// import SectionExamples from "./Sections/SectionExamples.js";
// import SectionDownload from "./Sections/SectionDownload.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const dataChart = JSON.parse(JSON.stringify(useSelector(state => state.getIn(["portionReducer", "dataChart"]))));
  const [departPpl, setDepartPpl] = React.useState({
    "nama": "",
    "exec_time": 0
  });
  const dispatch = useDispatch();
  const openModalDeparture = useSelector(state => state.getIn(["departureReducer", "openModalDeparture"]));
  const [openModalPriority, setOpenModalPriority] = React.useState(false);
  const { ...rest } = props;

  const doDeparture = (e) => {
    e.preventDefault();
    if(dataChart["labels"].length > 0){
      RequestPost("fibonacci-heap/process")
        .then(res => {
          let dataPpl = departPpl;
          let dataChrt = dataChart;
          dataPpl["nama"] = dataChrt["labels"][0];
          dataPpl["exec_time"] = res.data;
          dataChrt["labels"].splice(0, 1);
          dataChrt["datasets"][0]["data"].splice(0, 1);

          console.log(JSON.stringify(dataPpl));
          console.log(JSON.stringify(dataChrt));
          setDepartPpl(dataPpl);
          dispatch(addDataChart(dataChrt));
          dispatch(openModal(true));
        })
        .catch(err => console.log(err))
    }else{
      dispatch(openModal(true));
    }
  }

  return (
    <div>
      <Header
        brand="Fibonacci Heaps"
        // rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        // changeColorOnScroll={{
        //   height: 400,
        //   color: "white",
        // }}
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

      <div>
        <SDialog 
          cancelText="Cancel"
          content={departPpl["nama"] === "" ? "Anda belum mendaftarkan porsi haji!" : departPpl["nama"] + " telah diberangkatkan! \n Execution time: " + departPpl["exec_time"] + " (s)"}
          onCancel={() => dispatch(openModal(false))}
          onOK={() => dispatch(openModal(false))}
          okText="OK"
          open={openModalDeparture}
          title="Success"
          type={departPpl["nama"] === "" ? "error" : "success"}
        />
        <SDialog 
          cancelText="Cancel"
          content={"Prioritas akan diberikan kepada calon jamaah haji yang berumur >= 60 tahun"}
          onCancel={() => setOpenModalPriority(false)}
          onOK={() => setOpenModalPriority(false)}
          okText="OK"
          open={openModalPriority}
          title="Success"
          type={"info"}
        />
        {/* <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />
        <SectionTypography />
        <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload /> */}
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Menu</h4>
                  </CardHeader>
                  <CardBody>
                    <Link to={"/portion"} className={classes.link}>
                      <Button color="primary" size="lg" simple>
                        <FormatListNumberedIcon />
                        Daftar Porsi
                      </Button>
                    </Link>
                    <Button color="primary" onClick={doDeparture} size="lg" simple>
                      <FlightTakeoffIcon />
                      Pemberangkatan
                    </Button>
                    <Button color="primary" size="lg" onClick={() => setOpenModalPriority(true)} simple>
                      <PriorityHighIcon />
                      Prioritas
                    </Button>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
