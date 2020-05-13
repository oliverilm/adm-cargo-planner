import React, {useEffect, useState} from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from '@material-ui/core/Paper';
import shipments from "../../Storage";
import ShipmentBoxes from "./ShipmentBoxes";

export default function Business(props) {

    const { match } = props;
    const { id, name, email, boxes } = getBusinessDetails(match.params.id);
    const [box, setBox] = useState("")
    const [cargoBays, setCargoBays] = useState(calculateCargoBays(box))

    useEffect(() => {
        setBox(boxes === null ? "" : boxes)
        setCargoBays(calculateCargoBays(getBusinessDetails(id).boxes))
    }, [boxes, id])

    const updateCargoBays = () => {
        setCargoBays(calculateCargoBays(getBusinessDetails(id).boxes))
    }

    return (
        <div style={styles.root}>
            <Typography variant={"h2"} component={"h2"}>
                {name}
            </Typography>

            <div style={styles.emailDiv}>
                <MailOutlineIcon />

                <a style={styles.link} href={`mailto: ${email}`}>
                    {email}
                </a>
            </div>

            <div style={styles.card}>

                <Paper elevation={2} style={styles.paper}>
                    <div style={{margin: "1em"}}>
                        Number of required cargo bays
                    </div>

                    <Divider />

                    <Typography style={styles.cargoBays} component={"h3"} variant={"h4"}>
                        {cargoBays}
                    </Typography>
                </Paper>

            </div>

            <div>
                {/*<TextField
                  id="standard-full-width"
                  label="Cargo Boxes"
                  style={styles.cargoBoxes}
                  placeholder="Shipment boxes units"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  onChange={(e) => {
                      updateShipment(e)
                  }}
                  value={box}
                />*/}
                <ShipmentBoxes shipmentId={id} onShipmentsChange={updateCargoBays} />
            </div>
        </div>
    )
}

/**
 * Find and return business object from array.
 * 
 * @param {string} id - Id of a business. 
 */
const getBusinessDetails = (id) => {
    return shipments.getShipments().find(r => r.id === id)
}

/**
 * Converts a string of numbers to a sum, divides by 10 and rounds up to calculate amount of cargo bays.
 * 
 * @param {string|any} boxesString - String of integers and floats separated with commas.
 */
const calculateCargoBays = (boxesString) => {
    if (boxesString === null) return 0;

    const total = boxesString.trim().split(",")
      .filter(r => r !== undefined && true && !isNaN(r) && r.length !== 0)
      .reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
    return Math.ceil(total / 10)
}

const styles = {
    root: {flex: 1},
    emailDiv: {
        display: "flex",
        alignItems: "center",
        marginTop: "1.5em",
        justifyContent: "flex-start"
    },
    link: {marginLeft: "1em", textDecoration: "none"},
    card: {marginTop: "2em"},
    cargoBoxes: {margin: 8, marginTop: 30},
    cargoBays: {paddingBottom: "10px", paddingTop: 10},
    paper: { display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: 200,  background: 'linear-gradient(to right bottom, #607d8b, #90a4ae)', color: "#fff", fontWeight: "bolder"}
}
